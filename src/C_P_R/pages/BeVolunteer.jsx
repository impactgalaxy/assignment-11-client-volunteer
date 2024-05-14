import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import useAuth from "../customHooks/useAuth";
import useSingleVolunteerData from "../customHooks/useSingleVolunteerData"
import axios from "axios";
import Swal from "sweetalert2";
import useToast from "../customHooks/useToast";

export default function BeVolunteer() {
    const { data, isLoading } = useSingleVolunteerData();
    const { user } = useAuth();
    const Toast = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm()
    if (isLoading) {
        return <Loading></Loading>
    }

    const { _id, title, description, location, deadLine, numberOfVolunteer, organizationName, organizationEmail, photo, category } = data || {};


    const handleRequest = async (data) => {
        const name = user?.displayName ? user?.displayName : data.name;
        const status = data.status === "" ? "Requested" : data.status;
        const doc = {
            title,
            category,
            location,
            organizationEmail,
            organizationName,
            volunteerName: name,
            volunteerEmail: user?.email,
            suggestion: data.suggestion,
            status,
        }
        if (organizationEmail === user?.email) {
            return Toast.fire({
                icon: "error",
                title: "You can't be volunteer bcz you are post creator",
                text: "Please try another post"
            })
        }


        try {
            const response = await axios.post(`${import.meta.env.VITE_API_KEY}/becomeVolunteer?id=${_id}`, doc)
            if (response.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Congratulations!",
                    text: "Now you are a volunteer"
                })
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: error.message
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(handleRequest)}>
            <div className="w-60 mx-auto my-5">
                <img src={photo} className="object-cover object-center w-full rounded-md h-72 bg-gray-500 dark:bg-gray-500 pointer-events-none" alt="" />
            </div>
            <div className="lg:w-3/4 m-auto p-5 grid grid-cols-1 lg:grid-cols-3 border-y-2 border-dashed">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Programme Details</h1>

                </div>
                <div className="space-y-4 lg:border-l-2 border-dashed px-2 lg:col-span-2">
                    <input type="text" name="" id="" readOnly defaultValue={`${title} (title)`} className="input input-bordered w-full" />
                    <input type="text" name="" id="" readOnly defaultValue={`${category} (type)`} className="input input-bordered w-full" />
                    <input type="text" name="" id="" readOnly defaultValue={`${location} (location)`} className="input input-bordered w-full" />
                    <input type="text" name="" id="" readOnly defaultValue={`${deadLine} (deadline)`} className="input input-bordered w-full" />
                    <input type="text" name="" id="" readOnly defaultValue={`${numberOfVolunteer} (seat)`} className="input input-bordered w-full" />
                    <input type="text" name="" id="" title={description} readOnly defaultValue={`${description} (description)`} className="input input-bordered w-full" />
                </div>
            </div>
            <div className="lg:w-3/4 m-auto p-5 grid grid-cols-1 lg:grid-cols-3 border-y-2 border-dashed">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Organization Details</h1>

                </div>
                <div className="space-y-4 lg:border-l-2 border-dashed px-2 lg:col-span-2">
                    <input type="text" name="" id="" readOnly defaultValue={`${organizationName} (name)`} className="input input-bordered w-full" />
                    <input type="text" name="" id="" readOnly defaultValue={`${organizationEmail} (email)`} className="input input-bordered w-full" />

                </div>
            </div>
            <div className="lg:w-3/4 m-auto p-5 grid grid-cols-1 lg:grid-cols-3 border-t-2 border-dashed">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Your information</h1>

                </div>
                <div className="space-y-4 lg:border-l-2 border-dashed px-2 lg:col-span-2">
                    <input type="text" name="" id="" placeholder={errors.name && errors.name.message} readOnly={user?.displayName ? true : false} defaultValue={user?.displayName} className="input input-bordered w-full" {...register("name", { required: user?.displayName ? false : "Please enter your name" })} />


                    <input type="text" name="" id="" readOnly defaultValue={user?.email} className="input input-bordered w-full" />
                    <input type="text" name="" id="" defaultValue="Requested" className="input input-bordered w-full" {...register("status")} />
                    <textarea name="" {...register("suggestion")} placeholder="Suggestion (if any)" className="input input-bordered w-full" id="" cols="30" rows="10"></textarea>

                </div>

            </div>
            <input type="submit" value="Request" className="btn btn-block lg:w-1/2 block mx-auto" />
        </form>
    )
}
