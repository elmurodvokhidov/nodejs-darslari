import { CgClose } from "react-icons/cg"
import { Link } from "react-router-dom"

export const ProductsModal = ({
    modal,
    setModal,
    books
}) => {
    return (
        <div onClick={() => setModal([])} className={`${modal.length > 0 ? 'flex' : 'hidden'} fixed top-0 right-0 bottom-0 left-0 z-20 items-center justify-center backdrop-blur-sm`}>
            <div onClick={(e) => e.stopPropagation()} className="w-3/5 max-h-[650px] flex flex-col gap-4 px-16 pb-12 pt-6 relative overflow-y-auto bg-gray-200">
                <h1 className="text-2xl">Buyurtma qilingan barcha kitoblar</h1>
                <button
                    onClick={() => setModal([])}
                    className="fixed top-5 right-5 text-3xl text-red-500"
                >
                    <CgClose />
                </button>
                {
                    books && books?.map(book => (
                        <div
                            key={book?._id}
                            className="flex items-start justify-between shadow-md rounded-md p-4 hover:shadow-xl transition-all bg-white"
                        >
                            <Link to={`/books/${book?._id}`} className="flex gap-8">
                                <div className="w-[100px] h-[150px]">
                                    <img className="size-full object-cover" src={book?.img} alt={book?.nomi} />
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h1 className="uppercase text-gray-800 text-xl">{book?.nomi}</h1>
                                        <p className="w-3/4 text-gray-400 text-base">{book?.description}</p>
                                    </div>

                                    <div className="flex items-center gap-4 mt-5">
                                        <h1 className="text-gray-400">Narxi:</h1>
                                        <h1 className="text-lg">${book?.narxi}</h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}