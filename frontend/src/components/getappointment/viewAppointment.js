import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments/getall");
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredAppointments = appointments.filter(appointment =>
    appointment.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Appointment List</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by ID or Name"
            style={{ padding: '8px', width: '70%', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            value={searchTerm}
            onChange={handleSearch}
          />
          <Link
            to={"/appointmentadd"}
            style={{ textDecoration: 'none', background: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '4px', marginTop: '20px', textAlign: 'center', display: 'inline-block' }}
          >
            Add Appointment
          </Link>
        </div>
      </div>
      <table id="appointmentTable" border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <thead style={{ background: '#f2f2f2', borderRadius: '8px 8px 0 0' }}>
          <tr>
            <th style={{ padding: '10px' }}>A.No.</th>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>User Name</th>
            <th style={{ padding: '10px' }}>Phone Number</th>
            <th style={{ padding: '10px' }}>Repair Type</th>
            <th style={{ padding: '10px' }}>Issue</th>
            <th style={{ padding: '10px' }}>Date</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px' }}>{appointment.appointmentId}</td>
              <td style={{ padding: '10px' }}>{appointment.username}</td>
              <td style={{ padding: '10px' }}>{appointment.phone}</td>
              <td style={{ padding: '10px' }}>{appointment.repairtype}</td>
              <td style={{ padding: '10px' }}>{appointment.issue}</td>
              <td style={{ padding: '10px' }}>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
              <td style={{ padding: '10px' }}>{appointment.status}</td>
              <td style={{ padding: '5px', textAlign: 'center' }}>
                <Link
                  to={`/viewReport/${appointment._id}`}
                  style={{ textDecoration: 'none', background: '#ffc107', color: '#000', padding: '8px 12px', borderRadius: '4px', marginRight: '5px', marginBottom: '5px' }}
                >
                  View Report
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewAppointment;
