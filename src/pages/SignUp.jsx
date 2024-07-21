import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authFailure, authStart, authSuccess } from "../redux/slice/authSlice";
import { Toast } from "../config/sweetAlert";
import Service from "../config/service";

export default function SignUp() {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const getAuthCred = (e) => {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {
        try {
            dispatch(authStart());
            const { data } = await Service.resgisterAuth(auth);
            // dispatch(authSuccess(data));
            Toast.fire({ icon: "success", title: data.message });
            navigate('/signin');
            dispatch(authFailure());
        } catch (error) {
            dispatch(authFailure());
            Toast.fire({ icon: "error", title: error?.response?.data || error.message });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="h-screen w-full absolute z-10 bg-gray-100">
            <h1 className="text-center text-3xl mt-20">Ro'yhatdan o'tish</h1>

            <form className="max-w-sm mx-auto my-10">
                <div className="mb-5">
                    <label
                        htmlFor="fullname"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Ismingiz (FIO)
                    </label>
                    <input
                        onChange={getAuthCred}
                        type="text"
                        id="fullname"
                        name="fullname"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Elektron pochta
                    </label>
                    <input
                        onChange={getAuthCred}
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Parolingiz
                    </label>
                    <input
                        onChange={getAuthCred}
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <button
                    onClick={handleRegister}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {isLoading ? "Loading..." : "Ro'yxatdan o'tish"}
                </button>
            </form>

            <p className="text-center mb-10">Allaqachon hisobingiz bormi? <Link to={"/signin"} className="text-blue-500 hover:underline">Hisobga kirish</Link></p>
        </div>
    )
}