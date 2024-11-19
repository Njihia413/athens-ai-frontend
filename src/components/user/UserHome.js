/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
    Attachment,
} from "../../Entryfile/imagepath";
import axios from "axios";
import AthensProfile from "../../assets/img/Logo.png"
import { ToastContainer, toast, Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserHome = () => {
    const [files, setFiles] = useState([]);
    const [query, setQuery] = useState('');
    const [role, setRole] = useState('customer_service');
    const [model, setModel] = useState('mistral');
    const [vectorResult, setVectorResult] = useState('');
    const [llmResult, setLLMResult] = useState('');
    const [sqlResult, setSqlResult] = useState('');
    const [mongoResult, setMongoResult] = useState(''); const [sources, setSources] = useState('');

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

    const handleQuery = async () => {
        try {
            const res = await axios.post('http://localhost:8000/query', { query, role, model });
            let data = res.data.message
            if (res.data) {
                console.log(data.message)
                setVectorResult(data.vector_result);
                setLLMResult(data.llm_chat_result);
                setSqlResult(data.sql_result);
                setMongoResult(data.mongo_result);
                setSources(res.data.sources || 'No sources available');
            }
        } catch (error) {
            console.error('Error querying:', error);
            alert('Error querying');
        }
    };


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
                                                {/*<div class="d-flex align-items-center gap-0 overflow-hidden">*/}
                                                {/*    <button*/}
                                                {/*        aria-label=""*/}
                                                {/*        type="button"*/}
                                                {/*        className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-3 px-2 py-1 fw-semibold"*/}
                                                {/*        data-bs-toggle="dropdown"*/}
                                                {/*        aria-expanded="false"*/}
                                                {/*    >*/}
                                                {/*            Athens Alpha*/}
                                                {/*        <svg*/}
                                                {/*            width="16"*/}
                                                {/*            height="16"*/}
                                                {/*            viewBox="0 0 24 24"*/}
                                                {/*            fill="none"*/}
                                                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                                                {/*            className="icon-sm text-muted"*/}
                                                {/*        >*/}
                                                {/*            <path*/}
                                                {/*                fill-rule="evenodd"*/}
                                                {/*                clip-rule="evenodd"*/}
                                                {/*                d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"*/}
                                                {/*                fill="currentColor"*/}
                                                {/*            ></path>*/}
                                                {/*        </svg>*/}
                                                {/*    </button>*/}
                                                {/*    <ul class="dropdown-menu">*/}
                                                {/*        <li><a className="dropdown-item" href="#">Option 1</a></li>*/}
                                                {/*        <li><a className="dropdown-item" href="#">Option 2</a></li>*/}
                                                {/*        <li><a className="dropdown-item" href="#">Option 3</a></li>*/}
                                                {/*    </ul>*/}
                                                {/*</div>*/}

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
                                        {/*<ul className="nav custom-menu">*/}
                                        {/*    <li className="nav-item">*/}
                                        {/*        <Link*/}
                                        {/*            className="nav-link task-chat profile-rightbar float-end"*/}
                                        {/*            id="task_chat"*/}
                                        {/*            to="#task_window">*/}
                                        {/*            <i className="fa fa-bars"/>*/}
                                        {/*        </Link>*/}
                                        {/*    </li>*/}
                                        {/*</ul>*/}
                                    </div>
                                </div>

                                <div className="chat-contents">
                                    <div className="chat-content-wrap">
                                        <div className="chat-wrap-inner">
                                            <div className="chat-box">
                                                <div className="chats">
                                                    {/*<div className="container-fluid">*/}
                                                    {/*    <div className="row align-items-center mt-5">*/}
                                                    {/*        <div className="welcome-message text-center">*/}
                                                    {/*            <h2 className="text-primary">Hello, Kevin</h2>*/}
                                                    {/*            <h2>What can I help you with today?</h2>*/}
                                                    {/*            <div className="prompt-container">*/}
                                                    {/*                <p>Here are some things you can ask me:</p>*/}
                                                    {/*                <div>*/}
                                                    {/*                    <ActionButtons/>*/}
                                                    {/*                </div>*/}
                                                    {/*            </div>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}

                                                    {query && (
                                                        <div className="chat chat-right">
                                                            <div className="chat-body">
                                                                <div className="chat-bubble">
                                                                    <div className="chat-content">
                                                                        <p>{query}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {llmResult && (
                                                        <div className="chat chat-left">
                                                            <div className="chat-avatar">
                                                                <Link to="/" className="avatar">
                                                                    <img alt="Athens Profile" src={AthensProfile} />
                                                                </Link>
                                                            </div>
                                                            <div className="chat-body">
                                                                <div className="chat-bubble">
                                                                    <div className="chat-content">
                                                                        <p>
                                                                            <strong>Athens AI Result</strong>
                                                                                {llmResult}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {vectorResult && (
                                                        <div className="chat chat-left">
                                                            <div className="chat-body">
                                                                <div className="chat-bubble">
                                                                    <div className="chat-content">
                                                                        <p>
                                                                            <strong>Vector Result</strong>
                                                                            {vectorResult}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {sqlResult && (
                                                        <div className="chat chat-left">
                                                            <div className="chat-body">
                                                                <div className="chat-bubble">
                                                                    <div className="chat-content">
                                                                        <p><strong>SQL Result:</strong> {sqlResult}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {mongoResult && (
                                                        <div className="chat chat-left">
                                                            <div className="chat-body">
                                                                <div className="chat-bubble">
                                                                    <div className="chat-content">
                                                                        <p><strong>Mongo Result:</strong> {mongoResult}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}


                                                    {sources && (
                                                        <div className="chat chat-left">
                                                            <div className="chat-avatar">
                                                                <Link to="/" className="avatar">
                                                                    <img alt="Athens Profile" src={AthensProfile}/>
                                                                </Link>
                                                            </div>
                                                            <div className="chat-body">
                                                                <div className="chat-bubble">
                                                                    <div className="chat-content">
                                                                        {sources ?
                                                                            <p><strong>Sources:</strong> {sources}</p> :
                                                                            <p>No sources yet</p>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
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
                                                data-bs-target="#drag_files">
                                                <img src={Attachment} alt=""/>
                                            </Link>
                                            <div className="message-area">
                                                <div className="input-group">
                                                  <textarea
                                                      value={query}
                                                      onChange={(e) => setQuery(e.target.value)}
                                                      className="form-control"
                                                      placeholder="Message Athens AI"
                                                      // defaultValue={""}
                                                  />
                                                    <span className="input-group-append">
                                                    <button
                                                        onClick={handleQuery}
                                                        className="btn btn-primary"
                                                        type="button">
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
                                                                {/*<div className="col-sm-12 col-md-12">*/}
                                                                {/*    <div className="input-block">*/}
                                                                {/*        <label>*/}
                                                                {/*            Upload file(s)*/}
                                                                {/*        </label>*/}
                                                                {/*        <input className="form-control" type="file" multiple onChange={handleFileChange}/>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}

                                                                {/*<div className="col-sm-12 col-md-12">*/}
                                                                {/*    <div className="input-block">*/}
                                                                {/*        <button onClick={handleUpload}*/}
                                                                {/*                className="btn btn-primary account-btn">Upload*/}
                                                                {/*            Files*/}
                                                                {/*        </button>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}

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

                                                                {/*<div className="col-sm-12 col-md-12">*/}
                                                                {/*    <div*/}
                                                                {/*        className="input-block form-focus select-focus">*/}
                                                                {/*        <select*/}
                                                                {/*            value={model}*/}
                                                                {/*            onChange={(e) => setModel(e.target.value)}*/}
                                                                {/*            className="form-select form-control"*/}
                                                                {/*        >*/}
                                                                {/*            <option value="mistral">Athens Alpha*/}
                                                                {/*            </option>*/}
                                                                {/*            <option value="llama3.2">Athens Delphi*/}
                                                                {/*            </option>*/}
                                                                {/*            <option value="gemma2">Athens Heracles*/}
                                                                {/*            </option>*/}

                                                                {/*        </select>*/}
                                                                {/*        <label className="focus-label">Select your*/}
                                                                {/*            Model</label>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}
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
