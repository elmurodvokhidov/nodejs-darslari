import { useRef } from "react";
import { FaSwatchbook } from "react-icons/fa"
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

export const PrintModal = ({
    modal,
    setModal,
    order
}) => {
    const { auth } = useSelector(state => state.auth);
    const printContent = useRef();

    return (
        <div onClick={() => setModal(null)} className={`${modal ? 'flex' : 'hidden'} fixed top-0 right-0 bottom-0 left-0 z-20 items-center justify-center backdrop-blur-sm`}>
            <div onClick={(e) => e.stopPropagation()} className="w-[400px] bg-white">
                <div ref={printContent} className="flex flex-col gap-4 p-6">
                    <h1 className="h-20 flex items-center justify-center gap-1 text-5xl text-gray-800">
                        <FaSwatchbook className="mr-1" />
                        <span>Book</span>
                        <span className="text-gray-500">Store</span>
                    </h1>
                    <div className="flex flex-col gap-2 text-lgp-4">
                        <div className="w-full flex justify-between gap-2">
                            <span className="text-gray-600">Xaridor</span>
                            <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                            <span className="text-gray-900">{auth?.fullname}</span>
                        </div>
                        <div className="w-full flex justify-between gap-2">
                            <span className="text-gray-600">To'lov so'mmasi</span>
                            <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                            <span className="text-gray-900">${order?.total}</span>
                        </div>
                        <div className="w-full flex justify-between gap-2">
                            <span className="text-gray-600">To'landi</span>
                            <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                            <span className="text-gray-900">${order?.total}</span>
                        </div>
                        <div className="w-full flex justify-between gap-2">
                            <span className="text-gray-600">To'lov sanasi</span>
                            <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                            <span className="text-gray-900">{new Date(order?.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center my-5 gap-x-2">
                    <ReactToPrint
                        trigger={() => <button
                            type="button"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Chop etish
                        </button>}
                        content={() => printContent.current}
                    />
                    <button
                        onClick={() => setModal(null)}
                        type="button"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Yopish
                    </button>
                </div>
            </div>
        </div>
    )
}