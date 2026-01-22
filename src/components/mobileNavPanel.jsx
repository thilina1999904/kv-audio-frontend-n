import { NavLink } from "react-router-dom";

export default function MobileNavPanel({ isOpen, setOpen }) {
    if (!isOpen) return null;

    // Link එක active ද නැද්ද බලලා style එක දෙන function එක
    const linkStyle = ({ isActive }) => 
        `block p-2 rounded-md transition ${
            isActive ? "bg-accent text-white font-bold" : "text-gray-700 hover:text-accent hover:bg-gray-50"
        }`;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />

            {/* Side Panel */}
            <div className="relative h-full w-[300px] bg-white shadow-2xl animate-slideIn transition-transform">
                {/* Header */}
                <div className="flex items-center justify-end h-[70px] px-4 bg-accent text-white">
                    <button
                        onClick={() => setOpen(false)}
                        className="text-xl font-bold hover:scale-110 transition"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col space-y-2">
                    <NavLink to="/" onClick={() => setOpen(false)} className={linkStyle}>
                        Home
                    </NavLink>
                    <NavLink to="/items" onClick={() => setOpen(false)} className={linkStyle}>
                        Items
                    </NavLink>
                    <NavLink to="/my-orders" onClick={() => setOpen(false)} className={linkStyle}>
                        My Bookings
                    </NavLink> 
                    <NavLink to="/gallery" onClick={() => setOpen(false)} className={linkStyle}>
                        Gallery
                    </NavLink>
                    <NavLink to="/contact" onClick={() => setOpen(false)} className={linkStyle}>
                        Contact
                    </NavLink>
                </div>
            </div>
        </div>
    );
}