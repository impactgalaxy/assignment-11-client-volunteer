import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import useAuth from "./useAuth";

export default function useVolunteerData() {
    const { value, deadlineOrder, pageNumber } = useAuth();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["volunteer", value, deadlineOrder, pageNumber],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:5000/volunteer?find=${value}&sort=${deadlineOrder}&pageNo=${pageNumber}&size=${4}`);

                return response.data
            } catch (error) {
                console.log(error.message);
            }
        },
    })
    const { data: allData = 0, isLoading: load } = useQuery({
        queryKey: ["countedData", value],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:5000/count?filter=${value}`);
                return response.data;
            } catch (error) {
                console.log(error.message);
            }
        }
    })

    return { data, isLoading, refetch, allData, load }
}
