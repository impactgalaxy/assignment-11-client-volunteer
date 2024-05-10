import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../pages/ErrorPage";
import UserRegister from "../pages/UserRegister";
import Login from "../pages/Login";
import Home from "../pages/Home";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/user-register",
                element: <UserRegister></UserRegister>
            },
            {
                path: "/user-login",
                element: <Login></Login>
            }
        ]
    }
])
export default routes;