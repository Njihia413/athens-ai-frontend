import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../components/auth/Login.js";
import Landing from "../components/landing/Landing";
import AdminDashboard from "../components/dashboard/admin/AdminDashboard";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
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
                  <Route exact path="/" element={<Landing />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/reset-password" element={<ResetPassword />} />
                  <Route exact path="/guest" element={<Guest/>} />
                  <Route exact path="/user" element={<User/>} />
                  <Route exact path="/about" element={<About/>} />
                  <Route exact path="/contact" element={<Contact/>} />

                  <Route path="admin">
                      <Route index element={<AdminDashboard />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="users">
                          <Route index element={<UserList />} />
                      </Route>
                      <Route path="datasources">
                          <Route index element={<DatasourceList />} />
                      </Route>
                      <Route path="roles">
                          <Route index element={<RoleList />} />
                      </Route>
                      <Route path="models">
                          <Route index element={<ModelList />} />
                      </Route>
                      <Route path="logs">
                          <Route index element={<Logs />} />
                      </Route>
                      <Route path="settings">
                          <Route index element={<Settings />} />
                      </Route>
                  </Route>
              </Routes>
          </Router>
      </Provider>
  );
};

export default App;
