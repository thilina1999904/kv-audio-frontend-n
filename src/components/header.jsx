import { useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);

    return (
        <>
            <header className="w-full shadow-xl bg-accent text-white sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto h-[70px] flex items-center px-4">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-[55px] h-[55px] rounded-full object-cover border"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex mx-auto gap-6 text-[18px] font-semibold w-[450px] justify-evenly">
                        <Link to="/" className="hover:scale-110 transition">Home</Link>
                        <Link to="/items" className="hover:scale-110 transition">Items</Link>
                        <Link to="/gallery" className="hover:scale-110 transition">Gallery</Link>
                        <Link to="/contact" className="hover:scale-110 transition">Contact</Link>
                    </nav>

                    {/* Cart Icon & Auth Buttons (Desktop) */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="px-4 py-1.5 rounded-lg border border-white hover:bg-white hover:text-accent transition font-medium">
                            Login
                        </Link>
                        <Link to="/register" className="px-4 py-1.5 rounded-lg bg-white text-accent hover:bg-gray-200 transition font-bold">
                            Register
                        </Link>
                        <Link
                            to="/booking"
                            className="text-[22px] hover:scale-110 transition ml-2"
                        >
                            <FaCartShopping />
                        </Link>
                    </div>

                    {/* Mobile Right Section */}
                    <div className="md:hidden ml-auto flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-[22px] hover:scale-110 transition"
                        >
                            <FaUser />
                        </Link>
                        <Link
                            to="/booking"
                            className="text-[22px] hover:scale-110 transition"
                        >
                            <FaCartShopping />
                        </Link>
                        <GiHamburgerMenu
                            className="text-[28px] cursor-pointer hover:scale-110 transition"
                            onClick={() => setNavPanelOpen(true)}
                        />
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Panel */}
            <MobileNavPanel
                isOpen={navPanelOpen}
                setOpen={setNavPanelOpen}
            />
        </>
    );
}