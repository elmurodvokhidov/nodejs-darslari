import { useEffect, useState } from "react"
import { categoryFailure, categoryStart, categorySuccess } from "../redux/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Service from "../config/service";
import { useNavigate, useParams } from "react-router-dom";
import { bookFailure, bookStart, bookSuccess } from "../redux/slice/bookSlice";
import { Toast } from "../config/sweetAlert";

const Update = () => {
    const { categories } = useSelector(state => state.category);
    const { isLoggedIn, auth } = useSelector(state => state.auth);
    const { isLoading } = useSelector(state => state.book);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [newBook, setNewBook] = useState({
        nomi: "",
        narxi: "",
        cat: "",
        img: "https://static.vecteezy.com/system/resources/previews/007/165/324/original/book-icon-book-icon-simple-sign-book-icon-isolated-on-with-background-illustration-of-cover-book-icon-free-free-vector.jpg",
        description: "",
        avtor: "",
    });

    const getNewBookCred = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
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

        const getOneBookFunction = async () => {
            try {
                dispatch(bookStart());
                const { data } = await Service.getOneBook(id);
                dispatch(bookSuccess({ data: data, type: "a" }));
                setNewBook({ ...data, cat: data?.cat?._id });
            } catch (error) {
                dispatch(bookFailure());
                console.log(error);
            }
        };

        getOneBookFunction();
        getAllCategories();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const clearInput = () => {
        setNewBook({
            nomi: "",
            narxi: "",
            cat: "",
            img: "https://static.vecteezy.com/system/resources/previews/007/165/324/original/book-icon-book-icon-simple-sign-book-icon-isolated-on-with-background-illustration-of-cover-book-icon-free-free-vector.jpg",
            description: "",
            avtor: "",
        })
    };

    const handleUpdate = async () => {
        try {
            dispatch(bookStart());
            const { _id, __v, avtor, createdAt, updatedAt, comments, ...others } = newBook;
            const { data } = await Service.updateBook(newBook?._id, others);
            Toast.fire({ icon: "success", title: "Kitob ma'lumotlari muvaffaqiyatli yangilandi" });
            clearInput();
            navigate(`/books/${newBook?._id}`);
        } catch (error) {
            dispatch(bookFailure(error.message));
            console.log(error.message);
            Toast.fire({ icon: "warning", title: error?.response?.data || error.message });
        }
    };

    return (
        <form className="max-w-sm mx-auto my-20">
            <div className="mb-5">
                <label
                    htmlFor="nomi"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Kitob Nomi
                </label>
                <input
                    disabled={isLoading}
                    onChange={getNewBookCred}
                    value={newBook.nomi}
                    type="text"
                    id="nomi"
                    name="nomi"
                    required
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="flex items-center gap-6 mb-5">
                <div className="w-full">
                    <label
                        htmlFor="narxi"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Kitob Narxi
                    </label>
                    <input
                        disabled={isLoading}
                        onChange={getNewBookCred}
                        value={newBook.narxi}
                        type="number"
                        id="narxi"
                        required
                        name="narxi"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="w-full">
                    <label
                        htmlFor="cat"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Kitob Janri
                    </label>
                    <select
                        disabled={isLoading}
                        onChange={getNewBookCred}
                        value={newBook.cat}
                        name="cat"
                        id="cat"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="" className="italic">None</option>
                        {
                            categories?.map(category => (
                                <option value={category?._id} key={category?._id}>{category?.nomi}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Kitob Haqida
                </label>
                <textarea
                    disabled={isLoading}
                    onChange={getNewBookCred}
                    value={newBook.description}
                    name="description"
                    id="description"
                    rows={5}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none"></textarea>
            </div>

            <button
                disabled={isLoading}
                onClick={handleUpdate}
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                {isLoading ? "Loading..." : "Update Book"}
            </button>
        </form>
    )
}

export default Update