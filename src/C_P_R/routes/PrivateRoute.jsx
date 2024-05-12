import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.config"
import Loading from "../components/Loading";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
    const { user } = auth();
    const location = useLocation();
    if (user === null) {
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