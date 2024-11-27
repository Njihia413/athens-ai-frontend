import React, {useContext, useState} from "react";
import {userContext} from "../../InitialPage/context/UserContext";
import { Slide, toast, ToastContainer } from "react-toastify";

const ModelForm = ({ addNewModel }) => {
    const { user } = useContext(userContext);
    const [formData, setFormData] = useState({
        name: "",
        nickName: "",
        size: "",
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

    const toCamelCase = (str) => {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                index === 0 ? match.toLowerCase() : match.toUpperCase())
            .replace(/\s+/g, '')
            .replace(/[^a-zA-Z0-9]/g, '');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            nickName: formData.nickName,
            size: formData.size,
        };

        try {
            const response = await fetch(
                "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/languageModels",
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
            showToast("Model added successfully:", "success");
            addNewModel(result);

            setFormData({ name: "", nickName: "", size: "" });
        } catch (error) {
            console.error("Error adding model", error);
            showToast("Error adding model", "error");
        }
    };


    return (
        <>
            {/* Add Model Modal */}
            <div
                id="add_model"
                className="modal custom-modal fade"
                data-bs-backdrop="static"
                role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Model</h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={handleSubmit}>
                                <div className="input-block">
                                    <label>
                                        Model <span className="text-danger">*</span>
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
                                        Alias <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="nickName"
                                        id="nickName"
                                        value={formData.nickName}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="input-block">
                                    <label>
                                        Size <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="size"
                                        id="size"
                                        value={formData.size}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                    />
                                </div>
                                {/*<div className="input-block">*/}
                                {/*    <label>*/}
                                {/*        Status <span className="text-danger">*</span>*/}
                                {/*    </label>*/}
                                {/*    <select*/}
                                {/*        className="form-select form-control"*/}
                                {/*        name="status"*/}
                                {/*    >*/}
                                {/*        <option value="active">Active</option>*/}
                                {/*        <option value="inactive">Inactive</option>*/}
                                {/*    </select>*/}
                                {/*</div>*/}
                                {/*<div className="input-block">*/}
                                {/*    <label>*/}
                                {/*        Upload Model <span className="text-danger">*</span>*/}
                                {/*    </label>*/}
                                {/*    <input className="form-control" type="file"/>*/}
                                {/*</div>*/}
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn" data-bs-dismiss="modal"
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

export default ModelForm;
