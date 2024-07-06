import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bookFailure, bookStart, bookSuccess } from "../redux/slice/bookSlice";
import { categoryFailure, categoryStart, categorySuccess } from "../redux/slice/categorySlice";
import { FiPlus } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import Service from "../config/service";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../config/sweetAlert";
import { FaCheck } from "react-icons/fa";
import { getFromLocalStorage } from "../config/localstorage";
import { authSuccess } from "../redux/slice/authSlice";

export default function Home({ nomi }) {
    const { books, isLoading } = useSelector(state => state.book);
    const { auth, isLoggedIn } = useSelector(state => state.auth);
    const { categories } = useSelector(state => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateCatModal, setUpdateCatModal] = useState(null);
    const [newCat, setNewCat] = useState({ nomi: "" });
    const [cat, setCat] = useState("");

    const getAllCategories = async () => {
        try {
            dispatch(categoryStart());
            const { data } = await Service.getAllCategory();
            dispatch(categorySuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(categoryFailure(error.message));
        }
    };

    const getAuthFunction = async () => {
        const { data } = await Service.getAuth();
        dispatch(authSuccess(data));
    };

    useEffect(() => {
        const getBooksFunction = async () => {
            try {
                dispatch(bookStart());
                const { data } = await Service.getAllBooks(nomi, cat);
                dispatch(bookSuccess({ type: "b", data }));
            } catch (error) {
                console.log(error);
                dispatch(bookFailure(error.message));
            }
        };

        getAllCategories();
        getBooksFunction();
    }, [nomi, cat]);

    const updateCategoryFunction = async (e) => {
        if (e.keyCode === 13) {
            try {
                dispatch(categoryStart());
                const { _id, __v, createdAt, updatedAt, ...others } = newCat;
                await Service.updateCategory(newCat._id, others);
                getAllCategories();
                setUpdateCatModal(null);
            } catch (error) {
                console.log(error.message);
                dispatch(categoryFailure(error.message));
            }
        }
    };

    const addToBasketFunction = async (bookId) => {
        if (isLoggedIn) {
            try {
                const { data } = await Service.addToBasket(auth?._id, bookId);
                Toast.fire({ icon: "success", title: data?.message });
                if (getFromLocalStorage("token")) {
                    getAuthFunction();
                }
            } catch (error) {
                console.log(error.message);
                Toast.fire({ icon: "warning", title: error?.response?.data || error.message });
            }
        }
        else {
            navigate("/signup");
        }
    };

    return (
        <div onClick={() => setUpdateCatModal(null)} className="px-32 pt-10 pb-20">
            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => setCat("")}
                    className={`${cat === '' ? 'bg-gray-800 text-white' : 'bg-white'} text-gray-500 px-8 py-4 shadow-md hover:bg-gray-800 hover:text-white transform`}
                >
                    Barchasi
                </button>
                {
                    categories?.map(category => (
                        updateCatModal === category?._id ?
                            <input
                                onKeyDown={updateCategoryFunction}
                                onClick={(e) => e.stopPropagation()}
                                value={newCat.nomi}
                                onChange={(e) => setNewCat({ ...newCat, nomi: e.target.value })}
                                key={category._id}
                                type="text"
                                name="nomi"
                                className="w-[170px] text-gray-500 px-8 py-4 bg-white shadow-md outline-none" /> :
                            <button
                                onClick={(e) => setCat(category?.nomi)}
                                onDoubleClick={() => {
                                    setUpdateCatModal(category?._id);
                                    setNewCat(category);
                                }}
                                key={category._id}
                                className={`${cat === category?.nomi ? 'bg-gray-800 text-white' : 'bg-white'} text-gray-500 px-8 py-4 shadow-md hover:bg-gray-800 hover:text-white transform`}
                            >{category?.nomi}</button>
                    ))
                }
                <button className="text-white text-2xl px-8 py-4 bg-orange-500 shadow-md hover:bg-orange-300 transform"><FiPlus /></button>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
                {
                    isLoading ? <h1>Loading...</h1> : <>
                        {
                            books?.length > 0 ?
                                books.map(book => (
                                    <div
                                        key={book._id}
                                        className="w-fit flex flex-col justify-between bg-white shadow-md"
                                    >
                                        <div className="w-[160px] flex flex-col items-center gap-2 p-4">
                                            <img className="w-full h-[180px] object-cover" src={book?.img} alt={book?.nomi} />
                                            <h1 className="uppercase text-gray-800 text-base">{book.nomi.length > 12 ? book.nomi.slice(0, 12) + "..." : book.nomi}</h1>
                                            <p className="text-center text-gray-400 text-sm">{book.description.length > 30 ? book.description.slice(0, 30) + "..." : book.description}</p>
                                        </div>

                                        <div className="flex items-stretch">
                                            <h1 className="w-3/4 text-center py-2 text-white bg-gray-500">${book?.narxi}</h1>
                                            {
                                                !auth?.role &&
                                                <>
                                                    {
                                                        auth?.basket.find(product => product.book._id === book?._id) ?
                                                            <button
                                                                className="w-1/4 flex items-center justify-center text-white bg-green-400">
                                                                <FaCheck />
                                                            </button> :
                                                            <button
                                                                onClick={() => addToBasketFunction(book?._id)}
                                                                className="w-1/4 flex items-center justify-center text-white bg-red-400">
                                                                <IoMdCart />
                                                            </button>
                                                    }
                                                </>
                                            }
                                            <Link to={`/books/${book?._id}`} className="w-1/4 flex items-center justify-center text-white bg-blue-400">
                                                <IoEyeOutline />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                                : <h1>Ma'lumot topilmadi!</h1>
                        }
                    </>
                }
            </div>
        </div>
    )
}