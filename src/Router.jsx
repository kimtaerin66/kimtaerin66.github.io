import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import SearchedMovies from "./pages/SearchedMovies.jsx";
import RankMovies from "./pages/RankMovies.jsx";
import FindCinema from "./pages/FindCinema.jsx";

//createBrowserRouter 를 사용하면 기본 라우터보다 중첩라우팅에 편리하다.
const Router = () => {
    return <RouterProvider router={router} basename="/https://kimtaerin66-github-io1.vercel.app"/>;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header/>,
        errorElement: "",
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>,
                errorElement: "",
            },
            {
                path: "/kakao/callback",
                element: <Login/>
            },
            {
                path: "/search/:query",
                element: <SearchedMovies/>
            },
            {
                path: "/rank",
                element: <RankMovies/>
            },
            {
                path: "/findCinema",
                element: <FindCinema/>
            }
        ]
    }
]);

export default Router;
