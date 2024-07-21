import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bookFailure, bookStart, bookSuccess } from "../redux/slice/bookSlice";
import { categoryFailure, categoryStart, categorySuccess } from "../redux/slice/categorySlice";
import { IoMdCart } from "react-icons/io";
import Service from "../config/service";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import MainLoader from "../components/MainLoader";
import EmptyAnimation from "../components/EmptyAnimation";

export default function Home({ nomi, addToBasketFunction, toggleLikeFunction }) {
    const { books, isLoading } = useSelector(state => state.book);
    const { auth } = useSelector(state => state.auth);
    const { categories } = useSelector(state => state.category);
    const dispatch = useDispatch();
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

    return (
        <div className="px-32 pt-10 pb-20">
            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => setCat("")}
                    className={`${cat === '' ? 'bg-gray-800 text-white' : 'bg-white'} text-gray-500 px-8 py-4 shadow-md hover:bg-gray-800 hover:text-white transform`}
                >
                    Barchasi
                </button>
                {
                    categories?.map(category => (
                        <button
                            onClick={(e) => setCat(category?._id)}
                            key={category._id}
                            className={`${cat === category?._id ? 'bg-gray-800 text-white' : 'bg-white'} text-gray-500 px-8 py-4 shadow-md hover:bg-gray-800 hover:text-white transform`}
                        >
                            {category?.nomi}
                        </button>
                    ))
                }
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
                {
                    isLoading ? <MainLoader /> : <>
                        {
                            books?.length > 0 ?
                                books.map(book => (
                                    <div
                                        key={book._id}
                                        className="w-fit flex flex-col justify-between bg-white shadow-md relative"
                                    >
                                        <button
                                            onClick={() => toggleLikeFunction(book?._id)}
                                            className="absolute top-1 right-1 text-xl text-red-500"
                                        >
                                            {
                                                auth?.wishlist?.find(product => product._id === book?._id) ?
                                                    <GoHeartFill /> :
                                                    <GoHeart />
                                            }
                                        </button>
                                        <Link to={`/books/${book?._id}`}>
                                            <div className="w-[160px] flex flex-col items-center gap-2 p-4">
                                                <img className="w-full h-[180px] object-cover" src={book?.img} alt={book?.nomi} />
                                                <h1 className="uppercase text-gray-800 text-base">{book.nomi.length > 12 ? book.nomi.slice(0, 12) + "..." : book.nomi}</h1>
                                                <p className="text-center text-gray-400 text-sm">{book.description.length > 30 ? book.description.slice(0, 30) + "..." : book.description}</p>
                                            </div>
                                        </Link>

                                        <div className="flex items-stretch">
                                            <h1 className="w-3/4 text-center py-2 text-white bg-gray-500">${book?.narxi}</h1>
                                            {
                                                auth?.basket?.find(product => product?.book?._id === book?._id) ?
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
                                        </div>
                                    </div>
                                ))
                                : <div>
                                    <h1 className="text-lg">Ma'lumot topilmadi!</h1>
                                    <EmptyAnimation />
                                </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}