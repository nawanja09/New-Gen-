import React, { useEffect, useState } from 'react';
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./order.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Order = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/order/getall");
                setOrders(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Filter orders based on search term and date range
        const filtered = orders.filter(order =>
            (order.accessoriesname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.supplierId.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredOrders(filtered);
    }, [orders, searchTerm]);

    const deleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/order/delete/${orderId}`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            toast.success(response.data.msg, { position: 'top-right' });
        } catch (error) {
            console.error(error);
        }
    };


    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Order Report", 10, 10);
        const tableData = filteredOrders.map((orderItem, index) => [
            index + 1,
            orderItem.supplierId || "",
            orderItem.accessoriesname || "",
            orderItem.quantity || "",
            orderItem.quantity && orderItem.price
                ? (orderItem.quantity * orderItem.price).toFixed(2)
                : "",
            orderItem.updatedAt ? new Date(orderItem.updatedAt).toLocaleDateString() : "",
        ]);
        doc.autoTable({
            head: [
                ["No", "Supplier ID", "Accessories Name", "Quantity", "Order Value"],
            ],
            body: tableData,
        });
        doc.save("order_report.pdf");
    };

    return (
       
            <div className='OrderTable'>
                <Link to={"/add"} className='addButton'>Place Order</Link>
                <hr/>
                <h2 className="mb-8 text-3xl font-bold">Manage Order</h2>
                {error && <div className="error">{error}</div>}
                <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <button
                onClick={generatePDF}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Download PDF
            </button>
                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Supplier ID</th>
                            <th>Accessories Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price Per Unit</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredOrders.map((orderItem, index) => (
                                <tr key={orderItem._id}>
                                    <td>{index + 1}</td>
                                    <td>{orderItem.supplierId}</td>
                                    <td>{orderItem.accessoriesname}</td>
                                    <td>{orderItem.category}</td>
                                    <td>{orderItem.quantity}</td>
                                    <td>{orderItem.price}</td>
                                    <td>{orderItem.description}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteOrder(orderItem._id)}><i className="fa-solid fa-trash">Delete</i></button>
                                        <Link to={`/edit/${orderItem._id}`}><i className="fa-solid fa-pen-to-square">Edit</i></Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        
    );
}

export default Order;