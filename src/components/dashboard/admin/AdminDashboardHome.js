import React, {useContext, useEffect, useState} from "react";
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
import fetchWithAuth from "../../../utils/FetchWithAuth";
import {userContext} from "../../../InitialPage/context/UserContext";

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
    const [dataSources, setDataSources] = useState([]);
    const [roles, setRoles] = useState([]);


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

    const { user } = useContext(userContext);
    const rolesArray = (user.roles);
    const role = rolesArray && rolesArray.length > 0 ? rolesArray[0] : "User";


    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const data = await fetchWithAuth(
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff",
                    {}, user.token
                );
                setUsers(data);
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        };

        fetchStaff();
    }, []);


    useEffect(() => {
        const fetchDataSources = async () => {
            try {
                const data = await fetchWithAuth(
                    "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/dataSources",
                    {}, user.token
                );
                setDataSources(data);
            } catch (error) {
                console.error("Failed to fetch data sources:", error);
            }
        };

        fetchDataSources();
    }, []);


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
                                          <i className="fa-regular fa-ticket" />
                                        </span>
                                        <div className="dash-widget-info">
                                            <h3>{roles.length}</h3>
                                            <span>Roles</span>
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
                                                        <Bar dataKey="October Users" fill="#3445d8" />
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
                                                            stroke="#3445d8"
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
