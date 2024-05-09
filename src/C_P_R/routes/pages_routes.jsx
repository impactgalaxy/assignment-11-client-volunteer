import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../pages/ErrorPage";
import UserRegister from "../pages/UserRegister";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/"
            },
            {
                path: "/user-register",
                element: <UserRegister></UserRegister>
            }
        ]
    }
])
export default routes;