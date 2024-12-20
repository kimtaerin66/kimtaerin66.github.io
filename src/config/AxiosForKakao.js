import axios from "axios";

let {VITE_KAKAO_LOGIN_URL} = import.meta.env;

const requestForKakao = axios.create({
    timeout: 30000,
    baseURL: VITE_KAKAO_LOGIN_URL,
    // responseType: "json",
    withCredentials: false,//false로 해야 인증정보 포함안함
});

export default requestForKakao;

