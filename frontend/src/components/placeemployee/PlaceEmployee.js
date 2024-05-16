import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./PlaceOrder.css";
import toast from 'react-hot-toast';

const PlaceEmployee = () => {
  const [existingEmployeeIds, setExistingEmployeeIds] = useState([]);

  const [employee, setEmployee] = useState({
    employeeId: "",
    employeename: "",
    phone: "",
    email: "",
    jobrole: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!employee.employeeId) {
      toast.error("Employee ID is required", { position: "top-right" });
      return false;
    }
    if (!employee.employeename) {
      toast.error("Employee name is required", { position: "top-right" });
      return false;
    }
    if (!validatePhoneNumber(employee.phone)) {
      toast.error("Invalid phone number format", { position: "top-right" });
      return false;
    }
    if (!validateEmail(employee.email)) {
      toast.error("Invalid email format", { position: "top-right" });
      return false;
    }
    if (!employee.jobrole) {
      toast.error("Job role is required", { position: "top-right" });
      return false;
    }
    if (existingEmployeeIds.includes(employee.employeeId)) {
      toast.error("Appointment ID already exists", { position: "top-right" });
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/employees/create", employee, {
        withCredentials: true,
      });

      toast.success(response.data.msg, { position: "top-right" });
      navigate("/employee");
    } catch (error) {
      console.log(error);
      toast.error("Error adding employee", { position: "top-right" });
    }
  };

  return (
    <div className='addOrder'>
      <Link to={"/employee"}>Back</Link>
      <h3>Add New Employee</h3>
      <form className='addOrderForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            onChange={inputHandler}
            id="employeeId"
            name="employeeId"
            placeholder='employeeId'
            value={employee.employeeId}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="employeename">Employee Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="employeename"
            name="employeename"
            placeholder='employee name'
            value={employee.employeename}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            onChange={inputHandler}
            id="phone"
            name="phone"
            pattern="[0-9]*"
            maxLength="10"
            placeholder="Phone Number"
            value={employee.phone}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={inputHandler}
            id="email"
            name="email"
            placeholder="Email"
            value={employee.email}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="jobrole">Job Role</label>
          <input
            type="text"
            onChange={inputHandler}
            id="jobrole"
            name="jobrole"
            placeholder='jobrole'
            value={employee.jobrole}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD EMPLOYEE</button>
        </div>
        <div className="inputGroup">
          <button type="button" onClick={() => navigate("/employee")}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default PlaceEmployee;
