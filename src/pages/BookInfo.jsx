import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { bookFailure, bookStart, bookSuccess } from "../redux/slice/bookSlice";
import Service from "../config/service";
import Swal from "sweetalert2";
import { Toast } from "../config/sweetAlert";

const BookInfo = () => {
    const { auth } = useSelector(state => state.auth);
    const { book, isLoading } = useSelector(state => state.book);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getOneBookFunction = async () => {
            try {
                dispatch(bookStart());
                const { data } = await Service.getOneBook(id);
                dispatch(bookSuccess({ data: data, type: "a" }));
            } catch (error) {
                dispatch(bookFailure());
                console.log(error);
            }
        };

        getOneBookFunction();
    }, []);

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

    return (
        <div className="px-32 py-16 flex justify-center">
            {
                isLoading ? "Loading..." :
                    <div className="border rounded-xl overflow-hidden bg-white shadow-lg">
                        <img
                            src={book?.img}
                            alt={book?.nomi + " rasmi"}
                            className="w-[500px]"
                        />
                        <div className="flex flex-col gap-2 p-4 text-xl border-t">
                            <h1 className="text-3xl">{book?.nomi}</h1>
                            <h1>{book?.description}</h1>
                            <div className="flex gap-6">
                                <h1>Narxi: <b>{book?.narxi}$</b></h1>
                                <h1>Turi: <b>{book?.cat}</b></h1>
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
            }
        </div>
    )
}

export default BookInfo