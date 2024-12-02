import axios from "axios";

const api = "http://localhost:8090/api/eshop";

export const fetchUserName = (username) => {
    return axios.get(`${api}/username`, {
        params: { username }, // Pass the username as a query parameter
    });
};