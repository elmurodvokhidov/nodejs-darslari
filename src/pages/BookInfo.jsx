import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { bookFailure, bookStart, bookSuccess } from "../redux/slice/bookSlice";
import Service from "../config/service";
import Swal from "sweetalert2";
import { Toast } from "../config/sweetAlert";
import { Box, Rating } from "@mui/material";
import { authSuccess } from "../redux/slice/authSlice";
import { IoPersonCircleOutline } from "react-icons/io5";

const BookInfo = () => {
    const { auth } = useSelector(state => state.auth);
    const { book, isLoading } = useSelector(state => state.book);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

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
        Service.getAuth().then(({ data }) => {
            dispatch(authSuccess(data));
            getOneBookFunction(data.data._id);
        }).catch((error) => console.log(error))
    };

    useEffect(() => {
        getAuthFunction();
    }, [id]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Ishonchingiz komilmi?",
            text: "Buni qaytara olmaysiz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Yo'q",
            confirmButtonText: "Ha, albatta!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(bookStart());
                Service.deleteBook(id).then((res) => {
                    navigate('/');
                    Toast.fire({ icon: "success", title: "Kitob ma'lumotlari muvaffaqiyatli o'chirildi" });
                }).catch((error) => {
                    dispatch(bookFailure(error.response?.data.message));
                    Toast.fire({ icon: "error", title: error.response?.data.message || error.message });
                });
            }
        });
    };

    const ratingFunction = async (newValue, bookId) => {
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
    };

    return (
        <div className="px-32 py-16 flex justify-center">
            {
                isLoading || !auth || !book ? "Loading..." :
                    <div className="flex flex-col gap-10">
                        <div className="border rounded-xl overflow-hidden bg-white shadow-lg">
                            <figure className="flex flex-col items-end p-2">
                                <img
                                    src={book?.img}
                                    alt={book?.nomi + " rasmi"}
                                    className="w-[500px] mx-auto"
                                />
                                <Box sx={{ '& > legend': { mt: 2 } }}>
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                            ratingFunction(newValue, book?._id);
                                        }}
                                    />
                                </Box>
                            </figure>
                            <div className="flex flex-col gap-2 p-4 text-xl border-t">
                                <h1 className="text-3xl">{book?.nomi}</h1>
                                <h1>{book?.description}</h1>
                                <div className="flex gap-6">
                                    <h1>Narxi: <b>{book?.narxi}$</b></h1>
                                    <h1>Turi: <b>{book?.cat?.nomi}</b></h1>
                                </div>
                            </div>

                            {
                                auth?._id === book?.avtor?._id &&
                                <div className="flex gap-2 p-4 text-center">
                                    <Link
                                        to={`/update-book/${book?._id}`}
                                        className="w-full rounded-xl bg-blue-600 text-white py-2 hover:bg-blue-500">
                                        Tahrirlash
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(book?._id)}
                                        className="w-full rounded-xl bg-red-600 text-white py-2 hover:bg-red-500">
                                        O'chirish
                                    </button>
                                </div>
                            }
                        </div>
                        {/* <div>
                            {
                                book?.comments?.map(comment => (
                                    <div key={comment?._id}>
                                        <IoPersonCircleOutline />
                                        <h3>{comment?.avtor?.fullname}</h3>
                                        <h4>{comment?.avtor?.email}</h4>
                                        <p>{comment?.createdAt}</p>
                                    </div>
                                ))
                            }
                        </div> */}
                    </div>
            }
        </div>
    )
}

export default BookInfo