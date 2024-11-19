import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {toast} from "react-toastify";

const LogoPath = '/Logo.png';

const Login = () => {
    const [eye, setEye] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
            Password: password
        };

        try {
            const response = await fetch('https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                // Assuming the response contains a token or user info on success
                const { token } = responseData;

                if (token) {
                    // Store token in localStorage/sessionStorage (or in context/store)
                    localStorage.setItem('authToken', token);

                    showToast("Login successful!", "success");

                    // Redirect to dashboard after successful login
                    navigate('/user');
                } else {
                    showToast("Login failed. Please check your credentials.", "error");
                }
            } else {
                throw new Error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            showToast("An error occurred. Please try again.", "error");
        }
    };


    return (
        <div className="account-page">
            <div className="main-wrapper">
                <Helmet>
                    <title>Login - Athens AI</title>
                    <meta name="description" content="Login page"/>
                </Helmet>
                <div className="account-content">
                    <div className="container">
                        {/* Account Logo */}
                        <div className="account-logo">
                            <Link to="/">
                                <img src={LogoPath} alt="Athens AI"/>
                            </Link>
                        </div>
                        {/* /Account Logo */}
                        <div className="account-box">
                            <div className="account-wrapper">
                                <h3 className="account-title">Login</h3>
                                {/*<p className="account-subtitle">Access to our dashboard</p>*/}
                                {/* Account Form */}
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-block">
                                            <label>Email Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} // Capture email input
                                            />
                                        </div>
                                        <div className="input-block">
                                            <div className="row">
                                                <div className="col">
                                                    <label>Password</label>
                                                </div>
                                                <div className="col-auto">
                                                    <Link className="text-muted" to="/reset-password">
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            </div>
                                            <div style={{position: "relative"}}>
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
                                        <button className="btn btn-primary account-btn" type="submit">
                                            Login
                                        </button>
                                    </form>
                                    <div className="account-footer">
                                        <p>
                                            Don't have an account yet?{" "}
                                            <Link to="/register">Register</Link>
                                        </p>
                                    </div>
                                </div>
                                {/* /Account Form */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
