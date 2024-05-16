import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditAppointment = () => {
  const [appointment, setAppointment] = useState({
    appointmentId: "",
    username: "",
    phone: "",
    repairtype: "",
    issue: "",
    date: "",
    description: "",
  });
 
  const { id } = useParams();
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
  const todayDate = new Date().toISOString().split('T')[0];

  const validateForm = () => {
    if (!appointment.appointmentId) {
      toast.error("Appointment ID is required", { position: "top-right" });
      return false;
    }
    if (!appointment.username) {
      toast.error("Username is required", { position: "top-right" });
      return false;
    }
    if (!validatePhoneNumber(appointment.phone)) {
      toast.error("Invalid phone number format", { position: "top-right" });
      return false;
    }
    if (!appointment.repairtype) {
      toast.error("Repair type is required", { position: "top-right" });
      return false;
    }
    if (!appointment.issue) {
      toast.error("Issue is required", { position: "top-right" });
      return false;
    }
    if (!appointment.date) {
      toast.error("Date is required", { position: "top-right" });
      return false;
    }
    // Check if the selected date is in the past
    const selectedDate = new Date(appointment.date);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      toast.error("Selected date cannot be in the past", { position: "top-right" });
      return false;
    }
    if (!appointment.description) {
      toast.error("Description is required", { position: "top-right" });
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/getone/${id}`);
        setAppointment(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:5000/api/appointments/update/${id}`, appointment);
      toast.success("Appointment updated successfully", { position: "top-right" });
      navigate("/appointment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <Link to={"/appointment"} style={{ textDecoration: 'none', color: '#333', fontSize: '16px', marginBottom: '10px' }}>Back</Link>
      <h3 style={{ margin: '20px 0', fontSize: '28px' }}>Update Appointment</h3>
      <form onSubmit={submitForm} style={{ textAlign: 'left' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='appointmentId' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Appointment ID:</label>
          <input type='text' id='appointmentId' name='appointmentId' value={appointment.appointmentId} onChange={inputChangeHandler} disabled style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='username' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>User Name:</label>
          <input type='text' id='username' name='username' value={appointment.username} onChange={inputChangeHandler} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='phone' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Phone Number:</label>
          <input type='tel' id='phone' name='phone' value={appointment.phone} onChange={inputChangeHandler} pattern="[0-9]{10}" required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='repairtype' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Repair Type:</label>
          <input type='text' id='repairtype' name='repairtype' value={appointment.repairtype} onChange={inputChangeHandler} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='issue' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Issue:</label>
          <input type='text' id='issue' name='issue' value={appointment.issue} onChange={inputChangeHandler} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='date' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Date:</label>
          <input type='date' id='date' name='date' value={appointment.date} onChange={inputChangeHandler} min={todayDate} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='description' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Description:</label>
          <textarea id='description' name='description' value={appointment.description} onChange={inputChangeHandler} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <button type='submit' style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', fontSize: '18px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Update</button>
      </form>
    </div>
  );
};

export default EditAppointment;
