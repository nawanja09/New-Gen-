import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";

function EmployeeForm({ onFinish, initialValues }) {
  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input placeholder="Enter your first name" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Last Name"
            name="lastName" rules={[{ required: true }]}>
            <Input placeholder="Enter your last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="example@gmail.com" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Address" name="address" rules={[{ required: true }]}>
            <Input placeholder="Ener your address " />
          </Form.Item>
        </Col>
      </Row>
      <Row>
      {/*  <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Date of 
    Birth" name="dateOfBirth" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
  </Col> */}
      </Row>
      <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Phone" name="phone" rules={[{ required: true }]}>
            <Input placeholder="Enter your phone number" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Job Type" name="type" rules={[{ required: true }]}>
            <Input placeholder="pc or laptop rapeir" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required
            label="Qualifications" name="qualifications" rules={[{ required: true }]}>
            <Input placeholder="Enter your qualifications" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Please upload employee's image" name="image" rules={[{ required: true }]}>
            <Input placeholder="Choosen file" />
          </Form.Item>
        </Col>
      </Row>
      <br></br>
      <div className="d-flex ">
        <Button className="primary-button" htmlType='submit'>Submit</Button>
      </div>
    </Form>

  )
}
export default EmployeeForm