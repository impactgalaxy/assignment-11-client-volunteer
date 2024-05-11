import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import useSingleVolunteerData from "../customHooks/useSingleVolunteerData"

export default function VolunteerNeedDetails() {
    const { data, isLoading } = useSingleVolunteerData();
    const { title, description, location, deadLine, numberOfVolunteer, organizationName, organizationEmail, photo, category } = data || {};

    console.log(data, isLoading);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="max-w-lg font-medium mx-auto p-4 shadow-md ">
            <div className="flex justify-between pb-4 border-bottom">
                <p className="font-black mb-0 capitalize">{category}</p>
                <p className="font-black">Deadline: {deadLine}</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <img src={photo} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                    <div className="flex items-center justify-between text-lg">

                        <p>Total: <span className="px-2 text-white rounded-md bg-violet-800 font-black">{numberOfVolunteer}</span></p>
                        <span className="font-semibold">Location: {location}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold dark:text-violet-600">{title}</h3>

                    <p className="leading-snug dark:text-gray-600">{description}</p>
                </div>

            </div>
            <div className="py-4 space-y-3">
                <p>Organization name: <span className="text-green-800">{organizationName}</span></p>
                <p>Organization email: <span className="text-green-800">{organizationEmail}</span></p>

            </div>
            <div className="border-4 text-center ">
                <Link to="/be-volunteer" className="btn btn-block bg-gradient-to-r from-sky-500 to-indigo-500">Be volunteer</Link>
                {/* <button className="btn bg-gradient-to-r btn-block from-pink-500 to-violet-500"></button> */}

            </div>
        </div>
    )
}
