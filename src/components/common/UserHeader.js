/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

const LogoPath = '/Logo2.png';

const UserHeader = (props) => {
    const layoutMode = document.body.getAttribute("data-layout-mode");

    const handlesidebar = () => {
        document.body.classList.toggle("mini-sidebar");
    };
    const onMenuClik = () => {
        props.onMenuClick();
    };

    const location = useLocation();
    const navigate = useNavigate();
    const [profileName, setProfileName] = useState(null);

    useEffect(() => {
        // Retrieve the user's first name from localStorage
        const storedName = localStorage.getItem("firstName");
        if (storedName) {
            setProfileName(storedName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("roles");
        localStorage.removeItem("firstName");
        navigate("/login");
    };

    return (
        <div className="header" style={{ right: "0px" }}>
            {/* Logo */}
            <div className="header-left">
                <Link to="/" className="logo">
                    <img src={LogoPath} width={40} height={40} alt="" />
                </Link>
            </div>
            {/* /Logo */}
            <Link
                id="toggle_btn"
                to="#"
                style={{
                    display: location.pathname.includes("tasks")
                        ? "none"
                        : location.pathname.includes("compose")
                            ? "none"
                            : "",
                }}
                onClick={handlesidebar}>
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
            </Link>
            {/* Header Title */}
            <div className="page-title-box">
                <h3>Athens AI</h3>
            </div>
            {/* /Header Title */}
            <Link
                id="mobile_btn"
                className="mobile_btn"
                to="#"
                onClick={() => onMenuClik()}>
                <i className="fa fa-bars" />
            </Link>
            {/* Header Menu */}
            <ul className="nav user-menu">
                {/* Notifications */}
                {/* /Notifications */}
                <li className="nav-item dropdown has-arrow main-drop">
                    <Link
                        to="#"
                        className="dropdown-toggle nav-link"
                        data-bs-toggle="dropdown">
                        <span className="user-img me-1">
                          <img src={`https://ui-avatars.com/api/?name=${profileName}`} alt="" />
                          <span className="status online" />
                        </span>
                        <span>{profileName || "User"}</span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-end">
                        <Link className="dropdown-item" to="/user/profile">
                            My Profile
                        </Link>
                        <Link className="dropdown-item" to="/user/change-password">
                            Change Password
                        </Link>
                        <Link
                            to="/login"
                            className="dropdown-item"
                            onClick={handleLogout}
                        >
                            Logout
                        </Link>
                    </div>
                </li>
            </ul>
            {/* /Header Menu */}
            {/* Mobile Menu */}
            <div className="dropdown mobile-user-menu">
                <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i className="fa fa-ellipsis-v" />
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
                    <Link className="dropdown-item" to="/user/profile">
                        My Profile
                    </Link>
                    <Link className="dropdown-item" to="/login">
                        Logout
                    </Link>
                </div>
            </div>
            {/* /Mobile Menu */}
        </div>
    );
};

export default UserHeader;
