import request from "./Axios.js";


const axiosHandler = ()=> {
    // use: 요청이 보내지기 전에 실행할 함수를 추가
    // eject: 등록된 요청 인터셉터를 제거
    // const requestInterceptor = request.interceptors.request.use(
    //     async request => {
    //        request.params = {
    //             ...request.params,
    //           ...commonParams}
    //         return requestInterceptor;
    //     });

}

export default axiosHandler;