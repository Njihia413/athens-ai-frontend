import React, {useContext, useEffect, useState} from "react"
import Header from '../common/Header.js';
import Sidebar from "../common/Sidebar.js";
import {Link} from "react-router-dom";
import {NavLink} from "react-router";
import fetchWithAuth from "../../utils/FetchWithAuth";
import {userContext} from "../../InitialPage/context/UserContext";
import {toast} from "react-toastify";

const StaffCards = () => {
    const [menu, setMenu] = useState(false);
    const [roles, setRoles] = useState([]);
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredEntriesCount, setFilteredEntriesCount] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [entriesCount, setEntriesCount] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
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
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: "",
        identificationNumber: "",
        email: "",
        roles: [],
        status: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleRoleChange = (e) => {
        setRoleFilter(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    // Filter staff based on status, role, and search input
    const filteredUsers = users
        .filter((user) => (statusFilter ? user.status === statusFilter : true))
        .filter((user) => (roleFilter ? user.roles.includes(roleFilter) : true))
        .filter((user) => {
            return user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.createdOn.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.status.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.roles.some(role => role.toLowerCase().includes(searchInput.toLowerCase()))
        })
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
        .slice(0, entriesPerPage);

    useEffect(() => {
        const count = users.filter((user) =>
            (statusFilter ? user.status === statusFilter : true) &&
            (roleFilter ? user.roles.includes(roleFilter) : true) &&
            (user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.createdOn.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.status.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.roles.some(role => role.toLowerCase().includes(searchInput.toLowerCase()))
            )
        ).length;

        setFilteredEntriesCount(count);
    }, [users, statusFilter, roleFilter, searchInput]);

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
            email: form.elements.email.value,
            roles: [form.elements.roles.value],
            status: form.elements.status.value,
        };

        try {
            const response = await fetch(`https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/${selectedUser.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showToast("Staff member details updated successfully!", "success");

                // Update the UI state to reflect the updated user details
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.username === selectedUser.username
                            ? { ...user, ...formData }  // Update the user with new data
                            : user
                    )
                );

                // Optionally close the modal or reset form state
                // setSelectedUser(null); // If you want to clear the selected user
            } else {
                throw new Error("User update failed.");
            }
        } catch (error) {
            showToast("Failed to update staff details. Please try again.", "error");
        }
    };


    const handleDelete = async () => {
        try {
            const response = await fetch(
                `https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/${selectedUser.username}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                }
            );

            if (response.ok) {
                showToast("Staff member deleted successfully!", "success");

                setUsers((prevUsers) => prevUsers.filter((user) => user.username !== selectedUser.username));
            } else {
                throw new Error("User deletion failed.");
            }
        } catch (error) {
            showToast("Failed to delete staff member. Please try again.", "error");
        }
    };

    // Fetch staff data
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const data = await fetchWithAuth(
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff",
                    {}, user.token
                );
                setUsers(data);
                setEntriesCount(data.length);
                setFilteredEntriesCount(data.length);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        };

        fetchStaff();
    });

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
                                            <h3 className="page-title">Staff</h3>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="breadcrumb-item active">
                                                    <Link to="/admin/staff">All Staff</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-auto float-end ms-auto">
                                            <div className="view-icons">
                                                <NavLink
                                                    to="/admin/staff/list"
                                                    className="list-view btn btn-link"
                                                    activeClassName="active"
                                                >
                                                    <i className="fa fa-bars"/>
                                                </NavLink>
                                                <NavLink
                                                    to="/admin/staff/cards"
                                                    className="grid-view btn btn-link mx-2"
                                                    activeClassName="active"
                                                >
                                                    <i className="fa fa-th"/>
                                                </NavLink>
                                            </div>
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
                                                <option value="pending">Pending</option>
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
                                                {roles.length > 0 ? (
                                                    roles.map((role) => (
                                                        <option key={role.id} value={role.name}>
                                                            {role.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">Loading roles...</option> // Loading state if roles are not fetched
                                                )}
                                            </select>
                                            <label className="focus-label">Role</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row staff-grid-row">
                                    {filteredUsers.map((user, index) => (
                                        <div key={user.id} className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                                            <div className="profile-widget">
                                                <div className="profile-img">
                                                    <Link to="#"
                                                          className="avatar">
                                                        <img src={`https://ui-avatars.com/api/?name=${user.firstName}`} alt=""/>
                                                    </Link>
                                                </div>
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
                                                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                                                    <Link to='#'>
                                                        {user.firstName}
                                                    </Link>
                                                </h4>
                                                <div className="small text-muted">{user.roles}</div>
                                                <div className="dropdown action-label mt-2">
                                                    <Link
                                                        to="#"
                                                        className="btn btn-white btn-sm btn-rounded"
                                                        aria-expanded="false"
                                                    >
                                                        <i
                                                            className={`fa-regular fa-circle-dot text-${
                                                                user.status === 'active'
                                                                    ? 'success'
                                                                    : user.status === 'inactive'
                                                                        ? 'danger'
                                                                        : user.status === 'pending'
                                                                            ? 'warning'
                                                                            : 'info'
                                                            }`}
                                                        ></i>
                                                        {user.status === 'active'
                                                            ? 'Active'
                                                            : user.status === 'inactive'
                                                                ? 'Inactive'
                                                                : user.status === 'pending'
                                                                    ? 'Pending'
                                                                    : 'Unknown'}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                            <h5 className="modal-title">Edit Staff</h5>
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
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>First Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="firstName"
                                                                autoComplete="off"
                                                                defaultValue={editFormData.firstName}
                                                                onChange={handleInputChange}
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
                                                                defaultValue={editFormData.middleName}
                                                                onChange={handleInputChange}
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
                                                                defaultValue={editFormData.lastName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="input-block">
                                                            <label>Gender</label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="gender"
                                                                value={editFormData.gender}
                                                                onChange={handleInputChange}
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
                                                                defaultValue={editFormData.phoneNumber}
                                                                onChange={handleInputChange}
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
                                                                    defaultValue={editFormData.dateOfBirth?.split("T")[0] || ""}
                                                                    onChange={handleInputChange}
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
                                                                defaultValue={editFormData.identificationNumber}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Email Address</label>
                                                            <input
                                                                className="form-control"
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                autoComplete="off"
                                                                defaultValue={editFormData.email}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <h4 className="text-primary">Role Section</h4>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Role</label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="roles"
                                                                value={editFormData.roles}
                                                                onChange={handleInputChange}
                                                            >
                                                                {/* Map over roles and create option elements dynamically */}
                                                                {roles.length > 0 ? (
                                                                    roles.map((role) => (
                                                                        <option key={role.id} value={role.name}>
                                                                            {role.name}
                                                                        </option>
                                                                    ))
                                                                ) : (
                                                                    <option value="">Loading roles...</option> // Loading state if roles are not fetched
                                                                )}
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
                                                                value={editFormData.status}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="active">Active</option>
                                                                <option value="pending">Pending</option>
                                                                <option value="inactive">Inactive</option>
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
                                                <h3>Delete Staff</h3>
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
        </>
    )
}

export default StaffCards
