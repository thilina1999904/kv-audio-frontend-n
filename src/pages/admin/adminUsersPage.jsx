import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch users function
    const fetchUsers = () => {
        const token = localStorage.getItem("token");

        setLoading(true);

        axios
            .get("http://localhost:3000/api/users/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response?.data || err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);



    function handleBlockUser(email) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        setLoading(true);

        axios
            .put(
                `http://localhost:3000/api/users/block/${email}`, // ✅ Email as URL param
                {}, // ✅ Empty body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log("User blocked successfully", res.data);
                fetchUsers();
                setLoading(false);
            })
            .catch((err) => {
                console.error(err.response?.data || err.message);
                setLoading(false);
            });
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-5xl text-center text-accent font-bold">
                Users List
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">Profile</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Phone</th>
                            <th className="px-4 py-3 text-left">Address</th>
                            <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">
                                        <img
                                            src={user.profilePicture}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {user.firstName} {user.lastName}
                                    </td>

                                    <td className="px-4 py-3">{user.email}</td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">{user.phone}</td>
                                    <td className="px-4 py-3">{user.address}</td>

                                    <td
                                        className="px-4 py-3 cursor-pointer"
                                        onClick={() => handleBlockUser(user.email)}
                                    >
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isBlocked
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
