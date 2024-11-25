import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

const SettingsSidebar = () => {
    const location = useLocation();
    const [username, setUsername] = useState(null);
    const storedUsername = localStorage.getItem("username");

    useEffect(() => {
        // Retrieve the user's username from localStorage
        const storedUsername = localStorage.getItem("username");

        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    return (
        <>
            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div className="sidebar-menu">
                        <ul>
                            <li>
                                <Link onClick={() => localStorage.setItem("firstload", "true")}
                                      to="/user"><i className="la la-home"/>
                                    <span>Back to Home</span></Link>
                            </li>
                            <li className={location.pathname.includes('profile') ? "active" : ""}>
                                <Link to={`/user/profile/${username || "default"}`}><i className="la la-user"/>
                                    <span>Profile</span></Link>
                            </li>
                            <li className={location.pathname.includes('-password') ? "active" : ""}>
                                <Link to="/user/change-password"><i className="la la-lock"/>
                                    <span>Change Password</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsSidebar;
