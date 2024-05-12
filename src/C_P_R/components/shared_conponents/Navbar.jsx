import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../customHooks/useAuth';
import defaultUser from "/user.png"
import useToast from '../../customHooks/useToast';

export default function Navbar() {
    const { user, logOut } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(false);
    const Toast = useToast();
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/need-volunteer">Need Volunteer</NavLink></li>
            <li>
                <details>
                    <summary>My Profile</summary>
                    <ul className="p-2 z-10">
                        <li><NavLink to="/add-volunteer-post">Add Post</NavLink></li>
                        <li><NavLink to="/manage-my-post">My Post</NavLink></li>
                    </ul>
                </details>
            </li>

        </>
    )
    // control theme
    const handleTheme = (e) => {
        if (e.target.checked) {
            localStorage.setItem("theme", JSON.stringify(true));
            setTheme(true);
        } else {
            localStorage.setItem("theme", JSON.stringify(false));
            setTheme(false);
        }
    }
    useEffect(() => {
        const getTheme = JSON.parse(localStorage.getItem("theme"));
        const html = document.querySelector("html");
        setTheme(getTheme);
        getTheme ? html.setAttribute("data-theme", "dark") : html.setAttribute("data-theme", "light");
    }, [theme]);

    const handleLogout = async () => {
        try {
            await logOut();
            Toast.fire({
                icon: 'success',
                title: "Logout successful"
            })
            setMenuOpen(false);


        } catch (error) {
            const errTxt = error.code.split("/")[1];
            Toast.fire({
                icon: "error",
                title: "Something wrong try later",
                text: errTxt
            })

        }
    }
    useEffect(() => {
        setMenuOpen(false);
    }, [])




    return (
        <div className="navbar bg-base-100">


            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div>
                    <a className="btn btn-ghost text-xl">Volunify</a>
                </div>
            </div>

            <div className="navbar-end">
                <div className='px-2'>
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" checked={theme} onChange={handleTheme} className="theme-controller" value="synthwave" />

                        {/* sun icon */}
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        {/* moon icon */}
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        {navLinks}
                    </ul>
                </div>
                {user ? <div onClick={() => setMenuOpen(!menuOpen)} className={`relative cursor-pointer tooltip tooltip-left`} data-tip={`${user?.displayName ? user?.displayName : "No name"}`} >
                    <img className="object-cover w-10 h-10 rounded-full ring ring-gray-300 dark:ring-gray-600" src={user?.photoURL ? user?.photoURL : defaultUser} alt="" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white bottom-0"></span>
                </div> : <Link to="/user-login" className="btn">Login</Link>}

                <div className={`absolute md:right-4 right-0 top-16 w-full ${menuOpen ? "" : "hidden"} max-w-sm bg-white rounded-lg shadow-lg z-10 flex-col`}
                >
                    <div className='bg-[#1D3C78] py-2 h-20 w-full'>
                        <p className='text-center font-bold py-4'>{user?.displayName}</p>

                    </div>


                    <div className="px-6 py-4 w-full bg-[#3578E5] relative">
                        <div className='w-20 border h-20 block m-auto rounded-full bg-white absolute left-1/2 -translate-x-1/2 -top-8'>
                            <img className="object-cover object-center m-auto rounded-full" src={user?.photoURL ? user?.photoURL : defaultUser} alt="avatar" />

                        </div>
                        <div className='w-full py-5 text-center space-y-4 mt-4'>
                            <p>{user?.email}</p>

                        </div>

                        <h1 className="px-2 text-sm mt-4">
                            Contact
                        </h1>

                        <h1 className="px-2 text-sm mt-4">
                            About
                        </h1>

                        <div className="flex items-center mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>

                            <h1 className="px-2 text-sm cursor-pointer" onClick={handleLogout}>Logout</h1>
                        </div>
                    </div>

                </div>



            </div>
        </div>
    )
}
