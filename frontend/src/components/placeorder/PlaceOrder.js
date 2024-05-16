import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';


const accessoriesList = [
    "Mouse",
    "Keyboard",
    "Monitor",
    "Headset",
    "Webcam",
    "CCTV",
    "Speakers",
    "Printer",
    "External Hard Drive",
    "USB Flash Drive"
];

const categoryList = ["Laptop", "Desktop", "CCTV"];

const PlaceOrder = () => {
    const [order, setOrder] = useState({
        supplierId: "",
        accessoriesname: "",
        category: "",
        quantity: "",
        price: "",
        description: "",
    });

    const [validationErrors, setValidationErrors] = useState({
        supplierId: "",
        quantity: "",
        price: ""
    });

    const [isSupplierIdUnique, setIsSupplierIdUnique] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const checkSupplierId = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/suppliers/${order.supplierId}`);
                setIsSupplierIdUnique(response.data === null);
            } catch (error) {
                console.error(error);
            }
        };

        if (order.supplierId.trim() !== "") {
            checkSupplierId();
        }
    }, [order.supplierId]);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });

        // Reset validation error for the input field being edited
        setValidationErrors({ ...validationErrors, [name]: "" });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        // Validation
        const errors = {};
        if (!order.supplierId.trim()) {
            errors.supplierId = "Supplier ID is required";
        } else if (!isSupplierIdUnique) {
            errors.supplierId = "Supplier ID must be unique";
        }
        if (!order.quantity.trim() || isNaN(order.quantity) || order.quantity <= 0 || !Number.isInteger(parseFloat(order.quantity))) {
            errors.quantity = "Quantity must be a positive integer";
        }
        if (!order.price.trim() || isNaN(order.price) || order.price <= 0) {
            errors.price = "Price Per Unit must be a positive number";
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            // You can proceed with the API call to place the order if all validations pass
            await axios.post("http://localhost:5000/api/order/create", order);
            toast.success('Order placed successfully', { position: 'top-right' });
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error('Failed to place order. Please try again.');
        }
    };

   return (
        <div style={{ maxWidth: '800px', margin: '20px auto', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <Link to={"/supplier"} style={{ textDecoration: 'none', color: '#333', fontSize: '16px', marginBottom: '10px' }}>Back</Link>
            <h3 style={{ margin: '20px 0', fontSize: '28px' }}>Place new Order</h3>
            <form onSubmit={submitForm} style={{ textAlign: 'left' }} className='addOrderForm'>
                <div style={{ marginBottom: '20px' }} className="inputGroup">
                    <label htmlFor="supplierId">Supplier ID</label>
                    <input type="text" onChange={inputHandler} id="supplierId" name="supplierId" autoComplete='off' placeholder='Supplier ID' style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <span style={{ color: 'red' }}>{validationErrors.supplierId}</span>
                </div>
                <div style={{ marginBottom: '20px' }} className="inputGroup">
                    <label htmlFor="accessoriesname">Accessories name</label>
                    <select onChange={inputHandler} id="accessoriesname" name="accessoriesname" autoComplete='off' defaultValue='' required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value='' disabled>Select Accessories</option>
                        {accessoriesList.map((accessory, index) => (
                            <option key={index} value={accessory}>{accessory}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }} className="inputGroup">
                    <label htmlFor="category">Category</label>
                    <select onChange={inputHandler} id="category" name="category" autoComplete='off' defaultValue='' required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value='' disabled>Select Category</option>
                        {categoryList.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }} className="inputGroup">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" onChange={inputHandler} id="quantity" name="quantity" autoComplete='off' placeholder='Quantity' style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <span style={{ color: 'red' }}>{validationErrors.quantity}</span>
                </div>
                <div style={{ marginBottom: '20px' }} className="inputGroup">
                    <label htmlFor="price">Price Per Unit</label>
                    <input type="text" onChange={inputHandler} id="price" name="price" autoComplete='off' placeholder='Price Per Unit' style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <span style={{ color: 'red' }}>{validationErrors.price}</span>
                </div>
                <div style={{ marginBottom: '20px' }} className="inputGroup">
                    <label htmlFor="description">Description</label>
                    <input type="text" onChange={inputHandler} id="description" name="description" autoComplete='off' placeholder='Description' style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '20px' }} className="inputGroup">
                    <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', fontSize: '18px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Place Order</button>
                </div>
            </form>
        </div>
    );
}

export default PlaceOrder;