import { Col, Row, Form, Input, DatePicker, Button } from 'antd';
import Layout from '../components/Layout';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApplyEmployeeLeave() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/employee/apply-leave", {
        ...values,
        userId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className='page-title'>Apply Leave</h1>
      <hr />
      <div className="container">
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={12}>
              <Form.Item required label="Employee ID" name = "employeeID" rules={[{required:true}]}>
                <Input placeholder="Employee ID"/>
              </Form.Item>
            </Col>
           </Row>
            <Row>
            <Col span={8} xs={24} sm={24} lg={12}>
              <Form.Item required label="Employee Name" name = "employeeName" rules={[{required:true}]}>
                <Input placeholder="Employee Name"/>
              </Form.Item>
            </Col>
           </Row>
           <Row>
            <Col span={8} xs={24} sm={24} lg={12}>
              <Form.Item required label="Leave Type" name="leaveType" rules={[{ required: true }]}>
                <Input placeholder="Leave Type" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} xs={24} sm={24} lg={12}>
              <Form.Item required label="Duration" name="duration" rules={[{ required: true }]}>
                <DatePicker.RangePicker/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} xs={24} sm={24} lg={12}>
              <Form.Item required label="Description" name="description" rules={[{ required: true }]}>
                <Input.TextArea rows={4} placeholder="Reason" />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <div className="d-flex ">
            <Button className="primary-button" htmlType='submit'>Submit</Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default ApplyEmployeeLeave;
