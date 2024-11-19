import React, {useState} from "react";
import ChatSidebar from "../common/ChatSidebar";
import UserHeader from "../common/UserHeader";
import UserHome from "./UserHome";

const User = () => {
    const [menu, setMenu] = useState(false)

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    return (
        <>
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <UserHeader onMenuClick={() => toggleMobileMenu()}/>

                <div>
                    <UserHome/>
                </div>

                <ChatSidebar/>
            </div>
        </>
    )
}

export default User;
