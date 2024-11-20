import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
} from "recharts";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import "../../../index.css";
import UsersTable from "./Table/UsersTable.jsx";
import DatasourcesTable from "./Table/DatasourcesTable";

const barchartdata = [
    { y: "Athens Alpha", "October Users": 100, "November Users": 90 },
    { y: "Athens Delphi", "October Users": 75, "November Users": 65 },
    { y: "Athens Heracles", "October Users": 50, "November Users": 40 },
    { y: "Athens Helios", "October Users": 75, "November Users": 65 },
];
const linechartdata = [
    { y: "1st", "Errors": 50, "Warnings": 90 },
    { y: "2nd", "Errors": 75, "Warnings": 65 },
    { y: "3rd", "Errors": 50, "Warnings": 40 },
    { y: "4th", "Errors": 75, "Warnings": 65 },
    { y: "5th", "Errors": 50, "Warnings": 40 },
    { y: "6th", "Errors": 75, "Warnings": 65 },
    { y: "7th", "Errors": 100, "Warnings": 50 },
];
const AdminDashboardHome = () => {
    const [menu, setMenu] = useState(false);
    const [users, setUsers] = useState([]);
    const [dataSources, setDatasources] = useState([]);

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };

    useEffect(() => {
        let firstload = localStorage.getItem("firstload");
        if (firstload === "false") {
            setTimeout(function () {
                window.location.reload(1);
                localStorage.removeItem("firstload");
            }, 1000);
        }
    });

    const roles = JSON.parse(localStorage.getItem("roles"));
    const role = roles && roles.length > 0 ? roles[0] : "User";


    useEffect(() => {
        fetch("https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                console.log(data);
            });
    }, []);

    useEffect(() => {
        fetch("https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/dataSources")
            .then((response) => response.json())
            .then((data) => {
                setDatasources(data);
                console.log(data);
            });
    }, []);


    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <Header onMenuClick={() => toggleMobileMenu()} />
                <Sidebar />
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        {/* Page Header */}
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="page-title">Welcome {role}!</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* /Page Header */}
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                                <div className="card dash-widget">
                                    <div className="card-body">
                                        <span className="dash-widget-icon">
                                          <i className="fa fa-user" />
                                        </span>
                                        <div className="dash-widget-info">
                                            <h3>{users.length}</h3>
                                            <span>Users</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                                <div className="card dash-widget">
                                    <div className="card-body">
                                        <span className="dash-widget-icon">
                                          <i className="fa fa-exclamation-triangle" />
                                        </span>
                                        <div className="dash-widget-info">
                                            <h3>0</h3>
                                            <span>Errors</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                                <div className="card dash-widget">
                                    <div className="card-body">
                                        <span className="dash-widget-icon">
                                          <i className="fa-regular fa-question-circle" />
                                        </span>
                                        <div className="dash-widget-info">
                                            <h3>0</h3>
                                            <span>Queries</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                                <div className="card dash-widget">
                                    <div className="card-body">
                                        <span className="dash-widget-icon">
                                          <i className="fa fa-file" />
                                        </span>
                                        <div className="dash-widget-info">
                                            <h3>{dataSources.length}</h3>
                                            <span>Datasources</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">Model Usage</h3>
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <BarChart
                                                        data={barchartdata}
                                                        margin={{
                                                            top: 5,
                                                            right: 5,
                                                            left: 5,
                                                            bottom: 5,
                                                        }}>
                                                        <CartesianGrid />
                                                        <XAxis dataKey="y" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="October Users" fill="#3A4DF1" />
                                                        <Bar dataKey="November Users" fill="#233741" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">November Logs Overview</h3>
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <LineChart
                                                        data={linechartdata}
                                                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                                        <CartesianGrid />
                                                        <XAxis dataKey="y" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="Errors"
                                                            stroke="#3A4DF1"
                                                            fill="#00c5fb"
                                                            strokeWidth={3}
                                                            dot={{ r: 3 }}
                                                            activeDot={{ r: 7 }}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="Warnings"
                                                            stroke="#233741"
                                                            fill="#0253cc"
                                                            strokeWidth={3}
                                                            dot={{ r: 3 }}
                                                            activeDot={{ r: 7 }}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <UsersTable />
                            <DatasourcesTable/>
                        </div>
                    </div>
                    {/* /Page Content */}
                </div>
            </div>
        </>
    );
};

export default AdminDashboardHome;
