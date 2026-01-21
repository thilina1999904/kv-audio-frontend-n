import { useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Link } from "react-router-dom"; // NavLink ඇතුළත් කළා
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);

    // Active link එක සඳහා style එක
    const activeLinkStyle = ({ isActive }) => 
        isActive 
        ? "border-b-2 border-white pb-1 scale-110 transition-all font-bold" 
        : "hover:scale-110 transition-all pb-1 border-b-2 border-transparent";

    return (
        <>
            <header className="w-full shadow-xl bg-accent text-white sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto h-[70px] flex items-center px-4">
                    
                    {/* 1. Logo Section (Flex-1 දාලා වමට කළා) */}
                    <div className="flex-1 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-[55px] h-[55px] rounded-full object-cover border"
                            />
                        </Link>
                    </div>

                    {/* 2. Desktop Navigation (හරියටම Screen එකේ මැදට එනවා) */}
                    <nav className="hidden md:flex gap-8 text-[17px] font-semibold uppercase tracking-wide">
                        <NavLink to="/" className={activeLinkStyle}>Home</NavLink>
                        <NavLink to="/items" className={activeLinkStyle}>Items</NavLink>
                        {/* පාරිභෝගිකයාට ඇණවුම් බැලීමට My Bookings ලින්ක් එක මෙතනට දාන්න පුළුවන් */}
                        <NavLink to="/my-orders" className={activeLinkStyle}>My Bookings</NavLink> 
                        <NavLink to="/gallery" className={activeLinkStyle}>Gallery</NavLink>
                        <NavLink to="/contact" className={activeLinkStyle}>Contact</NavLink>
                    </nav>

                    {/* 3. Auth Buttons Section (Flex-1 දාලා දකුණට කළා) */}
                    <div className="hidden md:flex flex-1 items-center justify-end gap-4">
                        <Link to="/login" className="px-4 py-1.5 rounded-lg border border-white hover:bg-white hover:text-accent transition font-medium">
                            Login
                        </Link>
                        <Link to="/register" className="px-4 py-1.5 rounded-lg bg-white text-accent hover:bg-gray-200 transition font-bold shadow-md">
                            Register
                        </Link>
                        <Link
                            to="/booking"
                            className="text-[22px] hover:scale-110 transition ml-2 relative"
                        >
                            <FaCartShopping />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden ml-auto flex items-center gap-4">
                        <Link to="/login" className="text-[22px]"><FaUser /></Link>
                        <Link to="/booking" className="text-[22px]"><FaCartShopping /></Link>
                        <GiHamburgerMenu
                            className="text-[28px] cursor-pointer"
                            onClick={() => setNavPanelOpen(true)}
                        />
                    </div>
                </div>
            </header>

            <MobileNavPanel
                isOpen={navPanelOpen}
                setOpen={setNavPanelOpen}
            />
        </>
    );
}