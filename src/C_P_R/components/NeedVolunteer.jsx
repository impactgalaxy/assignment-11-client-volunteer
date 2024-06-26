import { Helmet } from "react-helmet";
import useVolunteerData from "../customHooks/useVolunteerData";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import useAuth from "../customHooks/useAuth";
import { ImTable2 } from "react-icons/im";
import { MdTableRows } from "react-icons/md";

/**
 * @Note: It's a page but unfortunately I use in shared_components
 **/

export default function NeedVolunteer() {
  const [view, setView] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const { setValue, setDeadlineOrder, setPageNumber, pageNumber } = useAuth();
  const { data = [], isLoading, allData = {}, load } = useVolunteerData();

  if (isLoading || load) {
    return <Loading></Loading>;
  }
  let totalPage = null;
  if (Object.keys(allData).length > 0) {
    totalPage = Math.ceil(allData?.count / 6);
  } else {
    totalPage = 0;
  }
  const navigationButton = [...Array(totalPage).keys()];
  return (
    <div>
      <Helmet>
        <title>Volunify | need volunteer</title>
        <meta name="description" content="This is a volunteer need route." />
      </Helmet>
      <div className="p-4 md:p-10 flex flex-col-reverse lg:flex-row gap-5 items-center justify-center bg-blue-gray-900">
        <div className="w-72">
          <Select label="Filter by deadline">
            <Option value="asc" onClick={() => setDeadlineOrder("asc")}>
              Ascending
            </Option>
            <Option value="dsc" onClick={() => setDeadlineOrder("dsc")}>
              Descending
            </Option>
          </Select>
        </div>
        <div className="relative flex w-full gap-2 md:w-max ">
          <Input
            type="search"
            color="white"
            label="Type by title"
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
            onClick={() => {
              setValue(searchValue);
            }}>
            Search
          </Button>
        </div>
        <Button
          onClick={() => {
            setDeadlineOrder("");
            setValue("");
          }}>
          Reset
        </Button>
      </div>
      <div className="relative py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center container mx-auto gap-5">
        <div className="flex items-center gap-3 absolute top-0 right-4">
          {!view ? (
            <MdTableRows
              onClick={() => setView(true)}
              title="view table"
              className="text-5xl cursor-pointer"></MdTableRows>
          ) : (
            <ImTable2
              onClick={() => setView(false)}
              title="view column"
              className="text-4xl cursor-pointer"></ImTable2>
          )}
        </div>
        {data.length === 0 && (
          <div className="p-8 space-y-5 text-center md:col-span-3 lg:col-span-3">
            <p className="text-2xl lg:text-3xl">No data found</p>
            <p onClick={() => location.reload()} className="px-3 py-2 border">
              Back
            </p>
          </div>
        )}
        {view && (
          <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 md:col-span-2 lg:col-span-3">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">
              Volunteer Need Post
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs lg:text-sm">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col className="w-24" />
                </colgroup>
                <thead className="dark:bg-gray-300">
                  <tr className="text-left">
                    <th className="p-3">Thumbnail</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Volunteer Need</th>
                    <th className="p-3">Location</th>
                    <th className="p-3 text-right">Dead Line</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((post) => {
                    return (
                      <tr
                        key={post._id}
                        className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50 mb-5">
                        <td>
                          <img
                            src={post.photo}
                            alt=""
                            className="w-40 h-10 object-cover"
                          />
                        </td>
                        <td className="p-3">
                          <p>{post.title}</p>
                        </td>
                        <td className="p-3">
                          <p>{post.category}</p>
                        </td>

                        <td className="p-3">
                          <p>{post.numberOfVolunteer}</p>
                        </td>
                        <td className="p-3">
                          <p>{post.location}</p>
                        </td>
                        <td className="p-3 text-right">
                          <p>{post.numberOfVolunteer}</p>
                        </td>
                        <td className="p-3 text-right">
                          <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                            <Link to={`/volunteer-need-details/${post._id}`}>
                              Details
                            </Link>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view ||
          data.map((post) => {
            return (
              <div
                key={post._id}
                className="max-w-xs p-6 rounded-md shadow-md bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900">
                <img
                  src={post.photo}
                  alt=""
                  className="object-cover object-center w-full rounded-md h-72 bg-gray-500 dark:bg-gray-500"
                />
                <div className="mt-6 mb-2">
                  <span className="block text-lg font-medium tracking-widest uppercase text-violet-400 dark:text-violet-600">
                    {post.title}
                  </span>
                  <h2 className="text-xs font-semibold tracking-wide">
                    {post.category}
                  </h2>
                  <p>
                    Deadline:{" "}
                    <span className="bg-blue-gray-600 px-2">
                      {post.deadLine}
                    </span>
                  </p>
                </div>
                <p className="text-gray-100 dark:text-gray-800">
                  {post.description}
                </p>
                <div className="flex items-center justify-between my-4">
                  <p>Need: {post.numberOfVolunteer}</p>
                  <Link
                    to={`/volunteer-need-details/${post._id}`}
                    className="btn">
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      {totalPage === 0 || data.length === 0 || (
        <div className="flex justify-center">
          <nav
            aria-label="Pagination"
            className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-800">
            <button
              onClick={() => setPageNumber(pageNumber - 1)}
              type="button"
              className={`inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300 ${
                pageNumber === 0 ? "cursor-not-allowed" : ""
              }`}
              disabled={pageNumber === 0 ? true : false}>
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
            {navigationButton.map((btn) => (
              <button
                onClick={() => setPageNumber(btn)}
                key={btn}
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-300 ${
                  pageNumber === btn ? "bg-yellow-700" : ""
                }`}>
                {btn}
              </button>
            ))}
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              type="button"
              className={`inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-300 ${
                pageNumber === navigationButton.length - 1
                  ? "cursor-not-allowed"
                  : ""
              }`}
              disabled={
                pageNumber === navigationButton.length - 1 ? true : false
              }>
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
