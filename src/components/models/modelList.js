import React, {useContext, useEffect, useState} from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import {Link} from "react-router-dom";
import ModelForm from "./modelForm";
import {format} from "date-fns";
import fetchWithAuth from "../../utils/FetchWithAuth";
import {Slide, toast, ToastContainer} from "react-toastify";
import {userContext} from "../../InitialPage/context/UserContext";

const ModelList = () => {
    const [menu, setMenu] = useState(false);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [models, setModels] = useState([]);
    const [displayedModels, setDisplayedModels] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedModel, setSelectedModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(userContext);

    const toggleMobileMenu = () => {
        setMenu(!menu);
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

    const [editFormData, setEditFormData] = useState({
        name: "",
        nickName: "",
        size: "",
        status: ""
    });

    // Populate state with selectedModel when it changes
    useEffect(() => {
        if (selectedModel) {
            setEditFormData({
                name: selectedModel.name || "",
                nickName: selectedModel.nickName || "",
                size: selectedModel.size || "",
                status: selectedModel.status || ""
            });
        }
    }, [selectedModel]);

    const handleEntriesChange = (e) => {
        const value = e.target.value;
        const count = value === 'all' ? models.length : parseInt(value);
        setEntriesPerPage(count);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
    };

    // Fetch models data
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const data = await fetchWithAuth(
                   "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/languageModels",
                    {}, user.token
                );
                setModels(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        }
        fetchModels();
    }, []);


    useEffect(() => {
        // Filter data based on the search input
        const filteredData = models.filter((model) =>
            // model.model.toLowerCase().includes(searchInput.toLowerCase()) ||
            model.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            model.nickName.toLowerCase().includes(searchInput.toLowerCase())
            // model.size.toLowerCase().includes(searchInput.toLowerCase())
            // model.status.toLowerCase.includes(searchInput.toLowerCase())
        );

        // Apply pagination to filtered data
        setDisplayedModels(filteredData.slice(0, entriesPerPage));
    }, [searchInput, entriesPerPage, models]);

    const addNewModel = (newModel) => {
        setModels((prevModels) => {
            const updatedModels = [...prevModels, newModel];
            setDisplayedModels(updatedModels.slice(0, entriesPerPage));
            return updatedModels;
        });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = {
            name: form.elements.name.value,
            nickName: form.elements.nickName.value,
            size: form.elements.size.value,
            status: form.elements.status.value
        }

        try {
            const response = await fetch(`https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/languageModels/${selectedModel.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showToast("Model updated successfully!", "success");

                // Update the UI state to reflect the updated model details
                setModels((prevModels) =>
                    prevModels.map((model) =>
                        model.id === selectedModel.id
                            ? {...model, ...formData}
                            : model
                    )
                );

            } else {
                throw new Error("Model update failed.");
            }
        } catch (error) {
            showToast("Failed to update model details. Please try again.", "error");
        }
    }


    const handleDelete = async () => {

        try {
            const response = await fetch(
                `https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/languageModels/${selectedModel.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                }
            );

            if (response.ok) {
                showToast("Model deleted successfully!", "success");

                setModels((prevModels) => prevModels.filter((model) => model.id !== selectedModel.id));
            } else {
                throw new Error("Model deletion failed.");
            }
        } catch (error) {
            showToast("Failed to delete model. Please try again.", "error");
        }
    }

    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <div className="app-container">
                    <Header onMenuClick={() => toggleMobileMenu()}/>
                    <div className="main-content">
                        <Sidebar/>
                        <div className="page-wrapper">
                            <div className="content container-fluid">
                                <div className="page-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="page-title">Models</h3>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="breadcrumb-item active">
                                                    <Link to="/admin/models">All Models</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-auto float-end ms-auto">
                                            <Link
                                                to="#"
                                                className="btn add-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_model">
                                                <i className="fa fa-plus"/> Add Model
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-12">
                                        <div className="table-header">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_length">
                                                        <label>
                                                            Show
                                                            <select className="form-control form-control-sm"
                                                                    value={entriesPerPage}
                                                                    onChange={handleEntriesChange}>
                                                                <option value="all">All</option>
                                                                <option value="5">5</option>
                                                                <option value="10">10</option>
                                                                <option value="25">25</option>
                                                                <option value="50">50</option>
                                                                <option value="100">100</option>
                                                            </select>
                                                            Entries
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_filter">
                                                        <label>
                                                            Search:
                                                            <input
                                                                className="form-control form-control-sm"
                                                                value={searchInput}
                                                                onChange={handleSearchChange}
                                                            />

                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row dt-row mt-4">
                                            <div className="table-responsive">
                                                <table className="table table-striped custom-table datatable">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Model</th>
                                                        <th>Upload Date</th>
                                                        <th>Alias</th>
                                                        <th>Size</th>
                                                        <th>Status</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {displayedModels.map((model, index) => (
                                                        <tr key={model.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{model.name}</td>
                                                            <td>{format(new Date(model.addedOn), 'MMMM dd, yyyy')}</td>
                                                            <td>{model.nickName}</td>
                                                            <td>{model.size} GB</td>
                                                            <td>
                                                                <div className="dropdown action-label mt-2">
                                                                    <Link to="#"
                                                                          className="btn btn-white btn-sm btn-rounded"
                                                                          aria-expanded="false">
                                                                        <i className={`fa-regular fa-circle-dot text-${model.status === 'active' ? 'success' : 'danger'}`}></i>
                                                                        {model.status === 'active' ? 'Active' : 'Inactive'}
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown profile-action">
                                                                    <Link
                                                                        to="#"
                                                                        className="action-icon dropdown-toggle"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <i className="material-icons">more_vert</i>
                                                                    </Link>
                                                                    <div
                                                                        className="dropdown-menu dropdown-menu-right">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            to="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#edit_model"
                                                                            onClick={() => setSelectedModel(model)}
                                                                        >
                                                                            <i className="fa fa-pencil m-r-5"/> Edit
                                                                        </Link>

                                                                        <Link
                                                                            className="dropdown-item"
                                                                            to="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delete_model"
                                                                            onClick={() => setSelectedModel(model)}
                                                                        >
                                                                            <i className="fa-regular fa-trash-can m-r-5"/> Delete
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="table-footer">
                                            <div className="col-sm-12 col-md-5">
                                                <div className="dataTables_info">
                                                    Showing 1 to {displayedModels.length} of {models.length} entries
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {loading && (
                                    <div className="text-center">
                                        <div
                                            className="spinner-border text-primary"
                                            role="status"
                                            style={{ width: "3rem", height: "3rem" }}
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <ModelForm addNewModel={addNewModel}/>

                            {/*Edit Model Form*/}
                            <div id="edit_model"
                                 className="modal custom-modal fade"
                                 role="dialog"
                                 data-bs-backdrop="static"
                                 data-bs-keyboard="false"
                            >
                                <div
                                    className="modal-dialog modal-dialog-centered"
                                    role="document"
                                >
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Model</h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleUpdate}>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>
                                                                Name
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                value={editFormData.name}
                                                                onChange={handleInputChange}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                    <div className="input-block">
                                                            <label>
                                                                Nickname
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="nickName"
                                                                id="nickName"
                                                                value={editFormData.nickName}
                                                                onChange={handleInputChange}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>
                                                                Size
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="size"
                                                                id="size"
                                                                value={editFormData.size}
                                                                onChange={handleInputChange}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Status</label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="status"
                                                                id="status"
                                                                value={editFormData.status}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="active">Active</option>
                                                                <option value="inactive">Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="submit-section">
                                                <button className="btn btn-primary submit-btn"
                                                            data-bs-dismiss="modal">
                                                        Update
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Edit Model Form*/}

                            {/*Delete Model Form*/}
                            <div
                                className="modal custom-modal fade"
                                id="delete_model"
                                role="dialog"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="form-header">
                                                <h3>Delete Model</h3>
                                                <p>Are you sure want to delete?</p>
                                            </div>
                                            <div className="modal-btn delete-action">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Link
                                                            to=""
                                                            className="btn btn-primary continue-btn"
                                                            onClick={handleDelete}
                                                            data-bs-dismiss="modal">
                                                            Delete
                                                        </Link>
                                                    </div>
                                                    <div className="col-6">
                                                        <Link
                                                            to=""
                                                            data-bs-dismiss="modal"
                                                            className="btn btn-primary cancel-btn">
                                                            Cancel
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Delete Model Form*/}
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

export default ModelList;
