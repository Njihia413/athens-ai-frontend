import React, {useEffect, useState} from "react"
import Header from '../common/Header.js';
import Sidebar from "../common/Sidebar.js";
import {Link} from "react-router-dom";
import { format } from 'date-fns';
import {Slide, toast, ToastContainer} from "react-toastify";

const UserList = () => {
    const [menu, setMenu] = useState(false);
    const [entriesCount, setEntriesCount] = useState(0);
    const [filteredEntriesCount, setFilteredEntriesCount] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [role, setRole] = useState('customer_service');
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

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

    useEffect(() => {
        fetch("https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setEntriesCount(data.length);
                setFilteredEntriesCount(data.length);
            });
    }, []);


    const handleEntriesChange = (e) => {
        const value = e.target.value;
        setEntriesPerPage(value === 'all' ? entriesCount : parseInt(value));
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRoleFilter(e.target.value);
    };

    // Filter users based on status and role if selected, otherwise show entriesPerPage limit
    const filteredUsers = users
        .filter((user) => (statusFilter ? user.status === statusFilter : true))
        .filter((user) => (roleFilter ? user.roles.includes(roleFilter) : true)) // Check if roleFilter exists in roles array
        .slice(0, entriesPerPage);

    useEffect(() => {
        const count = users.filter((user) =>
            (statusFilter ? user.status === statusFilter : true) &&
            (roleFilter ? user.roles.includes(roleFilter) : true)
        ).length;

        setFilteredEntriesCount(count);
    }, [users, statusFilter, roleFilter]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const dateOfBirthValue = form.elements.dateOfBirth.value;

        const formData = {
            firstName: form.elements.firstName.value,
            middleName: form.elements.middleName.value,
            lastName: form.elements.lastName.value,
            gender: form.elements.gender.value,
            phoneNumber: form.elements.phoneNumber.value,
            dateOfBirth: new Date(dateOfBirthValue).toISOString(),
            identificationNumber: form.elements.identificationNumber.value,
            emailAddress: form.elements.emailAddress.value,
            roles: [form.elements.role.value],
            status: form.elements.status.value,
        };

        const authToken = localStorage.getItem("authToken");

        try {
            const response = await fetch(`https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/${selectedUser.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showToast("User updated successfully!", "success");

                // Optionally update the UI or take action after success
                // For example, you can refresh the user data or close the modal
                // and update the state to reflect the changes
            } else {
                throw new Error("User update failed.");
            }
        } catch (error) {
            showToast("Failed to update user details. Please try again.", "error");
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
                `https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/${selectedUser.username}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );

            if (response.ok) {
                showToast("User deleted successfully!", "success");

                setUsers((prevUsers) => prevUsers.filter((user) => user.username !== selectedUser.username));
            } else {
                throw new Error("User deletion failed.");
            }
        } catch (error) {
            showToast("Failed to delete user. Please try again.", "error");
        }
    };


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
                                            <h3 className="page-title">Users</h3>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="breadcrumb-item active">
                                                    <Link to="/admin/users">All Users</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="row filter-row">
                                    <div className="col-sm-6 col-md-6">
                                        <div className="input-block form-focus select-focus">
                                            <select
                                                className="form-select form-control"
                                                value={statusFilter}
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                            <label className="focus-label">Status</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-6">
                                        <div className="input-block form-focus select-focus">
                                            <select
                                                className="form-select form-control"
                                                value={roleFilter}
                                                onChange={handleRoleChange}
                                            >
                                                <option value="">Select Role</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Guest">Guest</option>
                                                <option value="UnverifiedUser">UnverifiedUser</option>
                                            </select>
                                            <label className="focus-label">Role</label>
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
                                            </div>
                                        </div>

                                        <div className="row dt-row mt-4">
                                            <div className="table-responsive">
                                                <table className="table table-striped custom-table datatable">
                                                    <thead>
                                                    <tr>
                                                        <th>First Name</th>
                                                        <th>Middle Name</th>
                                                        <th>Last Name</th>
                                                        <th>Date Joined</th>
                                                        <th>Last Login</th>
                                                        <th>Status</th>
                                                        <th>Role</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {filteredUsers.map(user => (
                                                        <tr key={user.identificationNumber}>
                                                            <td>{user.firstName}</td>
                                                            <td>{user.middleName}</td>
                                                            <td>{user.lastName}</td>
                                                            <td>{format(new Date(user.createdOn), 'MMMM dd, yyyy')}</td>
                                                            <td>
                                                                <div>
                                                                    <span
                                                                        className="d-block text-primary text-sm  text-nowrap mb-1">
                                                                        {format(new Date(user.lastLogin), 'MMMM dd, yyyy')}
                                                                    </span>
                                                                    <span
                                                                        className="d-block text-muted text-xs fw-medium">
                                                                        {format(new Date(user.lastLogin), 'hh:mm:ss a')}
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="dropdown action-label mt-2">
                                                                    <Link to="#"
                                                                          className="btn btn-white btn-sm btn-rounded "
                                                                          aria-expanded="false">
                                                                        <i className={`fa-regular fa-circle-dot text-${user.status === 'active' ? 'success' : 'danger'}`}></i>
                                                                        {user.status === 'active' ? 'Active' : 'Inactive'}
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className="badge bg-inverse-primary"
                                                                >
                                                                  {user.roles}
                                                                </span>
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
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            to="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#edit_user"
                                                                            onClick={() => setSelectedUser(user)}
                                                                        >
                                                                            <i className="fa fa-pencil m-r-5"/> Edit
                                                                        </Link>
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            to="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delete_user"
                                                                            onClick={() => setSelectedUser(user)}
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
                                                    Showing 1
                                                    to {Math.min(filteredUsers.length, entriesPerPage)} of {filteredEntriesCount} entries
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Edit User Form*/}
                            <div
                                id="edit_user"
                                className="modal custom-modal fade"
                                role="dialog"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                            >
                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title">Edit User</h5>
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
                                                    <h4 className="text-primary">Personal Details Section</h4>
                                                    {/*<div className="col-sm-6">*/}
                                                    {/*    <div className="input-block">*/}
                                                    {/*        <label>User ID</label>*/}
                                                    {/*        <input*/}
                                                    {/*            className="form-control"*/}
                                                    {/*            type="text"*/}
                                                    {/*            name="datasourceID"*/}
                                                    {/*            autoComplete="off"*/}
                                                    {/*            defaultValue={selectedUser?.id} // Prepopulate User ID*/}
                                                    {/*            disabled={true}*/}
                                                    {/*            required*/}
                                                    {/*        />*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>First Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="firstName"
                                                                autoComplete="off"
                                                                defaultValue={selectedUser?.firstName}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Middle Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="middleName"
                                                                autoComplete="off"
                                                                defaultValue={selectedUser?.middleName}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Last Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="lastName"
                                                                autoComplete="off"
                                                                defaultValue={selectedUser?.lastName}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="input-block">
                                                            <label>Gender</label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="gender"
                                                                value={selectedUser?.gender}
                                                            >
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="input-block">
                                                            <label>Phone Number</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="phoneNumber"
                                                                autoComplete="off"
                                                                defaultValue={selectedUser?.phoneNumber} // Prepopulate Phone Number
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Date of Birth (dd/mm/yyyy)</label>
                                                            <div className="cal-icon">
                                                                <input
                                                                    className="form-control datetimepicker"
                                                                    type="date"
                                                                    name="dateOfBirth"
                                                                    id="dateOfBirth"
                                                                    defaultValue={selectedUser?.dateOfBirth?.split("T")[0] || ""}
                                                                    required
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="input-block">
                                                            <label>Identification Number</label>
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="identificationNumber"
                                                                autoComplete="off"
                                                                defaultValue={selectedUser?.identificationNumber}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Email Address</label>
                                                            <input
                                                                className="form-control"
                                                                type="email"
                                                                name="emailAddress"
                                                                autoComplete="off"
                                                                defaultValue={selectedUser?.email}
                                                            />
                                                        </div>
                                                    </div>

                                                    <h4 className="text-primary">Role Section</h4>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Role</label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="role"
                                                                value={selectedUser?.roles}
                                                                onChange={(e) => setRole(e.target.value)}  // Update state on change
                                                            >
                                                                <option value="Admin">Admin</option>
                                                                <option value="Guest">Guest</option>
                                                                <option value="UnverifiedUser">UnverifiedUser</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-primary">Status Section</h4>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                        <label>Status</label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="status"
                                                                value={selectedUser?.status}
                                                            >
                                                                <option value="inactive">Inactive</option>
                                                                <option value="active">Active</option>
                                                                <option value="archived">Archived</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-primary">Reset Password</h4>
                                                    <p className="text-muted">Click on the button below to reset the
                                                        user's password</p>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <button
                                                                className="btn btn-outline-primary"
                                                                type="submit"
                                                            >
                                                                Reset Password
                                                            </button>
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
                            {/*Edit User Form*/}

                            {/*Delete User Form*/}
                            <div
                                className="modal custom-modal fade"
                                id="delete_user"
                                role="dialog"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="form-header">
                                                <h3>Delete User</h3>
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
                            {/*Delete User Form*/}
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

export default UserList;
