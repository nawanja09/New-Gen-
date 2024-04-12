import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Employee from "../components/Employee";
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { Col, Row } from 'antd'

function Home() {
    const [employees,setEmployees]=useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get("/api/user/get-all-approved-employees", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setEmployees(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <Layout>
           <Row gutter={30}>
            {employees.map((employees)=>(
                   <Col span={8} xs={24} sm={24} lg={8}>
                    <Employee employee ={employees}/>
                </Col>
            ) )}
           </Row>
        </Layout>
    );

}

export default Home;