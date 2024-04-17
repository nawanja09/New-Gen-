import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { Sidebar } from "flowbite-react";
import ManageAccessories from "./ManageAccessories";


// NavigationBar component
const NavigationBar = () => {
  return (
    <nav className="bg-white p-4 text-black">
      {/* Navigation items */}
      <ul className="flex justify-between">
        <li>
          <nav />
        </li>
      </ul>
    </nav>
  );
};

// Dashboard component
const Dashboard = () => {
  // Sample data
  const stockLevel = 100;
  const outOfStockCount = 20;
  const categoryCount = 3;
  const stockValue = "$100";

  

  // Sample sales data for 12 months
  const salesData = [
    500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600,
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [topItemsData, setTopItemsData] = useState(null);

  const fetchTopItemsData = () => {
    // Fetch or generate data for top 10 items based on values
    // For now, let's assume we have the data
    const topItems = [
      { name: "Laptop", value: 1500 },
      { name: "Desktop", value: 1200 },
      { name: "Monitor", value: 800 },
      { name: "Keyboard", value: 500 },
      { name: "Mouse", value: 400 },
      { name: "Printer", value: 300 },
      { name: "Router", value: 200 },
      { name: "Speaker", value: 100 },
      { name: "Webcam", value: 50 },
      { name: "Headset", value: 30 },
    ];
    setTopItemsData(topItems);
  };

  useEffect(() => {
    fetchTopItemsData();
  }, []);

  useEffect(() => {
    if (topItemsData) {
      const labels = topItemsData.map((item) => item.name);
      const values = topItemsData.map((item) => item.value);

      const chartConfig = {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Top Items",
              data: values,
              fill: false,
              borderColor: "#3e95cd",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const topItemsLineChartRef = document.getElementById("topItemsLineChart");
      if (topItemsLineChartRef) {
        new Chart(topItemsLineChartRef, chartConfig);
      }
    }
  }, [topItemsData]);

  // Sample items with their values
  const items = [
    { name: "Laptop", value: 1500 },
    { name: "Desktop", value: 1200 },
    { name: "Monitor", value: 800 },
    { name: "Keyboard", value: 500 },
    { name: "Mouse", value: 400 },
    { name: "Printer", value: 300 },
    { name: "Router", value: 200 },
    { name: "Speaker", value: 100 },
    { name: "Webcam", value: 50 },
    { name: "Headset", value: 30 },
    { name: "Software", value: 20 },
    { name: "Accessories", value: 10 },
  ];

  // Sort items by value in descending order
  const sortedItems = items.sort((a, b) => b.value - a.value).slice(0, 10);

  // Refs for the canvas elements to render the charts
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const pieChartBoxRef = useRef(null);
  const categoryPieChartRef = useRef(null); // Ref for the new category pie chart

  // Categories
  const categories = {
    "Computer Accessories": 10,
    "Laptop Accessories": 5,
    "CCTV Accessories": 7,
  };

  // Create pie chart data for categories
  const categoryData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Category",
        data: Object.values(categories),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart.js configuration for category pie chart
  const categoryPieChartConfig = {
    type: "pie",
    data: categoryData,
  };

  useEffect(() => {
    // Create the category pie chart
    if (categoryPieChartRef.current) {
      const categoryPieChart = new Chart(
        categoryPieChartRef.current,
        categoryPieChartConfig
      );
      return () => {
        categoryPieChart.destroy(); // Destroy the category pie chart instance when component unmounts
      };
    }
  }, [categoryPieChartConfig]);

  useEffect(() => {
    // Chart.js configuration for bar chart
    const chartConfig = {
      type: "bar",
      data: {
        labels: months, // Use months as labels
        datasets: [
          {
            label: "Sales",
            data: salesData,
            backgroundColor: "#4CAF50", // Custom bar color
            borderColor: "transparent", // Remove border
            borderWidth: 0, // Set border width to 0
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Create the chart
    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, chartConfig);
      return () => {
        myChart.destroy(); // Destroy the chart instance when component unmounts
      };
    }
  }, []);

  // Pie chart configuration
  const pieChartConfig = {
    type: "pie",
    data: {
      labels: ["In Stock", "Out of Stock"],
      datasets: [
        {
          label: "Stock Status",
          data: [stockLevel, outOfStockCount],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
  };

  // Create the pie chart
  useEffect(() => {
    if (pieChartRef.current && pieChartBoxRef.current) {
      const pieChart = new Chart(pieChartRef.current, pieChartConfig);
      const chartCanvas = chartRef.current;
      const chartBounds = chartCanvas.getBoundingClientRect();
      const boxSize = Math.min(chartBounds.width, chartBounds.height);
      pieChartBoxRef.current.style.width = `${boxSize}px`;
      pieChartBoxRef.current.style.height = `${boxSize}px`;
      return () => {
        pieChart.destroy(); // Destroy the pie chart instance when component unmounts
      };
    }
  }, [pieChartConfig]);

  
  return (
    <div className="py-10 my-12">
      {/* Include the NavigationBar component */}
      <NavigationBar />
      {/* Dashboard content */}

      <div className="flex flex-col space-y-4">
        {/* Row 1 */}
        <div className="flex flex-row space-x-4">
          {/* Stock Level */}
          <div
            className="bg-green-500 p-4 rounded shadow flex-grow flex flex-col justify-center items-center"
            style={{ minWidth: "270px", maxWidth: "400px" }}
          >
            <h2 className="text-lg font-semibold text-white">Stock Level</h2>
            <p className="text-3xl text-white">{stockLevel}</p>
          </div>

          {/* Out of Stock */}
          <div
            className="bg-red-500 p-4 rounded shadow flex-grow flex flex-col justify-center items-center"
            style={{ minWidth: "270px", maxWidth: "400px" }}
          >
            <h2 className="text-lg font-semibold text-white">Out of Stock</h2>
            <p className="text-3xl text-white">{outOfStockCount}</p>
          </div>

          {/* Categories */}
          <div
            className="bg-orange-500 p-4 rounded shadow flex-grow flex flex-col justify-center items-center"
            style={{ minWidth: "270px", maxWidth: "400px" }}
          >
            <h2 className="text-lg font-semibold text-white">Categories</h2>
            <p className="text-3xl text-white">{categoryCount}</p>
          </div>

          {/* Stock Value */}
          <div
            className="bg-blue-500 p-4 rounded shadow flex-grow flex flex-col justify-center items-center"
            style={{ minWidth: "270px", maxWidth: "400px" }}
          >
            <h2 className="text-lg font-semibold text-white">Stock Value</h2>
            <p className="text-3xl text-white">{stockValue}</p>
          </div>
        </div>

        {/* Row 2: Bar Chart and Top Ten Items */}
        <div className="flex flex-row space-x-4">
          {/* Bar Chart */}
          <div
            className="bg-white p-4 rounded shadow flex-grow"
            style={{ minWidth: "300px", maxWidth: "800px" }}
          >
            <canvas ref={chartRef}></canvas>
          </div>

          {/* Top Ten Items */}
          <div
            className="bg-gray-50 p-4 rounded shadow flex-grow"
            style={{ minWidth: "300px", maxWidth: "400px" }}
          >
            <h2 className="text-lg font-semibold">
              Top 10 Items Based On values
            </h2>
            <ul className="mt-2">
              {" "}
              {/* Added margin top */}
              {sortedItems.map((item, index) => (
                <li key={index} className="mb-4">
                  {" "}
                  {/* Increased margin bottom */}
                  {index + 1}. {item.name} - ${item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Two Pie Charts */}
        <div className="flex justify-center items-center space-x-5">
          {/* First Pie Chart */}
          <div
            className="flex justify-center items-center"
            style={{ width: "350px", height: "350px" }}
          >
            <div
              ref={pieChartBoxRef}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <canvas
                ref={pieChartRef}
                style={{ width: "100%", height: "100%" }}
              ></canvas>
            </div>
          </div>

          {/* Second Pie Chart */}
          <div
            className="flex justify-center items-center"
            style={{ width: "500px", height: "500px" }}
          >
            <div
              ref={pieChartBoxRef}
              style={{
                width: "250%",
                height: "100%",
                position: "relative",
              }}
            >
              <canvas
                ref={categoryPieChartRef}
                style={{ width: "100%", height: "100%" }}
              ></canvas>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-4">
            <div
              className="bg-gray-50 p-4 rounded shadow flex-grow"
              style={{ height: "40vh", width: "40vw" }}
            >
              <h2 className="text-lg font-semibold">
                Top 10 Items Based On Values
              </h2>
              <canvas
                id="topItemsLineChart"
                style={{ height: "100%", width: "100%" }}
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
