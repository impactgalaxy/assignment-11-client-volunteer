import axios from "axios"
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecret = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    withCredentials: true,
})
export default function useAxiosSecret() {
    const { logOut } = useAuth();
    const navigate = useNavigate()
    axiosSecret.interceptors.response.use((res => {
        return res;

    }), async (error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
            await logOut();
            navigate("/")
        }
        return Promise.reject(error);
    })
    return axiosSecret;
}
