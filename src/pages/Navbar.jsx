import { useState } from "react";
import { FaSwatchbook } from "react-icons/fa";
import { IoMdCart, IoMdPerson } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isAuth, setIsAuth] = useState(true);
    const location = useLocation()
    const pathname = location.pathname;

    return (
        <nav className="bg-white shadow-lg" id="top">
            <div className="uppercase flex items-center justify-between border-b px-32 py-4 text-sm text-gray-500">
                <ul className="flex items-center gap-6">
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/wishlist"}>Wishlist <span>(0)</span></NavLink></li>
                    {
                        isAuth ?
                            <li><NavLink to={"/create-new"}>Create new book</NavLink></li>
                            :
                            <li>
                                <NavLink to={"/signup"} className="mr-6">Create an account</NavLink>
                                <NavLink to={"/signin"}>Login</NavLink>
                            </li>
                    }
                </ul>

                <ul className="flex items-center cursor-pointer">
                    <li><IoMdCart className="text-black text-lg" /></li>
                    <li className="flex gap-1">
                        <span className="text-black">Cart:</span>
                        <span>0</span>
                        <span>item(s)</span>
                        <span>$0.00</span>
                    </li>
                    <NavLink to={"/profile"} className="text-2xl ml-4"><IoMdPerson /></NavLink>
                </ul>

            </div>

            {
                location.pathname !== "/create-new" ?
                    <div className="flex justify-between items-center px-32 py-8">
                        <NavLink to={"/"} className="flex items-center gap-1 text-3xl text-gray-800">
                            <FaSwatchbook className="mr-1" />
                            <span>Book</span>
                            <span className="text-gray-500">Store</span>
                        </NavLink>

                        <div className="min-w-72 flex items-center gap-1">
                            <input type="text" name="search" id="search" className="w-full border-2 p-2 outline-gray-800" />
                            <label htmlFor="search" className="cursor-pointer bg-gray-300 px-4 py-3"><IoSearchOutline className="text-gray-800 text-xl" /></label>
                        </div>
                    </div> : null
            }
        </nav>
    )
}