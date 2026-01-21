import { BsGraphDownArrow } from "react-icons/bs";
import { CgMusicSpeaker } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminDashBoardPage from "./adminDashboardPage";

export default function AdminPage() {

    const [userValidate, setUserValidate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);


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

    // ✅ Logout Function
    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Checking permissions...
            </div>
        );
    }

    if (!userValidate) return null;

    return (
        <div className="min-h-screen bg-[var(--color-primary)]">

            {/* ---------------- MOBILE TOP BAR ---------------- */}
            <div className="md:hidden flex items-center justify-between p-4 bg-[var(--color-secondary)] shadow fixed w-full">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-[var(--color-accent)] text-2xl"
                >
                    ☰
                </button>

                <h1 className="font-bold text-lg text-[var(--color-accent)]">
                    Admin Panel
                </h1>
            </div>

            {/* ---------------- BACKDROP ---------------- */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ---------------- SIDEBAR ---------------- */}
            <div
                className={`fixed md:fixed top-0 left-0 z-50 h-full w-[260px]
      bg-[var(--color-secondary)] border-r border-[var(--color-accent)]/30
      transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0`}
            >
                <div className="p-6 flex flex-col gap-4">

                    {/* Mobile Close */}
                    <div className="md:hidden flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-[var(--color-accent)]">
                            Admin Panel
                        </h2>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-2xl text-[var(--color-accent)]"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Desktop Title */}
                    <div className="hidden md:block text-2xl font-bold text-[var(--color-accent)]">
                        Admin Panel
                    </div>

                    {/* Links */}
                    <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="admin-link text-accent flex items-center gap-4 ">
                        <BsGraphDownArrow size={22} /> Dashboard
                    </Link>

                    <Link to="/admin/orders" onClick={() => setSidebarOpen(false)} className="admin-link  text-accent flex items-center gap-4">
                        <FaRegBookmark size={22} /> Orders
                    </Link>

                    <Link to="/admin/items" onClick={() => setSidebarOpen(false)} className="admin-link  text-accent flex items-center gap-4">
                        <CgMusicSpeaker size={22} /> Items
                    </Link>

                    <Link to="/admin/users" onClick={() => setSidebarOpen(false)} className="admin-link  text-accent flex items-center gap-4 ">
                        <LuUsers size={22} /> Users
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="admin-link mt-6 hover:bg-red-200  text-accent flex items-center gap-4 p-2 hover:rounded-2xl"
                    >
                        <FiLogOut size={22} /> Logout
                    </button>

                </div>
            </div>

            {/* ---------------- MAIN CONTENT ---------------- */}
            <div className="md:ml-[260px] p-4 md:p-6">
                <Routes>
                    <Route path="dashboard" element={<AdminDashBoardPage />} />
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="items" element={<ItemPage />} />
                    <Route path="items/add" element={<AddItemPage />} />
                    <Route path="items/edit" element={<UpdateItemPage />} />
                    <Route path="users" element={<AdminUsersPage />} />
                </Routes>
            </div>

        </div>
    );

}
