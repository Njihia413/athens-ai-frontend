/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from "../../assets/img/Profile.png"

const LogoPath = '/Logo2.png';

const Header = (props) => {
    // const data = notifications.notifications;
    // const datas = message.message;
    const [notification, setNotifications] = useState(false);
    const layoutMode = document.body.getAttribute("data-layout-mode");

    const handlesidebar = () => {
        document.body.classList.toggle("mini-sidebar");
    };
    const onMenuClik = () => {
        props.onMenuClick();
    };

    const location = useLocation();
    const navigate = useNavigate();


    const firstName = localStorage.getItem('firstName');

    // Logout handler
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
                <li className="nav-item dropdown">
                    <Link
                        to="#"
                        className="dropdown-toggle nav-link"
                        data-bs-toggle="dropdown"
                        onClick={() => setNotifications(!notification)}>
                        <i className="fa-regular fa-bell" />{" "}
                        <span className="badge badge-pill">0</span>
                    </Link>
                    <div
                        className={`dropdown-menu dropdown-menu-end notifications ${
                            notification ? "show" : ""
                        }`}>
                        <div className="noti-content">
                            <ul className="notification-list">
                                <li className="notification-message">
                                    <Link
                                        onClick={() =>
                                            localStorage.setItem("minheight", "true")
                                        }
                                        to="/notifications">
                                        <div className="media d-flex">
                                          {/*<span className="avatar flex-shrink-0">*/}
                                          {/*  <img alt="" src={val.image} />*/}
                                          {/*</span>*/}
                                            <div className="media-body">
                                                <p className="noti-details">
                                                    <span className="noti-title"></span>{" "}
                                                    {/*{val.contents}{" "}*/}
                                                    <span className="noti-title">

                                                      </span>
                                                </p>
                                                <p className="noti-time">
                                                  <span className="notification-time">

                                                  </span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="topnav-dropdown-footer">
                            <Link
                                onClick={() => localStorage.setItem("minheight", "true")}
                                to="/notifications">
                                View all Notifications
                            </Link>
                        </div>
                    </div>
                </li>
                {/* /Notifications */}
                <li className="nav-item dropdown has-arrow main-drop">
                    <Link
                        to="#"
                        className="dropdown-toggle nav-link"
                        data-bs-toggle="dropdown">
                        <span className="user-img me-1">
                          <img src={`https://ui-avatars.com/api/?name=${firstName}`} alt="" />
                          <span className="status online" />
                        </span>
                        <span>
                            {firstName && <span className="user-name">{firstName}</span>}
                        </span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-end">
                        <Link className="dropdown-item" to="/admin/profile">
                            My Profile
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
                    <Link className="dropdown-item" to="/admin/profile">
                        My Profile
                    </Link>
                    <Link
                        className="dropdown-item"
                        to="/login"
                        onClick={handleLogout}
                    >
                        Logout
                    </Link>
                </div>
            </div>
            {/* /Mobile Menu */}
        </div>
    );
};

export default Header;
