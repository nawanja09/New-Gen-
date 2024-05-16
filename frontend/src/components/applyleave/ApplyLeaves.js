import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const ApplyLeave = () => {
  const [leave, setLeave] = useState({
    employeeId: "",
    employeename: "",
    jobrole: "",
    leaveType: "",
    leavefrom: "",
    leaveto: "",
    description: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLeave({ ...leave, [name]: value });
  };

  const validateForm = () => {
    const { employeeId, employeename, jobrole, leaveType, leavefrom, leaveto } = leave;
    return employeeId.trim() !== '' && employeename.trim() !== '' && jobrole.trim() !== '' && leaveType.trim() !== '' && leavefrom.trim() !== '' && leaveto.trim() !== '';
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setFormSubmitted(true); // Set form submitted to true

    // Validate form
    if (!validateForm()) {
      toast.error("All fields are required", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/leaves/apply", leave);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/leave");
    } catch (error) {
      console.error(error);
      toast.error("Error applying leave", { position: "top-right" });
    }
  };

  // Get current date in yyyy-mm-dd format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className='addOrder'>
      <Link to={"/profile"}>Back</Link>
      <h3>Apply Leaves</h3>
      <form className='addOrderForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            onChange={inputHandler}
            id="employeeId"
            name="employeeId"
            placeholder='Employee ID'
            value={leave.employeeId}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="employeename">Employee Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="employeename"
            name="employeename"
            placeholder='Employee Name'
            value={leave.employeename}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="jobrole">Job Role</label>
          <input
            type="text"
            onChange={inputHandler}
            id="jobrole"
            name="jobrole"
            placeholder='Job Role'
            value={leave.jobrole}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="leaveType">Leave Type</label>
          <select
            id="leaveType"
            name="leaveType"
            style={{ padding: '10px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }}
            value={leave.leaveType}
            onChange={inputHandler}
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="leavefrom">Leave From</label>
          <input
            type="date"
            onChange={inputHandler}
            id="leavefrom"
            name="leavefrom"
            value={leave.leavefrom}
            min={getCurrentDate()} // Set the min attribute to restrict selection of previous days
            style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
            required // Add required attribute
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="leaveto">Leave To</label>
          <input
            type="date"
            onChange={inputHandler}
            id="leaveto"
            name="leaveto"
            value={leave.leaveto}
            min={getCurrentDate()} // Set the min attribute to restrict selection of previous days
            style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
            required // Add required attribute
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={inputHandler}
            id="description"
            name="description"
            placeholder='Description'
            style={{ padding: '10px', borderRadius: '3px' }}
            value={leave.description}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  )
}

export default ApplyLeave;
