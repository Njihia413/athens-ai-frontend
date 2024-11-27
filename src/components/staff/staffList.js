import React, {useContext, useEffect, useState} from "react"
import Header from '../common/Header.js';
import Sidebar from "../common/Sidebar.js";
import {Link} from "react-router-dom";
import { format } from 'date-fns';
import {Slide, toast, ToastContainer} from "react-toastify";
import fetchWithAuth from "../../utils/FetchWithAuth";
import {userContext} from "../../InitialPage/context/UserContext";

const StaffList = () => {
    const [menu, setMenu] = useState(false);
    const [entriesCount, setEntriesCount] = useState(0);
    const [filteredEntriesCount, setFilteredEntriesCount] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setRole] = useState("");
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

    // Populate state with selectedUser data when modal is opened
    useEffect(() => {
        if (selectedUser) {
            setEditFormData({
                firstName: selectedUser.firstName || "",
                middleName: selectedUser.middleName || "",
                lastName: selectedUser.lastName || "",
                gender: selectedUser.gender || "",
                phoneNumber: selectedUser.phoneNumber || "",
                dateOfBirth: selectedUser.dateOfBirth?.split("T")[0] || "",
                identificationNumber: selectedUser.identificationNumber || "",
                email: selectedUser.email || "",
                roles: selectedUser.roles || [],
                status: selectedUser.status || "",
            });
        }
    }, [selectedUser]);

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
    }, []);


    // Fetch roles data
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await fetchWithAuth(
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/roles",
                    {}, user.token
                );
                setRoles(data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
    }, []);


    const handleEntriesChange = (e) => {
        const value = e.target.value;
        setEntriesPerPage(value === 'all' ? entriesCount : parseInt(value));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the form data state
        setEditFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData,
                [name]: value,
            };

            // Log the current field name and its new value
            console.log(`Field updated: ${name}, New value: ${value}`);
            console.log('Updated Form Data:', updatedFormData);

            return updatedFormData;
        });
    };


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRoleFilter(e.target.value);
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

        const authToken = localStorage.getItem("authToken");

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
                                                        <th>#</th>
                                                        {/* Added serial number column */}
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
                                                    {filteredUsers.map((user, index) => (
                                                        <tr key={user.identificationNumber}>
                                                            <td>{index + 1}</td>
                                                            {/* Display serial number starting from 1 */}
                                                            <td>{user.firstName}</td>
                                                            <td>{user.middleName}</td>
                                                            <td>{user.lastName}</td>
                                                            <td>{format(new Date(user.createdOn), 'MMMM dd, yyyy')}</td>
                                                            <td>
                                                                <div>
                                                                    {user.lastLogin ? (
                                                                        <>
                                                                            <span className="d-block text-primary text-sm text-nowrap mb-1">
                                                                                {format(new Date(user.lastLogin), 'MMMM dd, yyyy')}
                                                                            </span>
                                                                            <span
                                                                                className="d-block text-muted text-xs fw-medium">
                                                                                {format(new Date(user.lastLogin), 'hh:mm:ss a')}
                                                                            </span>
                                                                        </>
                                                                    ) : (
                                                                        <span
                                                                            className="d-block text-muted text-xs fw-medium">Not available</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td>
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
                                                            </td>
                                                            <td>
                                                                <span className="badge bg-inverse-primary">
                                                                    {user.roles}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown profile-action">
                                                                    <Link
                                                                        to="#"
                                                                        className="action-icon dropdown-toggle"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="false"
                                                                    >
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

export default StaffList;
