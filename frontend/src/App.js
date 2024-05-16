import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./App.css";
import Forgot from "./pages/auth/Forgot";
import Login from "./pages/auth/Login";
import LoginWithCode from "./pages/auth/LoginWithCode";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Verify from "./pages/auth/Verify";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import UserList from "./pages/userList/UserList";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/FinDashoard/Dashboard";
import Appointment from "./components/getappointment/appointment";
import PlaceAppointment from "./components/placeappointment/placeAppointment";
import EditAppointment from "./components/updateappointment/EditAppointment";
import ViewAppointment from "./components/getappointment/viewAppointment";
import Order from "./components/getOrder/Order";
import PlaceOrder from "./components/placeorder/PlaceOrder";
import EditOrder from "./components/updateorder/EditOrder";
import RepairReportForm from "./components/RepairReportForm/repairReport";
import ViewReport from "./components/ViewReport/ViewReport";
// import Addproduct from "./pages/addProduct/AddProduct";
// import ProductDetail from "./components/product/productDetail/ProductDetail";
// import EditProduct from "./pages/editProduct/EditProduct";
// import ViewProducts from "./pages/viewProducts/viewProducts";
// import Contact from "./pages/contact/Contact";
import Employee from "./components/getemployee/Employee";
import Leaves from "./components/getleaves/Leaves";
import EmplyeeAdd from "./components/placeemployee/PlaceEmployee";
import EmplyeeEdit from "./components/updateemployee/EditEmployee";
import SalAsign from "./components/salaryassign/SalaryAssign";
import SalReport from "./components/salaryreport/SalaryReport";
import AppLeave from "./components/applyleave/ApplyLeaves";
import Leave from "./components/getleaves/leaveRequest";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import ProductDetails from "./pages/ProductDetails";
import HomePage from "./pages/HomePage";
import UpdateProduct from "./pages/Admin/UpdateProduct";

import Feedback from './pages/Feedback'
import FeedbackList from './pages/FeedbackList'

import CHomePage from "./pages/CHomePage";
import CCreateCategory from "./pages/CAdmin/CCreateCategory";
import CCreateProduct from "./pages/CAdmin/CCreateProduct";
import CProducts from "./pages/CAdmin/CProducts";
import CProductDetails from "./pages/CProductDetails";
import CUpdateProduct from "./pages/CAdmin/CUpdateProduct";
import MAccessories from "./components/Accessories/ManageAccessories";
import AdAccessories from "./components/Accessories/UploadAccessories";
import EdAccessories from "./components/Accessories/EditAccessories";
import ContactSup from "./components/Accessories/Contact"
import Salary from "./components/salary";


axios.defaults.withCredentials = true;
document.cookie =
  "__Host-cookieName=cookieValue; SameSite=None; Secure; path=/; domain=.yourdomain.com";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetPassword/:resetToken" element={<Reset />} />
            <Route path="/loginWithCode/:email" element={<LoginWithCode />} />

            <Route
              path="/verify/:verificationToken"
              element={
                <Layout>
                  <Verify />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/changePassword"
              element={
                <Layout>
                  <ChangePassword />
                </Layout>
              }
            />
            <Route
              path="/users"
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/appointment"
              element={
                <Layout>
                  <Appointment />
                </Layout>
              }
            />
            <Route
              path="/viewappointment"
              element={
                <Layout>
                  <ViewAppointment />
                </Layout>
              }
            />
            <Route
              path="/appointmentadd"
              element={
                <Layout>
                  <PlaceAppointment />
                </Layout>
              }
            />
            <Route
              path="/report/:id"
              element={
                <Layout>
                  <RepairReportForm />
                </Layout>
              }
            />
            <Route
              path="/viewReport/:id"
              element={
                <Layout>
                  <ViewReport />
                </Layout>
              }
            />
            <Route
              path="/appointmentedit/:id"
              element={
                <Layout>
                  <EditAppointment />
                </Layout>
              }
            />
            <Route
              path="/supplier"
              element={
                <Layout>
                  <Order />
                </Layout>
              }
            />
            <Route
              path="/add"
              element={
                <Layout>
                  <PlaceOrder />
                </Layout>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <Layout>
                  <EditOrder />
                </Layout>
              }
            />

            {/* <Route
              path="/add-product"
              element={
                <Layout>
                  <Addproduct />
                </Layout>
              }
              
            />


            <Route
              path="/product-detail/:id"
              element={
                <Layout>
                  <ProductDetail />
                </Layout>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <Layout>
                  <EditProduct />
                </Layout>
              }
            />
            <Route
              path="/viewProducts"
              element={
                <Layout>
                  <ViewProducts />
                </Layout>
              }
            />

            <Route
              path="/contact-us"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            /> */}

            <Route
              path="/contact-us"
              element={
                <Layout>
                  <ContactSup />
                </Layout>
              }
            />

            <Route
              path="/employee"
              element={
                <Layout>
                  <Employee />
                </Layout>
              }
            />
            <Route
              path="/leaves"
              element={
                <Layout>
                  <Leaves />
                </Layout>
              }
            />
            <Route
              path="/employeeadd"
              element={
                <Layout>
                  <EmplyeeAdd />
                </Layout>
              }
            />
            <Route
              path="/employeeedit/:id"
              element={
                <Layout>
                  <EmplyeeEdit />
                </Layout>
              }
            />

            <Route
              path="/salassign/:id"
              element={
                <Layout>
                  <SalAsign />
                </Layout>
              }
            />
            <Route
              path="/salreport"
              element={
                <Layout>
                  <SalReport />
                </Layout>
              }
            />
            <Route

              path="/salary"
              element={
                <Layout>
                  <Salary />
                </Layout>
              }
            />
            <Route
              path="/employ"
              element={
                <Layout>
                  <AppLeave />
                </Layout>
              }
            />
            <Route
              path="/leave"
              element={
                <Layout>
                  <Leave />
                </Layout>
              }
            />
            <Route
              path="/viewProducts"
              element={
                <Layout>
                  <MAccessories />
                </Layout>
              }
            />
            <Route
              path="/add-product"
              element={
                <Layout>
                  <AdAccessories />
                </Layout>
              }
            />

            <Route
              path="/edit-accessories/:id"
              element={
                <Layout>
                  <EdAccessories />
                </Layout>
              }
            />
            <Route path="/admin/create-category" element={<CreateCategory />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/create-product" element={<CreateProduct />} />
            <Route path="/admin/product/:slug" element={<UpdateProduct />} />
            <Route path="/product/:slug" element={<ProductDetails />} />

            <Route path="/ChomePage" element={<CHomePage />} />
            <Route path="admin/Ccreate-category" element={<CCreateCategory />} />
            <Route path="/admin/Cproducts" element={<CProducts />} />
            <Route path="/admin/Ccreate-product" element={<CCreateProduct />} />
            <Route path="/admin/Cproduct/:slug" element={<CUpdateProduct />} />
            <Route path="/Cproduct/:slug" element={<CProductDetails />} />


            <Route path="/feedback" element={<Feedback />} />
            <Route path="/feedbackList" element={<FeedbackList />} />


          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("Lab-Management-User")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
export default App;
