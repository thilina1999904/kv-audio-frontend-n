
// const sampleArr = [
//     {
//         key: "PRD001",
//         name: "Bluetooth Speaker",
//         price: 4500,
//         category: "audio",
//         dimensions: "15cm x 10cm x 10cm",
//         description: "Portable Bluetooth speaker with deep bass and long battery life.",
//         availability: true,
//         image: [
//             "https://placehold.it/200x200",
//             "https://placehold.it/200x200"
//         ]
//     },
//     {
//         key: "PRD002",
//         name: "Wireless Headphones",
//         price: 7800,
//         category: "audio",
//         dimensions: "20cm x 18cm x 8cm",
//         description: "Noise-cancelling wireless headphones with premium sound quality.",
//         availability: true,
//         image: [
//             "https://placehold.it/200x200"
//         ]
//     },
//     {
//         key: "PRD003",
//         name: "Smart Watch",
//         price: 12500,
//         category: "wearables",
//         dimensions: "4cm x 4cm x 1cm",
//         description: "Smart watch with heart rate monitoring and fitness tracking.",
//         availability: true,
//         image: [
//             "https://placehold.it/200x200"
//         ]
//     },
//     {
//         key: "PRD004",
//         name: "Laptop Backpack",
//         price: 3500,
//         category: "accessories",
//         dimensions: "45cm x 30cm x 15cm",
//         description: "Water-resistant backpack suitable for 15-inch laptops.",
//         availability: true,
//         image: [
//             "https://placehold.it/200x200"
//         ]
//     },
//     {
//         key: "PRD005",
//         name: "USB-C Charger",
//         price: 1800,
//         category: "electronics",
//         dimensions: "6cm x 6cm x 3cm",
//         description: "Fast charging USB-C wall charger with overheat protection.",
//         availability: false,
//         image: [
//             "https://placehold.it/200x200"
//         ]
//     }
// ];

import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminItemPage() {
    const token = localStorage.getItem("token");
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!loading) {
            axios
                .get("http://localhost:3000/api/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setItems(res.data);
                    setLoading(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loading]);


    const handleDelete = (key) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            // Call API to delete item
            axios
                .delete(`http://localhost:3000/api/products/${key}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    setItems(items.filter((item) => item.key !== key));
                    toast.success("Item deleted successfully");
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="w-full min-h-screen p-6 bg-gray-100 flex justify-center">
            {!loading &&
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>}



            {loading && <div className="overflow-x-auto top-2">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Key</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Price (LKR)</th>
                            <th className="py-3 px-6 text-left">Category</th>
                            <th className="py-3 px-6 text-left">Dimensions</th>
                            <th className="py-3 px-6 text-left">Availability</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((product) => (
                            <tr
                                key={product.key}
                                className="border-b hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-3 px-6">{product.key}</td>
                                <td className="py-3 px-6">{product.name}</td>
                                <td className="py-3 px-6">{product.price}</td>
                                <td className="py-3 px-6">{product.category}</td>
                                <td className="py-3 px-6">{product.dimensions}</td>
                                <td className="py-3 px-6">
                                    {product.availability ? (
                                        <span className="text-green-600 font-semibold">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">
                                            Not Available
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-6 flex justify-center gap-2">
                                    <button
                                        onClick={() => navigate(`/admin/items/edit`,{state:product})}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-md transition">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.key)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            <Link to="/admin/items/add">
                <CiCirclePlus className="text-6xl text-blue-600 absolute right-10 bottom-10 hover:text-yellow-500 hover:text-7xl transition" />
            </Link>
        </div>
    );
}
