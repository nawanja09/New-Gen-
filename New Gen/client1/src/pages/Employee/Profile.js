import Layout from '../../components/Layout';
import EmployeeForm from '../../components/EmployeeForm';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Profile() {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [employee, setEmployee] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {

        try {
            dispatch(showLoading());
            const response = await axios.post("/api/employee/update-employee-profile",
                {
                    ...values,
                    userId: user._id,
                }, {
                headers: {
                    Authorization: ` Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                toast("Redirecting to login page");
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("something went wrong");
        }
    };
    const getemployeesData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/employee/get-employee-info-by-user-id',
                {
                    userId: params.userId,
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
    useEffect(() => {
        getemployeesData();
    }, []);
    return (
        <Layout>
            <h1 className='Page-title'>Employee Profile</h1>
            <hr></hr>
            {employee && <EmployeeForm onFinish={onFinish} initialValues={employee} />}

        </Layout>
    )
}

export default Profile