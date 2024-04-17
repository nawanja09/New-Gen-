import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

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
    fetchAccessories();
  }, []);

  useEffect(() => {
    const filtered = allAccessories.filter((accessory) => {
      const nameMatch =
        accessory.AccessoriesName &&
        accessory.AccessoriesName.toLowerCase().includes(
          searchTerm.toLowerCase()
        );
      const dateMatch =
        (!startDate || new Date(accessory.updatedAt) >= new Date(startDate)) &&
        (!endDate || new Date(accessory.updatedAt) <= new Date(endDate));
      return nameMatch && dateMatch;
    });
    setFilteredAccessories(filtered);
    calculateInventoryValues(filtered);
  }, [allAccessories, searchTerm, startDate, endDate]);

  const fetchAccessories = () => {
    axios
      .get("http://localhost:8000/all-accessories")
      .then((response) => {
        setAllAccessories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accessories:", error);
      });
  };

  const calculateInventoryValues = (filtered) => {
    let totalQuantity = 0;
    let totalValue = 0;
    let outOfStockCount = 0;
    filtered.forEach((accessory) => {
      totalQuantity += parseInt(accessory.Quantity || 0);
      totalValue +=
        parseInt(accessory.Quantity || 0) *
          parseFloat(accessory.Price_per_unit || 0) || 0;
      if (parseInt(accessory.Quantity || 0) === 0) {
        outOfStockCount++;
      }
    });
    setFullStockLevel(totalQuantity);
    setOutOfStockItems(outOfStockCount);
    setFullTotalValue(totalValue);
  };

  const handleDateChange = (type, date) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/accessories/${id}`)
      .then(() => {
        alert("Accessory Deleted Successfully!");
        setAllAccessories(
          allAccessories.filter((accessory) => accessory._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting accessory:", error);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Accessories Report", 10, 10);
    const tableData = filteredAccessories.map((accessory, index) => [
      index + 1,
      accessory.AccessoriesID || "",
      accessory.AccessoriesName || "",
      accessory.updatedAt || "",
      accessory.Quantity || "",
      accessory.Quantity && accessory.Price_per_unit
        ? accessory.Quantity * accessory.Price_per_unit
        : "",
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
    <div className="py-10 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Accessories</h2>

      <div className="flex flex-wrap justify-between mb-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange("start", e.target.value)}
            className="ml-2 px-4 py-2 border border-gray-300 rounded-md"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange("end", e.target.value)}
            className="ml-2 px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>

      <div>
        <p>Full Stock Level: {fullStockLevel}</p>
        <p>Out of Stock Items: {outOfStockItems}</p>
        <p>Full Total Value: {fullTotalValue}</p>
      </div>

      <table className="lg:w-[1180px]">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Accessories ID</th>
            <th className="px-4 py-2">Accessories Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price Per Unit</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Last Updated</th>
            <th className="px-4 py-2">Total Value</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccessories.map((accessory, index) => (
            <tr
              className="bg-white dark:border-gray-700 dark:bg-gray-800 px-4 py-2"
              key={accessory._id}
            >
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{accessory.AccessoriesID}</td>
              <td className="text-center">{accessory.AccessoriesName}</td>
              <td className="text-center">{accessory.Quantity}</td>
              <td className="text-center">{accessory.Price_per_unit}</td>
              <td className="text-center">{accessory.Description}</td>
              <td className="text-center">
                {accessory.updatedAt
                  ? new Date(accessory.updatedAt).toLocaleDateString()
                  : ""}
              </td>
              <td className="text-center">
                {accessory.Quantity && accessory.Price_per_unit
                  ? accessory.Quantity * accessory.Price_per_unit
                  : ""}
              </td>
              <td className="text-right">
                <Link
                  to={`/admin/dashboard/edit-accessories/${accessory._id}`}
                  className="text-cyan-600 hover:underline dark:text-cyan-500 mr-6"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(accessory._id)}
                  className="bg-red-600 text-white px-4 py-1 font-semibold rounded-sm hover:bg-sky-600"
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
