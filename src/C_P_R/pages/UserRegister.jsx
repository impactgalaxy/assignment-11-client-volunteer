import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../customHooks/useAuth";
import useToast from "../customHooks/useToast";
export default function UserRegister() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser } = useAuth();
    const Toast = useToast()


    const handleRegister = async (data) => {
        const { email, password } = data;
        try {
            const response = await createUser(email, password);
            if (response.user.uid) {
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });

            }
        } catch (error) {
            const errorText = error.code.split("/")[1];
            Toast.fire({
                icon: "error",
                title: errorText
            })
        }
    }
    const warningClass = "absolute flex items-center gap-2 -bottom-5 left-0 text-red-600 label-text-alt";
    const warningIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
    </svg>


    return (
        <div className='p-4'>
            <div className="p-4 lg:p-10">
                <h1 className="text-xl lg:text-5xl text-center">Welcome to register yourself</h1>
            </div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:w-1/2 m-auto">

                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            placeholder="Name"
                            {...register("name")}
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-400 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                        <label
                            className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Enter name
                        </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            placeholder="Photo url"
                            {...register("photo")}
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                        <label
                            className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Enter photo URL
                        </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            placeholder="Email"
                            {...register("email", { required: true })}
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                        {errors.email && <p className={warningClass}><span>{warningIcon}</span> Please enter your email</p>}
                        <label
                            className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Enter Email
                        </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">

                        <input
                            placeholder="Password"
                            {...register("password", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])/,
                                minLength: 6
                            })}
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                        {errors.password?.type === "required" ?
                            <p className={warningClass}>{warningIcon} Please confirm password </p> :
                            errors.password?.type === "pattern" ?
                                <p className={warningClass}>{warningIcon} Ensure one lowercase and one uppercase</p> :
                                errors.password?.type === "minLength" ?
                                    <p className={warningClass}><span>{warningIcon}</span> Password need 6 character length </p> :
                                    ""}
                        <label
                            className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Confirm password
                        </label>
                    </div>

                    <input type="submit" value="Register" className="btn btn-block lg:col-span-2" />
                </div>
            </form>
            <div className="divider">OR</div>
            <div className='flex items-center gap-5'>
                <FaGoogle className='text-5xl p-3 rounded-full hover:bg-[#e7e7e7]'></FaGoogle>
                <FaGithub className='text-5xl p-3 rounded-full hover:bg-[#e7e7e7]'></FaGithub>
                <FaFacebook className='text-5xl p-3 rounded-full hover:bg-[#e7e7e7]'></FaFacebook>

            </div>


        </div>
    )
}
