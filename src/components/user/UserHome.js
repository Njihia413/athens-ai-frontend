/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
    Attachment,
} from "../../Entryfile/imagepath";
import axios from "axios";
import { ToastContainer, toast, Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TypeAnimation} from "react-type-animation";
import ActionButtons from "../guest/ActionButtons";
import { FaSpinner } from "react-icons/fa";

const LogoPath = '/Logo.png';

const UserHome = () => {
    const [files, setFiles] = useState([]);
    const [query, setQuery] = useState('');
    const [role, setRole] = useState('customer_service');
    const [model, setModel] = useState('mistral');
    const [vectorResult, setVectorResult] = useState('');
    const [llmResult, setLLMResult] = useState('');
    const [sqlResult, setSqlResult] = useState('');
    const [mongoResult, setMongoResult] = useState('');
    const [conversation, setConversation] = useState([]);
    const [sources, setSources] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState([
        {
            "messageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "sender": "us",
            "recipient": "llm model",
            "content": "Hello Athens AI",
            "timeStamp": "1",
            "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "conversation": "string"
        },
        {
            "messageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "sender": "llm model",
            "recipient": "us",
            "content": "Hello Vincent, how can I help you today?",
            "timeStamp": "2",
            "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "conversation": "string"
        },
        {
            "messageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "sender": "us",
            "recipient": "llm model",
            "content": "I wanted to ask you something",
            "timeStamp": "3",
            "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "conversation": "string"
        },
        {
            "messageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "sender": "llm model",
            "recipient": "us",
            "content": "Go ahead, and ask.I'll be willing to assist",
            "timeStamp": "4",
            "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "conversation": "string"
        }
    ])

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

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const res = await axios.post('http://localhost:8000/embed', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (res.data.message) {
                showToast("Files uploaded successfully!", "success");
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            showToast("Error uploading files", "error");
        }
    };

    // const handleQuery = async () => {
    //     setQuery("");
    //     setIsLoading(true);
    //
    //     try {
    //         const res = await axios.post('http://localhost:8000/query', { query, role, model });
    //         let data = res.data.message;
    //         if (res.data) {
    //             console.log(data.message);
    //             setVectorResult(data.vector_result);
    //             setLLMResult(data.llm_chat_result);
    //             setSqlResult(data.sql_result);
    //             setMongoResult(data.mongo_result);
    //             setSources(res.data.sources || 'No sources available');
    //         }
    //     } catch (error) {
    //         console.error('Error querying:', error);
    //         showToast('Error querying', "error");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleQuery = async () => {
        if (!query) return;

        setIsLoading(true);

        // Add user's query to the conversation
        const userMessage = { sender: 'user', text: query };
        setConversation((prev) => [...prev, userMessage]);

        try {
            const res = await axios.post('http://localhost:8000/process', {
                text: query,
                thread_id: 'conversation-2',
            });

            // Add the LLM's response to the conversation
            const llmResponse = { sender: 'llm', text: res.data.response };
            setConversation((prev) => [...prev, llmResponse]);
        } catch (error) {
            console.error('Error querying:', error);
            showToast('Error querying', "error");
        }

        // Clear the input box
        setQuery('');
        setIsLoading(false);
    };

    function dummy(fail=false){
        return new Promise((resolve, reject) => {
                const result = {
                    "messageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "sender": "llm model",
                    "recipient": "us",
                    "content": "I am doing great, thanks. And you?",
                    "timeStamp": "2",
                    "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "conversation": "string"
                }

            if(fail){
                reject('Request failed')
            } else {
                resolve(result)
            }
        }, 8000)
    }


    async function handleSubmit(e) {
        // setQuery("");
        setChat(chat => [
            ...chat,
            {
                "messageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "sender": "us",
                "recipient": "llm model",
                "content": query,
                "timeStamp": chat.length + 1,
                "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "conversation": "string"
            },
        ])
        setIsLoading(true);

        try {
            const result = await dummy()

            setChat(chat => {
                const newMessage = result
                result.timestamp = chat.length
                return [ ...chat, newMessage ]
            })

            // let data = res.data.message;
            // if (res.data) {
            //     //console.log(data.message);
            //     setVectorResult(data.vector_result);
            //     setLLMResult(data.llm_chat_result);
            //     setSqlResult(data.sql_result);
            //     setMongoResult(data.mongo_result);
            //     setSources(res.data.sources || 'No sources available');
            // }
        } catch (error) {
            console.error('Error querying:', error);
            showToast('Error querying', "error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="page-wrapper">
                <Helmet>
                    <title>User - Athens AI</title>
                    <meta name="description" content="Chat"/>
                </Helmet>
                {/* Chat Main Row */}
                <div className="chat-main-row">
                    {/* Chat Main Wrapper */}
                    <div className="chat-main-wrapper">
                        {/* Chats View */}
                        <div className="col-lg-9 message-view task-view">
                            <div className="chat-window">
                                <div className="fixed-header">
                                    <div className="navbar">
                                        <div className="user-details me-auto">
                                            <div className="float-start user-img">
                                                <div className="col-sm-12 col-md-12">
                                                    <div
                                                        className="input-block ">
                                                        <select
                                                            value={model}
                                                            onChange={(e) => setModel(e.target.value)}
                                                            className="form-select form-control"
                                                        >
                                                            <option value="mistral">Athens Alpha
                                                            </option>
                                                            <option value="llama3.2">Athens Delphi
                                                            </option>
                                                            <option value="gemma2">Athens Heracles
                                                            </option>

                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="chat-contents">
                                    <div className="chat-content-wrap">
                                        <div className="chat-wrap-inner">
                                            <div className="chat-box">
                                                <div className="chats">
                                                    {!chat.length && (
                                                        <div className="container-fluid">
                                                            <div className="row align-items-center mt-5">
                                                                <div className="welcome-message text-center">
                                                                    <h2>
                                                                        <TypeAnimation
                                                                            sequence={[
                                                                                'What can I help you with today?',
                                                                            ]}
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
                                                    )}

                                                    {conversation.map((message, index) =>(
                                                        <div
                                                            key={index}
                                                            className={`mb-4 ${message.sender === 'user' ? 'chat chat-right' : 'chat chat-left'
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
                                                    ))}
                                                        {/*return (*/}
                                                        {/*    message.sender === 'us' ?*/}
                                                        {/*        <div className="chat chat-right">*/}
                                                        {/*            <div className="chat-body">*/}
                                                        {/*                <div className="chat-bubble">*/}
                                                        {/*                    <div className="chat-content">*/}
                                                        {/*                        <p>{message.content}</p>*/}
                                                        {/*                    </div>*/}
                                                        {/*                </div>*/}
                                                        {/*            </div>*/}
                                                        {/*        </div>*/}
                                                        {/*        :*/}
                                                        {/*        <div className="chat chat-left">*/}
                                                        {/*            <div className="chat-avatar">*/}
                                                        {/*                <Link to="/" className="avatar">*/}
                                                        {/*                    <img alt="Athens Profile" src={LogoPath}/>*/}
                                                        {/*                </Link>*/}
                                                        {/*            </div>*/}
                                                        {/*            <div className="chat-body">*/}
                                                        {/*                <div className="chat-bubble">*/}
                                                        {/*                    <div className="chat-content">*/}
                                                        {/*                        <p>*/}
                                                        {/*                            {message.content}*/}
                                                        {/*                        </p>*/}
                                                        {/*                    </div>*/}
                                                        {/*                </div>*/}
                                                        {/*            </div>*/}
                                                        {/*        </div>*/}

                                                        {/*)*/}


                                                    {/*{query && (*/}
                                                    {/*    <div className="chat chat-right">*/}
                                                    {/*        <div className="chat-body">*/}
                                                    {/*            <div className="chat-bubble">*/}
                                                    {/*                <div className="chat-content">*/}
                                                    {/*                    <p></p>*/}
                                                    {/*                </div>*/}
                                                    {/*            </div>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*)}*/}

                                                    {/* Combined results */}
                                                    {/*{(llmResult || vectorResult || sqlResult || mongoResult || sources) && (*/}
                                                    {/*    <div className="chat chat-left">*/}
                                                    {/*        <div className="chat-avatar">*/}
                                                    {/*            <Link to="/" className="avatar">*/}
                                                    {/*                <img alt="Athens Profile" src={LogoPath}/>*/}
                                                    {/*            </Link>*/}
                                                    {/*        </div>*/}
                                                    {/*        <div className="chat-body">*/}
                                                    {/*            <div className="chat-bubble">*/}
                                                    {/*                <div className="chat-content">*/}
                                                    {/*                    <p>*/}
                                                    {/*                        <strong>Results:</strong>*/}
                                                    {/*                    </p>*/}
                                                    {/*                    <ul className="result-list">*/}
                                                    {/*                        {llmResult && <li><strong>AI*/}
                                                    {/*                            Result:</strong> {llmResult}</li>}*/}
                                                    {/*                        {vectorResult && <li><strong>Vector*/}
                                                    {/*                            Result:</strong> {vectorResult}</li>}*/}
                                                    {/*                        {sqlResult && <li><strong>SQL*/}
                                                    {/*                            Result:</strong> {sqlResult}</li>}*/}
                                                    {/*                        {mongoResult && <li><strong>Mongo*/}
                                                    {/*                            Result:</strong> {mongoResult}</li>}*/}
                                                    {/*                    </ul>*/}
                                                    {/*                    {sources && (*/}
                                                    {/*                        <p className="sources">*/}
                                                    {/*                            <em><strong>Sources:</strong> <span*/}
                                                    {/*                                className="highlight">{sources}</span></em>*/}
                                                    {/*                        </p>*/}
                                                    {/*                    )}*/}
                                                    {/*                </div>*/}
                                                    {/*            </div>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*)}*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="chat-footer">
                                    <div className="message-bar">
                                        <div className="message-inner">
                                            <Link
                                                className="link attach-icon"
                                                to="#"
                                                data-bs-toggle="modal"
                                                data-bs-target="#drag_files"
                                            >
                                                <img src={Attachment} alt=""/>
                                            </Link>
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
                                                            className="btn btn-primary"
                                                            type="button"
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? (
                                                                <FaSpinner className="animate-spin"/>
                                                            ) : (
                                                                <i className="fa-solid fa-paper-plane"/>
                                                            )}
                                                        </button>
                                                    </span>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Chats View */}
                        {/* Chat Right Sidebar */}
                        <div
                            className="col-lg-3 message-view chat-profile-view chat-sidebar"
                            id="task_window">
                            <div className="chat-window video-window">
                                <div className="fixed-header">
                                    <ul className="nav nav-tabs nav-tabs-bottom">
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link active"
                                                to="#chat_tab"
                                                data-bs-toggle="tab">
                                                Chat Configuration
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content chat-contents">
                                    <div
                                        className="content-full tab-pane show active"
                                        id="profile_tab">
                                        <div className="display-table">
                                            <div className="table-row">
                                                <div className="table-body">
                                                    <div className="table-content">
                                                        <div className="container">
                                                            <div className="row filter-row mt-4">
                                                                <div className="col-sm-12 col-md-12">
                                                                    <div
                                                                        className="input-block form-focus select-focus">
                                                                        <select
                                                                            value={role}
                                                                            onChange={(e) => setRole(e.target.value)}
                                                                            className="form-select form-control"
                                                                        >
                                                                            <option value="customer_service">Customer
                                                                                Service
                                                                            </option>
                                                                            <option value="manager">Manager</option>
                                                                            <option value="hr">HR</option>
                                                                            <option value="admin">Admin</option>
                                                                        </select>
                                                                        <label className="focus-label">Select your
                                                                            Role</label>
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
                            </div>
                        </div>
                        {/* /Chat Right Sidebar */}
                    </div>
                    {/* /Chat Main Wrapper */}
                </div>
                {/* /Chat Main Row */}

                {/* Drop files Modal */}
                <div id="drag_files" className="modal custom-modal fade" role="dialog" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Files upload</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="js-upload-form">
                                    <div className="input-block">
                                        <label className="text-primary">
                                            Please upload your files here
                                        </label>
                                        <input className="form-control" type="file" multiple
                                               onChange={handleFileChange}/>
                                        <p className="text-danger text-xs mt-2">
                                            *Ensure each file does not exceed the file limit of 5mb
                                        </p>
                                    </div>
                                </form>
                                <div className="submit-section">
                                    <button onClick={handleUpload} className="btn btn-primary submit-btn">Upload Files
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Drop files Modal */}
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

export default UserHome;
