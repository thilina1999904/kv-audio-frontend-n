import { FaFacebook, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full bg-[var(--color-accent)] text-white pt-16 pb-8">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* 1. Brand Info */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter text-center md:text-left">KV AUDIO</h2>
                    <p className="text-white/70 leading-relaxed text-center md:text-left">
                        Your premier destination for professional sound equipment in Sri Lanka.
                        We bring the best audio technology to your doorstep.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {/* Facebook */}
                        <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition duration-300">
                            <FaFacebook size={20} />
                        </a>

                        {/* Instagram */}
                        <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition duration-300">
                            <FaInstagram size={20} />
                        </a>

                        {/* X (Twitter) */}
                        <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition duration-300">
                            <FaXTwitter size={20} />
                        </a>

                        {/* TikTok */}
                        <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition duration-300">
                            <FaTiktok size={18} />
                        </a>


                        {/* WhatsApp */}
                        <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition duration-300">
                            <FaWhatsapp size={20} />
                        </a>
                    </div>
                </div>

                {/* 2. Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                    <ul className="space-y-4 text-white/70">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/items" className="hover:text-white transition">Shop All Items</Link></li>
                        <li><Link to="/gallery" className="hover:text-white transition">Our Gallery</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                    </ul>
                </div>

                {/* 3. Categories */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-6">Categories</h3>
                    <ul className="space-y-4 text-white/70">
                        <li><a href="#" className="hover:text-white transition">Audio Mixers</a></li>
                        <li><a href="#" className="hover:text-white transition">Studio Monitors</a></li>
                        <li><a href="#" className="hover:text-white transition">Microphones</a></li>
                        <li><a href="#" className="hover:text-white transition">Accessories</a></li>
                    </ul>
                </div>

                {/* 4. Contact Details */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                    <ul className="space-y-4 text-white/70">

                     
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <FaMapMarkerAlt className="text-white" />
                            <span>No. 123, Galle Road, Colombo</span>
                        </li>

                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <FaPhoneAlt className="text-white" />
                            <span>+94 77 123 4567</span>
                        </li>

                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <FaEnvelope className="text-white" />
                            <span>info@kvaudio.lk</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-[1400px] mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
                <p>&copy; {new Date().getFullYear()} KV AUDIO. All Rights Reserved. Designed by Thilina@Dev.</p>
            </div>
        </footer>
    );
}