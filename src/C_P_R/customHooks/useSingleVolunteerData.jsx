import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom"

export default function useSingleVolunteerData() {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["singleVolunteer"],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:5000/volunteer/${id}`);
                return response.data;
            } catch (error) {
                console.log(error.message);

            }
        }
    })
    return { data, isLoading }

}
