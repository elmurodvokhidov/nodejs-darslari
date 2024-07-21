import { useSelector } from "react-redux";
import EmptyAnimation from "../components/EmptyAnimation";
import MainLoader from "../components/MainLoader";
import { useState } from "react";
import { ProductsModal } from "../components/ProductsModal";
import { PrintModal } from "../components/PrintModal";

export const Orders = () => {
    const { auth, isLoading } = useSelector(state => state.auth);
    const [products, setProducts] = useState([]);
    const [printModal, setPrintModal] = useState(null);

    return (
        <div className="w-full">
            <h1 className="flex items-center gap-2 text-2xl mb-6">
                <span>Barcha buyurtmalar:</span>
                <span>{auth?.orders?.length || 0}</span>
            </h1>
            <div className="max-h-96 flex flex-col gap-4 overflow-y-auto">
                {
                    isLoading ? <MainLoader /> : <>
                        {
                            auth?.orders?.length > 0 ?
                                auth?.orders.map(order => (
                                    <div key={order?._id}>
                                        <h1 className="border-2 text-xl p-4"><span>Buyurtma ID raqami:</span> <span>{order?._id?.slice(10, 16)}</span></h1>

                                        <div className="flex flex-col gap-2 text-lg border-2 p-4 border-t-0">
                                            <div className="w-full flex justify-between gap-2">
                                                <span className="text-gray-600">Buyurtma holati</span>
                                                <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                                                <span className="text-gray-900">{order?.status}</span>
                                            </div>

                                            <div className="w-full flex justify-between gap-2">
                                                <span className="text-gray-600">Buyurtma qiymati</span>
                                                <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                                                <span className="text-gray-900">${order?.total}</span>
                                            </div>

                                            <div className="w-full flex justify-between gap-2">
                                                <span className="text-gray-600">Buyurtma sanasi</span>
                                                <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                                                <span className="text-gray-900">{new Date(order?.createdAt).toLocaleString()}</span>
                                            </div>

                                            <div className="w-full flex justify-between gap-2">
                                                <span className="text-gray-600">Yetkazib berish manzili</span>
                                                <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                                                <span className="text-gray-900">
                                                    {order?.address?.country + " " + order?.address?.city + " " + order?.address?.postal_code}
                                                </span>
                                            </div>

                                            <div className="w-full flex justify-between gap-2">
                                                <span className="text-gray-600">Mahsulotlar soni</span>
                                                <div className="flex-grow border-b-2 border-b-gray-600 border-dashed"></div>
                                                <span className="text-gray-900">{order?.products?.length}</span>
                                            </div>

                                            <div className="flex items-center gap-4 mt-4">
                                                <button
                                                    onClick={() => setPrintModal(order)}
                                                    type="button"
                                                    className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                                >
                                                    Elektron chek
                                                </button>
                                                <button
                                                    onClick={() => setProducts(order?.products)}
                                                    type="button"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Mahsulotlarni ko'rish
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : <div>
                                    <h1 className="text-lg">Buyurtma mavjud emas!</h1>
                                    <EmptyAnimation />
                                </div>
                        }
                    </>
                }
            </div>

            <ProductsModal
                modal={products}
                setModal={setProducts}
                books={products}
            />

            <PrintModal
                modal={printModal}
                setModal={setPrintModal}
                order={printModal}
            />
        </div>
    )
}