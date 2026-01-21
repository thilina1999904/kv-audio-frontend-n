import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaReceipt, FaTruckLoading, FaArrowRight } from "react-icons/fa";

/* ---------- Helpers ---------- */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function calculateDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
}

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const [startingDate, setStartingDate] = useState(formatDate(today));
    const [endDate, setEndDate] = useState(formatDate(tomorrow));
    const [totalDays, setTotalDays] = useState(calculateDays(formatDate(today), formatDate(tomorrow)));

    useEffect(() => {
        reloadCart();
    }, [totalDays]);

    function reloadCart() {
        const cartInfo = loadCart();
        setCart(cartInfo);

        if (!cartInfo?.orderedItems?.length) {
            setTotal(0);
            return;
        }

        axios.post("http://localhost:3000/api/orders/quote", {
            orderedItems: cartInfo.orderedItems,
            days: totalDays
        })
        .then((res) => setTotal(res.data.total))
        .catch(() => setTotal(0));
    }

    function handleStartDateChange(e) {
        const start = e.target.value;
        setStartingDate(start);
        if (new Date(endDate) <= new Date(start)) {
            const nextDay = new Date(start);
            nextDay.setDate(nextDay.getDate() + 1);
            const newEnd = formatDate(nextDay);
            setEndDate(newEnd);
            setTotalDays(calculateDays(start, newEnd));
        } else {
            setTotalDays(calculateDays(start, endDate));
        }
    }

    function handleEndDateChange(e) {
        const end = e.target.value;
        if (new Date(end) <= new Date(startingDate)) return;
        setEndDate(end);
        setTotalDays(calculateDays(startingDate, end));
    }

    function handleBookingCreation() {
        const cartData = loadCart();
        cartData.startingDate = startingDate;
        cartData.endDate = endDate;
        cartData.days = totalDays;

        const token = localStorage.getItem("token");
        if(!token) {
            toast.error("Please login to create a booking");
            return;
        }

        axios.post("http://localhost:3000/api/orders", cartData, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            localStorage.removeItem("cart");
            toast.success("Booking Created Successfully!");
            setCart(loadCart());
            setTotal(0);
            navigate("/my-orders");
        }).catch(() => toast.error("Booking Failed"));
    }

    return (
        <div className="min-h-screen bg-[var(--color-primary)] text-white py-12 px-4 sm:px-8">
            <div className="max-w-[1200px] mx-auto">
                
                {/* Header */}
                <div className="mb-10 flex flex-col items-center sm:items-start">
                    <h1 className="text-4xl text-[var(--color-accent)] font-black uppercase tracking-tighter">
                        Confirm Your <span className="text-[var(--color-accent)]">Booking</span>
                    </h1>
                    <div className="h-1 w-20 bg-[var(--color-accent)] mt-2 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left: Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-[var(--color-secondary)] p-6 rounded-3xl border border-white/5 shadow-xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--color-accent)]">
                                <FaTruckLoading className="text-[var(--color-accent)]" /> Your Equipment
                            </h2>
                            
                            {cart?.orderedItems?.length > 0 ? (
                                <div className="space-y-4">
                                    {cart.orderedItems.map((item) => (
                                        <BookingItem
                                            key={item.key}
                                            itemKey={item.key}
                                            qty={item.qty}
                                            refresh={reloadCart}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    Your cart is empty. Go back to items to add gear.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Booking Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-2xl sticky top-24 border border-gray-100 flex flex-col gap-6">
                            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2 border-b pb-4">
                                <FaReceipt className="text-[var(--color-accent)]" /> Summary
                            </h2>

                            {/* Date Inputs */}
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold uppercase text-gray-400 ml-1 flex items-center gap-2">
                                        <FaCalendarAlt /> Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={startingDate}
                                        min={formatDate(today)}
                                        onChange={handleStartDateChange}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition-all"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold uppercase text-gray-400 ml-1 flex items-center gap-2">
                                        <FaCalendarAlt /> End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        min={startingDate}
                                        onChange={handleEndDateChange}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-500 text-sm font-medium">Duration:</span>
                                    <span className="text-gray-800 font-bold">{totalDays} Day{totalDays > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                    <span className="text-gray-800 font-bold">Total Price:</span>
                                    <span className="text-[var(--color-accent)] text-2xl font-black">
                                        Rs. {total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleBookingCreation}
                                disabled={!cart?.orderedItems?.length}
                                className="w-full bg-[var(--color-accent)] hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 uppercase tracking-wider group"
                            >
                                Confirm Booking <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}