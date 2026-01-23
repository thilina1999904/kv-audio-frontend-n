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
            <div className="w-full h-[350px] md:h-[400px] bg-[var(--color-secondary)] relative flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover scale-105" 
                    alt="Audio Equipment Rental" 
                />
                
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full relative z-20 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                            Our Rental <span className="text-[var(--color-accent)]">Catalog</span>
                        </h1>
                        <p className="text-gray-200 text-sm md:text-lg max-w-md mt-4 font-medium">
                            Premium audio solutions for every occasion. Discover professional gear tailored for your needs.
                        </p>
                    </div>

                    {/* Search Bar inside Banner */}
                    <div className="w-full max-w-md px-2">
                        <div className="bg-white p-1.5 rounded-2xl shadow-2xl flex items-center border border-white/20">
                            <input 
                                type="text" 
                                placeholder="Search equipment..."
                                className="flex-1 px-4 py-2 outline-none text-gray-700 bg-transparent text-sm md:text-base w-full"
                            />
                            <button className="bg-[var(--color-accent)] text-white px-5 md:px-7 py-2.5 rounded-xl font-bold hover:brightness-110 transition-all active:scale-95">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Items Grid Section --- */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-20">
                {state === "loading" && (
                    <div className="w-full h-[30vh] flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {state === "success" && (
                    /* මෙන්න මෙතන තමයි වැදගත්ම වෙනස තියෙන්නේ */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
                        {items.map((item) => (
                            /* Card එකට වටෙන් wrapper එකක් දැම්මා alignment එක තහවුරු කරන්න */
                            <div key={item.key} className="w-full flex justify-center">
                                <ProductCard item={item} />
                            </div>
                        ))}
                    </div>
                )}

                {state === "error" && (
                   <div className="text-center py-10">
                        <p className="text-red-500 font-bold">Something went wrong. Please try again.</p>
                        <button onClick={() => setState("loading")} className="mt-4 px-6 py-2 bg-[var(--color-accent)] text-white rounded-lg">Retry</button>
                   </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
}