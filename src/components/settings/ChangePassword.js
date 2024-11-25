import React, {useState} from "react";
import SettingsSidebar from "../common/SettingsSidebar";
import {Slide, toast, ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import UserHeader from "../common/UserHeader";

const LogoPath = '/Logo.png';

const ChangePassword = () => {
    const [menu, setMenu] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            showToast("Passwords do not match", 'error');
            return;
        }

        const url = "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/change-password";
        const payload = {
            currentPassword: oldPassword,
            newPassword: newPassword,
        };

        const authToken = localStorage.getItem("authToken");

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                showToast("Password updated successfully!", "success");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || "Failed to update password";
                showToast(errorMessage, "error");
            }
        } catch (error) {
            showToast("An error occurred. Please try again later.", "error");
        }
    };

    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <div className="app-container">
                    <UserHeader onMenuClick={() => toggleMobileMenu()}/>
                    <div className="main-content">
                        <SettingsSidebar/>
                        <div className="page-wrapper">
                            <div className="account-page">
                                <div className="main-wrapper">
                                    <div className="account-content">
                                        {/* Account Logo */}
                                        <div className="account-logo">
                                            <Link to="/admin-dashboard">
                                                <img src={LogoPath} alt="Athens AI"/>
                                            </Link>
                                        </div>
                                        <div className="account-box">
                                            <div className="account-wrapper">
                                                <h3 className="account-title">Change Password</h3>
                                                <form onSubmit={handleChangePassword}>
                                                    <div className="input-block">
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <label>Old Password</label>
                                                            </div>
                                                        </div>
                                                        <div style={{position: 'relative'}}>
                                                            <input
                                                                type={showOldPassword ? 'text' : 'password'}
                                                                className="form-control"
                                                                name="oldPassword"
                                                                value={oldPassword}
                                                                onChange={(e) => setOldPassword(e.target.value)}
                                                                required
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={showOldPassword ? faEye : faEyeSlash}
                                                                style={{
                                                                    position: 'absolute',
                                                                    right: '5%',
                                                                    top: '30%',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={toggleOldPasswordVisibility}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="input-block">
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <label>New Password</label>
                                                            </div>
                                                        </div>
                                                        <div style={{position: 'relative'}}>
                                                            <input
                                                                type={showNewPassword ? 'text' : 'password'}
                                                                className="form-control"
                                                                name="newPassword"
                                                                value={newPassword}
                                                                onChange={(e) => setNewPassword(e.target.value)}
                                                                required
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={showNewPassword ? faEye : faEyeSlash}
                                                                style={{
                                                                    position: 'absolute',
                                                                    right: '5%',
                                                                    top: '30%',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={toggleNewPasswordVisibility}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="input-block">
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <label>Confirm Password</label>
                                                            </div>
                                                        </div>
                                                        <div style={{position: 'relative'}}>
                                                            <input
                                                                type={showConfirmPassword ? 'text' : 'password'}
                                                                className="form-control"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                required
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={showConfirmPassword ? faEye : faEyeSlash}
                                                                style={{
                                                                    position: 'absolute',
                                                                    right: '5%',
                                                                    top: '30%',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={toggleConfirmPasswordVisibility}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="submit-section mb-4">
                                                        <button className="btn btn-primary submit-btn">
                                                            Update Password
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </>
    )
}

export default ChangePassword;
