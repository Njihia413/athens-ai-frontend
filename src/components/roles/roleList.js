import React, {useEffect, useState} from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import {Link} from "react-router-dom";
import RoleForm from "./roleForm";
import Select from "react-select";
import fetchWithAuth from "../../utils/FetchWithAuth";

const RoleList = () => {
    const [menu, setMenu] = useState(false);
    const [entriesCount, setEntriesCount] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [roles, setRoles] = useState([]);
    const [dataSources, setDataSources] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const toggleMobileMenu = () => {
        setMenu(!menu);
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
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/roles"
                );
                setRoles(data);
                setFilteredRoles(data);
                setEntriesCount(data.length);
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
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/dataSources"
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
            role.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredRoles(filtered);
        setEntriesCount(filtered.length);
    }, [searchInput, roles]);

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
                                                        <th>Name</th>
                                                        <th>Datasources</th>
                                                        <th>Date Created</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {displayedRoles.map(role => (
                                                        <React.Fragment>
                                                            <tr className="clickable" data-toggle="collapse"
                                                                id={`row${role.id}`}
                                                                data-target={`.row${role.id}`} key={role.id}>
                                                                <td>
                                                                    {role.name}
                                                                </td>
                                                                <td>
                                                                    <Link className="btn btn-sm btn-primary" to="#">
                                                                        View Datasources
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    {/*{role.dateCreated}*/}
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
                                                                    {/*<div>*/}
                                                                    {/*    <ul>*/}
                                                                    {/*        /!* Map through the dataSources array and create a list item for each entry *!/*/}
                                                                    {/*        {role.dataSources && role.dataSources.map((dataSource, index) => (*/}
                                                                    {/*            <li key={index}>{dataSource}</li>*/}
                                                                    {/*        ))}*/}
                                                                    {/*    </ul>*/}
                                                                    {/*</div>*/}
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
                            </div>

                            <RoleForm/>

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
                                            <form>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>
                                                                ID
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="roleId"
                                                                autoComplete="off"
                                                                required
                                                                defaultValue={selectedRole?.id}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>
                                                                Name
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="roleName"
                                                                defaultValue={selectedRole?.name}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>
                                                                Datasources
                                                            </label>
                                                            {/*<Select*/}
                                                            {/*    isMulti*/}
                                                            {/*    name="datasources"*/}
                                                            {/*    options={dataSources.map(dataSource => ({*/}
                                                            {/*        value: dataSource.name,*/}
                                                            {/*        label: dataSource.name*/}
                                                            {/*    }))}*/}
                                                            {/*    value={selectedRole?.dataSources.map((ds) => ({*/}
                                                            {/*        value: ds,*/}
                                                            {/*        label: ds.charAt(0).toUpperCase() + ds.slice(1),*/}
                                                            {/*    }))}*/}
                                                            {/*    required*/}
                                                            {/*/>*/}
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
                                                        <Link to="" className="btn btn-primary continue-btn" data-bs-dismiss="modal">
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
