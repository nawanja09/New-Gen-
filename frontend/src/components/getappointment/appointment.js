import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Appointment = () => {
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

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/delete/${appointmentId}`);
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== appointmentId));
      toast.success("Appointment deleted successfully", { position: 'top-right' });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleDownloadPDF = () => {
    const input = document.getElementById('appointmentTable');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("appointment_report.pdf");
      });
  };

  const approveAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/approve/${appointmentId}`);
      const updatedAppointments = appointments.map(appointment =>
        appointment._id === appointmentId ? { ...appointment, status: "Approved" } : appointment
      );
      setAppointments(updatedAppointments);
      toast.success("Appointment approved successfully", { position: 'top-right' });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/reject/${appointmentId}`);
      const updatedAppointments = appointments.map(appointment =>
        appointment._id === appointmentId ? { ...appointment, status: "Rejected" } : appointment
      );
      setAppointments(updatedAppointments);
      toast.success("Appointment rejected successfully", { position: 'top-right' });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1450px', margin: '0 auto', padding: '5px', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Appointment List</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by ID or Name"
            style={{ padding: '8px', width: '70%', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={handleDownloadPDF}
            style={{ padding: '8px 16px', borderRadius: '4px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Download PDF
          </button>
        </div>
       

      <div style={{ background: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' ,fontSize:'10px'}}>
      <table id="appointmentTable" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
        <thead style={{ background: '#f2f2f2', borderRadius: '10px 10px 0 0' }}>
          <tr>
            <th style={{ padding: '15px' }}>A.No.</th>
            <th style={{ padding: '15px' }}>ID</th>
            <th style={{ padding: '15px' }}>User Name</th>
            <th style={{ padding: '15px' }}>Phone Number</th>
            <th style={{ padding: '15px' }}>Repair Type</th>
            <th style={{ padding: '15px' }}>Issue</th>
            <th style={{ padding: '15px' }}>Date</th>
            <th style={{ padding: '15px' }}>Status</th>
            <th style={{ padding: '15px' }} colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={appointment._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '15px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '15px' }}>{appointment.appointmentId}</td>
              <td style={{ padding: '15px' }}>{appointment.username}</td>
              <td style={{ padding: '15px' }}>{appointment.phone}</td>
              <td style={{ padding: '15px' }}>{appointment.repairtype}</td>
              <td style={{ padding: '15px' }}>{appointment.issue}</td>
              <td style={{ padding: '15px' }}>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
              <td style={{ padding: '15px' }}>{appointment.status}</td>
              <td style={{ padding: '15px' }}>
                <button
                  style={{ background: '#dc3545', color: '#fff', padding: '5px 5px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                  onClick={() => deleteAppointment(appointment._id)}
                >
                  Delete
                </button>
                <Link
                  to={`/appointmentedit/${appointment._id}`}
                  style={{ textDecoration: 'none', background: '#ffc107', color: '#000', padding: '5px 5px', borderRadius: '4px', marginRight: '5px' }}
                >
                  Edit
                </Link>
              </td>
              <td style={{ padding: '5px' }}>
                {appointment.status !== "Approved" && (
                  <button
                    style={{ background: '#28a745', color: '#fff', padding: '5px 5px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                    onClick={() => approveAppointment(appointment._id)}
                  >
                    Approve
                  </button>
                )}
                {appointment.status !== "Rejected" && (
                  <button
                    style={{ background: '#dc3545', color: '#fff', padding: '5px 5px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                    onClick={() => rejectAppointment(appointment._id)}
                  >
                    Reject
                  </button>
                )}
              </td>
              <td style={{ padding: '5px' }}>
                <Link
                  to={`/report/${appointment._id}`}
                  style={{ textDecoration: 'none', background: '#ffc107', color: '#000', padding: '5px 5px', borderRadius: '4px', marginRight: '5px' }}
                >
                  GReport
                </Link>
                <Link
                  to={`/viewReport/${appointment._id}`}
                  style={{ textDecoration: 'none', background: '#28a745', color: '#000', padding: '5px 5px', borderRadius: '4px', marginRight: '5px' }}
                >
                  View Report
                </Link>
              </td>
            </tr>
          
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>

  )
}

export default Appointment;
