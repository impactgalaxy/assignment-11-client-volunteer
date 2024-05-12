import useAuth from "../customHooks/useAuth"
import useAxiosSecret from "../customHooks/useAxiosSecret";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

export default function ManageMyPost() {
    const [myData, setMyData] = useState([]);
    const axiosSecret = useAxiosSecret();

    const { user } = useAuth();
    useEffect(() => {
        axiosSecret.get(`/becomeVolunteer?email=${user?.email}`)
            .then(data => setMyData(data.data))
    }, [user?.email, axiosSecret]);

    if (myData.length === 0) {
        return <Loading></Loading>
    }
    console.log(myData);
    return (
        <div>

        </div>
    )
}
