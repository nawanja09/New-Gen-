import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Col, Row, Form, Input, DatePicker, Button } from 'antd';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import EmployeeForm from '../components/EmployeeForm';

function ApplyEmployee() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post("/api/user/apply-employee-account",  // <-- Corrected endpoint
        {
          ...values,
          userId: user._id,
        },

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home page");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response ? error.response.data.message : "Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className='page-title'>Apply Employee</h1>
      <hr></hr>
      <div className="container">
          <EmployeeForm onFinish={onFinish}/>
      </div>
    </Layout>

  );

}

export default ApplyEmployee;
