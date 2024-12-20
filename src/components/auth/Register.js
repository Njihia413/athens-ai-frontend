import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast, Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GuestHeader from "../common/GuestHeader";
import {Helmet} from "react-helmet";

const LogoPath = '/Logo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        dateOfBirth: new Date(),
        emailAddress: '',
        identificationType: 'NationalID',
        identificationNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [eye, setEye] = useState(true);
    const [confirmEye, setConfirmEye] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

        // Check if the form is empty
        const isEmpty = Object.values(formData).some((value) => value === '');
        if (isEmpty) {
            showToast("Required form field(s) cannot be empty", "error");
            return;
        }

        // Validate identification number (minimum 8 characters)
        if (formData.identificationNumber.length < 8) {
            showToast("Identification number must be at least 8 characters long", "error");
            return;
        }

        // Validate email address format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
        if (!emailRegex.test(formData.emailAddress)) {
            showToast("Invalid email format", "error");
            return;
        }

        // Validate phone number
        if (formData.phoneNumber.length < 10) {
            showToast('Phone Number cannot be less than 10 characters long', 'error');
            return;
        }

        // Ensure password and confirmPassword match
        if (formData.password !== formData.confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }

        // Prepare data for submission
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
            dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
        };

        setLoading(true);

        try {
            const response = await fetch(
                'https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                // Show success toast
                showToast("Registration successful!", "success");

                setTimeout(() => {
                    // Clear form fields by resetting the state
                    setFormData({
                        identificationType: 'NationalID',
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
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            <div className="account-page">
                <div className="main-wrapper">
                    <GuestHeader/>
                    <Helmet>
                        <title>Register - Athens AI</title>
                        <meta name="description" content="Register page"/>
                    </Helmet>
                    <div className="account-content register-wrapper">
                        <div className="container">
                            {/*<div className="account-logo">*/}
                            {/*    <Link to="/">*/}
                            {/*        <img src={LogoPath} alt="Athens AI"/>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}

                            <div className="account-box">
                                <div className="account-wrapper">
                                    <h3 className="account-title">Register</h3>
                                    <p className="text-muted text-center">Please fill in all the fields marked with asterisk(*)</p>

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
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="input-block">
                                                        <label>
                                                            Middle Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="eg Anderson"
                                                            id="middleName"
                                                            name="middleName"
                                                            value={formData.middleName}
                                                            onChange={handleInputChange}
                                                            required
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
                                                            required
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
                                                            required
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
                                                            placeholder="eg +0712345678"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="input-block">
                                                        <label>
                                                            Date of Birth{" "}
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

                                                <div className="col-md-6">
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
                                                            placeholder="eg john@gmail.com"
                                                        />
                                                    </div>
                                                </div>

                                                {/*<div className="col-md-6">*/}
                                                {/*    <div className="input-block">*/}
                                                {/*        <label>Identification Type <span*/}
                                                {/*            className="text-danger">*</span>*/}
                                                {/*        </label>*/}
                                                {/*        <select*/}
                                                {/*            className="form-select form-control"*/}
                                                {/*            name="identificationType"*/}
                                                {/*            id="identificationType"*/}
                                                {/*            value={formData.identificationType}*/}
                                                {/*            onChange={handleInputChange}*/}
                                                {/*        >*/}
                                                {/*            <option value="NationalID">National ID</option>*/}
                                                {/*            <option value="CompanyID">Company ID</option>*/}
                                                {/*            <option value="Passport">Passport</option>*/}
                                                {/*            <option value="RegistrationNumber">Registration Number*/}
                                                {/*            </option>*/}
                                                {/*        </select>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

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
                                                                <label>
                                                                    Password <span
                                                                    className="text-danger">*</span>
                                                                </label>
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
                                                                <label>
                                                                    Confirm Password <span
                                                                    className="text-danger">*</span>
                                                                </label>
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
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? "loading..." : "Register"}
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
