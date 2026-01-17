import axios from "axios";
import { useEffect, useState } from "react";
import { addTOCart, removefromCart } from "../utils/cart";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

export default function BookingItem({ itemKey, qty, refresh }) {
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/products/" + itemKey)
            .then((res) => {
                setItem(res.data);
                setStatus("success");
            })
            .catch((err) => {
                console.log(err);
                setStatus("error");
                removefromCart(itemKey);
                refresh();
            });
    }, [itemKey, refresh]);

    const handleIncrement = () => {
        addTOCart(itemKey, 1);
        refresh();
    };

    const handleDecrement = () => {
        if (qty === 1) {
            removefromCart(itemKey);
            refresh();
        } else {
            addTOCart(itemKey, -1);
            refresh();
        }
    };

    const handleRemove = () => {
        removefromCart(itemKey);
        refresh();
    };

    if (status === "loading") {
        return (
            <div className="w-full p-6 bg-secondary/50 rounded-xl animate-pulse">
                <div className="flex gap-4">
                    <div className="w-28 h-28 bg-gray-300 rounded-lg"></div>
                    <div className="flex-grow space-y-3">
                        <div className="h-5 bg-gray-300 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return null;
    }

    return (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-xl my-4">
            <div className="flex gap-4 p-5">
                {/* Image */}
                <div className="flex-shrink-0">
                    <img
                        src={item.image?.[0]}
                        alt={item.name}
                        className="w-35 h-40 object-cover rounded-lg border border-gray-200"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 capitalize">
                        {item.category}
                    </p>

                    <p className="text-xs text-gray-400">
                        Dimensions: {item.dimensions}
                    </p>

                    <p className="text-sm font-medium text-gray-700 mt-1">
                        Rs. {item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                            <button
                                onClick={handleDecrement}
                                className="text-gray-600 hover:text-accent transition-colors p-1"
                                aria-label="Decrease quantity"
                            >
                                <FaMinus size={12} />
                            </button>
                            
                            <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">
                                {qty}
                            </span>
                            
                            <button
                                onClick={handleIncrement}
                                className="text-gray-600 hover:text-accent transition-colors p-1"
                                aria-label="Increase quantity"
                            >
                                <FaPlus size={12} />
                            </button>
                        </div>

                        <p className="text-base font-bold text-accent">
                            Total: Rs. {(item.price * qty).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Remove Button */}
                <div className="flex-shrink-0 flex items-start">
                    <button
                        onClick={handleRemove}
                        className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 flex items-center gap-2 shadow-sm"
                        aria-label="Remove item"
                    >
                        <FaTrash size={12} />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}