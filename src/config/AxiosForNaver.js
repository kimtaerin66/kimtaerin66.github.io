import axios from "axios";
let { VITE_NAVER_URL } = import.meta.env;

const requestForNaver = axios.create({
    timeout :30000,
    baseURL:VITE_NAVER_URL,
    responseType:"json",
    withCredentials : true,
    headers :{
        'Content-type': 'application/json',
    }
});

export default requestForNaver;