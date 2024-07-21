import { HiOutlineTrash } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { Toast } from "../config/sweetAlert";
import { authFailure, authStart, authSuccess } from "../redux/slice/authSlice";
import Service from "../config/service";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import StripeCheckout from "react-stripe-checkout";
import logo from "../../public/logo.jpg"
import { useEffect, useState } from "react";
import EmptyAnimation from "../components/EmptyAnimation";
import MainLoader from "../components/MainLoader";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Cart() {
    const { auth, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const totalAmount = auth?.basket?.reduce((total, product) => total + product?.book?.narxi * product?.count, 0);
    const stripeKey = "pk_test_51Oi0EwHw1v8bipqj3mCBmLkT3PKXuDbReDHtIZRKSkBzF7zSRT8QHVq2mQJQAcYf6L9V6w9nUYGD8Mgqa43VoPyW00YHpxmclR";
    const [stripeToken, setStripeToken] = useState(null);

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

    const products = auth?.basket?.map(item => item?.book?._id);

    const onToken = async (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const handlePaymentFunction = async () => {
            try {
                dispatch(authStart());
                const { data } = await Service.payment({ totalAmount, currency: "USD", source: stripeToken?.id, products });
                dispatch(authSuccess(data));
                Toast.fire({ icon: "success", title: data?.message });
            } catch (error) {
                console.log(error);
            }
            finally {
                dispatch(authFailure());
            }
        };

        if (stripeToken) handlePaymentFunction();
    }, [stripeToken]);


    return (
        <div className="h-[70vh] px-32 my-10">
            <h1 className="text-2xl">Savatdagi barcha mahsulotlar</h1>

            {
                isLoading ? <MainLoader /> :
                    <div className="flex gap-10 mt-4">
                        <div className="w-full max-h-[500px] p-4 flex flex-wrap gap-8 overflow-y-auto">
                            {
                                auth?.basket?.length > 0 ?
                                    auth?.basket.map(item => (
                                        <div
                                            key={item?.book?._id}
                                            className="w-full flex items-start justify-between shadow-md rounded-md p-4 bg-white"
                                        >
                                            <Link to={`/books/${item?.book?._id}`} className="flex gap-8">
                                                <div className="w-[100px] h-[150px]">
                                                    <img className="size-full object-cover" src={item?.book?.img} alt={item?.book?.nomi} />
                                                </div>

                                                <div className="flex flex-col justify-between">
                                                    <div>
                                                        <h1 className="uppercase text-gray-800 text-xl">{item?.book?.nomi}</h1>
                                                        <p className="w-3/4 text-gray-400 text-base">{item?.book?.description}</p>
                                                    </div>

                                                    <div className="flex items-center gap-4 mt-5">
                                                        <h1 className="text-gray-400">Narxi:</h1>
                                                        <h1 className="text-lg">${item?.book?.narxi}</h1>
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="h-full flex flex-col justify-between items-end">
                                                <button
                                                    onClick={() => deleteFromCart(item?.book?._id)}
                                                    className="w-fit flex items-center gap-2 text-lg text-gray-400 hover:text-gray-600">
                                                    <HiOutlineTrash />
                                                    <span>Yo'q qilish</span>
                                                </button>
                                                <div className="flex items-center gap-8 text-gray-400 border px-2 py-1">
                                                    <button onClick={() => handleIncAndDecFunction(item, "dec")}>
                                                        <FaMinus />
                                                    </button>
                                                    <p className="text-xl font-semibold">{item?.count}</p>
                                                    <button onClick={() => handleIncAndDecFunction(item, "inc")}>
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : <div>
                                        <h1 className="text-lg">Ma'lumot topilmadi!</h1>
                                        <EmptyAnimation />
                                    </div>
                            }
                        </div>

                        {
                            auth && auth?.basket?.length !== 0 &&
                            <StripeCheckout
                                name="Book Store ®"
                                description={`Umumiy so'mma: ${totalAmount?.toLocaleString()} USD`}
                                image={logo}
                                ComponentClass="div"
                                token={onToken}
                                panelLabel="To'lash"
                                currency="USD"
                                stripeKey={stripeKey}
                                shippingAddress
                            >
                                <div className="w-72 border p-6 shadow-lg rounded-md bg-white">
                                    <div className="flex flex-col gap-2 text-xl">
                                        <div className="w-full flex justify-between gap-2">
                                            <span className="text-gray-600">Jami mahsulotlar:</span>
                                            <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                                            <span className="text-gray-900">{auth?.basket?.length}</span>
                                        </div>

                                        <div className="w-full flex justify-between gap-2">
                                            <span className="text-gray-600">Jami so'mma:</span>
                                            <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                                            <span className="text-gray-900">${auth?.basket?.reduce((sum, product) => sum + product?.book?.narxi * product?.count, 0)}</span>
                                        </div>
                                    </div>
                                    <button className="rounded-md bg-indigo-600 mt-8 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Rasmiylashtirish
                                    </button>
                                </div>
                            </StripeCheckout>
                        }
                    </div>
            }
        </div>
    )
}