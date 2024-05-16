import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../placeorder/PlaceOrder";
import axios from 'axios';
import toast from 'react-hot-toast';

const EditOrder = () => {
    const [order, setOrder] = useState({
        supplierId: '',
        accessoriesname: '',
        category: '',
        quantity: '',
        price: '',
        description: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/order/getone/${id}`)
                .then((response) => {
                    setOrder(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/order/update/${id}`, order);
            toast.success('Order updated successfully', { position: 'top-right' });
            navigate('/supplier');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='addOrder'>
            <Link to='/supplier'>Back</Link>
            <h3>Update Order</h3>
            <form className='addOrderForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='supplierId'>Supplier ID</label>
                    <input
                        type='text'
                        onChange={inputChangeHandler}
                        id='supplierId'
                        name='supplierId'
                        autoComplete='off'
                        placeholder='Supplier ID'
                        value={order.supplierId}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='accessoriesname'>Accessories name</label>
                    <input
                        type='text'
                        onChange={inputChangeHandler}
                        id='accessoriesname'
                        name='accessoriesname'
                        autoComplete='off'
                        placeholder='Accessories name'
                        value={order.accessoriesname}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='category'>Category</label>
                    <input
                        type='text'
                        onChange={inputChangeHandler}
                        id='category'
                        name='category'
                        autoComplete='off'
                        placeholder='Category'
                        value={order.category}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='quantity'>Quantity</label>
                    <input
                        type='text'
                        onChange={inputChangeHandler}
                        id='quantity'
                        name='quantity'
                        autoComplete='off'
                        placeholder='Quantity'
                        value={order.quantity}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='price'>Price Per Unit</label>
                    <input
                        type='text'
                        onChange={inputChangeHandler}
                        id='price'
                        name='price'
                        autoComplete='off'
                        placeholder='Price Per Unit'
                        value={order.price}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        onChange={inputChangeHandler}
                        id='description'
                        name='description'
                        autoComplete='off'
                        placeholder='Description'
                        value={order.description}
                    />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>UPDATE ORDER</button>
                </div>
            </form>
        </div>
    );
};

export default EditOrder;
