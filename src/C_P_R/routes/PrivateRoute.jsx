import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import useAuth from "../customHooks/useAuth";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <Loading></Loading>
    }

    if (user !== null) {
        return children;
    }

    return <Navigate to="/user-login" state={location.pathname}></Navigate>
}

PrivateRoute.propTypes = {
    children: PropTypes.node
}