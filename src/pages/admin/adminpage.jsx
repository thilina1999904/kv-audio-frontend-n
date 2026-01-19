import { BsGraphDownArrow } from "react-icons/bs";
import { CgMusicSpeaker } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {

    const [userValidate, setUserValidate] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        axios.get("http://localhost:3000/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (res.data.user.role !== "admin") {
                setLoading(false);
                navigate("/");
                return;
            }

            setUserValidate(true);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Checking permissions...
            </div>
        );
    }

    if (!userValidate) return null;

    return (
        <div className="w-full h-[800px] flex">
            <div className="w-[200px] h-full bg-blue-200 flex flex-col">
                <button className="w-full h-10 text-xl font-bold flex items-center justify-center gap-2 cursor-pointer">
                    <BsGraphDownArrow /> Dashboard
                </button>

                <Link to="/admin/orders" className="w-full h-10 text-xl font-bold flex items-center justify-center gap-2 cursor-pointer">
                    <FaRegBookmark /> Orders
                </Link>

                <Link to="/admin/items" className="w-full h-10 text-xl font-bold flex items-center justify-center gap-2 cursor-pointer">
                    <CgMusicSpeaker /> Items
                </Link>

                <Link to="/admin/users" className="w-full h-10 text-xl font-bold flex items-center justify-center gap-2 cursor-pointer">
                    <LuUsers /> Users
                </Link>
            </div>

            <div className="flex-1 w-[calc(100vw-200px)] h-full">
                <Routes>
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="items" element={<ItemPage />} />
                    <Route path="users" element={<AdminUsersPage />} />
                    <Route path="items/add" element={<AddItemPage />} />
                    <Route path="items/edit" element={<UpdateItemPage />} />
                </Routes>
            </div>
        </div>
    );
}
