import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

function EmployeeLeaves() {
  const [leaves, setLeaves] = useState([]);
  const dispatch = useDispatch();

  const getLeavesData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/employee/get-leaves-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setLeaves(response.data.data); // Assuming data is returned as an array of leave objects
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching leaves:", error);
    }
  };

  useEffect(() => {
    getLeavesData();
  }, []);

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeID",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
    },
    {
        title: "Duration",
        dataIndex: "duration",
        render: (text, record) => {
          const startDate = moment(record.duration[0]).format('DD/MM/YYYY');
          const endDate = moment(record.duration[1]).format('DD/MM/YYYY');
          return `${startDate} - ${endDate}`;
        }
      },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">Leave Requests Details </h1>
      <Table columns={columns} dataSource={leaves} />
    </Layout>
  );
}

export default EmployeeLeaves;
