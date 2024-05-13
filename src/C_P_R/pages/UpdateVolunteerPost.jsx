import ReactDatePicker from "react-datepicker";
import Loading from "../components/Loading";
import useSingleVolunteerData from "../customHooks/useSingleVolunteerData"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useToast from "../customHooks/useToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function UpdateVolunteerPost() {
    const { data, isLoading } = useSingleVolunteerData();
    const { _id, title, description, location, numberOfVolunteer, organizationName, organizationEmail, category } = data || {};
    const navigate = useNavigate()


    const [selectedDate, setSelectedDate] = useState(new Date());
    const Toast = useToast();


    if (isLoading) {
        return <Loading></Loading>
    }
    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const description = form.description.value;
        const location = form.location.value;
        const numberOfVolunteer = form.numberOfVolunteer.value;
        const photo = form.photo.value;
        const deadLine = selectedDate.toLocaleDateString();
        const now = new Date().toLocaleDateString();
        if (now === deadLine) {
            return Toast.fire({
                icon: "error",
                title: "You should change deadline"
            })
        }
        const updateDoc = { title, category, description, location, numberOfVolunteer, photo, deadLine }

        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_KEY}/volunteer/${_id}`, updateDoc)
            if (res.data.modifiedCount > 0) {
                Toast.fire({
                    icon: "success",
                    title: "Update successful"
                })
                navigate("/manage-my-post")

            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Something wrong!",
                text: error.message
            })
        }
    }
    return (
        <div>
            <Helmet>
                <title>
                    Update my post
                </title>
            </Helmet>
            <div className="p-10 text-center text-2xl lg:text-4xl">
                Welcome to update your post
            </div>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
                <div>Title
                    <input type="text" required defaultValue={title} name="title" id="" className="input input-bordered w-full" />
                </div>
                <div>Category

                    <input type="text" required defaultValue={category} name="category" id="" className="input input-bordered w-full" />
                </div>
                <div>Description
                    <input type="text" required defaultValue={description} name="description" id="" className="input input-bordered w-full" />
                </div>
                <div>Location
                    <input type="text" required defaultValue={location} name="" id="location" className="input input-bordered w-full" />
                </div>
                <div>numberOfVolunteer
                    <input type="text" required defaultValue={numberOfVolunteer} name="numberOfVolunteer" id="" className="input input-bordered w-full" />

                </div>
                <div>Thumbnail
                    <input type="text" required defaultValue={`https://i.ibb.co/hX0VNh2/markus-spiske-phvqs-Mbxt-TY-unsplash.jpg`} name="photo" id="" className="input input-bordered w-full" />
                </div>
                <div>
                    <ReactDatePicker className="bg-blue-gray-300"
                        toggleCalendarOnIconClick
                        selected={selectedDate}
                        showIcon
                        onChange={(date) => setSelectedDate(date)}
                    />
                </div>

                <div>
                    <input type="text" name="" id="" className="input input-bordered" readOnly defaultValue={organizationName} />

                    <input type="text" name="" id="" className="input input-bordered" readOnly defaultValue={organizationEmail} />

                </div>

                <input type="submit" value="Update" className="btn btn-block btn-accent lg:col-span-2" />



            </form>
        </div>
    )
}
