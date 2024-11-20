import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../components/auth/Login.js";
import Landing from "../components/landing/Landing";
import AdminDashboard from "../components/dashboard/admin/AdminDashboard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../src/Entryfile/features/users";
import UserList from "../components/users/userList";
import DatasourceList from "../components/datasources/datasourceList";
import RoleList from "../components/roles/roleList";
import ModelList from "../components/models/modelList";
import Settings from "../components/settings/Settings";
import Register from "../components/auth/Register";
import ResetPassword from "../components/auth/ResetPassword";
import Guest from "../components/guest/Guest";
import User from "../components/user/User";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Logs from "../components/logs/Logs";
import Notifications from "../components/notifications/Notifications";
import ProtectedRoute from "./ProtectedRoute"

const App = () => {
    const store = configureStore({
        reducer: {
            user: userReducer,
        },
    });

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/reset-password" element={<ResetPassword />} />
                    <Route exact path="/guest" element={<Guest />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/notifications" element={<Notifications />} />

                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <User />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route
                            path="users"
                            element={
                                <ProtectedRoute>
                                    <UserList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="datasources"
                            element={
                                <ProtectedRoute>
                                    <DatasourceList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="roles"
                            element={
                                <ProtectedRoute>
                                    <RoleList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="models"
                            element={
                                <ProtectedRoute>
                                    <ModelList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="logs"
                            element={
                                <ProtectedRoute>
                                    <Logs />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="settings"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
