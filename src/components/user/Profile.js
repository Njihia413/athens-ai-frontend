import React, {useContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
import UserHeader from "../common/UserHeader";
import SettingsSidebar from "../common/SettingsSidebar";
import { Link } from "react-router-dom";
import {UserContext} from "../../InitialPage/App";

const Profile = () => {
    const { user, loading } = useContext(UserContext);
    const [menu, setMenu] = useState(false);

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };

    const showToast = (message, type) => {
        switch (type) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            default:
                toast(message);
        }
    };


    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <div className="app-container">
                    <UserHeader onMenuClick={toggleMobileMenu} />
                    <div className="main-content">
                        <SettingsSidebar />
                        <div className="page-wrapper">
                            <div className="content container-fluid">
                                <div className="page-header">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="page-title">Profile</h3>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="breadcrumb-item active">
                                                    Profile
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-0">
                                    <div className="card-body">
                                        {loading ? (
                                            <p>Loading...</p>
                                        ) : user ? (
                                            <div className="profile-view">
                                                <div className="profile-img-wrap">
                                                    <div className="profile-img">
                                                        <Link to="#">
                                                            <img
                                                                src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="profile-basic">
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="profile-info-left">
                                                                <h3 className="user-name m-t-0 mb-0">
                                                                    {user.firstName} {user.lastName}
                                                                </h3>
                                                                <small className="text-muted">
                                                                    {user.role || "N/A"}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <ul className="personal-info">
                                                                <li>
                                                                    <div className="title">Phone:</div>
                                                                    <div className="text">{user.phone || "N/A"}</div>
                                                                </li>
                                                                <li>
                                                                    <div className="title">Email:</div>
                                                                    <div className="text">{user.email || "N/A"}</div>
                                                                </li>
                                                                <li>
                                                                    <div className="title">Date of Birth:</div>
                                                                    <div className="text">{user.dob || "N/A"}</div>
                                                                </li>
                                                                <li>
                                                                    <div className="title">Address:</div>
                                                                    <div className="text">{user.address || "N/A"}</div>
                                                                </li>
                                                                <li>
                                                                    <div className="title">Gender:</div>
                                                                    <div className="text">{user.gender || "N/A"}</div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>User not found</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
