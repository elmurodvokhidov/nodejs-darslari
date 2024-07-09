import { HiOutlineTrash } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { Toast } from "../config/sweetAlert";
import { authStart, authSuccess } from "../redux/slice/authSlice";
import Service from "../config/service";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export default function Cart() {
    const { auth, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const deleteFromCart = async (bookId) => {
        try {
            const { data } = await Service.deleteFromBasket(auth?._id, bookId);
            dispatch(authSuccess(data));
            Toast.fire({ icon: "success", title: data?.message });
        } catch (error) {
            console.log(error);
            Toast.fire({ icon: "warning", title: error.message });
        }
    };

    const handleIncAndDecFunction = async (item, type) => {
        try {
            if (type === "dec" && item.count <= 0) return;
            const { data } = await Service.incAndDec(auth?._id, item._id, type);
            dispatch(authSuccess(data));
        } catch (error) {
            console.log(error);
            Toast.fire({ icon: "warning", title: error.message });
        }
    };

    return (
        <div className="px-32 my-10">
            <h1 className="text-2xl">Savatdagi barcha mahsulotlar</h1>
            <div className="mt-5 flex flex-wrap gap-8">
                {
                    isLoading ? <h1>Loading...</h1> : <>
                        {
                            auth?.basket?.length > 0 ?
                                auth?.basket.map(item => (
                                    <div
                                        key={item?.book._id}
                                        className="w-fit flex flex-col justify-between bg-white shadow-md"
                                    >
                                        <div className="w-[160px] flex flex-col items-center gap-2 p-4">
                                            <img className="w-full h-[180px] object-cover" src={item?.book?.img} alt={item?.book?.nomi} />
                                            <h1 className="uppercase text-gray-800 text-base">{item?.book.nomi.length > 12 ? item?.book.nomi.slice(0, 12) + "..." : item?.book.nomi}</h1>
                                            <p className="text-center text-gray-400 text-sm">{item?.book.description.length > 30 ? item?.book.description.slice(0, 30) + "..." : item?.book.description}</p>
                                        </div>

                                        <div className="flex items-stretch">
                                            <h1 className="w-3/4 flex items-center justify-center text-center py-2 text-white bg-gray-500">${item?.book?.narxi}</h1>

                                            <div className="flex flex-col items-center bg-green-500 text-white px-2">
                                                <button onClick={() => handleIncAndDecFunction(item, "inc")}><IoMdArrowDropup /></button>
                                                <p>{item?.count}</p>
                                                <button onClick={() => handleIncAndDecFunction(item, "dec")}><IoMdArrowDropdown /></button>
                                            </div>
                                            <Link to={`/books/${item?.book?._id}`} className="w-1/4 flex items-center justify-center text-white bg-blue-400">
                                                <IoEyeOutline />
                                            </Link>
                                            <button
                                                onClick={() => deleteFromCart(item?.book?._id)}
                                                className="w-fit bg-red-600 text-white p-2 hover:bg-red-500">
                                                <HiOutlineTrash />
                                            </button>
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