import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Link } from "react-router-dom";
import DatasourceForm from "./datasourceForm";
import fetchWithAuth from "../../utils/FetchWithAuth";

const DatasourceList = () => {
    const [menu, setMenu] = useState(false);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [dataSources, setDataSources] = useState([]);
    const [displayedDataSources, setDisplayedDataSources] = useState([]);
    const [selectedDataSource, setSelectedDataSource] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };

    const handleEntriesChange = (e) => {
        const value = e.target.value;
        const count = value === 'all' ? dataSources.length : parseInt(value);
        setEntriesPerPage(count);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
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



    useEffect(() => {
        // Filter data based on the search input
        const filteredData = dataSources.filter((dataSource) =>
            dataSource.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            dataSource.description.toLowerCase().includes(searchInput.toLowerCase()) ||
            dataSource.url.toLowerCase().includes(searchInput.toLowerCase())
        );

        // Apply pagination to filtered data
        setDisplayedDataSources(filteredData.slice(0, entriesPerPage));
    }, [searchInput, entriesPerPage, dataSources]);


    const addNewDataSource = (newDataSource) => {
        setDataSources((prevDataSources) => {
            const updatedDataSources = [...prevDataSources, newDataSource];
            setDisplayedDataSources(updatedDataSources.slice(0, entriesPerPage));
            return updatedDataSources;
        });
    };

    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <div className="app-container">
                    <Header onMenuClick={() => toggleMobileMenu()} />
                    <div className="main-content">
                        <Sidebar />
                        <div className="page-wrapper">
                            <div className="content container-fluid">
                                <div className="page-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="page-title">Datasources</h3>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="breadcrumb-item active">
                                                    <Link to="/admin/datasources">All Datasources</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-auto float-end ms-auto">
                                            <Link
                                                to="#"
                                                className="btn add-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_datasource">
                                                <i className="fa fa-plus" /> Add Datasource
                                            </Link>
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
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Url</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {displayedDataSources.map(dataSource => (
                                                        <tr key={dataSource.id}>
                                                            <td>{dataSource.name}</td>
                                                            <td>{dataSource.description}</td>
                                                            <td>{dataSource.url}</td>
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
                                                                            data-bs-target="#edit_datasource"
                                                                            onClick={() => setSelectedDataSource(dataSource)}
                                                                        >
                                                                            <i className="fa fa-pencil m-r-5" /> Edit
                                                                        </Link>

                                                                        <Link
                                                                            className="dropdown-item"
                                                                            to="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delete_datasource"
                                                                        >
                                                                            <i className="fa-regular fa-trash-can m-r-5" /> Delete
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
                                                    Showing 1 to {displayedDataSources.length} of {dataSources.length} entries
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DatasourceForm addNewDataSource={addNewDataSource}/>

                            {/*Edit Datasource Form*/}
                            <div id="edit_datasource" className="modal custom-modal fade" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
                                <div className="modal-dialog modal-dialog-centered " role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Datasource</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                autoComplete="off"
                                                                defaultValue={selectedDataSource?.name}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Description</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="description"
                                                                id="description"
                                                                autoComplete="off"
                                                                defaultValue={selectedDataSource?.description}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input-block">
                                                            <label>Url</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="url"
                                                                id="url"
                                                                defaultValue={selectedDataSource?.url}
                                                                autoComplete="off"
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

                            {/*Delete Datasource Form*/}
                            <div id="delete_datasource" className="modal custom-modal fade" role="dialog"
                                 data-bs-backdrop="static" data-bs-keyboard="false">
                                <div className="modal-dialog modal-dialog-centered " role="document">
                                <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Delete Datasource</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete this datasource?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DatasourceList;
