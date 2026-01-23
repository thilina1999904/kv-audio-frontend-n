import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import { toast } from "react-hot-toast";
import Footer from "../../components/footer";

export default function Items() {
    const [state, setState] = useState("loading");
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (state === "loading") {
            axios.get("/api/products")
                .then((res) => {
                    setItems(res.data);
                    setState("success");
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.error || "Failed to fetch items");
                    setState("error");
                });
        }
    }, [state]);

    return (
        <div className="w-full min-h-screen bg-[var(--color-primary)]">
            
            {/* --- Hero Banner Section --- */}
            <div className="w-full h-[300px] md:h-[400px] bg-[var(--color-secondary)] relative flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Audio Equipment Rental" 
                />
                {/* Decorative Shapes for a Modern Look */}
                <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-[var(--color-accent)] opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl"></div>

                <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                            Our Rental <span className="opacity-100">Catalog</span>
                        </h1>
                        <p className="text-white text-sm md:text-lg max-w-md mt-4">
                            Premium audio solutions for every occasion. Discover professional gear tailored for your needs.
                        </p>
                    </div>

                    {/* Search Bar inside Banner */}
                    <div className="mt-8 md:mt-0 w-full max-w-md">
                        <div className="bg-white p-2 rounded-2xl shadow-sm flex items-center border border-[var(--color-accent)]/10">
                            <input 
                                type="text" 
                                placeholder="Search equipment..."
                                className="flex-1 px-4 py-2 outline-none text-gray-700 bg-transparent"
                            />
                            <button className="bg-[var(--color-accent)] text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Items Grid Section --- */}
            <div className="max-w-[1400px] mx-auto px-6 py-16">
                {state === "loading" && (
                    <div className="w-full h-[30vh] flex justify-center items-center">
                        <div className="w-10 h-10 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {state === "success" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {items.map((item) => (
                            <ProductCard key={item.key} item={item} />
                        ))}
                    </div>
                )}
            </div>
                <Footer />
        </div>
    );
}