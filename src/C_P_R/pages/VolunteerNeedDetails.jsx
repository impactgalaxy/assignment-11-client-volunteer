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
        <div className="max-w-lg mx-auto p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-between pb-4 border-bottom">
                <div className="flex items-center">
                    <a rel="noopener noreferrer" href="#" className="mb-0 capitalize dark:text-gray-800">{category}</a>
                </div>
                <p className="font-black">Deadline: {deadLine}</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <img src={photo} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                    <div className="flex items-center text-xs">
                        <span>6 min ago</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold dark:text-violet-600">{title}</h3>

                    <p className="leading-snug dark:text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    )
}
