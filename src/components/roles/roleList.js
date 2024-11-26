import React, {useContext, useEffect, useState} from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import {Link} from "react-router-dom";
import RoleForm from "./roleForm";
import Select from "react-select";
import fetchWithAuth from "../../utils/FetchWithAuth";
import {format} from "date-fns";
import {toast} from "react-toastify";
import {userContext} from "../../InitialPage/context/UserContext";

const RoleList = () => {
    const [menu, setMenu] = useState(false);
    const [entriesCount, setEntriesCount] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [roles, setRoles] = useState([]);
    const [dataSources, setDataSources] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [searchInput, setSearchInput] = useState('');
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

    const handleEntriesChange = (e) => {
        const value = e.target.value;
        setEntriesPerPage(value === "all" ? entriesCount : parseInt(value));
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Fetch roles data
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await fetchWithAuth(
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/roles",
                    {}, user.token
                );
                setRoles(data);
                setFilteredRoles(data);
                setEntriesCount(data.length);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
    }, []);


    // Fetch datasources data
    useEffect(() => {
        const fetchDataSources = async () => {
            try {
                const data = await fetchWithAuth(
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/dataSources",
                    {}, user.token
                );
                setDataSources(data);
            } catch (error) {
                console.error("Failed to fetch data sources:", error);
            }
        };

        fetchDataSources();
    }, []);

    // Filter roles based on search term
    useEffect(() => {
        const filtered = roles.filter(role =>
            role.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            role.createdDate.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredRoles(filtered);
        setEntriesCount(filtered.length);
    }, [searchInput, roles]);

    const addNewRole = (newRole) => {
        // Update the `roles` state to include the new role
        setRoles((prevRoles) => {
            const updatedRoles = [newRole, ...prevRoles];
            // Update filtered roles to include the new role if it matches the current search input
            setFilteredRoles(
                updatedRoles.filter((role) =>
                    role.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    role.createdDate.toLowerCase().includes(searchInput.toLowerCase())
                )
            );
            // Update the entries count
            setEntriesCount(updatedRoles.length);
            return updatedRoles;
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;

        // Prepare the formData
        const formData = {
            name: form.elements.name.value,
            dataSources: selectedRole.dataSources.map(dataSource => dataSource.id),
        };

        console.log("formData:", formData); // Debugging

        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            showToast("Authentication token missing. Please log in again.", "error");
            return;
        }

        try {
            const response = await fetch(
                `https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/roles/${selectedRole.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                showToast("Role updated successfully!", "success");

                // Update the UI state
                setRoles((prevRoles) =>
                    prevRoles.map((role) =>
                        role.id === selectedRole.id
                            ? { ...role, ...formData } // Update the specific role
                            : role
                    )
                );

            } else {
                const errorData = await response.json();
                console.error("Server error:", errorData);
                throw new Error("Role update failed.");
            }
        } catch (error) {
            console.error("Network error:", error);
            showToast("Failed to update role details. Please try again.", "error");
        }
    };

    const handleDelete = async () => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            showToast("Authorization token missing, please log in again.", "error");
            return;
        }

        try {
            const response = await fetch(
                `https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/roles/${selectedRole.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );

            if (response.ok) {
                showToast("Role deleted successfully!", "success");

                setRoles((prevRoles) => prevRoles.filter((role) => role.id !== selectedRole.id));
            } else {
                throw new Error("Role deletion failed.");
            }
        } catch (error) {
            showToast("Failed to delete role. Please try again.", "error");
        }
    }



    // Get the roles to display based on pagination
    const displayedRoles = filteredRoles.slice(0, entriesPerPage);

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
                                            <h3 className="page-title">Roles</h3>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="breadcrumb-item active">
                                                    <Link to="/admin/roles">All Roles</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-auto float-end ms-auto">
                                            <Link
                                                to="#"
                                                className="btn add-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_role">
                                                <i className="fa fa-plus"/> Add Role
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
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Datasources</th>
                                                        <th>Date Created</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {displayedRoles.map((role, index) => (
                                                        <React.Fragment>
                                                            <tr className="clickable" data-toggle="collapse"
                                                                id={`row${role.id}`}
                                                                data-target={`.row${role.id}`} key={role.id}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    {role.name}
                                                                </td>
                                                                <td>
                                                                    <Link className="btn btn-sm btn-primary" to="#">
                                                                        View Datasources
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    {format(new Date(role.createdDate), 'MMMM dd, yyyy')}
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
                                                                                data-bs-target="#edit_role"
                                                                                onClick={() => setSelectedRole(role)}
                                                                            >
                                                                                <i className="fa fa-pencil m-r-5"/> Edit
                                                                            </Link>

                                                                            <Link
                                                                                className="dropdown-item"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#delete_role"
                                                                                onClick={() => setSelectedRole(role)}
                                                                            >
                                                                                <i className="fa-regular fa-trash-can m-r-5"/> Delete
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr className={`collapse row${role.id}`}>
                                                                <td></td>
                                                                <td>
                                                                    <div>
                                                                        <ul>
                                                                            {role.dataSources.map((dataSource) => (
                                                                                <li key={dataSource.id}>{dataSource.name}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                        </React.Fragment>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="table-footer">
                                            <div className="col-sm-12 col-md-5">
                                                <div className="dataTables_info">
                                                    Showing 1 to {Math.min(entriesPerPage, entriesCount)} of {entriesCount} entries
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

                            <RoleForm addNewRole={addNewRole}/>

                            {/*Edit Role Form*/}
                            <div id="edit_role"
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
                                            <h5 className="modal-title">Edit Role</h5>
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
                                                                defaultValue={selectedRole?.name}
                                                                onChange={(e) => setSelectedRole(prev => ({
                                                                    ...prev,
                                                                    name: e.target.value
                                                                }))}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>
                                                                Datasources
                                                            </label>
                                                            <Select
                                                                isMulti
                                                                name="dataSources"
                                                                id="dataSources"
                                                                options={dataSources.map(dataSource => ({
                                                                    value: dataSource.id,
                                                                    label: dataSource.name,
                                                                }))}
                                                                value={selectedRole?.dataSources.map(dataSource => ({
                                                                    value: dataSource.id,
                                                                    label: dataSource.name,
                                                                }))}
                                                                onChange={(selected) =>
                                                                    setSelectedRole((prevRole) => ({
                                                                        ...prevRole,
                                                                        dataSources: selected.map((s) => ({
                                                                            id: s.value,
                                                                            name: s.label,
                                                                        })),
                                                                    }))
                                                                }
                                                                required
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
                            {/*Edit Role Form*/}

                            {/*Delete Role Form*/}
                            <div
                                className="modal custom-modal fade"
                                id="delete_role"
                                role="dialog"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="form-header">
                                                <h3>Delete Role</h3>
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
                            {/*Delete Role Form*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleList;
