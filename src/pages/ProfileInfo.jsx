import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProfileInfo = () => {
    const { auth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authStart());
        dispatch(authLogout());
        navigate('/');
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl mb-6">Hisob ma'lumotlari</h1>
            <div className="w-3/5 flex flex-col gap-4 text-xl">
                <div className="w-full flex justify-between gap-2">
                    <span className="text-gray-600">Ism (F.I.O)</span>
                    <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                    <span className="text-gray-900">{auth?.fullname}</span>
                </div>

                <div className="w-full flex justify-between gap-2">
                    <span className="text-gray-600">Elektron pochta</span>
                    <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                    <span className="text-gray-900">{auth?.email}</span>
                </div>
            </div>

            <div className="w-3/5 mt-14 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Hisob ma'lumotlarini o'zgartirish
                </button>
                <button
                    onClick={handleLogout}
                    type="button"
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    Hisobdan chiqish
                </button>
            </div>
        </div>
    )
}