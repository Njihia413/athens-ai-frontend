/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import ActionButtons from "./ActionButtons";
import {TypeAnimation} from "react-type-animation";
import {FaSpinner} from "react-icons/fa";
import {Slide, toast, ToastContainer} from "react-toastify";
import axios from "axios";

const GuestHome = () => {
    const [query, setQuery] = useState('');
    const [role, setRole] = useState('');
    const [model, setModel] = useState('');
    const [threadId, setThreadId] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    // Generate unique thread ID on component mount
    useEffect(() => {
        const generateThreadId = () => {
            const randomPart = Math.random().toString(36).substring(2, 8); // Random string
            const timestampPart = Date.now().toString(36); // Timestamp
            return `thread-${timestampPart}-${randomPart}`;
        };
        setThreadId(generateThreadId());
    }, []);

    // Handle message query
    const handleQuery = async () => {
        if (!query) return;

        setQuery('');
        setIsLoading(true);

        // Add user's query to the conversation
        const userMessage = { sender: "user", text: query };
        setConversation((prev) => [...prev, userMessage]);

        try {
            const res = await axios.post("http://localhost:8000/process", {
                text: query,
                thread_id: threadId,
                model: "llama3.2",
                role: "guest",
            });

            // Add the LLM's response to the conversation
            const llmResponse = { sender: "llm", text: res.data.response };
            setConversation((prev) => [...prev, llmResponse]);
        } catch (error) {
            console.error("Error querying:", error);
            showToast("Error querying", "error");
        }

        setIsLoading(false);

    };

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
                                                    {query === '' ? (
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
                                                    ) : (
                                                        conversation.map((message, index) => (
                                                            <div
                                                                key={index}
                                                                className={`mb-4 ${
                                                                    message.sender === 'user' ? 'chat chat-right' : 'chat chat-left'
                                                                }`}
                                                            >
                                                                <div className="chat-body">
                                                                    <div className="chat-bubble">
                                                                        <div className="chat-content">
                                                                            <p>{message.text}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
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
                                                          value={query}
                                                          onChange={(e) => setQuery(e.target.value)}
                                                          className="form-control"
                                                          placeholder="Message Athens AI"
                                                      />
                                                        <span className="input-group-append">
                                                            <button
                                                                onClick={handleQuery}
                                                                className="btn btn-primary btn-chat"
                                                                type="button"
                                                            >
                                                          {isLoading ? (
                                                              <FaSpinner className="animate-spin" />
                                                          ) : (
                                                              <i className="fa-solid fa-paper-plane" />
                                                          )}
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
};

export default GuestHome;
