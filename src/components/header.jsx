import { useState } from "react";
import { FaCartShopping, FaUser, FaArrowRightToBracket, FaUserPlus, FaArrowRightFromBracket } from "react-icons/fa6"; 
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Link, useNavigate } from "react-router-dom"; 
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    const navigate = useNavigate();
    
    
    const token = localStorage.getItem("token");


    const handleLogout = () => {
        localStorage.removeItem("token"); 
       
        navigate("/login"); 
        window.location.reload(); 
    };

    const activeLinkStyle = ({ isActive }) => 
        `transition-all pb-1 border-b-2 text-sm lg:text-base tracking-wide ${
            isActive 
            ? "border-white font-bold scale-105" 
            : "border-transparent hover:border-white/50 hover:scale-105"
        }`;

    return (
        <>
            <header className="w-full shadow-lg bg-accent text-white sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
                <div className="max-w-[1400px] mx-auto h-[70px] flex items-center justify-between px-4 lg:px-8">
                    
                  
                    <div className="flex items-center shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] rounded-full object-cover border-2 border-white/20 group-hover:border-white transition-all"
                            />
                            <span className="hidden sm:block font-black text-xl tracking-tighter">VEGAZ AUDIO</span>
                        </Link>
                    </div>

                    {/* 2. Middle Navigation (Desktop) */}
                    <nav className="hidden md:flex items-center gap-4 lg:gap-8 font-semibold uppercase">
                        <NavLink to="/" className={activeLinkStyle}>Home</NavLink>
                        <NavLink to="/items" className={activeLinkStyle}>Items</NavLink>
                        <NavLink to="/my-orders" className={activeLinkStyle}>Bookings</NavLink> 
                        <NavLink to="/gallery" className={activeLinkStyle}>Gallery</NavLink>
                        <NavLink to="/contact" className={activeLinkStyle}>Contact</NavLink>
                    </nav>

                    {/* 3. Auth & Cart Section (Desktop) */}
                    <div className="hidden md:flex items-center gap-3 lg:gap-5">
                        <div className="flex items-center gap-4 border-r border-white/20 pr-4">
                            {!token ? (
                                <>
                                    <Link to="/login" title="Login" className="text-xl hover:text-gray-300 transition">
                                        <FaArrowRightToBracket />
                                    </Link>
                                    <Link to="/register" title="Register" className="text-xl hover:text-gray-300 transition">
                                        <FaUserPlus />
                                    </Link>
                                </>
                            ) : (
                                <button 
                                    onClick={handleLogout} 
                                    title="Logout" 
                                    className="text-xl text-red-400 hover:text-red-300 transition"
                                >
                                    <FaArrowRightFromBracket />
                                </button>
                            )}
                        </div>
                        
                        <Link
                            to="/booking"
                            className="text-[22px] p-2 hover:bg-white/10 rounded-full transition relative group"
                        >
                            <FaCartShopping />
                        </Link>
                    </div>

                    {/* 4. Mobile Controls (මෙතන තමයි වෙනස්කම් සිදු කළේ) */}
                    <div className="md:hidden flex items-center gap-4">
                        {!token ? (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-[20px] hover:text-gray-300 transition">
                                    <FaArrowRightToBracket />
                                </Link>
                                <Link to="/register" className="text-[20px] hover:text-gray-300 transition">
                                    <FaUserPlus />
                                </Link>
                            </div>
                        ) : (
                            <button 
                                onClick={handleLogout} 
                                className="text-[20px] text-red-400"
                            >
                                <FaArrowRightFromBracket />
                            </button>
                        )}

                        <Link to="/booking" className="text-[20px] p-2 hover:bg-white/10 rounded-full transition">
                            <FaCartShopping />
                        </Link>

                        <button 
                            onClick={() => setNavPanelOpen(true)}
                            className="p-2 hover:bg-white/10 rounded-lg transition"
                        >
                            <GiHamburgerMenu className="text-[26px]" />
                        </button>
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