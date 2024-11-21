const fetchWithAuth = async (url, options = {}) => {
    const authToken = localStorage.getItem("authToken");

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
        ...options.headers,
    };

    const config = {
        method: "GET",
        ...options,
        headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export default fetchWithAuth;
