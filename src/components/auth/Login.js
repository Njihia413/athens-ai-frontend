import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Slide, toast, ToastContainer } from "react-toastify";
import GuestHeader from "../common/GuestHeader";
import {userContext} from "../../InitialPage/context/UserContext";

const LogoPath = '/Logo.png';

const Login = () => {
    const [eye, setEye] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { updateUserDetails } = useContext(userContext)

    const onEyeClick = () => {
        setEye(!eye);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email and password
        if (!email || !password) {
            showToast("Please enter both email and password.", "error");
            return;
        }

        const data = {
            Username: email,
            Password: password,
        };

        setLoading(true);

        try {
            const response = await fetch(
                'https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            // Check response status
            if (response.ok) {
                const responseData = await response.json(); // Assume successful response is JSON
                updateUserDetails(responseData);

                const { roles, firstName } = responseData;
                const welcomeMessage = roles.includes("Admin")
                    ? "Welcome Admin"
                    : `Welcome ${firstName || "User"}`;
                showToast(welcomeMessage, "success");

                setTimeout(() => {
                    // Redirect based on role after the delay
                    if (roles && roles.includes("Admin")) {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/user');
                    }
                }, 1000);
            } else {
                // Handle non-JSON responses (plain text)
                const contentType = response.headers.get('Content-Type');
                const errorMessage = contentType && contentType.includes('application/json')
                    ? (await response.json()).message || "Login failed. Please try again."
                    : await response.text(); // Handle plain text response

                showToast(errorMessage, "error");
            }
        } catch (error) {
            // Handle unexpected errors
            showToast(error.message || "An unexpected error occurred. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className="account-page">
                <div className="main-wrapper">
                    <GuestHeader />
                    <Helmet>
                        <title>Login - Athens AI</title>
                        <meta name="description" content="Login page" />
                    </Helmet>
                    <div className="account-content">
                        <div className="container">
                            <div className="account-box">
                                <div className="account-wrapper">
                                    <h3 className="account-title">Login</h3>
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-block">
                                                <label>Username</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your email address/identification number"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)} // Capture email input
                                                />
                                            </div>
                                            <div className="input-block">
                                                <div className="row">
                                                    <div className="col">
                                                        <label>Password</label>
                                                    </div>
                                                </div>
                                                <div style={{ position: "relative" }}>
                                                    <input
                                                        type={eye ? "password" : "text"}
                                                        className="form-control"
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} // Capture password input
                                                    />
                                                    <span
                                                        style={{
                                                            position: "absolute",
                                                            right: "5%",
                                                            top: "30%",
                                                        }}
                                                        onClick={onEyeClick}
                                                        className={`toggles-password fa toggle-password ${eye ? "fa-eye-slash" : "fa-eye"}`}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-primary account-btn"
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {loading ? "loading..." : "Login"}
                                            </button>
                                        </form>
                                        <div className="account-footer">
                                            <p>
                                                Don't have an account yet?{" "}
                                                <Link to="/register">Register</Link>
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
    );
}

export default Login;
