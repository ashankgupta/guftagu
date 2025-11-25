import axios from 'axios';

//baseURL: 'https://guftagu-deployed.onrender.com/api',
const api = axios.create({
    baseURL: 'https://guftagu-deployed.onrender.com/api',
    withCredentials: true 
});

export default api;