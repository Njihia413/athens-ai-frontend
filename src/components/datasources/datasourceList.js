import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Link } from "react-router-dom";
import DatasourceForm from "./datasourceForm";
import fetchWithAuth from "../../utils/FetchWithAuth";
import {Slide, toast, ToastContainer} from "react-toastify";

const DatasourceList = () => {
    const [menu, setMenu] = useState(false);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [dataSources, setDataSources] = useState([]);
    const [displayedDataSources, setDisplayedDataSources] = useState([]);
    const [selectedDataSource, setSelectedDataSource] = useState(null);
    const [searchInput, setSearchInput] = useState('');

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

    const handleEntriesChange = (e) => {
        const value = e.target.value;
        const count = value === 'all' ? dataSources.length : parseInt(value);
        setEntriesPerPage(count);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
    };


    useEffect(() => {
        const fetchDataSources = async () => {
            try {
                const data = await fetchWithAuth(
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/dataSources"
                );
                setDataSources(data);
            } catch (error) {
                console.error("Failed to fetch data sources:", error);
            }
        };

        fetchDataSources();
    }, []);



    useEffect(() => {
        // Filter data based on the search input
        const filteredData = dataSources.filter((dataSource) =>
            dataSource.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            dataSource.description.toLowerCase().includes(searchInput.toLowerCase()) ||
            dataSource.url.toLowerCase().includes(searchInput.toLowerCase())
        );

        // Apply pagination to filtered data
        setDisplayedDataSources(filteredData.slice(0, entriesPerPage));
    }, [searchInput, entriesPerPage, dataSources]);


    const addNewDataSource = (newDataSource) => {
        setDataSources((prevDataSources) => {
            const updatedDataSources = [...prevDataSources, newDataSource];
            setDisplayedDataSources(updatedDataSources.slice(0, entriesPerPage));
            return updatedDataSources;
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = {
            name: form.elements.name.value,
            description: form.elements.description.value,
            url: form.elements.url.value,
        }

        const authToken = localStorage.getItem("authToken");

        try {
            const response = await fetch(`https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/datasources/${selectedDataSource.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showToast("Datasource updated successfully!", "success");

                // Update the UI state to reflect the updated datasource details
                setDataSources((prevDatasources) =>
                    prevDatasources.map((datasource) =>
                        datasource.id === selectedDataSource.id
                            ? {...datasource, ...formData}
                            : datasource
                    )
                );

            } else {
                throw new Error("Datasource update failed.");
            }
        } catch (error) {
            showToast("Failed to update datasource details. Please try again.", "error");
        }
    }

    const handleDelete = async () => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            showToast("Authorization token missing, please log in again.", "error");
            return;
        }

        try {
            const response = await fetch(
                `https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/datasources/${selectedDataSource.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );

            if (response.ok) {
                showToast("Datasource deleted successfully!", "success");

                setDataSources((prevDatasources) => prevDatasources.filter((datasource) => datasource.id !== selectedDataSource.id));
            } else {
                throw new Error("Datasource deletion failed.");
            }
        } catch (error) {
            showToast("Failed to delete datasource. Please try again.", "error");
        }
    }

    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <div className="app-container">
                    <Header onMenuClick={() => toggleMobileMenu()} />
                    <div className="main-content">
                        <Sidebar />
                        <div className="page-wrapper">
                            <div className="content container-fluid">
                                <div className="page-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="page-title">Datasources</h3>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="breadcrumb-item active">
                                                    <Link to="/admin/datasources">All Datasources</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-auto float-end ms-auto">
                                            <Link
                                                to="#"
                                                className="btn add-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_datasource">
                                                <i className="fa fa-plus" /> Add Datasource
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-12">
                                        <div className="table-header">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-6">
                                                    <div className="dataTables_length">
                                                        <label>
                                                            Show
                                                            <select
                                                                className="form-control form-control-sm"
                                                                value={entriesPerPage}
                                                                onChange={handleEntriesChange}
                                                            >
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

                                                <div className="col-sm-6 col-md-6">
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
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Url</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {displayedDataSources.map(dataSource => (
                                                        <tr key={dataSource.id}>
                                                            <td>{dataSource.name}</td>
                                                            <td>{dataSource.description}</td>
                                                            <td>{dataSource.url}</td>
                                                            <td>
                                                                <div className="dropdown profile-action">
                                                                    <Link
                                                                        to="#"
                                                                        className="action-icon dropdown-toggle"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <i className="material-icons">more_vert</i>
                                                                    </Link>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            to="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#edit_datasource"
                                                                            onClick={() => setSelectedDataSource(dataSource)}
                                                                        >
                                                                            <i className="fa fa-pencil m-r-5" /> Edit
                                                                        </Link>

                                                                        <Link
                                                                            className="dropdown-item"
                                                                            to="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delete_datasource"
                                                                            onClick={() => setSelectedDataSource(dataSource)}
                                                                        >
                                                                            <i className="fa-regular fa-trash-can m-r-5" /> Delete
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
                                                    Showing 1 to {displayedDataSources.length} of {dataSources.length} entries
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DatasourceForm addNewDataSource={addNewDataSource}/>

                            {/*Edit Datasource Form*/}
                            <div id="edit_datasource" className="modal custom-modal fade" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
                                <div className="modal-dialog modal-dialog-centered " role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Datasource</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleUpdate}>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                autoComplete="off"
                                                                defaultValue={selectedDataSource?.name}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Description</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="description"
                                                                id="description"
                                                                autoComplete="off"
                                                                defaultValue={selectedDataSource?.description}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Url</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="url"
                                                                id="url"
                                                                defaultValue={selectedDataSource?.url}
                                                                autoComplete="off"
                                                            />
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

                            {/*Delete Datasource Form*/}
                            <div id="delete_datasource" className="modal custom-modal fade" role="dialog"
                                 data-bs-backdrop="static" data-bs-keyboard="false">
                                <div className="modal-dialog modal-dialog-centered " role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="form-header">
                                                <h3>Delete Datasource</h3>
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
};

export default DatasourceList;
