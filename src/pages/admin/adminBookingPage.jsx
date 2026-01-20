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
        <div className="text-xl text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (<div className="p-6 bg-[#F7F9FC] min-h-screen">

  {/* ---------------- HEADER ---------------- */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
    <h1 className="text-3xl font-bold text-accent">
      Orders Management
    </h1>

    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500">Total Orders</p>
        <p className="text-2xl font-bold">{orders.length}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500">Pending Orders</p>
        <p className="text-2xl font-bold">
          {orders.filter(o => !o.isApproved && !o.isDeclined).length}
        </p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500">Total Revenue</p>
        <p className="text-2xl font-bold">
          LKR {orders.reduce((s, o) => s + o.totalAmount, 0).toFixed(2)}
        </p>
      </div>
    </div>
  </div>

  {/* ================= MOBILE VIEW ================= */}
  <div className="md:hidden space-y-4">
    {orders.length === 0 ? (
      <p className="text-center text-gray-500">No orders found</p>
    ) : (
      orders.map(order => (
        <div key={order._id} className="bg-white rounded-xl shadow p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold text-blue-700">{order.orderId}</span>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
              order.isApproved
                ? "bg-green-100 text-green-700"
                : order.isDeclined
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {order.isApproved ? "Approved" : order.isDeclined ? "Rejected" : "Pending"}
            </span>
          </div>

          <p className="text-sm text-gray-600">{order.email}</p>
          <p className="text-sm">
            <span className="font-semibold">Total:</span>{" "}
            LKR {order.totalAmount.toLocaleString()}
          </p>

          {!order.isApproved && !order.isDeclined && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleApprove(order._id)}
                className="flex-1 bg-green-600 text-white py-2 rounded text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleDecline(order._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded text-sm"
              >
                Decline
              </button>
            </div>
          )}
        </div>
      ))
    )}
  </div>

  {/* ================= DESKTOP TABLE ================= */}
  <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
    <table className="min-w-full">
      <thead className="bg-[#EEF4FF]">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold">Order ID</th>
          <th className="px-4 py-3 text-left text-xs font-semibold">Customer</th>
          <th className="px-4 py-3 text-left text-xs font-semibold">Dates</th>
          <th className="px-4 py-3 text-left text-xs font-semibold">Items</th>
          <th className="px-4 py-3 text-left text-xs font-semibold">Total</th>
          <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
          <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {orders.map(order => (
          <tr key={order._id} className="hover:bg-gray-50">
            <td className="px-4 py-3 font-medium text-blue-700">
              {order.orderId}
            </td>

            <td className="px-4 py-3 text-sm">{order.email}</td>

            <td className="px-4 py-3 text-sm">
              {formatDate(order.startingDate)} → {formatDate(order.endDate)}
            </td>

            <td className="px-4 py-3 text-xs">
              {order.orderedItems.map(item => (
                <div key={item._id}>
                  {item.product.name} × {item.quantity}
                </div>
              ))}
            </td>

            <td className="px-4 py-3 font-bold text-green-700">
              LKR {order.totalAmount.toLocaleString()}
            </td>

            <td className="px-4 py-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.isApproved
                  ? "bg-green-100 text-green-700"
                  : order.isDeclined
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {order.isApproved ? "Approved" : order.isDeclined ? "Rejected" : "Pending"}
              </span>
            </td>

            <td className="px-4 py-3 flex gap-2">
              {!order.isApproved && !order.isDeclined && (
                <>
                  <button
                    onClick={() => handleApprove(order._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(order._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Decline
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</div>

  );
}
