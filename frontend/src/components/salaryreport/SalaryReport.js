import React, { useEffect, useState } from 'react';
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const SalaryReport = () => {
  const [employees, setEmployees] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees/getall");
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const calculateTotalPayment = () => {
    const total = employees.reduce((acc, curr) => acc + curr.totsalary, 0);
    setTotalPayment(total);
  };

  useEffect(() => {
    // Calculate total payment whenever employees data changes
    calculateTotalPayment();
  }, [employees]);

  const handleDownloadPDF = () => {
    const input = document.getElementById('salaryTable');

    html2canvas(input, { backgroundColor: '#ffffff' }) // Set backgroundColor to white
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("salary_report.pdf");
      });
  };

  return (
    <div>
      <button
        onClick={handleDownloadPDF}
        style={{ padding: '8px 16px', borderRadius: '4px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
        Download PDF
      </button>

      <div id="salaryTable" style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center', fontSize: '15px' }}>

        <h2 style={{ marginBottom: '20px', fontSize: '32px' }}>Salary Report</h2>
        <br />

        <label htmlFor='month' style={{ marginRight: '10px' }}>Month:</label>
        <input type="month" id="month" value={month.toISOString().slice(0, 7)} onChange={(e) => setMonth(new Date(e.target.value))} />
        <br /><br />

        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto', border: '1px solid #ddd' }}>
          <thead style={{ background: '#f2f2f2', borderRadius: '10px 10px 0 0' }}>
            <tr>
              <th style={{ padding: '10px' }}>Employee ID</th>
              <th style={{ padding: '10px' }}>Employee Name</th>
              <th style={{ padding: '10px' }}>Phone Number</th>
              <th style={{ padding: '10px' }}>Job Role</th>
              <th style={{ padding: '10px' }}>Basic Salary(LKR)</th>
              <th style={{ padding: '10px' }}>Bonus(LKR)</th>
              <th style={{ padding: '10px' }}>Total Salary(LKR)</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id}>
                <td style={{ padding: '10px' }}>{employee.employeeId}</td>
                <td style={{ padding: '10px' }}>{employee.employeename}</td>
                <td style={{ padding: '10px' }}>{employee.phone}</td>
                <td style={{ padding: '10px' }}>{employee.jobrole}</td>
                <td style={{ padding: '10px' }}>{employee.basicsalary}</td>
                <td style={{ padding: '10px' }}>{employee.bonus}</td>
                <td style={{ padding: '10px' }}>{employee.totsalary}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="6" style={{ fontWeight: 'bold', textAlign: 'right', padding: '10px' }}>Total Payment(LKR):</td>
              <td style={{ fontWeight: 'bold', padding: '10px' }}>{totalPayment}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryReport;
