import React from "react";

const ModelForm = () => {
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
                            <form noValidate>
                                {/*<div className="input-block">*/}
                                {/*    <label>*/}
                                {/*        ID <span className="text-danger">*</span>*/}
                                {/*    </label>*/}
                                {/*    <input*/}
                                {/*        className="form-control"*/}
                                {/*        type="text"*/}
                                {/*        name="modelId"*/}
                                {/*        autoComplete="off"*/}
                                {/*        required*/}
                                {/*        defaultValue="mid5"*/}
                                {/*        disabled={true}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div className="input-block">
                                    <label>
                                        Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="modelName"
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
                                        autoComplete="off"
                                    />
                                </div>
                                {/*<div className="input-block">*/}
                                {/*    <label>*/}
                                {/*        Size <span className="text-danger">*</span>*/}
                                {/*    </label>*/}
                                {/*    <input*/}
                                {/*        className="form-control"*/}
                                {/*        type="text"*/}
                                {/*        name="size"*/}
                                {/*        autoComplete="off"*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div className="input-block">
                                    <label>
                                        Status <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select form-control"
                                        name="status"
                                    >
                                        <option value={1}>Active</option>
                                        <option value={2}>Inactive</option>
                                    </select>
                                </div>
                                <div className="input-block">
                                    <label>
                                        Upload Model <span className="text-danger">*</span>
                                    </label>
                                    <input className="form-control" type="file"/>
                                </div>
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
        </>
    )
}

export default ModelForm;
