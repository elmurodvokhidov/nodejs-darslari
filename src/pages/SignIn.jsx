import { Link } from "react-router-dom";

export default function SignIn() {
    return (
        <div>
            <h1 className="text-center text-3xl mt-10">Hisobga kirish</h1>

            <form className="max-w-sm mx-auto my-10">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Elektron pochta
                    </label>
                    <input
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
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <button
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Ro'yxatdan o'tish
                </button>
            </form>

            <p className="text-center mb-10">Hisobingiz yo'q bo'lsa, <Link to={"/signup"} className="text-blue-500 hover:underline">Ro'yhatdan o'tish</Link></p>
        </div>
    )
}