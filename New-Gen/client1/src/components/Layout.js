import React, { useState } from 'react'
import '../layout.css'
import {Menu,Badge} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Layout({ children }) {

    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const location = useLocation()
    const usermenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-4-fill",
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "ri-list-check",
        },
        {
            name: "Apply Employee",
            path: "/apply-employee",
            icon: "ri-layout-left-fill",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "ri-user-fill",
        },

    ];
			
    const employeemenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-4-fill",
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "ri-list-check",
        },
        {
            name: "Leaves",
            path: "/leaves",
            icon: "ri-list-check",
        },
        {
            name: "Apply Leave",
            path: "/apply-leave",
            icon: "ri-layout-left-fill",
        },
        {
            name: "Profile",
            path: `/employee/profile/${user?._id}`,
            icon: "ri-user-fill",
        },

    ];

    const Adminmenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-4-fill",
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "ri-list-check",
        },
      
        {
            name: "Employees",
            path: "/admin/employeelist",
            icon: "ri-user-star-fill",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "ri-user-fill",
        },

    ];
  
    const menuToBeRendered = user?.isAdmin ? Adminmenu :user?.isEmployee ? employeemenu : usermenu;
    const role = user?.isAdmin ? "Admin":user?.isEmployee ? "Employee":"User";
    return (
        <div className="main">

            <div className="d-flex layout">
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        <h1 className='logo'>New Gen</h1>
                        <h1 className='role'>{role}</h1>
                    </div>

                    <div className='menu'>
                        {menuToBeRendered.map((Menu) => {
                            const isActive = location.pathname === Menu.path;
                            return (
                                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>

                                    <i className={Menu.icon}></i>
                                    {!collapsed && <Link to={Menu.path}>{Menu.name}</Link>}
                                </div>
                            );
                        })}
                        <div className={`d-flex menu-item `} onClick={()=>{
                             localStorage.clear()
                             navigate('/login')
                        }}>
                            <i className='ri-logout-box-r-fill'></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="header">
                        {collapsed ? (
                            <i class="ri-menu-line header-action-icon" onClick={() => setCollapsed(false)}></i>
                        ) : (
                            <i className="ri-close-fill header-action-icon" onClick={() => setCollapsed(true)}></i>)}
                        <div className='d-flex align-items-center px-3'>
                            <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
                            <i className="ri-notification-3-fill header-action-icon px-3"></i>
                            </Badge>
                          
                            <Link className="anchor mx-2" to='/profile'>{user?.name}</Link>
                        </div>
                    </div>
                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Layout;