import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast, Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogoPath = require('../../assets/img/Logo.png');

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        dateOfBirth: new Date(),
        emailAddress: '',
        identificationType: '',
        identificationNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [eye, setEye] = useState(true);
    const [confirmEye, setConfirmEye] = useState(true);
    const navigate = useNavigate();

    const onEyeClick = () => {
        setEye(!eye);
    };

    const onConfirmEyeClick = () => {
        setConfirmEye(!confirmEye);
    }

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

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!e.target.checkValidity()) {
            showToast("Please fill in all required fields", "error");
            return;
        }

        // Ensure password and confirmPassword match
        if (formData.password !== formData.confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }

        const data = {
            identificationType: formData.identificationType,
            identificationNumber: formData.identificationNumber,
            emailAddress: formData.emailAddress,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            gender: formData.gender,
            dateOfBirth: new Date(formData.dateOfBirth).toISOString()
        };

        try {
            const response = await fetch('https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Check if the response status is 200 or 201
                showToast("Registration successful!", "success");

                // Save user's first name to localStorage
                localStorage.setItem('userFirstName', formData.firstName);

                setTimeout(() => {
                    // Clear form fields by resetting the state
                    setFormData({
                        identificationType: '',
                        identificationNumber: '',
                        emailAddress: '',
                        password: '',
                        confirmPassword: '',
                        phoneNumber: '',
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        gender: '',
                        dateOfBirth: '',
                    });

                    // Navigate to /login
                    navigate('/login');
                }, 2000);
            } else {
                throw new Error("Registration failed.");
            }
        } catch (error) {
            showToast("Registration failed. Please try again.", "error");
        }
    };



    return (
        <>
            <div className="register">
                <div className="account-page">
                    <div className="main-wrapper">
                        <div className="account-content">
                            <div className="container">
                                <div className="account-logo">
                                    <Link to="/">
                                        <img src={LogoPath} alt="Athens AI"/>
                                    </Link>
                                </div>

                                <div className="account-box">
                                    <div className="account-wrapper">
                                        <h3 className="account-title">Register</h3>
                                        {/*<p className="account-subtitle">Access to our dashboard</p>*/}

                                        <div>
                                            <form onSubmit={handleSubmit} noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>
                                                                First Name <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="eg John"
                                                                id="firstName"
                                                                name="firstName"
                                                                value={formData.firstName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Middle Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="eg Anderson"
                                                                id="middleName"
                                                                name="middleName"
                                                                value={formData.middleName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>
                                                                Last Name <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="eg Doe"
                                                                id="lastName"
                                                                name="lastName"
                                                                value={formData.lastName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="input-block">
                                                            <label>
                                                                Gender <span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="gender"
                                                                id="gender"
                                                                value={formData.gender}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="input-block">
                                                            <label>
                                                                Phone Number <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="phoneNumber"
                                                                id="phoneNumber"
                                                                autoComplete="off"
                                                                value={formData.phoneNumber}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>
                                                                Date of Birth{" "}
                                                                (dd/mm/yyyy)
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <div className="cal-icon">
                                                                <input
                                                                    value={formData.dateOfBirth}
                                                                    onChange={handleInputChange}
                                                                    className="form-control datetimepicker"
                                                                    type="date"
                                                                    required
                                                                    id="dateOfBirth"
                                                                    name="dateOfBirth"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className="input-block">
                                                            <label>
                                                                Email Address <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="email"
                                                                name="emailAddress"
                                                                id="emailAddress"
                                                                autoComplete="off"
                                                                value={formData.emailAddress}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="input-block">
                                                            <label>Identification Type <span
                                                                className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="identificationType"
                                                                id="identificationType"
                                                                value={formData.identificationType}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="nationalID">National ID</option>
                                                                <option value="companyID">Company ID</option>
                                                                <option value="passport">Passport</option>
                                                                <option value="registrationNumber">Registration Number
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="input-block">
                                                            <label>
                                                                Identification Number <span
                                                                className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="identificationNumber"
                                                                id="identificationNumber"
                                                                autoComplete="off"
                                                                placeholder="eg 12345678"
                                                                value={formData.identificationNumber}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <label>Password</label>
                                                                </div>
                                                            </div>
                                                            <div style={{position: "relative"}}>
                                                                <input
                                                                    type={eye ? "password" : "text"}
                                                                    className="form-control"
                                                                    placeholder="@#*%"
                                                                    id="password"
                                                                    name="password"
                                                                    value={formData.password}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <span
                                                                    style={{
                                                                        position: "absolute",
                                                                        right: "5%",
                                                                        top: "30%",
                                                                    }}
                                                                    onClick={onEyeClick}
                                                                    className={`toggles-password fa toggle-password ${
                                                                        eye ? "fa-eye-slash" : "fa-eye"
                                                                    } `}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <label>Confirm Password</label>
                                                                </div>
                                                            </div>
                                                            <div style={{position: "relative"}}>
                                                                <input
                                                                    type={confirmEye ? "password" : "text"}
                                                                    className="form-control"
                                                                    placeholder="@#*%"
                                                                    id="confirmPassword"
                                                                    name="confirmPassword"
                                                                    value={formData.confirmPassword}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <span
                                                                    style={{
                                                                        position: "absolute",
                                                                        right: "5%",
                                                                        top: "30%",
                                                                    }}
                                                                    onClick={onConfirmEyeClick}
                                                                    className={`toggles-password fa toggle-password ${
                                                                        confirmEye ? "fa-eye-slash" : "fa-eye"
                                                                    } `}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="input-block text-center">
                                                    <button
                                                        className="btn btn-primary account-btn"
                                                        type="submit">
                                                        Register
                                                    </button>
                                                </div>
                                            </form>

                                            <div className="account-footer">
                                                <p>
                                                    Already have an account? <Link to="/login">Login</Link>
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

export default Register;
