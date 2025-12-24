import { BsGraphDownArrow } from "react-icons/bs";
import { CgMusicSpeaker } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex">

            {/* Sidebar */}
            <div className="w-[400px] h-full bg-green-200 flex flex-col">
                <button className="w-full h-10 text-xl font-bold bg-blue-200 flex items-center justify-center gap-2">
                    <BsGraphDownArrow /> Dashboard
                </button>

                <Link to="/admin/bookings" className="w-full h-10 text-xl font-bold bg-blue-200 flex items-center justify-center gap-2">
                    <FaRegBookmark /> Bookings
                </Link>

                <Link to="/admin/items" className="w-full h-10 text-xl font-bold bg-blue-200 flex items-center justify-center gap-2">
                    <CgMusicSpeaker /> Items
                </Link>

                <button className="w-full h-10 text-xl font-bold bg-blue-200 flex items-center justify-center gap-2">
                    <LuUsers /> Users
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 bg-red-300 w-[calc()]">
                <Routes path="/*">
                    <Route path="/bookings" element={<h1>Bookings</h1>} />
                    <Route path="/items" element={<h1>Items</h1>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                </Routes>
            </div>

        </div>
    );
}
