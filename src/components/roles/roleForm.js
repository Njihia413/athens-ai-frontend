import React, {useEffect, useState} from "react"
import Select from 'react-select'
import fetchWithAuth from "../../utils/FetchWithAuth";
import {Slide, toast, ToastContainer} from "react-toastify";

const RoleForm = ({ addNewRole }) => {
    const [datasources, setDataSources] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        dataSources: []
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            dataSources: formData.dataSources,
        };

        console.log("Payload being sent:", payload);

        try {
            const authToken = localStorage.getItem("authToken");
            const response = await fetch(
                "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/roles",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            showToast("Role added successfully:", "success");
            addNewRole(result);
            setFormData({ name: "", dataSources: [] });
        } catch (error) {
            console.error("Error adding role:", error);
            showToast("Error adding role. Please try again.", "error");
        }
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

    // const handleDataSourcesChange = (selectedOptions) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         dataSources: selectedOptions.map((option) => option.value),
    //     }));
    // };


    return (
        <>
            {/* Add Role Modal */}
            <div
                id="add_role"
                className="modal custom-modal fade"
                data-bs-backdrop="static"
                role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Role</h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
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
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="input-block">
                                    <label>
                                        Select Datasources <span className="text-danger">*</span>
                                    </label>
                                    <Select
                                        isMulti
                                        name="dataSources"
                                        id="dataSources"
                                        value={formData.dataSources.map((ds) => ({
                                            value: ds,
                                            label: ds,
                                        }))}
                                        onChange={(selectedOptions) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                dataSources: selectedOptions.map((option) => option.value),
                                            }))
                                        }
                                        options={datasources.map((datasource) => ({
                                            value: datasource.id,
                                            label: datasource.name,
                                        }))}
                                        required
                                    />
                                </div>
                                <div className="submit-section">
                                    <button
                                        className="btn btn-primary submit-btn"
                                        data-bs-dismiss="modal"
                                        type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Role Modal */}
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

export default RoleForm;
