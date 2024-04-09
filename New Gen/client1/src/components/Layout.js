import React from "react";
import '../layout.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import{Badge} from 'antd';

function Layout({ children }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = React.useState(false);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    
    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Apply Employee",
            path: "/applyemployee",
            icon: "ri-file-list-line",
        },
        {
            name: "Services",
            path: "/services",
            icon: "ri-folder-shared-fill"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "ri-user-fill",
        },
    ];
    
    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Appointment",
            path: "/appointment",
            icon: "ri-file-list-line",
        },
        {
            name: "Employee List",
            path: "/employeelist",
            icon: "ri-folder-shared-fill"
        },
        {
            name: "Add Employee",
            path: "/addemployee",
            icon: "ri-user-fill",
        },
    ];
    const employeeMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "ri-folder-shared-fill"
        },
        {
            name: "Profile",
            path: `/employee/profile/${user ?._id}`,
            icon: "ri-user-fill",
        },
    ];

    const menuToBeRender = user?.isemployee ? employeeMenu :user?.isAdmin ? adminMenu :    userMenu;

    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1 className="logo">New Gen</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRender.map((menu, index) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div key={index} className={`d-flex menu-item ${isActive ? 'active-menu-item' : ''}`}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                            );
                        })}
                        <div className={'d-flex menu-item'} onClick={() => {
                            localStorage.clear();
                            navigate('/login');
                        }}>
                            <i className='ri-login-box-line'></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        {collapsed ? (
                            <i className="ri-menu-line header-action-icon" onClick={() => setCollapsed(false)}></i>
                        ) : (
                            <i className="ri-arrow-left-s-fill header-action-icon" onClick={() => setCollapsed(true)}></i>
                        )}
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
