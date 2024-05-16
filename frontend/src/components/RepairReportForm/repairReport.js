import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const RepairReport = () => {
  const [appointment, setAppointment] = useState({
    appointmentId: "",
    username: "",
    phone: "",
    repairtype: "",
    issue: "",
    date: "",
    description: "",
    dodate: "",
    fixedIssues: "",
    repairAmount: "",
    repairPartsAmount: "",
    totalAmount: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    // Convert date format if the input is date
    const newValue = name === 'dodate' ? new Date(value).toISOString().split('T')[0] : value;


    // Prevent selecting future dates for the "Report Generated Date" field and restrict to today's date
    if (name === 'dodate') {
      const today = new Date().toISOString().split('T')[0];
      if (value !== today) {
        toast.error("Only today's date is allowed", { position: "top-right" });
        return;
      }
    }

    setAppointment({ ...appointment, [name]: newValue });
  };

  const validatePhoneNumber = (phone) => {
    // Regular expression to match a valid phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

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
    if (!validatePhoneNumber(appointment.phone)) {
      toast.error("Invalid phone number format", { position: "top-right" });
      return false;
    }
    if (!appointment.fixedIssues) {
      toast.error("Issue is required", { position: "top-right" });
      return false;
    }
    if (!appointment.date) {
      toast.error("Appointment Date is required", { position: "top-right" });
      return false;
    }
    if (!appointment.description) {
      toast.error("Description is required", { position: "top-right" });
      return false;
    }
    if (!appointment.dodate) {
      toast.error("Report Generated Date is required", { position: "top-right" });
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

  // Function to calculate total amount
  const calculateTotalAmount = () => {
    const repair = parseFloat(appointment.repairAmount);
    const parts = parseFloat(appointment.repairPartsAmount);
    const total = repair + parts;
    setAppointment({ ...appointment, totalAmount: total.toFixed(2) });
  };

  // Update total amount whenever repair amount or repair parts amount changes
  useEffect(() => {
    calculateTotalAmount();
  }, [appointment.repairAmount, appointment.repairPartsAmount]);

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
          <input type='text' id='username' name='username' value={appointment.username} onChange={inputChangeHandler} disabled style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='phone' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Phone Number:</label>
          <input type='tel' id='phone' name='phone' value={appointment.phone} onChange={inputChangeHandler} pattern="[0-9]{10}" disabled style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='repairtype' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Repair Type:</label>
          <input type='text' id='repairtype' name='repairtype' value={appointment.repairtype} onChange={inputChangeHandler} disabled style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='issue' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Issue:</label>
          <input type='text' id='issue' name='issue' value={appointment.issue} onChange={inputChangeHandler} disabled style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='description' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Description:</label>
          <textarea id='description' name='description' value={appointment.description} onChange={inputChangeHandler} disabled style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='date' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Appointment Date:</label>
          <input type='date' id='date' name='date' value={appointment.date ? appointment.date.split('T')[0] : ''} onChange={inputChangeHandler}disabled style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='dodate' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Report Generated Date:</label>
          <input type='date' id='dodate' name='dodate' value={appointment.dodate ? appointment.dodate.split('T')[0] : ''} onChange={inputChangeHandler} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='fixedIssues' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Fixed Issues:</label>
          <textarea id='fixedIssues' name='fixedIssues' value={appointment.fixedIssues} onChange={inputChangeHandler} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='repairAmount' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Repair Amount:</label>
          <input type='number' id='repairAmount' name='repairAmount' value={appointment.repairAmount} onChange={inputChangeHandler} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='repairPartsAmount' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Repair Parts Amount:</label>
          <input type='number' id='repairPartsAmount' name='repairPartsAmount' value={appointment.repairPartsAmount} onChange={inputChangeHandler} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor='totalAmount' style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Total Amount:</label>
          <input type='text' id='totalAmount' name='totalAmount' value={appointment.totalAmount} onChange={inputChangeHandler} disabled style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <button type='submit' style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', fontSize: '18px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Update</button>
      </form>
    </div>
  );
};

export default RepairReport;