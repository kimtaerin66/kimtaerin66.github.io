import axios from "axios";

let {VITE_API_KEY, VITE_MAP_URL} = import.meta.env;

const requestForMapKeyword = axios.create({
    timeout: 30000,
    baseURL: VITE_MAP_URL,
    responseType: "json",
    withCredentials: false,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `KakaoAK ${VITE_API_KEY}`
    }
});

export default requestForMapKeyword;


// query 필수