import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";



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
    return Math.max(diffTime / (1000 * 60 * 60 * 24), 1);
}

/* ---------- Component ---------- */
export default function BookingPage() {

    const [cart, setCart] = useState(loadCart());
    const [total, setTotal] = useState(0)

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const [startingDate, setStartingDate] = useState(formatDate(today));
    const [endDate, setEndDate] = useState(formatDate(tomorrow));
    const [totalDays, setTotalDays] = useState(
        calculateDays(formatDate(today), formatDate(tomorrow))
    );

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
    .then((res) => {
        setTotal(res.data.total);
    })
    .catch((err) => {
        console.error(err);
        setTotal(0);
    });
}



    function handleStartDateChange(e) {
        const start = e.target.value;
        setStartingDate(start);

        // Ensure end date is always after start date
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
        const cart = loadCart();
        cart.startingDate = startingDate;
        cart.endDate = endDate;
        cart.days = totalDays;


        const token = localStorage.getItem("token");
        axios.post("http://localhost:3000/api/orders", cart, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            localStorage.removeItem("cart");
            toast.success("Booking Created");
            setCart(loadCart());
        }).catch((err) => {
            console.error(err);
            toast.error("Booking Failed");


        })
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="text-xl font-semibold mb-4">Create Bookings</h1>

            {/* Date Section */}
            <div className="w-full max-w-md flex flex-col gap-4 mb-6">

                <div className="flex flex-col">
                    <label>Starting Date</label>
                    <input
                        type="date"
                        value={startingDate}
                        min={formatDate(today)}
                        onChange={handleStartDateChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        min={startingDate}
                        onChange={handleEndDateChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Total Days</label>
                    <input
                        type="number"
                        value={totalDays}
                        readOnly
                        className="border p-2 rounded bg-gray-100 font-semibold"
                    />
                </div>

            </div>

            {/* Booking Items */}
            <div className="w-full flex flex-col items-center">
                {cart?.orderedItems?.map((item) => (
                    <BookingItem
                        key={item.key}
                        itemKey={item.key}
                        qty={item.qty}
                        refresh={reloadCart}
                    />
                ))}
            </div>

            <div className="flex flex-col">
                <label className="text-center">Total Price (Rs.)</label>
                <input
                    type="text"
                    value={total.toLocaleString()}
                    readOnly
                    className="border p-2 rounded bg-gray-100 font-semibold text-green- text-center"
                />
            </div>




            <div className="w-full flex justify-center mt-6">
                <button
                    onClick={handleBookingCreation}
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Create Booking
                </button>
            </div>

        </div>
    );
}
