import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);

    return (
        <>
            <header className="w-full h-[70px] shadow-xl flex items-center px-4 bg-accent text-white relative">
                
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
                    <Link to="/" className="hover:text-black transition">Home</Link>
                    <Link to="/items" className="hover:text-black transition">Items</Link>
                    <Link to="/gallery" className="hover:text-black transition">Gallery</Link>
                    <Link to="/contact" className="hover:text-black transition">Contact</Link>
                </nav>

                {/* Cart Icon (Desktop) */}
                <Link
                    to="/booking"
                    className="hidden md:block text-[22px] hover:scale-110 absolute right-10 transition"
                >
                    <FaCartShopping />
                </Link>

                {/* Hamburger (Mobile) */}
                <GiHamburgerMenu
                    className="md:hidden ml-auto text-[28px] cursor-pointer hover:scale-110 transition"
                    onClick={() => setNavPanelOpen(true)}
                />
            </header>

            {/* Mobile Navigation Panel */}
            <MobileNavPanel
                isOpen={navPanelOpen}
                setOpen={setNavPanelOpen}
            />
        </>
    );
}
