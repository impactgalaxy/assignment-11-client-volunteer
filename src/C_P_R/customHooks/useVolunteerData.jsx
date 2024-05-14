import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import useAuth from "./useAuth";

export default function useVolunteerData() {
    const { value, deadlineOrder, pageNumber } = useAuth();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["volunteer", value, deadlineOrder, pageNumber],
        queryFn: async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/volunteer?find=${value}&sort=${deadlineOrder}&pageNo=${pageNumber}&size=${6}`);

                return response.data
            } catch (error) {
                console.log(error.message);
            }
        },
    })
    const { data: allData, isLoading: load } = useQuery({
        queryKey: ["countedData", value],
        queryFn: async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/count?filter=${value}`);
                return response.data;
            } catch (error) {
                console.log(error.message);
            }
        }
    })

    return { data, isLoading, refetch, allData, load }
}
