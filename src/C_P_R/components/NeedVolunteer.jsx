import { Helmet } from "react-helmet";
import useVolunteerData from "../customHooks/useVolunteerData"
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function NeedVolunteer() {

    const { data, isLoading: isLoading } = useVolunteerData()
    console.log(data, isLoading);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title>Volunify | need volunteer</title>
            </Helmet>
            <h1>All data {data.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center container mx-auto gap-5">
                {
                    data.map(post => {
                        return (
                            <div key={post._id} className="max-w-xs p-6 rounded-md shadow-md bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900">
                                <img src={post.photo} alt="" className="object-cover object-center w-full rounded-md h-72 bg-gray-500 dark:bg-gray-500" />
                                <div className="mt-6 mb-2">
                                    <span className="block text-xs font-medium tracking-widest uppercase text-violet-400 dark:text-violet-600">{post.title}</span>
                                    <h2 className="text-xl font-semibold tracking-wide">{post.category}</h2>
                                </div>
                                <p className="text-gray-100 dark:text-gray-800">{post.description}</p>
                                <div className="flex items-center justify-between my-4">
                                    <p>Need: {post.numberOfVolunteer}</p>
                                    <Link to={`/volunteer-need-details/${post._id}`} className="btn">Details</Link>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
