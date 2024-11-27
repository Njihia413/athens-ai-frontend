import React, {useContext, useState} from "react"
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import {userContext} from "../../InitialPage/context/UserContext";
import {Link} from "react-router-dom";
import {format} from "date-fns";

const AdminProfile = () => {
    const { user, updateUserDetails } = useContext(userContext);
    const [menu, setMenu] = useState(false);

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };

    // Initialize state with user data
    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        middleName: user.middleName || "N/A",
        lastName: user.lastName || "",
        roles: user.roles || [],
        dateOfBirth: user.dateOfBirth?.split("T")[0] || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        status: user.status || "",
        gender: user.gender || "",
        identificationType: user.identificationType || "",
        identificationNumber: user.identificationNumber || ""
    });

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add submission logic here (e.g., send formData to the server)
        console.log("Updated UserProfile Data:", formData);
    };

    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <div className="app-container">
                    <Header onMenuClick={toggleMobileMenu} />
                    <div className="main-content">
                        <Sidebar/>
                        <div className="page-wrapper">
                            <div className="content container-fluid">
                                <div className="page-header">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="page-title">Profile</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-0">
                                    <div className="card-body">
                                        <div className="profile-view">
                                            <div className="profile-img-wrap">
                                                <div className="profile-img">
                                                    <Link to="#">
                                                        <img
                                                            src={`https://ui-avatars.com/api/?name=${user.firstName}`}
                                                            alt=""
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="profile-basic">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="profile-info-left ">
                                                            <ul className="personal-info">
                                                                <li>
                                                                    <div className="title">First Name:</div>
                                                                    <div className="text">
                                                                        {user.firstName ? (
                                                                            user.firstName
                                                                        ) : (
                                                                            "First Name not available"
                                                                        )}
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="title">Middle Name:</div>
                                                                    <div className="text">
                                                                        {user.middleName ? (
                                                                            user.middleName
                                                                        ) : (
                                                                            "Middle Name not available"
                                                                        )}
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="title">Last Name:</div>
                                                                    <div className="text">
                                                                        {user.lastName ? (
                                                                            user.lastName
                                                                        ) : (
                                                                            "Last Name not available"
                                                                        )}
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="title">Role:</div>
                                                                    <small className=" text-muted">
                                                                        {user.roles && user.roles.length > 0 ? (
                                                                            user.roles.map((role, index) => (
                                                                                <span key={index}>
                                                                            {role}
                                                                                    {index < user.roles.length - 1 && ', '} {/* Add comma except after the last role */}
                                                                        </span>
                                                                            ))
                                                                        ) : (
                                                                            "User roles not found"
                                                                        )}

                                                                    </small>
                                                                </li>
                                                                <li>
                                                                    <div className="title">Date of Birth:</div>
                                                                    <div className="text-muted">
                                                                        {user.dateOfBirth ? (
                                                                            format(new Date(user.dateOfBirth), 'MMMM dd, yyyy') // No extra curly braces here
                                                                        ) : (
                                                                            "Date of birth not available"
                                                                        )}
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <ul className="personal-info">
                                                            <li>
                                                                <div className="title">Gender:</div>
                                                                <div className="text-muted">
                                                                    {user.gender ? (
                                                                        user.gender
                                                                    ) : (
                                                                        "Gender not available"
                                                                    )}
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="title">Phone:</div>
                                                                <div className="text">
                                                                    <Link to="#">
                                                                        {user.phoneNumber ? (
                                                                            user.phoneNumber
                                                                        ) : (
                                                                            "Phone number not found"
                                                                        )}
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="title">Email:</div>
                                                                <div className="text">
                                                                    <Link to="#">
                                                                        {user.email ? (
                                                                            user.email
                                                                        ) : (
                                                                            "Email not found"
                                                                        )}
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="title">Identification Number:</div>
                                                                <div className="text">
                                                                    {user.identificationNumber ? (
                                                                        user.identificationNumber
                                                                    ) : (
                                                                        "Identification Number not found"
                                                                    )}
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="title">Status:</div>
                                                                <div className="text">
                                                                    {user.status ? (
                                                                        user.status
                                                                    ) : (
                                                                        "Status not found"
                                                                    )}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pro-edit">
                                                <Link
                                                    data-bs-target="#profile_info"
                                                    data-bs-toggle="modal"
                                                    className="edit-icon"
                                                    to="#">
                                                    <i className="fa fa-pencil"/>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Edit AdminProfile Form*/}
                            <div
                                id="profile_info"
                                className="modal custom-modal fade"
                                role="dialog"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                            >
                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Profile Information</h5>
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
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>First Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="firstName"
                                                                autoComplete="off"
                                                                value={formData.firstName}
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
                                                                value={formData.middleName}
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
                                                                value={formData.lastName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Role</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="roles"
                                                                autoComplete="off"
                                                                value={formData.roles}
                                                                onChange={handleInputChange}
                                                                disabled={true}
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
                                                                    value={formData.dateOfBirth}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                            </div>
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
                                                                value={formData.phoneNumber}
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
                                                                autoComplete="off"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Status</label>
                                                            <input
                                                                className="form-control"
                                                                type="status"
                                                                name="status"
                                                                autoComplete="off"
                                                                value={formData.status}
                                                                onChange={handleInputChange}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Gender</label>
                                                            <select
                                                                className="form-select form-control"
                                                                name="gender"
                                                                value={formData.gender}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="input-block">
                                                            <label>Identification Number</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="identificationNumber"
                                                                autoComplete="off"
                                                                defaultValue={formData.identificationNumber}
                                                                onChange={handleInputChange}
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
                            {/*Edit AdminProfile Form*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProfile;
