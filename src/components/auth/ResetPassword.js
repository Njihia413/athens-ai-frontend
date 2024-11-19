import React, {useState} from "react";
import {ToastContainer, Slide, toast} from "react-toastify";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const LogoPath = require('../../assets/img/Logo.png');

const ResetPassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
            <div className='reset'>
                <div className='account-page'>
                    <div className='main-wrapper'>
                        <div className='account-content'>
                            <div className='container'>
                                <div className="account-logo">
                                    <Link to="/">
                                        <img src={LogoPath} alt="Athens AI"/>
                                    </Link>
                                </div>

                                <div className='account-box'>
                                    <div className='account-wrapper'>
                                        <h3 className='account-title'>Reset Your Password</h3>
                                        <div className="mt-3">
                                            <form onSubmit={handleChangePassword}>
                                                <div className="input-block">
                                                    <div className="row">
                                                        <div className="col">
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
                                                <div className="input-block text-center">
                                                    <button className="btn btn-primary account-btn">
                                                        Update Password
                                                    </button>
                                                </div>
                                            </form>
                                            <div className='account-footer'>
                                                <p>Remembered your password? <Link to='/login' id="a2">Login</Link>
                                                </p>
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

export default ResetPassword;
