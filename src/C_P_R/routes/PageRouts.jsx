import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../pages/ErrorPage";
import UserRegister from "../pages/UserRegister";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AddVolunteerPost from "../pages/AddVolunteerPost";
import NeedVolunteer from "../components/NeedVolunteer";
import VolunteerNeedDetails from "../pages/VolunteerNeedDetails";
import BeVolunteer from "../pages/BeVolunteer";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
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
            },
            {
                path: "/add-volunteer-post",
                element: <PrivateRoute><AddVolunteerPost></AddVolunteerPost></PrivateRoute>
            },
            {
                path: "/need-volunteer",
                element: <NeedVolunteer></NeedVolunteer>
            }, {
                path: "/volunteer-need-details/:id",
                element: <PrivateRoute><VolunteerNeedDetails></VolunteerNeedDetails></PrivateRoute>
            },
            {
                path: "/be-volunteer/:id",
                element: <PrivateRoute><BeVolunteer></BeVolunteer></PrivateRoute>
            }
        ]
    }
])

export default router;

