import { FaSwatchbook } from "react-icons/fa";
import { IoMdCart, IoMdPerson } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar({ setNomi }) {
    const { isLoggedIn, auth } = useSelector(state => state.auth);
    const location = useLocation();

    return (
        <nav className="bg-white shadow-lg">
            <div className="uppercase flex items-center justify-between border-b px-32 py-4 text-sm text-gray-500">
                <ul className="flex items-center gap-6">
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    {
                        !auth?.role &&
                        <li><NavLink to={"/wishlist"}>Wishlist <span>({auth?.wishlist.length || 0})</span></NavLink></li>
                    }
                    {
                        isLoggedIn && auth?.role ?
                            <li><NavLink to={"/create-new"}>Create new book</NavLink></li>
                            :
                            !auth?.role && isLoggedIn ?
                                null :
                                <li>
                                    <NavLink to={"/signup"} className="mr-6">Create an account</NavLink>
                                    <NavLink to={"/signin"}>Login</NavLink>
                                </li>
                    }
                </ul>

                <ul className="flex items-center cursor-pointer">
                    <li><IoMdCart className="text-black text-lg" /></li>
                    <li>
                        <Link to={'/cart'} className="flex gap-1">
                            <span className="text-black">Cart:</span>
                            <span>{auth?.basket.length}</span>
                            <span>item(s)</span>
                            <span>${auth?.basket.reduce((total, product) => total + product?.book?.narxi * product?.count, 0)}</span>
                        </Link>
                    </li>
                    {isLoggedIn && <NavLink to={"/profile"} className="text-2xl ml-4"><IoMdPerson /></NavLink>}
                </ul>
            </div>

            {
                location.pathname !== "/create-new" &&
                    location.pathname !== "/signup" &&
                    location.pathname !== "/signin" ?
                    <div className="flex justify-between items-center px-32 py-8">
                        <NavLink to={"/"} className="flex items-center gap-1 text-3xl text-gray-800">
                            <FaSwatchbook className="mr-1" />
                            <span>Book</span>
                            <span className="text-gray-500">Store</span>
                        </NavLink>

                        <div className="min-w-72 flex items-center gap-1">
                            {/* // ! Ma'lumot qidirilayotganda timeout qo'shish kerak */}
                            <input
                                onChange={(e) => setNomi(e.target.value)}
                                type="text"
                                name="nomi"
                                id="nomi"
                                className="w-full border-2 p-2 outline-gray-800"
                            />
                            <label htmlFor="nomi" className="cursor-pointer bg-gray-300 px-4 py-3"><IoSearchOutline className="text-gray-800 text-xl" /></label>
                        </div>
                    </div> : null
            }
        </nav>
    )
}