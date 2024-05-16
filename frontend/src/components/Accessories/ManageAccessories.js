import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ManageAccessories = () => {
  const [allAccessories, setAllAccessories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [fullStockLevel, setFullStockLevel] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState(0);
  const [fullTotalValue, setFullTotalValue] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/accessories/getAllAccessories")
      .then((res) => res.json())
      .then((data) => setAllAccessories(data))
      .catch((error) => console.error("Error fetching accessories:", error));
  }, []);

  useEffect(() => {
    const filtered = allAccessories.filter((accessory) => {
      const nameMatch = accessory.AccessoriesName.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const dateMatch =
        (!startDate || accessory.updatedAt >= startDate) &&
        (!endDate || accessory.updatedAt <= endDate);
      return nameMatch && dateMatch;
    });
    setFilteredAccessories(filtered);
    // Calculate full stock level, out of stock items, and full total value
    let totalQuantity = 0;
    let totalValue = 0;
    let outOfStockCount = 0;
    filtered.forEach((accessory) => {
      totalQuantity += parseInt(accessory.Quantity);
      totalValue +=
        parseInt(accessory.Quantity) * parseFloat(accessory.Price_per_unit);
      if (parseInt(accessory.Quantity) === 0) {
        outOfStockCount++;
      }
    });
    setFullStockLevel(totalQuantity);
    setOutOfStockItems(outOfStockCount);
    setFullTotalValue(totalValue);
  }, [allAccessories, searchTerm, startDate, endDate]);

  const handleDateChange = (type, date) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/accessories/deleteAccessory${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Accessory Deleted Successfully!");
        setAllAccessories(
          allAccessories.filter((accessory) => accessory._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting accessory:", error));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Accessories Report", 10, 10);
    const tableData = filteredAccessories.map((accessory, index) => [
      index + 1,
      accessory.AccessoriesID,
      accessory.AccessoriesName,
      accessory.updatedAt,
      accessory.Quantity,
      accessory.Quantity * accessory.Price_per_unit,
    ]);
    doc.autoTable({
      head: [
        [
          "No",
          "Accessories ID",
          "Accessories Name",
          "Date",
          "Quantity",
          "Stock Value",
        ],
      ],
      body: tableData,
    });
    doc.save("accessories_report.pdf");
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 300px",
        }}
      >
        Manage Accessories
      </h1>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #D1D5DB",
              borderRadius: "0.375rem",
            }}
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange("start", e.target.value)}
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #D1D5DB",
              borderRadius: "0.375rem",
            }}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange("end", e.target.value)}
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #D1D5DB",
              borderRadius: "0.375rem",
            }}
          />
        </div>
        <button
          onClick={generatePDF}
          style={{
            backgroundColor: "#3B82F6",
            color: "#FFFFFF",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}
      >
        <div
          className="card"
          style={{
            backgroundColor: "#6EE7B7", // Light green background color
            color: "white",
            padding: "20px",
            textAlign: "center",
            width: "300px",
            minWidth: "150px",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Full Stock Level
          </h2>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {fullStockLevel}
          </p>
        </div>
        <div
          className="card"
          style={{
            backgroundColor: "#6EE7B7", // Light green background color
            color: "white",
            padding: "20px",
            textAlign: "center",
            width: "300px",
            minWidth: "150px",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Out of Stock Items
          </h2>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {outOfStockItems}
          </p>
        </div>
        <div
          className="card"
          style={{
            backgroundColor: "#6EE7B7", // Light green background color
            color: "white",
            padding: "20px",
            textAlign: "center",
            width: "300px",
            minWidth: "150px",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Full Total Value
          </h2>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {fullTotalValue}
          </p>
        </div>
      </div>

      <table style={{ width: "100%", backgroundColor: "#f9f9f9" }}>
        <thead
          style={{
            backgroundColor: "#E5E7EB",
            borderBottom: "1px solid #9CA3AF",
          }}
        >
          <tr>
            <th style={{ padding: "0.75rem 1rem" }}>No</th>
            <th style={{ padding: "0.75rem 1rem" }}>Accessories ID</th>
            <th style={{ padding: "0.75rem 1rem" }}>Accessories Name</th>
            <th style={{ padding: "0.75rem 1rem" }}>Quantity</th>
            <th style={{ padding: "0.75rem 1rem" }}>Price Per Unit</th>
            <th style={{ padding: "0.75rem 1rem" }}>Description</th>
            <th style={{ padding: "0.75rem 1rem" }}>Last Updated</th>
            <th style={{ padding: "0.75rem 1rem" }}>Total Value</th>
            <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAccessories.map((accessory, index) => (
            <tr
              key={accessory._id}
              style={{
                backgroundColor: "#FFFFFF",
                borderBottom: "1px solid #9CA3AF",
                padding: "0.75rem 1rem",
              }}
            >
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td style={{ textAlign: "center" }}>{accessory.AccessoriesID}</td>
              <td style={{ textAlign: "center" }}>
                {accessory.AccessoriesName}
              </td>
              <td style={{ textAlign: "center" }}>{accessory.Quantity}</td>
              <td style={{ textAlign: "center" }}>
                {accessory.Price_per_unit}
              </td>
              <td style={{ textAlign: "center" }}>{accessory.Description}</td>
              <td style={{ textAlign: "center" }}>
                {new Date(accessory.updatedAt).toLocaleDateString()}
              </td>
              <td style={{ textAlign: "center" }}>
                {accessory.Quantity * accessory.Price_per_unit}
              </td>
              <td style={{ textAlign: "right" }}>
                <Link
                  to={`/edit-accessories/${accessory._id}`}
                  style={{
                    color: "#3B82F6",
                    textDecoration: "none",
                    marginRight: "1rem",
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(accessory._id)}
                  style={{
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                    padding: "0.25rem 1rem",
                    fontWeight: "600",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAccessories;