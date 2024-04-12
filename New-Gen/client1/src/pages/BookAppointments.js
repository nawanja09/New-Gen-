import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { Button, Col, Row, DatePicker } from 'antd';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Layout from '../components/Layout';

function BookAppointment() {
    const [date, setDate] = useState();
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [employee, setEmployee] = useState(null);
    const dispatch = useDispatch();

    const getemployeesData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/employee/get-employee-info-by-id',
                {
                    employeeID: params.employeeID,
                },

                {
                    headers: {
                        Authorization: ` Bearer ${localStorage.getItem('token')}`,
                    },
                });
            dispatch(hideLoading());
            if (response.data.success) {
                setEmployee(response.data.data);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());

        }
    };
    const bookNow = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/book-appointment',
                {
                    employeeID: params.employeeID,
                    userId: user._id,
                    employeeInfo: employee,
                    userInfo: user,
                    date: date,
                },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Error booking appointment");
            dispatch(hideLoading());

        }
    };

    useEffect(() => {
        getemployeesData();
    }, []);

    return (
        <Layout>
            {employee && (
                <div>
                    <h1 className='page-title'>{employee.firstName + " " + employee.lastName}</h1><hr></hr>
                    <Row>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <div className='d-flex flex-column mt-2'>
                                <DatePicker format="DD-MM-YYYY" onChange={(value) => setDate(moment(value).format('DD-MM-YYYY'))} />
                                   
                                <Button className='primary-button mt-3 full-width-button' onClick={bookNow}>Book Now</Button>

                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </Layout>

    );
}

export default BookAppointment;