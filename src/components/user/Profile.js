import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import UserHeader from "../common/UserHeader";
import SettingsSidebar from "../common/SettingsSidebar";
import {Link} from "react-router-dom";
import fetchWithAuth from "../../utils/FetchWithAuth";

const Profile = () => {
    const [menu, setMenu] = useState(false);
    const [profileName, setProfileName] = useState(null);

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };

    const showToast = (message, type) => {
        console.log(`Showing toast: ${message} - ${type}`); // Debug log
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default:
                toast(message);
        }
    };

    useEffect(() => {
        // Retrieve the user's first name from localStorage
        const storedName = localStorage.getItem("firstName");
        if (storedName) {
            setProfileName(storedName);
        }
    }, []);

    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <div className="app-container">
                    <UserHeader onMenuClick={() => toggleMobileMenu()}/>
                    <div className="main-content">
                        <SettingsSidebar/>
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
                                                    <Link to="/user/profile">Profile</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="profile-view">
                                                    <div className="profile-img-wrap">
                                                        <div className="profile-img">
                                                            <Link to="#">
                                                                <img
                                                                    src={`https://ui-avatars.com/api/?name=${profileName}`}
                                                                    alt=""/>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="profile-basic">
                                                        <div className="row">
                                                            <div className="col-md-5">
                                                                <div className="profile-info-left">
                                                                    <h3 className="user-name m-t-0 mb-0">
                                                                        {profileName ? `${profileName}` : "John Doe"}
                                                                    </h3>
                                                                    <h6 className="text-muted"></h6>
                                                                    <small className="text-muted"></small>
                                                                    <div className="staff-id">

                                                                    </div>
                                                                    <div className="small doj text-muted">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-7">
                                                                <ul className="personal-info">
                                                                    <li>
                                                                        <div className="title">Phone:</div>
                                                                        <div className="text">
                                                                            <Link to="#"></Link>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="title">Email:</div>
                                                                        <div className="text">
                                                                            <Link to="#"></Link>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="title">Date of Birth:</div>
                                                                        <div className="text"></div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="title">Address:</div>
                                                                        <div className="text">

                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="title">Gender:</div>
                                                                        <div className="text"></div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pro-edit">
                                                        <Link
                                                            data-bs-target="#profile_info"
                                                            data-bs-toggle="modal"
                                                            className="edit-icon"
                                                            to="#">
                                                            <i className="fa fa-pencil"/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
