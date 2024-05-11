import { Helmet } from "react-helmet";
import useVolunteerData from "../customHooks/useVolunteerData"
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import useAuth from "../customHooks/useAuth";

export default function NeedVolunteer() {
    const [searchValue, setSearchValue] = useState("");
    const { setValue, setDeadlineOrder, setPageNumber, pageNumber } = useAuth();
    const { data, isLoading, allData, load } = useVolunteerData();

    if (isLoading || load) {
        return <Loading></Loading>
    }
    const totalPage = Math.ceil(allData.count / 4);
    const page = [...Array(totalPage).keys()];

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
            <div className="flex justify-center">
                <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-800">
                    <button onClick={() => setPageNumber(pageNumber - 1)} type="button" className={`inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300 ${pageNumber === 0 ? "cursor-not-allowed" : ""}`} disabled={pageNumber === 0 ? true : false}>
                        <span className="sr-only">Previous</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    {
                        page.map(btn => <button onClick={() => setPageNumber(btn)} key={btn} type="button" className={`inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-300 ${pageNumber === btn ? "bg-yellow-700" : ""}`}>{btn}</button>)
                    }
                    <button onClick={() => setPageNumber(pageNumber + 1)} type="button" className={`inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300 ${pageNumber === page.length - 1 ? "cursor-not-allowed" : ""}`} disabled={pageNumber === page.length - 1 ? true : false}>
                        <span className="sr-only">Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    )
}
