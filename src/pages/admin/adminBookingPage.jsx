import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ---------------- FETCH ORDERS ---------------- */
    useEffect(() => {
        if (!loading) return;

        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:3000/api/orders/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [loading]);

    /* ---------------- HELPERS ---------------- */
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    /* ---------------- APPROVE ORDER ---------------- */
    const handleApprove = (orderId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // if (!window.confirm("Are you sure you want to approve this order?")) return;

        setLoading(true);

        axios
            .put(
                `http://localhost:3000/api/orders/${orderId}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => setLoading(true))
            .catch((err) => {
                console.error(err);
                alert("Failed to approve order");
                setLoading(false);
            });
    };

    /* ---------------- DECLINE ORDER ---------------- */
    const handleDecline = (orderId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // if (!window.confirm("Are you sure you want to decline this order?")) return;

        setLoading(true);

        axios
            .put(
                `http://localhost:3000/api/orders/${orderId}/decline`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => setLoading(true))
            .catch((err) => {
                console.error(err);
                alert("Failed to decline order");
                setLoading(false);
            });
    };

    /* ---------------- LOADING UI ---------------- */
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading orders...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold text-center mb-6 text-accent">
                Orders Management
            </h1>

            {/* ---------------- TABLE ---------------- */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Customer Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Order Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Rental Period</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Items</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Total Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-8 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 font-medium text-blue-600">
                                        {order.orderId}
                                    </td>

                                    <td className="px-4 py-3 text-sm">{order.email}</td>

                                    <td className="px-4 py-3 text-sm">
                                        {formatDate(order.orderDate)}
                                    </td>

                                    <td className="px-4 py-3 text-sm">
                                        <div className="flex flex-col">
                                            <span>{formatDate(order.startingDate)}</span>
                                            <span className="text-xs text-gray-400">to</span>
                                            <span>{formatDate(order.endDate)}</span>
                                            <span className="text-xs text-blue-600 font-semibold">
                                                ({order.days} days)
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-xs">
                                        {order.orderedItems.map((item) => (
                                            <div key={item._id} className="mb-1">
                                                {item.product.name} × {item.quantity}
                                            </div>
                                        ))}
                                    </td>

                                    <td className="px-4 py-3 font-bold text-green-700">
                                        LKR {order.totalAmount.toLocaleString()}
                                    </td>

                                    {/* ---------- STATUS ---------- */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                order.isApproved
                                                    ? "bg-green-100 text-green-700"
                                                    : order.isDeclined
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {order.isApproved
                                                ? "Approved"
                                                : order.isDeclined
                                                ? "Rejected"
                                                : "Pending"}
                                        </span>
                                    </td>

                                    {/* ---------- ACTIONS ---------- */}
                                    <td className="px-4 py-3 flex gap-2">
                                        {!order.isApproved && !order.isDeclined && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(order._id)}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-xs"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() => handleDecline(order._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs"
                                                >
                                                    Decline
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ---------------- SUMMARY ---------------- */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm">Total Orders</h3>
                    <p className="text-2xl font-bold">{orders.length}</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-sm">Pending Orders</h3>
                    <p className="text-2xl font-bold">
                        {orders.filter(o => !o.isApproved && !o.isDeclined).length}
                    </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm">Total Revenue</h3>
                    <p className="text-2xl font-bold">
                        LKR {orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
