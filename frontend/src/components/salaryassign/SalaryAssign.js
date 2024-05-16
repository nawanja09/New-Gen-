import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SalaryAssign = () => {
  const [employee, setEmployee] = useState({
    employeeId: "",
    employeename: "",
    month: new Date(),
    basicsalary: "",
    bonus: "",
    totsalary: "",
    phone: "",
    jobrole: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/getone/${id}`);
        const { month, ...rest } = response.data;
        const formattedMonth = new Date(month);
        setEmployee({ month: formattedMonth, ...rest });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // Function to calculate total salary
  const calculateTotalSalary = () => {
    const basic = parseFloat(employee.basicsalary);
    const bonusAmount = parseFloat(employee.bonus);
    const total = basic + bonusAmount;
    setEmployee({ ...employee, totsalary: total.toFixed(2) });
  };

  // Update total salary whenever basic salary or bonus changes
  useEffect(() => {
    calculateTotalSalary();
  }, [employee.basicsalary, employee.bonus]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/employees/update/${id}`, employee);
      navigate("/employee");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '10px', boxShadow: '0 0 0 rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <Link to={"/employee"} style={{ textDecoration: 'none', color: '#333', fontSize: '16px', marginBottom: '10px' }}>Back</Link>
      <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Salary Assignment</h2>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>

        <label htmlFor='employeeId' style={{ display: 'block', marginBottom: '2px', fontSize: '15px' }}>Employee ID:</label>
        <input type='text' id='employeeId' name='employeeId' value={employee.employeeId} disabled style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />

        <label htmlFor='employeename' style={{ display: 'block', marginBottom: '2px', fontSize: '15px' }}>Employee Name:</label>
        <input type='text' id='employeename' name='employeename' value={employee.employeename}disabled  style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />

        <label htmlFor='phone' style={{ display: 'block', marginBottom: '2px', fontSize: '15px' }}>Phone Number:</label>
        <input type='text' id='phone' name='phone' value={employee.phone} onChange={inputChangeHandler}disabled style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />

        <label htmlFor='jobrole' style={{ display: 'block', marginBottom: '2px', fontSize: '15px' }}>Job Role:</label>
        <input type='text' id='jobrole' name='jobrole' value={employee.jobrole} onChange={inputChangeHandler}disabled style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />

        <label htmlFor='month' style={{ display: 'block', marginBottom: '2px', fontSize: '15px' }}>Month:</label>
        <input type='month' id='month' name='month' value={employee.month} onChange={inputChangeHandler} style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
        
        <label htmlFor='basicsalary' style={{ display: 'block', marginBottom: '2px', fontSize: '15px' }}>Basic Salary:</label>
        <input type='text' id='basicsalary' name='basicsalary' value={employee.basicsalary} onChange={inputChangeHandler} style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />

        <label htmlFor='bonus' style={{ display: 'block', marginBottom: '2px', fontSize: '15px' }}>Bonus:</label>
        <input type='text' id='bonus' name='bonus' value={employee.bonus} onChange={inputChangeHandler} style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />

        <label htmlFor='totsalary' style={{ display: 'block', marginBottom: '2px', fontSize: '15px' }}>Total Salary:</label>
        <input type='text' id='totsalary' name='totsalary' value={employee.totsalary} readOnly style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="button" onClick={handleUpdate} style={{ padding: '10px',marginLeft:'250px',backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer', width: '100px' }}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default SalaryAssign;
