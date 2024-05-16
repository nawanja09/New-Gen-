import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leaves/getall");
        setLeaves(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaves:', error);
        setError('Error fetching leave data. Please try again later.');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const deleteLeave = async (leaveId) => {
    try {
      await axios.delete(`http://localhost:5000/api/leaves/delete/${leaveId}`);
      setLeaves(prevLeaves => prevLeaves.filter(leave => leave._id !== leaveId));
      toast.success("Leave deleted successfully", { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting leave:', error);
      toast.error("Error deleting leave. Please try again later.", { position: 'top-right' });
    }
  }

  const approveLeave = async (leaveId) => {
    try {
      await axios.put(`http://localhost:5000/api/leaves/approve/${leaveId}`);
      const updatedLeaves = leaves.map(leave =>
        leave._id === leaveId ? { ...leave, status: "Approved" } : leave
      );
      setLeaves(updatedLeaves);
      toast.success("Leave approved successfully", { position: 'top-right' });
    } catch (error) {
      console.error('Error approving leave:', error);
      toast.error("Error approving leave. Please try again later.", { position: 'top-right' });
    }
  };

  const rejectLeave = async (leaveId) => {
    try {
      await axios.put(`http://localhost:5000/api/leaves/reject/${leaveId}`);
      const updatedLeaves = leaves.map(leave =>
        leave._id === leaveId ? { ...leave, status: "Rejected" } : leave
      );
      setLeaves(updatedLeaves);
      toast.success("Leave rejected successfully", { position: 'top-right' });
    } catch (error) {
      console.error('Error rejecting leave:', error);
      toast.error("Error rejecting leave. Please try again later.", { position: 'top-right' });
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredLeaves = leaves.filter(leave =>
    leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.employeename.toLowerCase().includes(searchTerm.toLowerCase()) 
   
  );


  return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' ,backgroundColor:"#f7f7f7",minHeight:'100vh'}}>
      <div style={{ marginBottom: '20px',alignItems:'center'}}>
        <h1 style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'20px 300px'}}>Leave Requests</h1>  <br></br>
        <input
          type="text"
          placeholder="Search by ID or Name"
          style={{ padding: '9px', width: '70%', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box',margin:'20px 50px'}}
          value={searchTerm}
          onChange={handleSearch}
        />
        </div>
       <div style={{ background: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',fontSize:'12px' }}>
        <table id="leaveTable" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
          <thead style={{ background: '#f2f2f2' ,borderRadius:'10px 10px 0 0'}}>
          <tr>
            <th style={{ padding: '10px' }}>L.No.</th>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Employee Name</th>
            <th style={{ padding: '10px' }}>Job Role</th>
            <th style={{ padding: '10px' }}>Leave Type</th>
            <th style={{ padding: '10px' }}>Leave From</th>
            <th style={{ padding: '10px' }}>Leave To</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave, index) => (
            <tr key={leave._id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{leave.employeeId}</td>
              <td style={{ padding: '10px', textAlign: 'center'}}>{leave.employeename}</td>
              <td style={{ padding: '10px',textAlign: 'center'}}>{leave.jobrole}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{leave.leaveType}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(leave.leavefrom).toLocaleDateString('en-US')}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(leave.leaveto).toLocaleDateString('en-US')}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{leave.status}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button
                  style={{ background: '#dc3545', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                  onClick={() => deleteLeave(leave._id)}
                >
                  Delete
                </button>
                {leave.status !== "Approved" && (
                  <button
                    style={{ background: '#28a745', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                    onClick={() => approveLeave(leave._id)}
                  >
                    Approve
                  </button>
                )}
                {leave.status !== "Rejected" && (
                  <button
                    style={{ background: '#dc3545', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => rejectLeave(leave._id)}
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    /</div>
  );
}

export default Leaves;
