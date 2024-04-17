import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import CustomSidebar from "./dashboard/Sidebar";
import Dashboard from "./dashboard/Dashboard"; // Import the Dashboard component
import ManageAccessories from "./dashboard/ManageAccessories";

function App() {
  const [fullStockLevel, setFullStockLevel] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState(0);
  const [fullTotalValue, setFullTotalValue] = useState(0);

  return (
    <div className="App">
      <CustomSidebar />
      <Outlet />
      <Dashboard
        fullStockLevel={fullStockLevel}
        outOfStockItems={outOfStockItems}
        fullTotalValue={fullTotalValue}
      />
      {/* Pass the state variables as props to ManageAccessories component */}
      <ManageAccessories
        setFullStockLevel={setFullStockLevel}
        setOutOfStockItems={setOutOfStockItems}
        setFullTotalValue={setFullTotalValue}
      />
    </div>
  );
}

export default App;
