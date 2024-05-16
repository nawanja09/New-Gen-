import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PlaceAppointment = () => {
  const [appointment, setAppointment] = useState({
    appointmentId: "",
    username: "",
    phone: "",
    repairtype: "",
    issue: "",
    date: "",
    description: "",
  });

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    // Convert date format if the input is date
    const newValue = name === 'date' ? new Date(value).toISOString().split('T')[0] : value;

    setAppointment({ ...appointment, [name]: newValue });
  };

  const validatePhoneNumber = (phone) => {
    // Regular expression to match a valid phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    if (
      !appointment.appointmentId ||
      !appointment.username ||
      !validatePhoneNumber(appointment.phone) ||
      !appointment.repairtype ||
      !appointment.issue ||
      !appointment.date ||
      !appointment.description
    ) {
      toast.error("All fields are required or invalid", { position: "top-right" });
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/appointments/create", appointment);
      toast.success("Appointment created successfully", { position: "top-right" });
      navigate("/viewappointment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <Link to={"/viewappointment"} style={{ textDecoration: 'none', color: '#333', fontSize: '16px', marginBottom: '10px' }}>Back</Link>
      <h3 style={{ margin: '20px 0', fontSize: '28px' }}>Add Appointment</h3>
      <form onSubmit={submitForm} style={{ textAlign: 'left' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='appointmentId' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Appointment ID:</label>
          <input type='text' id='appointmentId' name='appointmentId' value={appointment.appointmentId} onChange={inputChangeHandler} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='username' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>User Name:</label>
          <input type='text' id='username' name='username' value={appointment.username} onChange={inputChangeHandler} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='phone' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Phone Number:</label>
          <input type='tel' id='phone' name='phone' value={appointment.phone} onChange={inputChangeHandler} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='repairtype' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Repair Type:</label>
          <input type='text' id='repairtype' name='repairtype' value={appointment.repairtype} onChange={inputChangeHandler} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='issue' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Issue:</label>
          <input type='text' id='issue' name='issue' value={appointment.issue} onChange={inputChangeHandler} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='date' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Date:</label>
          <input type='date' id='date' name='date' value={appointment.date} onChange={inputChangeHandler} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='description' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Description:</label>
          <textarea id='description' name='description' value={appointment.description} onChange={inputChangeHandler} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <button type='submit' style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', fontSize: '18px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Add</button>
      </form>
    </div>
  );
};

export default PlaceAppointment;
