import { Link } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import useVolunteerData from "../customHooks/useVolunteerData"
import Loading from "./Loading";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

export default function VolunterNeedSection() {
    const { setValue } = useAuth()
    const { data, isLoading } = useVolunteerData();
    // const [searchValue, setSearchValue] = useState("");
    console.log(data);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <section>
                <div className="bg-violet-600">
                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">Men for Men</h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">An effort to do something good for people in collaboration with everyone from the place of human values.</p>
                        <div className="flex flex-wrap justify-center">
                            <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900">Create Post</button>
                            <button type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-300 dark:text-gray-50">Learn more</button>
                        </div>
                    </div>
                </div>
                <img src="https://i.ibb.co/qJ3xQG7/joshua-coleman-WTrfvtoe3y-M-unsplash.jpg" alt="" className="w-5/6 mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40" />
            </section>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 pt-10">
                <div className="absolute right-5 top-0 flex gap-2 w-max ">
                    <Input
                        type="search"
                        color="white"
                        label="upcoming deadline..."
                        className="pr-20"
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                    // onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        size="sm"
                        color="white"
                        className="!absolute right-1 top-1 rounded"
                    // onClick={() => setValue(searchValue)}
                    >
                        Search
                    </Button>
                </div>
                {
                    data.slice(0, 6).map(post => {
                        return (
                            <div key={post._id} className="flex flex-col max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
                                <img src={post.photo} alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                                <div className="text-center flex items-center justify-between text-xs font-medium tracking-widest uppercase text-violet-600">
                                    <p>Deadline: <br></br> <span className="text-lg">{post.deadLine}</span></p>
                                    <p>Volunteer need: <br></br> <span className="text-lg">{post.numberOfVolunteer}</span></p>
                                </div>
                                <div className="my-6 py-2">
                                    <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">{post.category}</span>
                                    <h2 className="text-xl font-semibold tracking-wide">{post.title}</h2>
                                </div>
                                <p className="dark:text-gray-800">{post.description}</p>
                                <div className="flex-grow flex items-end justify-center">
                                    <Link to={`/volunteer-need-details/${post._id}`} className="btn btn-outline btn-block">Details</Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="lg:w-1/2 p-4 m-auto">
                <Link to="/need-volunteer" className="btn btn-square btn-block">Show More</Link>

            </div>
        </div>
    )
}
