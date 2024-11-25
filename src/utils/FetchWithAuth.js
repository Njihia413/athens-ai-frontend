
const fetchWithAuth = async (url, options = {}, token) => {

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
