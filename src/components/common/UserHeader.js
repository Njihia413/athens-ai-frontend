import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

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
    const [username, setUsername] = useState(null);
    const [roles, setRoles] = useState([]);  // New state to store roles

    useEffect(() => {
        // Retrieve the user's details from localStorage
        const storedName = localStorage.getItem("firstName");
        const storedUsername = localStorage.getItem("username");
        const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];  // Assuming roles is stored as a JSON array

        if (storedName) {
            setProfileName(storedName);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedRoles.length > 0) {
            setRoles(storedRoles);  // Set the roles in state
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("roles");
        localStorage.removeItem("firstName");
        localStorage.removeItem("username");
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
                        <span className="text-xs">
                            ({roles})
                        </span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-end">
                        {/* Dynamic Profile Route */}
                        <Link
                            className="dropdown-item"
                            to={`/user/profile/${username || "default"}`}>
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
                    <Link
                        className="dropdown-item"
                        to={`/user/profile/${username || "default"}`}>
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
            </div>
            {/* /Mobile Menu */}
        </div>
    );
};

export default UserHeader;
