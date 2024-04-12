import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import CustomSidebar from "./dashboard/Sidebar"; // Assuming CustomSidebar is located in the same directory as App.js

function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CustomSidebar />
      <Outlet />
    </div>
  );
}

export default App;
