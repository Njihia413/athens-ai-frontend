import React, {useContext} from "react";
import {Link, useLocation} from "react-router-dom";

const SettingsSidebar = () => {

    const location = useLocation();


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
                            <li className={location.pathname.includes('-password') ? "active" : ""}>
                                <Link to="/settings/change-password"><i className="la la-lock"/>
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
