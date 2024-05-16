import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const LeaveRequest = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leaves/getall");
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredLeaves = leaves.filter(leave =>
    (leave.employeeId && leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (leave.employeename && leave.employeename.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  return (
      
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '10px' ,backgroundColor:"#f7f7f7",minHeight:'100vh'}}>
        <Link to={"/employ"} style={{ marginRight: '20px', color: '#007bff' }}>Back</Link>
        <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 300px' }}>Leave Requests</h2>
        <input
        type="text"
        placeholder="Search by ID or Name"
        style={{ padding: '9px', width: '70%', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box',margin:'20px 50px'}}
        value={searchTerm}
        onChange={handleSearch}
      />
    
      <div style={{ background: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' , fontSize:'12px' }}>
        <table id="leaveTable" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
          <thead style={{ background: '#f2f2f2', borderRadius: '10px 10px 0 0' }}>
            <tr>
              <th style={{ padding: '10px'}}>L.No.</th>
              <th style={{ padding: '10px'}}>ID</th>
              <th style={{ padding: '10px'}}>Employee Name</th>
              <th style={{ padding: '10px'}}>Job Role</th>
              <th style={{ padding: '10px'}}>Leave Type</th>
              <th style={{ padding: '10px'}}>Leave From</th>
              <th style={{ padding: '10px'}}>Leave To</th>
              <th style={{ padding: '10px'}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr key={leave._id}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{leave.employeeId}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{leave.employeename}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{leave.jobrole}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{leave.leaveType}</td>
                <td style={{ padding: '10px',textAlign: 'center'  }}>{new Date(leave.leavefrom).toLocaleDateString('en-GB')}</td>
                <td style={{ padding: '10px',textAlign: 'center' }}>{new Date(leave.leaveto).toLocaleDateString('en-GB')}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   )
}

export default LeaveRequest;
