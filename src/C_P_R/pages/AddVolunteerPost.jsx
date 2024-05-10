import { useForm } from "react-hook-form"
import useAuth from "../customHooks/useAuth";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import useToast from "../customHooks/useToast";

export default function AddVolunteerPost() {
    const Toast = useToast();
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dd = selectedDate.toLocaleDateString().split("/")[1];
    const mm = selectedDate.toLocaleDateString().split("/")[0];
    const yy = selectedDate.toLocaleDateString().split("/")[2];
    const date = `${dd} ${mm} ${yy}`
    console.log(date);

    const handleAddPost = async (data) => {
        data.deadLine = date;
        console.log(data);
        setValue("organizationName", user?.displayName);
        setValue("organizationEmail", user?.email);
        try {
            const response = await axios.post("http://localhost:5000/volunteer", data);
            console.log(response);
            if (response.data.insertedId) {
                Toast.fire({
                    icon: "success",
                    title: "Post created successfully"
                })
                reset()
            }
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: error.message
            })
        }
    }
    return (
        <section className="p-6 bg-gray-800 dark:bg-gray-100 text-gray-50 dark:text-gray-900">
            <form onSubmit={handleSubmit(handleAddPost)} noValidate="" className="container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900 dark:bg-gray-50">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Information</p>
                        <p className="text-xs">Details about volunteer need post</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="title" className="text-sm">Post Title</label>
                            <input id="title" type="text" {...register("title", { required: true })} className="w-full input input-bordered text-blue-gray-400" />
                            {errors.title && <span className="label-text-alt text-red-500">Title needed</span>}
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="description" className="text-sm">Description</label>
                            <input id="description" type="text" {...register("description", { required: true })} placeholder="" className="w-full input input-bordered text-blue-gray-400" />
                            {errors.description && <span className="label-text-alt text-red-500">Description needed</span>}
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="location" className="text-sm">Location</label>
                            <input id="location" {...register("location", { required: true })} type="text" placeholder="" className="w-full input input-bordered text-blue-gray-400 " />
                            {errors.title && <span className="label-text-alt text-red-500">Location needed</span>}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="photo" className="text-sm">Photo URL</label>
                            <input id="photo" {...register("photo")} type="text" placeholder="https://" className="w-full input input-bordered text-blue-gray-400" />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="numberOfVolunteer" className="text-sm">Number of volunteer</label>
                            <input id="numberOfVolunteer" {...register("numberOfVolunteer", { required: true })} type="text" placeholder="" className="w-full input input-bordered text-blue-gray-400" />
                            {errors.title && <span className="label-text-alt text-red-500">Amount needed</span>}
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="state" className="text-sm">Category</label>
                            <input id="state" type="text" {...register("category", { required: true })} placeholder="" className="w-full input input-bordered text-blue-gray-400" />

                            {errors.title && <span className="label-text-alt text-red-500">Category needed</span>}
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label className="text-sm block">Deadline</label>
                            <ReactDatePicker type="button" className="btn"
                                toggleCalendarOnIconClick
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900 dark:bg-gray-50">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Profile</p>
                        <p className="text-xs">Organization Details</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="username" className="text-sm">Organization Name</label>
                            <input id="username" readOnly={user?.displayName ? true : false} {...register("organizationName")} defaultValue={user?.displayName} type="text" placeholder="Organization name" className="w-full input input-bordered text-blue-gray-400" />

                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="email" className="text-sm">Organization Email</label>
                            <input id="email" type="text" {...register("organizationEmail")} readOnly={user?.email ? true : false} defaultValue={user?.email} className="w-full input input-bordered text-blue-gray-400" />

                        </div>
                        <div className="col-span-full">
                            <label htmlFor="bio" className="text-sm">Bio</label>
                            <textarea id="bio" placeholder="" className="w-full input input-bordered text-blue-gray-400"></textarea>
                        </div>
                        <div className="col-span-full">
                            <input type="submit" value="Add Post" className="btn btn-block" />
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}
