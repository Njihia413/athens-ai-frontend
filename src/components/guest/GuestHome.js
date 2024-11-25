/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Helmet } from "react-helmet";
import ActionButtons from "./ActionButtons";
import {TypeAnimation} from "react-type-animation";

const GuestHome = () => {
    return (
        <>
            <div>
                <Helmet>
                    <title>Guest - Athens AI</title>
                    <meta name="description" content="Chat" />
                </Helmet>
                {/* Chat Main Row */}
                <div className="chat-main-row d-flex justify-content-center">
                    {/* Chat Main Wrapper */}
                    <div className="chat-main-wrapper w-100" style={{ maxWidth: "750px" }}>
                        {/* Chats View */}
                        <div className="col-lg-12 message-view task-view">
                            <div className="chat-window">
                                <div className="chat-contents">
                                    <div className="chat-content-wrap">
                                        <div className="chat-wrap-inner">
                                            <div className="chat-box">
                                                <div className="chats">
                                                    <div className="container-fluid">
                                                        <div className="row mt-5">
                                                            <div className="welcome-message text-center mt-5">
                                                                <h2>
                                                                    <TypeAnimation
                                                                        sequence={['What can I help you with today?']}
                                                                        cursor={false}
                                                                        wrapper="div"
                                                                        easing="ease-in-out"
                                                                        speed={50}
                                                                        repeat={0}
                                                                    />
                                                                </h2>
                                                                <div className="prompt-container">
                                                                    <p>Here are some things you can ask me:</p>
                                                                    <div>
                                                                        <ActionButtons/>
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
                                <div className="chat-footer">
                                    <div className="message-bar">
                                        <div className="message-inner">
                                            <div className="message-area">
                                                <form>
                                                    <div className="input-group">
                                                      <textarea
                                                          className="form-control"
                                                          placeholder="Message Athens AI"
                                                          defaultValue={""}
                                                      />
                                                        <span className="input-group-append">
                                                        <button className="btn btn-primary btn-chat" type="button">
                                                          <i className="fa-solid fa-paper-plane"/>
                                                        </button>
                                                      </span>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center mt-3">
                                    © 2024 Athens AI. All rights reserved.
                                </p>
                            </div>
                        </div>
                        {/* /Chats View */}
                    </div>
                    {/* /Chat Main Wrapper */}
                </div>

                {/* Modals would remain unchanged */}
            </div>
        </>
    );
};

export default GuestHome;
