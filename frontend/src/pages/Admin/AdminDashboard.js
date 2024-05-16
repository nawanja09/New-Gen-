import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Back";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {

  return (
   
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
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
