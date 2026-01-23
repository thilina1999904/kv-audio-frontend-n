import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "../../components/imagesSlider";
import { addTOCart } from "../../utils/cart";
import toast from "react-hot-toast";
import { FaCalendarCheck, FaCartPlus, FaChevronLeft, FaShieldAlt } from "react-icons/fa";

export default function ProductOverview() {
    const navigate = useNavigate();
    const params = useParams();
    const encodedKey = params.key;
    const key = decodeURIComponent(encodedKey);

    const [lodingStatus, setLodingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get("/api/products/" + key)
            .then((res) => {
                setProduct(res.data);
                setLodingStatus("loaded");
            })
            .catch((error) => {
                setLodingStatus("error");
                console.error("Error:", error);
            });
    }, [key]);

    const handleAddToCart = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            // Log වී නැත්නම් Login පිටුවට යවන්න
            toast.error("Please login to add items to cart");
            navigate("/login");
            return;
        }

        // Cart එකට එකතු කිරීම
        addTOCart(product.key, 1);
        toast.success(`${product.name} added to cart!`);

        // --- භාණ්ඩය එකතු කළ සැනින් Cart (Booking) පිටුවට Redirect කිරීම ---
        navigate("/booking");
    };

    return (
        <div className="w-full min-h-screen bg-[var(--color-primary)] py-6 md:py-10 px-4 md:px-10 max-w-[1400px] m-auto">

            {/* 1. Back Button */}
            <button
                onClick={() => navigate("/items")}
                className="flex items-center gap-2 text-[var(--color-accent)] font-semibold mb-6 hover:opacity-70 transition text-sm md:text-base"
            >
                <FaChevronLeft /> Back to Items
            </button>

            {/* 2. Loading State */}
            {lodingStatus === "loading" && (
                <div className="w-full h-[60vh] flex flex-col justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--color-accent)] border-b-4 border-transparent"></div>
                    <p className="mt-4 text-[var(--color-accent)] font-medium italic">Fetching details...</p>
                </div>
            )}

            {/* 3. Product Content */}
            {lodingStatus === "loaded" && (
                <div className="max-w-[1200px] mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-50 overflow-hidden flex flex-col md:flex-row">

                    {/* Left Side: Image Slider Section */}
                    <div className="w-full md:w-1/2 bg-[var(--color-secondary)]/10 p-4 md:p-10 flex items-center justify-center">
                        <div className="w-full max-w-[500px] aspect-square md:aspect-auto h-[300px] sm:h-[400px] md:h-full rounded-2xl overflow-hidden shadow-inner bg-white flex items-center justify-center">
                            <ImageSlider images={product.image} />
                        </div>
                    </div>

                    {/* Right Side: Details Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col">

                        {/* Category Tag */}
                        <div className="mb-3">
                            <span className="bg-[var(--color-secondary)] text-[var(--color-accent)] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {product.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {/* Description Box */}
                        <div className="bg-gray-50 p-5 rounded-2xl mb-6 border border-gray-100">
                            <h3 className="text-[var(--color-accent)] font-bold text-xs mb-1 uppercase tracking-wider">Product Info</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed italic">
                                {product.description}
                            </p>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <FaCalendarCheck className="text-[var(--color-accent)] text-lg" />
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">Dimensions</p>
                                    <p className="text-xs font-bold text-gray-700">{product.dimensions || "Standard"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <FaShieldAlt className="text-[var(--color-accent)] text-lg" />
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">Condition</p>
                                    <p className="text-xs font-bold text-gray-700">A+ Premium</p>
                                </div>
                            </div>
                        </div>

                        {/* Price & Action Button */}
                        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Daily Rental</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-gray-900">LKR {product.price?.toLocaleString()}</span>
                                    <span className="text-gray-400 text-xs font-bold">/DAY</span>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[var(--color-accent)] hover:bg-[#1a4d80] text-white font-black px-8 py-4 rounded-2xl shadow-lg hover:shadow-[var(--color-accent)]/40 transition-all active:scale-95"
                            >
                                <FaCartPlus /> ADD TO CART
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* 4. Error State */}
            {lodingStatus === "error" && (
                <div className="w-full h-[60vh] flex flex-col justify-center items-center text-center">
                    <h1 className="text-xl font-bold text-gray-800">Oops! Product not found</h1>
                    <button
                        onClick={() => navigate("/items")}
                        className="mt-4 bg-[var(--color-accent)] text-white px-6 py-2 rounded-full font-bold"
                    >
                        Go Back
                    </button>
                </div>
            )}
        </div>
    );
}