import axios from "axios"
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecret = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    withCredentials: true,
})
export default function useAxiosSecret() {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecret.interceptors.response.use((response) => {
            console.log(response);
            return response;
        }, (error) => {
            if (error.response.request.status === 401 || error.response.request.status === 403) {
                logOut()
                    .then(() => {
                        navigate("/user-login")

                    }).catch(error => {
                        console.log(error);
                    })
            }
            return Promise.reject(error);
        })

    }, [logOut, navigate])

    return axiosSecret;
}
