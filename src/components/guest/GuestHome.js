/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Helmet } from "react-helmet";
import ActionButtons from "./ActionButtons";
import {TypeAnimation} from "react-type-animation";

const GuestHome = () => {
    return (
        <>
            <div className="page-wrapper">
                <Helmet>
                    <title>Guest - Athens AI</title>
                    <meta name="description" content="Chat" />
                </Helmet>
                {/* Chat Main Row */}
                <div className="chat-main-row">
                    {/* Chat Main Wrapper */}
                    <div className="chat-main-wrapper">
                        {/* Chats View */}
                        <div className="col-lg-12 message-view task-view">
                            <div className="chat-window">
                                <div className="chat-contents">
                                    <div className="chat-content-wrap">
                                        <div className="chat-wrap-inner">
                                            <div className="chat-box">
                                                <div className="chats">
                                                    <div className="container-fluid">
                                                        <div className="row align-items-center mt-5">
                                                            <div className="welcome-message text-center">
                                                                {/*<h2>What can I help you with today?</h2>*/}
                                                                <h2>
                                                                    <TypeAnimation
                                                                        sequence={[
                                                                            'What can I help you with today?',
                                                                        ]}
                                                                        cursor={false}
                                                                        wrapper='div'
                                                                        easing='ease-in-out'
                                                                        speed={50}
                                                                        repeat={0}
                                                                    />
                                                                </h2>
                                                                <div className="prompt-container">
                                                                    <p>Here are some things you can ask me:</p>
                                                                    <div>
                                                                        <ActionButtons />
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
                                                <div className="input-group">
                                                  <textarea
                                                      className="form-control"
                                                      placeholder="Message Athens AI"
                                                      defaultValue={""}
                                                  />
                                                    <span className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                          <i className="fa-solid fa-paper-plane"/>
                                                        </button>
                                                      </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Chats View */}
                    </div>
                    {/* /Chat Main Wrapper */}
                </div>
                {/* /Chat Main Row */}
                {/* Modals would remain unchanged */}
            </div>
        </>
    );
};

export default GuestHome;
