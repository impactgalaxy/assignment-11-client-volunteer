import { Helmet } from "react-helmet";
import useVolunteerData from "../customHooks/useVolunteerData"
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import useAuth from "../customHooks/useAuth";

export default function NeedVolunteer() {
    const [searchValue, setSearchValue] = useState("");
    const { setValue, setDeadlineOrder } = useAuth();

    const { data, isLoading } = useVolunteerData()
    if (isLoading) {
        return <Loading></Loading>
    }
    // console.log("value form my search in custom : ", value);

    return (
        <div>
            <Helmet>
                <title>Volunify | need volunteer</title>
            </Helmet>
            <div className="p-4 md:p-10 flex flex-col-reverse lg:flex-row gap-5 items-center justify-center bg-blue-gray-900">
                <div className="w-72">
                    <Select label="Filter by deadline">
                        <Option value="asc" onClick={() => setDeadlineOrder("asc")}>Ascending</Option>
                        <Option value="dsc" onClick={() => setDeadlineOrder("dsc")}>Descending</Option>

                    </Select>
                </div>
                <div className="relative flex w-full gap-2 md:w-max ">
                    <Input
                        type="search"
                        color="white"
                        label="Type here..."
                        className="pr-20"
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        size="sm"
                        color="white"
                        className="!absolute right-1 top-1 rounded"
                        onClick={() => setValue(searchValue)}
                    >
                        Search
                    </Button>
                </div>

            </div>
            <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center container mx-auto gap-5">
                {data.length === 0 && <div className="p-8 text-center md:col-span-3 lg:col-span-3">
                    <p className="text-2xl lg:text-3xl">No data found</p>
                </div>}
                {
                    data.map(post => {
                        return (
                            <div key={post._id} className="max-w-xs p-6 rounded-md shadow-md bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900">
                                <img src={post.photo} alt="" className="object-cover object-center w-full rounded-md h-72 bg-gray-500 dark:bg-gray-500" />
                                <div className="mt-6 mb-2">
                                    <span className="block text-xs font-medium tracking-widest uppercase text-violet-400 dark:text-violet-600">{post.title}</span>
                                    <h2 className="text-xl font-semibold tracking-wide">{post.category}</h2>
                                    <p>Deadline: <span className="bg-blue-gray-600 px-2">{post.deadLine}</span></p>
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
