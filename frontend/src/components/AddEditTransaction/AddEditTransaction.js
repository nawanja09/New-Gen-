import React, { useState } from 'react'
import { Form, Input, Modal, Select, message } from 'antd'
import Spinner from '../Sprinner/Spinner'
import axios from 'axios'

function AddEditTransaction({
    setShowAddEditTransactionModal,
    showAddEditTransactionModal,
    selectedItemForEdit,
    setSelectedItemForEdit,
    getTransactions }) {

    const [loading, setLoading] = useState(false)
   
    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("Lab-Management-User"))
            setLoading(true)
            if (selectedItemForEdit) {
                await axios.post(`http://localhost:5000/api/transactions/edit-transaction`, {
                    payload: {
                        ...values, userid: user._id,
                    },
                    transactionId: selectedItemForEdit._id
                })
                getTransactions()
                message.success('Transaction updated successfull')
            } else {
                await axios.post(`http://localhost:5000/api/transactions/add-transaction`, { ...values, userid: user._id })
                getTransactions()
                message.success('Transaction added successfull')
            }
            setShowAddEditTransactionModal(false)
            setSelectedItemForEdit(null)
            setLoading(false)
        } catch (error) {
            message.error('Something went wrong')
            setLoading(false)
        }
    }
    return (
        <Modal title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'} visible={showAddEditTransactionModal} onCancel={() => setShowAddEditTransactionModal(false)} footer={false}>

            {loading && <Spinner />}

            <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>

                <Form.Item label='Amount' name='amount' rules={[
                    {
                        required: true,
                        message: 'Please input the amount!',
                    }]} >
                    <Input prefix="Rs: " type='number' placeholder='Enter amount in Rupees' />
                </Form.Item>

                <Form.Item label='Type' name='type' rules={[
                    {
                        required: true,
                        message: 'Please select the type!'
                    }]}>
                    <Select placeholder='Select transaction type'>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Category' name='category' rules={[
                    { 
                        required: true,
                        message: 'Please select the category!'
                    }]}>
                    <Select placeholder='Select transaction category'>
                        <Select.Option value='Repeiring the desktops and laptops'>Repeiring the desktops and laptops</Select.Option>
                        <Select.Option value='Selling computer parts'>Selling computer parts</Select.Option>
                        <Select.Option value='CCTV services'>CCTV services</Select.Option>
                        <Select.Option value='Other Income'>Other Income</Select.Option>
                        <Select.Option value='Employee Salary'>Employee Salary</Select.Option>
                        <Select.Option value='Equipment Purchase'>Equipment Purchase</Select.Option>
                        <Select.Option value='Building Rent'>Building Rent</Select.Option>
                        <Select.Option value='Other Expense'>Other Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Date' name='date' rules={[
                    {
                        required: true,
                        message: 'Please select the date!'
                    }]}>
                    <Input placeholder='Select transaction date' type='date' />
                </Form.Item>

                <Form.Item label='Reference' name='reference' rules={[
                    {
                        required: true,
                        message: 'Please enter the reference!'
                    }]}>
                    <Input placeholder='Enter transaction reference' type='text' />
                </Form.Item>

                <Form.Item label='Description' name='description' rules={[
                    {
                        required: true,
                        message: 'Please enter description!'
                    }]}>
                    <Input placeholder='Enter transaction description' type='text' />
                </Form.Item>
 
                <button className="--btn --btn-primary --btn-block">
                      Save
                    </button>
            </Form>

        </Modal>
    )
}

export default AddEditTransaction
