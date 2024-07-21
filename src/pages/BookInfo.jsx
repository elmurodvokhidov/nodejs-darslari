import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { bookFailure, bookStart, bookSuccess } from "../redux/slice/bookSlice";
import Service from "../config/service";
import Swal from "sweetalert2";
import { Toast } from "../config/sweetAlert";
import { Box, Rating } from "@mui/material";
import { authSuccess } from "../redux/slice/authSlice";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegComments } from "react-icons/fa";
import MainLoader from "../components/MainLoader";
import { CommentsModal } from "../components/CommentsModal";

const BookInfo = ({ addToBasketFunction, toggleLikeFunction }) => {
    const { auth, isLoggedIn } = useSelector(state => state.auth);
    const { book, isLoading } = useSelector(state => state.book);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [modal, setModal] = useState(false);

    const getOneBookFunction = async (authId) => {
        try {
            dispatch(bookStart());
            const { data } = await Service.getOneBook(id);
            dispatch(bookSuccess({ data, type: "a" }));
            const userRating = data?.comments?.filter(comment => comment?.avtor === authId);
            setValue(userRating[userRating?.length - 1]?.rating ?? 0);
        } catch (error) {
            dispatch(bookFailure());
            console.log(error);
        }
    };

    const getAuthFunction = () => {
        if (isLoggedIn) {
            Service.getAuth().then(({ data }) => {
                dispatch(authSuccess(data));
                getOneBookFunction(data.data._id);
            }).catch((error) => console.log(error))
        }
        else {
            getOneBookFunction(id);
        }
    };

    useEffect(() => {
        getAuthFunction();
    }, [id]);

    const ratingFunction = async (newValue, bookId) => {
        if (isLoggedIn) {
            const { value: text } = await Swal.fire({
                input: "textarea",
                inputLabel: "Message",
                inputPlaceholder: "Type your message here...",
                inputAttributes: {
                    "aria-label": "Type your message here"
                },
                showCancelButton: true
            });

            if (text) {
                dispatch(bookStart());
                const { data } = await Service.addComment(bookId, { text, rating: newValue, avtor: auth?._id });
                dispatch(bookSuccess({ type: "a", data: data.data }));
                Toast.fire({ icon: "success", title: data?.message });
            }
        }
        else {
            Toast.fire({ icon: "warning", text: "Avval hisobga kiring yoki ro'yhatdan o'ting!" });
            setValue(0);
        }
    };

    return (
        <div className="px-32 pt-16 pb-28">
            {
                isLoading || !book ? <MainLoader /> :
                    <div className="flex flex-col gap-10">
                        <div className="flex gap-8 border rounded-xl overflow-hidden bg-white shadow-lg">
                            <figure className="w-fit flex flex-col items-end p-10 rounded-md bg-[#F4F4FF]">
                                <img
                                    src={book?.img}
                                    alt={book?.nomi + " rasmi"}
                                    className="w-60 mx-auto"
                                />
                            </figure>
                            <div className="w-full flex flex-col justify-between gap-4 p-4 text-xl">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-3xl">{book?.nomi}</h1>
                                        <button
                                            onClick={() => toggleLikeFunction(book?._id)}
                                            className="text-2xl text-red-500"
                                        >
                                            {
                                                auth?.wishlist?.find(product => product._id === book?._id) ?
                                                    <GoHeartFill /> :
                                                    <GoHeart />
                                            }
                                        </button>
                                    </div>
                                    <h1 className="mt-4">{book?.description}</h1>
                                    <div className="flex gap-6 mt-2">
                                        <h1>Narxi: <b>{book?.narxi}$</b></h1>
                                        <h1>Turi: <b>{book?.cat?.nomi}</b></h1>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setModal(true)} className="flex items-center gap-2 underline text-blue-500">
                                            <FaRegComments />
                                            <span className="text-lg">Barcha sharhlar</span>
                                        </button>
                                        <Box className="flex items-center" sx={{ '& > legend': { mt: 2 } }}>
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                    ratingFunction(newValue, book?._id);
                                                }}
                                            />
                                        </Box>
                                    </div>
                                    <button
                                        onClick={() => addToBasketFunction(book?._id)}
                                        type="button"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Savatga qo'shish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <CommentsModal
                modal={modal}
                setModal={setModal}
                book={book}
            />
        </div>
    )
}

export default BookInfo