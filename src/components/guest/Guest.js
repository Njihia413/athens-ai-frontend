import React, {useState} from "react"
import ChatSidebar from "../common/ChatSidebar";
import GuestHome from "./GuestHome";
import GuestHeader from "../common/GuestHeader";

const Guest = () => {
    const [menu, setMenu] = useState(false)

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    return (
        <>
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <GuestHeader onMenuClick={() => toggleMobileMenu()}/>

                <div>
                    <GuestHome/>
                </div>

                <ChatSidebar/>
            </div>
        </>
    )
}

export default Guest;
