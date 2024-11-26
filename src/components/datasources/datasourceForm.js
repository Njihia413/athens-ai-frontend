import React, { useContext, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { userContext } from "../../InitialPage/context/UserContext";

const DataSourceForm = ({ addNewDataSource }) => {
    const { user } = useContext(userContext);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        url: "",
    });

    const showToast = (message, type) => {
        console.log(`Showing toast: ${message} - ${type}`);
        switch (type) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            default:
                toast(message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;

        // Determine URL prefix based on type
        let urlPrefix = "";
        if (value === "postgres") {
            urlPrefix = "postgresql://";
        } else if (value === "mongodb") {
            urlPrefix = "mongodb://";
        } else if (value === "") {
            urlPrefix = ""
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            url: urlPrefix || prevFormData.url, // Preserve URL if not Postgres or MongoDB
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            type: formData.type,
            description: formData.description,
            url: formData.url,
        };

        try {
            const response = await fetch(
                "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/dataSources",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            showToast("Datasource added successfully:", "success");
            addNewDataSource(result);

            setFormData({ name: "", type: "", description: "", url: "" });
        } catch (error) {
            console.error("Error adding datasource:", error);
            showToast("Error adding datasource:", "error");
        }
    };

    return (
        <>
            {/* Add Datasource Modal */}
            <div
                id="add_datasource"
                className="modal custom-modal fade"
                data-bs-backdrop="static"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Datasource</h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={handleSubmit}>
                                <div className="input-block">
                                    <label>
                                        Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="input-block">
                                    <label>
                                        Type <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select form-control"
                                        name="type"
                                        id="type"
                                        value={formData.type}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="postgres">Postgres</option>
                                        <option value="mongodb">MongoDB</option>
                                        <option value="sharedfiles">
                                            Shared Folders/Files
                                        </option>
                                    </select>
                                </div>
                                <div className="input-block">
                                    <label>
                                        Description <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="input-block">
                                    <label>
                                        Url <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="url"
                                        id="url"
                                        value={formData.url}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="submit-section">
                                    <button
                                        className="btn btn-primary submit-btn"
                                        data-bs-dismiss="modal"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
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

export default DataSourceForm;
