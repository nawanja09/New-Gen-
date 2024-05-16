import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    employeeId: "",
    employeename: "",
    phone: "",
    email:"",
    jobrole: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/getone/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchData();
  }, [id]);

  const validatePhoneNumber = (phone) => {
    // Regular expression to match a valid phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    // Regular expression to match a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setFormSubmitted(true); // Set form submitted to true

    // Validate phone number
    if (!validatePhoneNumber(employee.phone)) {
      toast.error('Please enter a valid phone number (10 digits)', { position: 'top-right' });
      return;
    }

    // Validate email
    if (!validateEmail(employee.email)) {
      toast.error('Please enter a valid email address', { position: 'top-right' });
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error("All fields are required", { position: "top-right" });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/employees/update/${id}`, employee);
      toast.success("Employee updated successfully", { position: "top-right" });
      navigate("/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee", { position: "top-right" });
    }
  };

  // Function to validate the form
  const validateForm = () => {
    const { employeeId, employeename, phone, email, jobrole } = employee;
    return employeeId.trim() !== '' && employeename.trim() !== '' && phone.trim() !== '' && email.trim() !== '' && jobrole.trim() !== '';
  }

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <div>
      <Link to="/employee">Back</Link>
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>Update Employee</h3>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={submitForm}>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <label htmlFor="employeeId" style={{ display: 'block', marginBottom: '5px', fontSize: '16px' }}>Employee ID</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              id="employeeId"
              name="employeeId"
              placeholder='Employee ID'
              value={employee.employeeId}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
              disabled
            />
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <label htmlFor="employeename" style={{ display: 'block', marginBottom: '5px', fontSize: '16px' }}>Employee Name</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              id="employeename"
              name="employeename"
              placeholder='Employee Name'
              value={employee.employeename}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontSize: '16px' }}>Phone Number</label>
            <input
              type="tel" // Change input type to 'tel' for phone number
              onChange={inputChangeHandler}
              id="phone"
              name="phone"
              placeholder='Phone Number'
              pattern="[0-9]{10}"
              value={employee.phone}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
              required // Add required attribute
            />
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontSize: '16px' }}>Email</label>
            <input
              type="email" // Change input type to 'email' for email
              onChange={inputChangeHandler}
              id="email"
              name="email"
              placeholder='Email'
              value={employee.email}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
              required // Add required attribute
            />
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <label htmlFor="jobrole" style={{ display: 'block', marginBottom: '5px', fontSize: '16px' }}>Job Role</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              id="jobrole"
              name="jobrole"
              placeholder='Job Role'
              value={employee.jobrole}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
              required // Add required attribute
            />
          </div>
          {formSubmitted && !validateForm() && <p style={{ color: 'red', fontSize: '14px', marginBottom: '20px' }}>All fields are required</p>}
          <div style={{ width: '100%' }}>
            <button
              type="submit"
              style={{ width: '100%', background: '#007bff', color: '#fff', padding: '10px 0', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              UPDATE EMPLOYEE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
