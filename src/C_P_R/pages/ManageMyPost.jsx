import { useMutation } from "@tanstack/react-query";
import useAuth from "../customHooks/useAuth"
import axios from "axios";

export default function ManageMyPost() {

    const { user } = useAuth();
    const { isSuccess } = useMutation({
        mutationFn: () => {
            try {
                const response = axios.get(`http://localhost:5000/becomeVolunteer?email=${user?.email}`)
                return response.data
            } catch (error) {
                console.log(error);
            }
        },
        mutationKey: ["myData"]
    })
    console.log(isSuccess);

    return (
        <div>

        </div>
    )
}
