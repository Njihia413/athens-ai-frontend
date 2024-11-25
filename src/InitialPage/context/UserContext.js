import React, { createContext, useState, useEffect } from "react";
import fetchWithAuth from "../../utils/FetchWithAuth";

// Create the UserContext
export const userContext = createContext();

// Define the provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [loading, setLoading] = useState(true);

    function updateUserDetails (newDetails) {
        localStorage.setItem("user", JSON.stringify({...user, ...newDetails}));
        setUser(user => ({...user, ...newDetails}));
    }

    return (
        <userContext.Provider value={{ user, setUser, updateUserDetails }}>
            {children}
        </userContext.Provider>
    );
};
