import React from "react";

const DataSourceForm = (props) => {
    return (
        <>
            {/* Add Datasource Modal */}
            <div
                id="add_datasource"
                className="modal custom-modal fade"
                data-bs-backdrop="static"
                role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Datasource</h5>
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
                                <div className="input-block">
                                    <label>
                                        ID <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="datasourceID"
                                        autoComplete="off"
                                        defaultValue="11"
                                        disabled={true}
                                        required
                                    />
                                </div>
                                <div className="input-block">
                                    <label>
                                        Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="datasourceName"
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
                                        name="datasourceType"
                                    >
                                        <option value>Postgres</option>
                                        <option value={1}>Mongodb</option>
                                        <option value={2}>IP Address</option>
                                    </select>
                                </div>
                                <div className="input-block">
                                    <label>
                                        Link <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="datasourceLink"
                                        autoComplete="off"
                                        required
                                    />
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
            {/* /Add Department Modal */}
        </>
    )
}

export default DataSourceForm;
