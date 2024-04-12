import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyEmployeeLeave from './pages/ApplyLeaves';
import EmployeeLeaves from './pages/Leaves';
import Notifications from './pages/Notifications';
import ApplyEmployee from './pages/ApplyEmployee';
import EmployeeList from './pages/Admin/EmployeeList';
import Profile from './pages/Employee/Profile';
import BookAppointment from './pages/BookAppointments';

function App() {
  const { loading } = useSelector(state => state.alerts);
  
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/apply-leave' element={<ProtectedRoute><ApplyEmployeeLeave /></ProtectedRoute>} />
        <Route path='/leaves' element={<ProtectedRoute><EmployeeLeaves /></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path='/apply-employee' element={<ProtectedRoute><ApplyEmployee /></ProtectedRoute>} />
        <Route path='/admin/employeelist' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path='/employee/profile/:userId' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/book-appointment/:employeeID' element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
