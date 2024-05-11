import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import useAuth from "./useAuth";

export default function useVolunteerData() {
    const { value, deadlineOrder } = useAuth();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["volunteer", value, deadlineOrder],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:5000/volunteer?find=${value}&sort=${deadlineOrder}`)
                return response.data
            } catch (error) {
                console.log(error.message);
            }
        }
    })
    return { data, isLoading, refetch }
}
