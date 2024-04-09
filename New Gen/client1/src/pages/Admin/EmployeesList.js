import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import toast from 'react-hot-toast'


function EmployeeList(){

    const [employees,setEmployees] =useState([]);
    const dispatch=useDispatch();
    const getEmployeesData= async()=> {
        try{
            dispatch(showLoading());
            const response = await axios.get("/api/admin/get-all-employees",{
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success){
                setEmployees(response.data.data);
            }
        }catch (error){
            dispatch(hideLoading());
        }
    };
    const changeEmployeeStatus = async(record,status)=>{
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/admin/change-employee-account-status", {employeeID:record._id,userId:record.userId,status:status},{
              headers:{ 
                Authorization:` Bearer ${localStorage.getItem("token")}`,
            },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getEmployeesData();
            }
          }catch (error) {
            toast.error('error changing employee account status');
            dispatch(hideLoading());
          }
        };


    useEffect(()=>{
        getEmployeesData();
    },{});
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text,record)=><h1 className="normal-text">{record.firstName}{record.lastName}</h1>
        },
        {
            title:"Email",
            dataIndex:"email"
        },
        {
            title: "Phone",
            dataIndex:"phone"
        },
        {
            title: "Job Type",
            dataIndex: "type",
        },
        {
            title: "status",
            dataIndex: "status"
        },
        {
            title: "Actions",
            dataIndex:"actions",
            render:(text,record)=>(
                <div className="d-flex">
                    {record.status==="pending" && <h8 className="anchor" onClick={()=>changeEmployeeStatus(record,'approved')}>Approve</h8>}
                    {record.status==="approved" && <h8 className="anchor" onClick={()=>changeEmployeeStatus(record,'blocked')}>Block</h8>}    
                </div>
                )
            },


    ];
    return(
        <Layout>
            <h1 className="page-header">Employee List</h1>
            <Table columns={columns} dataSource={employees}/>
        </Layout>
    )
}

export default EmployeeList
