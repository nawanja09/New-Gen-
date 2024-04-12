import React, { useState, useEffect } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Define styles for the PDF report
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
});

const Reports = () => {
  const [items, setItems] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchItems();
  }, [startDate, endDate]);

  const fetchItems = async () => {
    try {
      let url = "/api/items";
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Define the PDF report component
  const PdfReport = () => (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.header}>Reports</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.cell}>Date</Text>
            <Text style={pdfStyles.cell}>Category</Text>
            <Text style={pdfStyles.cell}>Quantity</Text>
          </View>
          {items.map((item) => (
            <View style={pdfStyles.row} key={item._id}>
              <Text style={pdfStyles.cell}>{item.date}</Text>
              <Text style={pdfStyles.cell}>{item.category}</Text>
              <Text style={pdfStyles.cell}>{item.quantity}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
        />
        {/* PDFDownloadLink component to trigger download of the PDF report */}
        <PDFDownloadLink document={<PdfReport />} fileName="report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF Report"
          }
        </PDFDownloadLink>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
