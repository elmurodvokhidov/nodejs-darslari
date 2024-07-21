import { CgClose } from "react-icons/cg"
import { IoPersonCircleOutline } from "react-icons/io5"

export const CommentsModal = ({
    book,
    modal,
    setModal,
}) => {
    return (
        <div onClick={() => setModal(false)} className={`${modal ? 'flex' : 'hidden'} fixed top-0 right-0 bottom-0 left-0 z-20 items-center justify-center backdrop-blur-sm`}>
            <div onClick={(e) => e.stopPropagation()} className="max-h-96 relative flex flex-col gap-2 overflow-y-auto p-8 rounded bg-gray-200">
                <button
                    onClick={() => setModal(false)}
                    className="absolute top-2 right-2 text-red-500"
                >
                    <CgClose />
                </button>
                {
                    book?.comments?.length > 0 ?
                        book?.comments?.map(comment => (
                            <div key={comment?._id} className="max-w-[500px] flex flex-col gap-2 border border-black rounded-md p-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <IoPersonCircleOutline className="text-4xl" />
                                    <div>
                                        <h3 className="text-sm">{comment?.avtor?.fullname}</h3>
                                        <h4 className="text-sm">{comment?.avtor?.email}</h4>
                                    </div>
                                </div>
                                <p className="text-base">{comment?.text}</p>
                                <p className="text-xs text-gray-800">{new Date(comment?.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                        : <h1 className="text-xl">Ushbu kitob uchun hali sharh mavjud emas</h1>
                }
            </div>
        </div>
    )
}