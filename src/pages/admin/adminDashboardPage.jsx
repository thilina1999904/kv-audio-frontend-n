import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashBoardPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalItems: 0,
        revenue: 0
    });

    const [orders, setOrders] = useState([]); // Orders ගබඩා කිරීමට
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Dashboard Stats ලබා ගැනීම
        axios.get("http://localhost:3000/api/admin/dashboard")
            .then((res) => {
                setStats({
                    totalUsers: res.data.totalUsers || 0,
                    totalOrders: res.data.totalOrders || 0,
                    totalItems: res.data.totalItems || 0,
                    revenue: res.data.revenue || 0
                });
            })
            .catch((err) => console.error("Dashboard Fetch Error:", err));

        // 2. Recent Orders ලබා ගැනීම
        // සටහන: ඔබේ Backend එකේ 'http://localhost:3000/api/orders' route එක තිබිය යුතුය
        axios.get("http://localhost:3000/api/orders") 
            .then((res) => {
                // අලුත්ම orders 5ක් පමණක් පෙන්වීමට slice(0, 5) පාවිච්චි කළ හැක
                setOrders(res.data.slice(0, 5)); 
            })
            .catch((err) => console.error("Orders Fetch Error:", err));
    }, []);

    // වෙලාව Update කිරීම සඳහා
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--color-primary)] p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--color-accent)] mt-6">
                            Admin Dashboard
                        </h1>
                        <p className="text-sm font-medium text-[var(--color-accent)]/80 mt-1">
                           Date: {currentTime.toLocaleDateString()} | Time: {currentTime.toLocaleTimeString()}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/admin/items/add")}
                            className="px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:opacity-90 transition"
                        >
                            Add New Item
                        </button>
                        <button className="px-4 py-2 rounded-xl border border-[var(--color-accent)] text-[var(--color-accent)] font-semibold">
                            View Reports
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-5 rounded-2xl bg-[var(--color-secondary)] border border-[var(--color-accent)]/20 shadow-sm">
                        <p className="text-sm text-[var(--color-accent)]/80">Total Users</p>
                        <h2 className="text-2xl font-bold text-[var(--color-accent)] mt-2">{stats.totalUsers}</h2>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-secondary)] border border-[var(--color-accent)]/20 shadow-sm">
                        <p className="text-sm text-[var(--color-accent)]/80">Total Orders</p>
                        <h2 className="text-2xl font-bold text-[var(--color-accent)] mt-2">{stats.totalOrders}</h2>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-secondary)] border border-[var(--color-accent)]/20 shadow-sm">
                        <p className="text-sm text-[var(--color-accent)]/80">Total Items</p>
                        <h2 className="text-2xl font-bold text-[var(--color-accent)] mt-2">{stats.totalItems}</h2>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-secondary)] border border-[var(--color-accent)]/20 shadow-sm">
                        <p className="text-sm text-[var(--color-accent)]/80">Revenue</p>
                        <h2 className="text-2xl font-bold text-[var(--color-accent)] mt-2 md:text-[20px]">
                            LKR {stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="rounded-2xl bg-[var(--color-secondary)] border border-[var(--color-accent)]/20 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[var(--color-accent)]">Recent Orders</h2>
                        <button onClick={() => navigate("/admin/orders")} className="px-4 py-2 rounded-xl border border-[var(--color-accent)] text-[var(--color-accent)] font-semibold text-sm hover:bg-[var(--color-accent)] hover:text-white transition">
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[var(--color-accent)]/70 text-sm">
                                    <th className="py-2">Order ID</th>
                                    <th className="py-2">User</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Total</th>
                                    <th className="py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order._id} className="border-t border-[var(--color-accent)]/10 hover:bg-[var(--color-accent)]/5 transition">
                                            <td className="py-3 text-[var(--color-accent)] text-xs">{order._id}</td>
                                            {/* 'userEmail' වෙනුවට ඔබේ Schema එකට අනුව 'email' හෝ 'customerName' ලෙස වෙනස් කරන්න */}
                                            <td className="py-3 text-[var(--color-accent)]/90">{order.email || "N/A"}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-3 text-[var(--color-accent)]/90 font-medium">LKR {order.totalAmount?.toLocaleString()}</td>
                                            <td className="py-3 text-[var(--color-accent)]/80 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-[var(--color-accent)]/50">
                                            No recent orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}