import React, { useState } from 'react';
import axios from 'axios';

const ReportGenerator = () => {
    const [reportPath, setReportPath] = useState('');

    const handleGenerateReport = async () => {
        try {
            const response = await axios.post('/api/generate-report');
            setReportPath(response.data.reportPath);
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    return (
        <div>
            <h1>Report Generator</h1>
            <button onClick={handleGenerateReport}>Generate Report</button>
            {reportPath && (
                <div>
                    <h2>Download Report</h2>
                    <a href={`http://localhost:5000${reportPath}`} download>Download Report</a>
                </div>
            )}
        </div>
    );
};

export default ReportGenerator;
