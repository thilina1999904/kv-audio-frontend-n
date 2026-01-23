import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // navigate මෙතනට ඕනේ
import ImageSlider from "../../components/imagesSlider";
import { addTOCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";
import { FaCalendarCheck, FaCartPlus, FaChevronLeft, FaShieldAlt } from "react-icons/fa"; // FaShieldAlt ලෙස නිවැරදි කළා

export default function ProductOverview() {
    const navigate = useNavigate(); // මේක අනිවාර්යයෙන්ම ඕනේ
    const params = useParams();
    const encodedKey = params.key;
    const key = decodeURIComponent(encodedKey);

    const [lodingStatus, setLodingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(() => {
        const decodedKey = decodeURIComponent(key);
        axios.get("/api/products/" + decodedKey)
            .then((res) => {
                setProduct(res.data);
                setLodingStatus("loaded");
            })
            .catch((error) => {
                setLodingStatus("error");
                console.error("Error:", error);
            });
    }, [key]);

    return (
        <div className="w-full min-h-screen bg-[var(--color-primary)] py-10 md:px-10 max-w-[1400px] m-auto">
            {/* Back Button */}
            <button 
                onClick={() => navigate("/items")}
                className="flex items-center gap-2 text-[var(--color-accent)] font-semibold mb-6 hover:opacity-70 transition"
            >
                <FaChevronLeft /> Back to Items
            </button>

            {lodingStatus === "loading" && (
                <div className="w-full h-[60vh] flex flex-col justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--color-accent)] border-b-4 border-transparent"></div>
                    <p className="mt-4 text-[var(--color-accent)] font-medium italic">Fetching details...</p>
                </div>
            )}

            {lodingStatus === "loaded" && (
                <div className="max-w-[1300px] mx-auto bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Left Side: Image Slider Section */}
                    <div className="w-full md:w-1/2 bg-[var(--color-secondary)]/30 p-6 md:p-12 flex items-center justify-center">
                        <div className="w-full rounded-2xl overflow-hidden shadow-sm">
                            <ImageSlider images={product.image} />
                        </div>
                    </div>

                    {/* Right Side: Details Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                        <div className="mb-4">
                            <span className="bg-[var(--color-secondary)] text-[var(--color-accent)] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 leading-tight">
                            {product.name}
                        </h1>

                        <div className="bg-[var(--color-primary)] p-6 rounded-[2rem] mb-8">
                            <h3 className="text-[var(--color-accent)] font-bold text-sm mb-2 uppercase tracking-w">Description</h3>
                            <p className="text-gray-600 leading-relaxed italic">
                                {product.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white shadow-sm rounded-xl text-[var(--color-accent)]">
                                    <FaCalendarCheck />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Dimensions</p>
                                    <p className="text-sm font-bold text-gray-700">{product.dimensions || "Standard"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white shadow-sm rounded-xl text-[var(--color-accent)]">
                                    <FaShieldAlt /> 
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Condition</p>
                                    <p className="text-sm font-bold text-gray-700 font-serif">A+ Grade</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100 mt-auto">
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase">Rental Price</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-gray-900">Rs. {product.price?.toLocaleString()}</span>
                                    <span className="text-gray-400 text-sm">/ Day</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    addTOCart(product.key, 1);
                                    toast.success(`${product.name} added to cart!`);
                                }} 
                                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[var(--color-accent)] hover:bg-[#2a5d91] text-white font-bold px-10 py-5 rounded-[2rem] shadow-xl hover:shadow-[var(--color-accent)]/30 transition-all active:scale-95"
                            >
                                <FaCartPlus className="text-xl" /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {lodingStatus === "error" && (
                <div className="w-full h-[60vh] flex flex-col justify-center items-center text-center">
                    <div className="text-red-100 text-9xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-800">Something went wrong</h1>
                    <p className="text-gray-500 mb-6">We couldn't load the product details at this time.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full font-bold"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}