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
            return response;

        }, async (error) => {
            console.log(error.response);
            if (error.status === 401 || error.status === 403) {
                await logOut();
                navigate("/")
            }
            return Promise.reject(error);
        })
    }, [logOut, navigate])

    return axiosSecret;
}
