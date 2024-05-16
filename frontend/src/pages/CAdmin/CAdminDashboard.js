import React from "react";
import AdminMenu from "../../components/CLayout/AdminMenu";
import Layout from "../../components/CLayout/Layout";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
 
  return (
    <div className="container-fluid m-3 p-3 dashboard">
    <div className="row">
      <div className="col-md-3">
       
      </div>
      <div className="col-md-9">
        <div className="card w-75 p-3">

        </div>
      </div>
    </div>
  </div>

  );
};

export default AdminDashboard;
