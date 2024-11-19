import React from "react";
import {Link} from "react-router-dom";
import InitialImg from "../../assets/img/🌀.png";

const LogoPath = '/Logo.png';

const Landing = () => {
    return (
        <div className="landing d-flex flex-column min-vh-100">
            <section className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                <div className="text-center">
                    {/* Logo with slow bounce animation */}
                    <img className="mb-3 bounce-slow" alt="Logo" src={LogoPath}/>
                    {/* Athens AI Text */}
                    <h1 className="display-1 fw-semibold text-dark">Athens AI</h1>
                </div>
            </section>

            <div className="d-flex justify-content-center pb-4">
                {/* Button at the bottom */}
                <Link
                    to="/guest"
                    className="d-flex align-items-center text-black bg-white py-2 px-4 rounded-pill text-decoration-none"
                >
                    <img className="me-2" alt="InitialImg" src={InitialImg}/>
                    Get Started
                </Link>
            </div>
        </div>
    )
}

export default Landing;
