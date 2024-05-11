import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export default function useVolunteerData() {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["volunteer"],
        queryFn: async () => {
            try {
                const response = await axios.get("http://localhost:5000/volunteer")
                return response.data
            } catch (error) {
                console.log(error.message);
            }
        }
    })
    return { data, isLoading, refetch }
}
