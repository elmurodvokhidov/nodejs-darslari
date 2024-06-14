import { useEffect } from "react"
import { categoryFailure, categoryStart, categorySuccess } from "../redux/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Service from "../config/service";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const { categories } = useSelector(state => state.category);
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        getAllCategories();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

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
                    <select name="cat" id="cat" required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="" className="italic">None</option>
                        {
                            categories?.map(category => (
                                <option value={category?.nomi} key={category?._id}>{category?.nomi}</option>
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
                    name="description"
                    id="description"
                    rows={5}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none"></textarea>
            </div>

            <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Create Book
            </button>
        </form>
    )
}

export default Create