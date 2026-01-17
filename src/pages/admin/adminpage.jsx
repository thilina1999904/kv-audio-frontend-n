import { BsGraphDownArrow } from "react-icons/bs";
import { CgMusicSpeaker } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { Link, Route, Routes } from "react-router-dom";
import ItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
export default function AdminPage() {
    return (
        <div className="w-full h-screen flex" >



            {/* Sidebar */}
            <div className="w-[200px] h-full bg-blue-200 flex flex-col">
                <button className="w-full h-10 text-xl font-bold bg-blue-200 flex items-center justify-center gap-2 cursor-pointer">
                    <BsGraphDownArrow /> Dashboard
                </button>

                <Link to="/admin/bookings" className="w-full h-10 text-xl font-bold bg-blue-200 flex items-center justify-center gap-2 cursor-pointer">
                    <FaRegBookmark /> Bookings
                </Link>

                <Link to="/admin/items" className="w-full h-10 text-xl font-bold bg-blue-200 flex items-center justify-center gap-2">
                    <CgMusicSpeaker /> Items
                </Link>

                <button className="w-full h-10 text-xl font-bold bg-blue-200 flex items-center justify-center gap-2 cursor-pointer">
                    <LuUsers /> Users
                </button>
            </div>

           




            {/* Content */}
            <div className="flex-1 w-[calc(100vw-200px)] h-full ">
                <Routes path="/*">
                    <Route path="/bookings" element={<h1>Bookings</h1>} />
                    <Route path="/items" element={<ItemPage />} />
                    <Route path="/items/add" element={<AddItemPage />} />
                    <Route path="/items/edit" element={<UpdateItemPage />} />
                    <Route path="/users" element={<h1>Users</h1>} />

                </Routes>
            </div>
        </div>
    );
}
