import { NavLink, Outlet } from "react-router-dom";

export default function Profile() {
    return (
        <div className="profile h-[80vh] px-32 py-16 flex gap-10">
            <div className="flex flex-col gap-2 border-r-2 pr-10">
                <NavLink to={"orders"} className="text-xl px-6 py-2 rounded-md">Buyurtmalarim</NavLink>
                <NavLink to={"me"} className="text-xl px-6 py-2 rounded-md">Ma'lumotlarim</NavLink>
            </div>

            <Outlet />
        </div>
    )
}