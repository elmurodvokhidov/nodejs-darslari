import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authFailure, authStart, authSuccess } from "../redux/slice/authSlice";
import Service from "../config/service";
import { Toast } from "../config/sweetAlert";
import Swal from "sweetalert2";

export default function SignIn() {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        email: "",
        password: "",
    });

    const getAuthCred = (e) => {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(authStart());
            const { data } = await Service.loginAuth(auth);
            dispatch(authSuccess(data));
            navigate('/');
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

    const handleIsForgotPassword = () => {
        Swal.fire({
            title: "Elektron pochtangizni kiriting",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Qidirish",
            cancelButtonText: "Bekor qilish",
            showLoaderOnConfirm: true,
            preConfirm: async (inputValue) => {
                try {
                    if (inputValue === "") return Swal.showValidationMessage("Iltimos, elektron pochtangizni kiriting");
                    const { data } = await Service.findUserByEmail(inputValue);
                    return data;
                } catch (error) {
                    Swal.showValidationMessage(error?.response?.data?.message || error.message);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: result?.value?.message,
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });
    };

    return (
        <div className="h-screen w-full absolute z-10 bg-gray-100">
            <h1 className="text-center text-3xl mt-20">Hisobga kirish</h1>

            <form className="max-w-sm mx-auto my-10">
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
                    onClick={handleLogin}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {isLoading ? "Loading..." : "Hisobga kirish"}
                </button>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleIsForgotPassword}
                        type="button"
                        className="text-blue-500 hover:underline">
                        Parolingizni unutdingizmi?
                    </button>
                    <Link to={"/signup"} className="text-blue-500 hover:underline">
                        Ro'yhatdan o'tish
                    </Link>
                </div>
            </form>
        </div>
    )
}