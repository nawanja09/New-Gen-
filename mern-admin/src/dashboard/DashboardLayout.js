import React from "react";
import { Outlet } from "react-router-dom";
import CustomSidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const DashboardLayout = () => {
  return (
    <div className="flex gap-10 flex-col md:flex-row">
      <CustomSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
