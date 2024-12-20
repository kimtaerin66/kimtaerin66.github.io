import axios from "axios";
let { VITE_BACKEND_URL } = import.meta.env;

const request = axios.create({
    timeout :30000,
    baseURL:VITE_BACKEND_URL,
    responseType:"json",
    withCredentials : false,
    headers :{
        'Content-type': 'application/json',
    }
});

export default request;