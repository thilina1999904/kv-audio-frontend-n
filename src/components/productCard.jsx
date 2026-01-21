import { Link } from "react-router-dom";
import { FaChevronRight, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ProductCard({ item }) {
    const encodedKey = encodeURIComponent(item.key);

    return (
        /* Card එකේ width එක w-[320px] සිට w-[350px] දක්වා වැඩි කර ඇත */
        <div className="group w-full max-w-[360px] bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(54,116,181,0.15)] transition-all duration-500 overflow-hidden flex flex-col h-[520px]">
            
            {/* --- Image Section --- */}
            <div className="relative w-full h-[260px] overflow-hidden bg-[var(--color-secondary)]/20">
                <img
                    src={item.image?.[0] || "https://via.placeholder.com/400"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Availability Badge (Top Left) */}
                <div className="absolute top-5 left-5">
                    <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full backdrop-blur-md text-[11px] font-bold tracking-wider uppercase shadow-sm ${
                        item.availability 
                        ? "bg-white/80 text-green-600" 
                        : "bg-white/80 text-red-500"
                    }`}>
                        {item.availability ? <FaCheckCircle /> : <FaTimesCircle />}
                        {item.availability ? "Ready to Rent" : "Reserved"}
                    </span>
                </div>

                {/* Price Tag (Floating Bottom Right) */}
                <div className="absolute bottom-5 right-5 bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-2xl shadow-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[10px] opacity-80 leading-none">Price / Day</p>
                    <p className="text-lg font-bold">Rs. {item.price?.toLocaleString()}</p>
                </div>
            </div>

            {/* --- Content Section --- */}
            <div className="p-8 flex flex-col flex-1">
                {/* Category */}
                <span className="text-[11px] font-black text-[var(--color-accent)] uppercase tracking-[0.2em] mb-3 block opacity-60">
                    {item.category}
                </span>

                {/* Name - ප්‍රමාණය විශාල කර ඇත */}
                <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {item.name}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 font-light italic">
                    {item.description}
                </p>

                {/* --- Footer Section --- */}
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starting At</span>
                        <span className="text-xl font-bold text-gray-900">Rs. {item.price?.toLocaleString()}</span>
                    </div>

                    <Link 
                        to={"/product/" + encodedKey} 
                        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-secondary)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <FaChevronRight className="text-lg" />
                    </Link>
                </div>
            </div>
        </div>
    );
}