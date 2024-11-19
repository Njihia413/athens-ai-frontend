import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

const LogoPath = '/Logo2.png';

const GuestHeader = (props) => {
    const location = useLocation();
    const { loginvalue } = useSelector((state) => state.user);
    const UserName = loginvalue?.email?.split("@")[0];
    const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);

    return (
        <div className="header" style={{right: "0px"}}>
            {/* Logo */}
            <div className="header-left">
                <Link to="/" className="logo">
                    <img src={LogoPath} width={40} height={40} alt=""/>
                </Link>
            </div>
            {/* /Logo */}
            {/*<Link*/}
            {/*    id="toggle_btn"*/}
            {/*    to="#"*/}
            {/*    style={{*/}
            {/*        display: location.pathname.includes("tasks")*/}
            {/*            ? "none"*/}
            {/*            : location.pathname.includes("compose")*/}
            {/*                ? "none"*/}
            {/*                : "",*/}
            {/*    }}*/}
            {/*    onClick={handlesidebar}>*/}
            {/*    <span className="bar-icon">*/}
            {/*        <span/>*/}
            {/*        <span/>*/}
            {/*        <span/>*/}
            {/*    </span>*/}
            {/*</Link>*/}
            {/* Header Title */}
            <div className="page-title-box">
                <h3>Athens AI</h3>
            </div>
            {/* /Header Title */}
            {/*<Link*/}
            {/*    id="mobile_btn"*/}
            {/*    className="mobile_btn"*/}
            {/*    to="#"*/}
            {/*    onClick={onMenuClik}>*/}
            {/*    <i className="fa fa-bars"/>*/}
            {/*</Link>*/}
            {/* Header Menu */}
            <ul className="nav user-menu">
                {/* Notifications */}
                <li className={location.pathname.includes("guest") ? "active" : ""}>
                    <Link to="/guest">
                        Home
                    </Link>
                </li>
                <li className={location.pathname.includes("about") ? "active" : ""}>
                    <Link to="/about">
                        About
                    </Link>
                </li>
                <li className={location.pathname.includes("contact") ? "active" : ""}>
                    <Link to="/contact">
                        Contact Admin
                    </Link>
                </li>
                <li className={location.pathname.includes("register") ? "active" : ""}>
                    <Link to="/register">
                        Get Started
                    </Link>
                </li>
                {/* /Notifications */}
            </ul>
            {/* /Header Menu */}
            {/* Mobile Menu */}
            <div className="dropdown mobile-user-menu">
                <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i className="fa fa-ellipsis-v"/>
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
                    <Link to="/guest" className="dropdown-item">
                        Home
                    </Link>
                    <Link to="/about" className="dropdown-item">
                        About
                    </Link>
                    <Link to="/contact" className="dropdown-item">
                        Contact Admin
                    </Link>
                    <Link to="/register" className="dropdown-item">
                        Get Started
                    </Link>
                </div>
            </div>
            {/* /Mobile Menu */}
        </div>
    );
};

export default GuestHeader;
