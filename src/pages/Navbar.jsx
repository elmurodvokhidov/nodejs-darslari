import { FaSwatchbook } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoCartOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar({ setNomi }) {
    const { isLoggedIn, auth } = useSelector(state => state.auth);
    const location = useLocation();

    return (
        <nav className="bg-white shadow-lg relative z-20">
            <div className="uppercase flex items-center justify-between border-b px-32 py-4 text-sm text-gray-500">
                <ul className="flex items-center gap-6">
                    <li>
                        <NavLink to={"/"} className="flex items-center gap-1 text-2xl text-gray-800">
                            <FaSwatchbook className="mr-1" />
                            <span>Book</span>
                            <span className="text-gray-500">Store</span>
                        </NavLink>
                    </li>
                </ul>

                <ul className="flex items-center gap-4 cursor-pointer">
                    {
                        location.pathname === "/" &&
                        <li>
                            <div className="min-w-72 flex items-center gap-1">
                                <input
                                    onChange={(e) => setNomi(e.target.value)}
                                    type="text"
                                    name="nomi"
                                    id="nomi"
                                    placeholder="Qidirish..."
                                    className="w-full border-2 p-1.5 outline-gray-800"
                                />
                                <label
                                    htmlFor="nomi"
                                    className="cursor-pointer bg-gray-300 p-2"
                                >
                                    <IoSearchOutline className="text-gray-800 text-xl" />
                                </label>
                            </div>
                        </li>
                    }

                    <li>
                        <NavLink className="flex items-center gap-1 text-black" to={isLoggedIn ? "/profile/orders" : "/signin"}>
                            <IoPersonOutline className="text-xl" />
                            <span>{auth?.fullname?.length > 8 ? auth?.fullname?.slice(0, 8) + "..." : auth?.fullname || "Kirish"}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="flex items-center gap-1 text-black" to={"/wishlist"}>
                            <GoHeart className="text-xl" />
                            <span>Saralangan</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="flex items-center gap-1 text-black" to={"/cart"}>
                            <IoCartOutline className="text-xl" />
                            <span>Savat</span>
                            <span className="size-5 flex items-center justify-center rounded-full text-white bg-gray-800">{auth?.basket?.length || 0}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}