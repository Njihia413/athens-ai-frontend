import React, {useEffect, useState} from "react"
import Select from 'react-select'

const RoleForm = () => {
    // const datasources = [
    //     { value: 'statements', label: 'Profit/Loss Statements' },
    //     { value: 'guidelines', label: 'Employee Guidelines' },
    //     { value: 'database', label: 'Customer Database' }
    // ]
    const [dataSources, setDataSources] = useState([]);
    useEffect(() => {
        fetch("https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/dataSources")
            .then((response) => response.json())
            .then((data) => {
                setDataSources(data);
            });
    }, []);

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
                            <form noValidate>
                                <div className="input-block">
                                    <label>
                                        ID <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="roleId"
                                        autoComplete="off"
                                        required
                                        defaultValue="rid7"
                                        disabled={true}
                                    />
                                </div>
                                <div className="input-block">
                                    <label>
                                        Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="roleName"
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="input-block">
                                    <label>Select Datasources <span className="text-danger">*</span></label>
                                    <Select
                                        isMulti
                                        name="datasources"
                                        options={dataSources.map(dataSource => ({
                                            value: dataSource.name,
                                            label: dataSource.name
                                        }))}
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
            {/* /Add Role Modal */}
        </>
    )
}

export default RoleForm;
