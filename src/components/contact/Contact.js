import React from "react";
import GuestHeader from "../common/GuestHeader";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Contact = () => {
    return (
        <>
            <div className="account-page">
                <div className="main-wrapper">
                    <GuestHeader/>
                        <Helmet>
                            <title>Contact - Athens AI</title>
                            <meta name="description" content="Chat" />
                        </Helmet>
                        <div className="content container-fluid d-flex align-items-center justify-content-center mt-lg-4" style={{ height: "100vh" }}>
                            <div className="col-12 col-md-8 col-lg-5">
                                <h1 className="text-center">
                                    Get in Touch
                                </h1>
                                <p className="text-center">
                                    We are here to assist you with any questions, concerns, or inquiries you may have.
                                    Please don't hesitate to get in touch with us.
                                </p>
                                <form>
                                    <div className="input-block mb-3">
                                        <label>
                                            Name <span className="text-danger">*</span>
                                        </label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="input-block mb-3">
                                        <label>
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input type="email" className="form-control" />
                                    </div>
                                    <div className="input-block mb-3">
                                        <label>
                                            How did you find us? <span className="text-danger">*</span>
                                        </label>
                                        <select className="form-select form-control" name="findOut">
                                            <option value="linkedIn">LinkedIn</option>
                                            <option value="website">Website</option>
                                            <option value="referral">Referral</option>
                                        </select>
                                    </div>
                                    <div className="input-block mb-3">
                                        <label></label>
                                      <textarea
                                          className="form-control"
                                          placeholder="Enter your message here..."
                                          rows="4"
                                      />
                                    </div>
                                    <div className="text-center">
                                        <Link to="/admin/dashboard">
                                            <button className="btn btn-primary contact-btn mt-3" type="submit">
                                                Send
                                            </button>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
