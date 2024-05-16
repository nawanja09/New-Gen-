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
        <h1 style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'20px 300px'}}>Employee Details</h1>  <br></br>
        <input
          type="text"
          placeholder="Search by ID or Name"
          style={{ padding: '9px', width: '70%', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box',margin:'20px 50px'}}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' ,fontSize:'12px'}}>
        
        <table id="employeeTable" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
          <thead style={{ background: '#f2f2f2' ,borderRadius:'10px 10px 0 0'}}>
            <tr>
              <th style={{ padding: '15px' }}>E.No.</th>
              <th style={{ padding: '15px' }}>Employee ID</th>
              <th style={{ padding: '15px' }}>Employee Name</th>
              <th style={{ padding: '15px' }}>Job Role</th>
              <th style={{ padding: '15px' }}>Basic Salary</th>
              <th style={{ padding: '15px' }}>Bonus</th>
              <th style={{ padding: '15px' }}>Total Salary(LKR)</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee._id}>
                <td style={{ padding: '15px',textAlign:'center' }}>{index + 1}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.employeeId}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.employeename}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.jobrole}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.basicsalary}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.bonus}</td>
                <td style={{ padding: '15px',textAlign: 'center' }}>{employee.totsalary}</td>
                
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Employee;
 