import React,{useEffect,useState}from 'react';
import Layout from '../../components/Layout';
import { useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Button, Table } from 'antd';
import toast from 'react-hot-toast';

function EmployeeList(){
    const [employees,setEmployees] = useState([]);
    const dispatch = useDispatch();
    const getemployeesData = async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get("/api/admin/get-all-employees", {
              headers:{ 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            });
            dispatch(hideLoading());
            if (response.data.success) {
               setEmployees(response.data.data);
            }
          }catch (error) {
            dispatch(hideLoading());
          }
};

   const changeEmployeeStatus = async(record,status)=>{
            try {
                dispatch(showLoading());
                const response = await axios.post("/api/admin/change-employee-account-status", {employeeID:record._id,userId:record.userId,status:status},{
                  headers:{ 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                });
                dispatch(hideLoading());
                if (response.data.success) {
                    toast.success(response.data.message);
                    getemployeesData();
                }
              }catch (error) {
                toast.error('error changing employee account status');
                dispatch(hideLoading());
              }
            };
        useEffect(()=>{
            getemployeesData();
        },[]);

        const columns = [
        
            {
                title: "Employee Name",
                dataIndex:"employeeName",
                render:(text,record)=> 
                <span>
                {record.firstName}{record.lastName}
                </span>
            },
            {
                title: "Email",
                dataIndex:"email",
            },
            {
                title: "phoneNumber",
                dataIndex:"phone",
            },
            {
                title: "Job Role",
                dataIndex:"jobRole",
            },
            {
                title: "Status",
                dataIndex:"status",
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
                <Table columns ={columns} dataSource = {employees}/>
            </Layout>
        );
    
    
    }
export default EmployeeList;