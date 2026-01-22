import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaBox, FaHistory } from "react-icons/fa";
// ඔයාගේ Header සහ Footer මෙතනට import කරගන්න
import Header from "../components/header"
import Footer from "../components/footer";
import banner from "../assets/gallery/4.jpg";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/api/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setOrders(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const getStatus = (order) => {
        if (order.isApproved) return { label: "Approved", color: "bg-green-500/10 text-green-500", icon: <FaCheckCircle /> };
        if (order.isDeclined) return { label: "Declined", color: "bg-red-500/10 text-red-500", icon: <FaTimesCircle /> };
        return { label: "Pending", color: "bg-yellow-500/10 text-yellow-500", icon: <FaHourglassHalf /> };
    };

    return (
        <div className="w-full min-h-screen bg-[var(--color-primary)] flex flex-col">
            {/* 1. Header */}
            <Header />

            {/* 2. Banner Section */}
            <div className="w-full h-[450px] relative flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 h-[400px]" 
                    style={{ backgroundImage: "url('/src/assets/gallery/4.jpg')", opacity: '2' }} 
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary)] z-10"></div>

                {/* Content */}
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[var(--color-accent)] ">
                        My <span className="text-[var(--color-accent)] animate-pulse">Bookings</span>
                    </h1>
                    <p className="text-gray-300 mt-2 max-w-lg mx-auto text-sm md:text-base">
                        Track your equipment rental history and current booking status in one place.
                    </p>
                </div>
            </div>

            {/* 3. Main Content Section */}
            <main className="flex-grow max-w-5xl mx-auto w-full py-12 px-4">
                <div className="grid gap-6">
                    {loading ? (
                        <div className="text-center py-20 text-gray-400 animate-pulse">
                            Checking database for your orders...
                        </div>
                    ) : orders.length > 0 ? (
                        orders.map((order) => {
                            const status = getStatus(order);
                            return (
                                <div key={order._id} className="bg-[var(--color-secondary)] p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-[var(--color-accent)]/30 transition-all shadow-xl group">
                                    <div className="flex items-center gap-5 w-full md:w-auto">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                                            <FaHistory />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-none mb-1">{order.orderId}</p>
                                            <h3 className="text-lg font-bold leading-tight   text-[var(--color-accent)] ">
                                                {new Date(order.startingDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                                            </h3>
                                            <p className="text-sm text-gray-400 mt-1">
                                                <span className="text-[var(--color-accent)] font-semibold">{order.orderedItems.length}</span> Items • 
                                                <span className=" text-[var(--color-accent)]  ml-1">LKR {order.totalAmount.toLocaleString()}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest ${status.color}`}>
                                        {status.icon} {status.label}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-24 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                            <FaBox className="text-5xl text-gray-600 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-white">No Bookings Found</h2>
                            <p className="text-gray-500 mt-2">Ready to start your next event? Explore our items.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* 4. Footer */}
            <Footer />
        </div>
    );
}