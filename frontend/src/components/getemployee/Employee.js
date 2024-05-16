import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';


const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees/getall");
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/delete/${employeeId}`);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== employeeId));
      toast.success("Employee deleted successfully", { position: 'top-right' });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  // Filter employees based on search term 
  const filteredEmployees = employees.filter(employee =>
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeename.toLowerCase().includes(searchTerm.toLowerCase()) 
   
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' ,backgroundColor:"#f7f7f7",minHeight:'100vh'}}>
      <div style={{ marginBottom: '20px',alignItems:'center'}}>
        <h1 style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'20px 300px'}}>Employee Summary</h1>  <br></br>
        <input
          type="text"
          placeholder="Search by ID or Name"
          style={{ padding: '9px', width: '70%', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box',margin:'20px 50px'}}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' ,fontSize:'12px'}}>
        <Link to={"/employeeadd"} style={{ textDecoration: 'none', background: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '4px' }}>Add Employee</Link>
        <table id="employeeTable" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
          <thead style={{ background: '#f2f2f2' ,borderRadius:'10px 10px 0 0'}}>
            <tr>
              <th style={{ padding: '15px' }}>E.No.</th>
              <th style={{ padding: '15px' }}>Employee ID</th>
              <th style={{ padding: '15px' }}>Employee Name</th>
              <th style={{ padding: '15px' }}>Phone Number</th>
              <th style={{ padding: '15px' }}>Job Role</th>
              <th style={{ padding: '15px' }}>Total Salary(LKR)</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee._id}>
                <td style={{ padding: '15px',textAlign:'center' }}>{index + 1}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.employeeId}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.employeename}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.phone}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.jobrole}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.totsalary}</td>
                <td style={{ padding: '15px' }}>
                  <button style={{ background: '#dc3545', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }} onClick={() => deleteEmployee(employee._id)}>Delete</button>
                  <Link to={`/employeeedit/${employee._id}`} style={{ textDecoration: 'none', background: '#ffc107', color: '#000', padding: '8px 12px', borderRadius: '4px',marginRight: '5px' }}>Edit</Link>
                  <Link to={`/salassign/${employee._id}`}style={{ textDecoration: 'none', background: '#28a745', color: '#000', padding: '8px 12px', borderRadius: '4px',marginRight: '5px' }}>Salary</Link>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/salreport`}style={{ textDecoration: 'none', background: '#ffc107', color: '#000', padding: '5px 10px', borderRadius: '4px', marginRight: '5px', marginBottom: '5px' }}>Generate Report</Link>

      </div>
    </div>
  )
}

export default Employee;
 