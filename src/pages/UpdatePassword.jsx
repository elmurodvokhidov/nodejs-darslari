import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { authFailure, authStart } from "../redux/slice/authSlice";
import Service from "../config/service";
import { Toast } from "../config/sweetAlert";

export const UpdatePassword = () => {
    const { isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const { userId, uniqueId } = useParams();

    const getAuthCred = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdatePassword = async () => {
        try {
            dispatch(authStart());
            const { data } = await Service.updatePassword(userId, uniqueId, passwords);
            navigate('/signin');
            Toast.fire({ icon: 'success', title: data?.message });
        } catch (error) {
            Toast.fire({ icon: 'warning', title: error?.response?.data?.message || error.message });
            console.log(error);
        }
        finally {
            dispatch(authFailure());
        }
    };

    return (
        <div>
            <h1 className="text-center text-3xl mt-10">Yangi parol o'rnatish</h1>

            <form className="max-w-sm mx-auto my-10">
                <div className="mb-5">
                    <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Yangi parol kiriting
                    </label>
                    <input
                        onChange={getAuthCred}
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Yangi parolni tasdiqlang
                    </label>
                    <input
                        onChange={getAuthCred}
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <button
                    onClick={handleUpdatePassword}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {isLoading ? "Loading..." : "Parolni yangilash"}
                </button>
            </form>
        </div>
    )
}