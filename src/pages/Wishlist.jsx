import { useDispatch, useSelector } from "react-redux";
import Service from "../config/service";
import { Toast } from "../config/sweetAlert";
import { authSuccess } from "../redux/slice/authSlice";
import { FaCheck } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import MainLoader from "../components/MainLoader";
import EmptyAnimation from "../components/EmptyAnimation";

export default function Wishlist({ addToBasketFunction, toggleLikeFunction }) {
    const { auth, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const deleteFromWishlistFunc = async (bookId) => {
        try {
            const { data } = await Service.deleteFromWishlist(auth?._id, bookId);
            dispatch(authSuccess(data));
            Toast.fire({ icon: "success", title: data?.message });
        } catch (error) {
            console.log(error);
            Toast.fire({ icon: "warning", title: error.message });
        }
    };

    return (
        <div className="h-[70vh] px-32 my-10">
            <h1 className="text-2xl">Saralangan barcha mahsulotlar</h1>
            <div className="mt-5 flex flex-wrap gap-8">
                {
                    isLoading ? <MainLoader /> : <>
                        {
                            auth?.wishlist?.length > 0 ?
                                auth?.wishlist.map(item => (
                                    <div
                                        key={item?._id}
                                        className="w-fit flex flex-col justify-between bg-white shadow-md"
                                    >
                                        <Link to={`/books/${item?.book?._id}`}>
                                            <div className="w-[160px] flex flex-col items-center gap-2 p-4 relative">
                                                <button
                                                    onClick={() => toggleLikeFunction(item?._id)}
                                                    className="absolute top-2 right-2 text-xl text-red-500"
                                                >
                                                    {
                                                        auth?.wishlist.find(product => product._id === item?._id) ?
                                                            <GoHeartFill /> :
                                                            <GoHeart />
                                                    }
                                                </button>
                                                <img className="w-full h-[180px] object-cover" src={item?.img} alt={item?.nomi} />
                                                <h1 className="uppercase text-gray-800 text-base">{item.nomi.length > 12 ? item.nomi.slice(0, 12) + "..." : item.nomi}</h1>
                                                <p className="text-center text-gray-400 text-sm">{item.description.length > 30 ? item.description.slice(0, 30) + "..." : item.description}</p>
                                            </div>
                                        </Link>

                                        <div className="flex items-stretch">
                                            <h1 className="w-3/4 flex items-center justify-center text-center py-2 text-white bg-gray-500">${item?.narxi}</h1>
                                            {
                                                auth?.basket.find(product => product?.book?._id === item?._id) ?
                                                    <button
                                                        className="w-1/4 flex items-center justify-center text-white bg-green-400">
                                                        <FaCheck />
                                                    </button> :
                                                    <button
                                                        onClick={() => addToBasketFunction(item?._id)}
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
        </div >
    )
}