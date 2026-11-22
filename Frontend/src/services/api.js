import axios from 'axios';

const API = axios.create({
    baseURL: 'https://lead-manager-api-e4zw.onrender.com',
    withCredentials: true
});

export default API;
