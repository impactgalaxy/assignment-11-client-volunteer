import Loading from "../components/Loading";
import useSingleVolunteerData from "../customHooks/useSingleVolunteerData"

export default function BeVolunteer() {
    const { data, isLoading } = useSingleVolunteerData();
    if (isLoading) {
        return <Loading></Loading>
    }
    const { _id, title, description, location, deadLine, numberOfVolunteer, organizationName, organizationEmail, photo, category } = data || {};
    return (
        <div>
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
                    <input type="text" name="" id="" readOnly defaultValue={`${title} (name)`} className="input input-bordered w-full" />
                    <input type="text" name="" id="" readOnly defaultValue={`${title} (email)`} className="input input-bordered w-full" />

                </div>
            </div>
            <div className="lg:w-3/4 m-auto p-5 grid grid-cols-1 lg:grid-cols-3 border-t-2 border-dashed">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Your information</h1>

                </div>
                <div className="space-y-4 lg:border-l-2 border-dashed px-2 lg:col-span-2">
                    <input type="text" name="" id="" readOnly defaultValue="email" className="input input-bordered w-full" />
                    <input type="text" name="" id="" readOnly defaultValue="name" className="input input-bordered w-full" />
                    <input type="text" name="" id="" defaultValue="Requested" className="input input-bordered w-full" />
                    <textarea name="" placeholder="Suggestion" className="input input-bordered w-full" id="" cols="30" rows="10"></textarea>

                </div>
            </div>
            <input type="submit" value="Request" className="btn btn-block lg:w-1/2 block mx-auto" />
        </div>
    )
}
