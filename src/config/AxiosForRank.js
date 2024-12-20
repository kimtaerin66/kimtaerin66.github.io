import axios from "axios";
let { VITE_KOFIC_URL } = import.meta.env;

const requestForRank = axios.create({
    timeout :30000,
    baseURL:VITE_KOFIC_URL,
    responseType:"json",
    withCredentials : false,//false로 해야 인증정보 포함안함
    headers :{
        'Content-type': 'application/json',
    }
});

export default requestForRank;