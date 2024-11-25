import React, { createContext, useState, useEffect } from "react";
import fetchWithAuth from "../../utils/FetchWithAuth";

// Create the UserContext
export const UserContext = createContext();

// Define the provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch user data from the API
    const fetchUserDetails = async (username) => {
        try {
            const response = await fetchWithAuth(
                `https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff/${username}`
            );
            if (response.ok) {
                const userData = await response.json();
                setUser(userData); // Update the context with user data
            } else {
                console.error("Failed to fetch user details");
                setUser(null); // Clear user data on failure
            }
        } catch (error) {
            console.error("An error occurred while fetching user details:", error);
        } finally {
            setLoading(false); // Stop loading once the API call is done
        }
    };

    // Effect to fetch data after login (if username is available)
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            fetchUserDetails(storedUsername); // Fetch user details for logged-in user
        } else {
            setLoading(false); // No user, no need to fetch
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};
