import React, {useState} from 'react';
import Header from "../../common/Header.js";
import Sidebar from '../../common/Sidebar.js';
import AdminDashboardHome from './AdminDashboardHome.js';

function AdminDashboard(){
    const [menu, setMenu] = useState(false);

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };

    return (
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
            <div className="app-container">
                <Header onMenuClick={() => toggleMobileMenu()}/>
                <div className="main-content">
                    <Sidebar/>
                    <div className='dashboard-home'>
                        <AdminDashboardHome/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
