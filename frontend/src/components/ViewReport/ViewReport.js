import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const ViewReport = () => {
  const [appointment, setAppointment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/getone/${id}`);
        setAppointment(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleDownloadPDF = () => {
    const input = document.getElementById('repairTable');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("repair_report.pdf");
      });
  };

  return (
    <div>
      <button
        onClick={handleDownloadPDF}
        style={{ padding: '8px 16px', borderRadius: '4px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
      >
        Download PDF
      </button>
      <div id='repairTable' style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '32px' }}>Repair Report</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '18px', margin: '0 auto', border: '1px solid #ddd' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px', marginLeft: '50px' }}>Appointment ID:</td>
              <td style={{ padding: '5px', textAlign: 'left' }}>{appointment.appointmentId}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Customer Name:</td>
              <td style={{ padding: '5px', textAlign: 'left' }}>{appointment.username}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Phone Number:</td>
              <td style={{ padding: '5px', textAlign: 'left' }}>{appointment.phone}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Repair Type:</td>
              <td style={{ padding: '5px', textAlign: 'left' }}>{appointment.repairtype}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Issue:</td>
              <td style={{ padding: '5px', textAlign: 'left' }}>{appointment.issue}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Date:</td>
              <td style={{ padding: '5px', textAlign: 'left' }}>{new Date(appointment.dodate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Fixed Issues:</td>
              <td style={{ padding: '5px', textAlign: 'left' }}>{appointment.fixedIssues}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Repair Amount:</td>
              <td style={{ padding: '5px', textAlign: 'right', paddingRight: '20px' }}>{appointment.repairAmount}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Repair Parts Amount:</td>
              <td style={{ padding: '5px', textAlign: 'right', paddingRight: '20px' }}>{appointment.repairPartsAmount}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', textAlign: 'left', padding: '10px' }}>Total Amount:</td>
              <td style={{ padding: '5px', textAlign: 'right', paddingRight: '20px' }}>{parseFloat(appointment.repairAmount) + parseFloat(appointment.repairPartsAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewReport;
