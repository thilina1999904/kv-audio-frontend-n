import { FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import banner from "../../assets/gallery/2.jpg";
import Footer from "../../components/footer";

const contactInfo = [
    {
        icon: <FaPhone />,
        title: "Call Us",
        detail: "0713595423",
        link: "tel:0713595423"
    },
    {
        icon: <FaEnvelope />,
        title: "Email Us",
        detail: "vegazaudioinfo@gmail.com",
        link: "mailto:vegazaudioinfo@gmail.com"
    },
    {
        icon: <FaHome />,
        title: "Visit Us",
        detail: "Hiniduma North, Hiniduma, Galle",
        link: "#"
    },
    {
        icon: <FaEarthAfrica />,
        title: "Website",
        detail: "www.vegazaudio.com",
        link: "https://www.vegazaudio.com"
    }
];

export default function Contact() {
    return (
        <div className="w-full min-h-screen bg-[var(--color-primary)] font-sans">

            {/* --- Hero Banner Section --- */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                    src={banner}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Contact Banner"
                />
                <div className="relative z-20 text-center px-6">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-3 tracking-tighter uppercase">
                        Contact <span className="text-[var(--color-accent)] animate-pulse">us</span>
                    </h1>
                    <div className="h-1.5 w-40 bg-[var(--color-accent)] mx-auto rounded-full"></div>
                </div>
            </div>

            {/* --- Main Content Section --- */}
           {/* --- Main Content Section --- */}
<section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
        <div className="flex flex-col h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                {contactInfo.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.link}
                        className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-accent)] transition-all duration-300 flex flex-col justify-center h-full"
                    >
                        <div className="w-12 h-12 mb-4 rounded-xl bg-[var(--color-secondary)] text-[var(--color-accent)] flex items-center justify-center text-xl group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                            {item.icon}
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">{item.title}</h3>
                        <p className="text-lg font-semibold text-gray-800 break-words">{item.detail}</p>
                    </a>
                ))}
            </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-50 flex flex-col h-full justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send a Message</h2>
            <form className="flex flex-col gap-5 flex-grow justify-between">
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Full Name</label>
                    <input
                        type="text"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-600 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                            placeholder="name@email.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-600 ml-1">Phone Number</label>
                        <input
                            type="text"
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                            placeholder="071..."
                        />
                    </div>
                </div>
                <div className="space-y-1 flex-grow flex flex-col">
                    <label className="text-sm font-bold text-gray-600 ml-1">Your Message</label>
                    <textarea
                        className="w-full flex-grow p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all resize-none min-h-[120px]"
                        placeholder="Tell us how we can help..."
                    ></textarea>
                </div>
                <button className="bg-[var(--color-accent)] text-white font-bold p-4 rounded-xl uppercase tracking-widest hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all mt-2">
                    Send Message
                </button>
            </form>
        </div>
    </div>
</section>

            {/* --- New Map Section --- */}
            <section className="w-full h-[450px] relative mt-12">
                <div className="absolute top-0 left-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15870.28589998144!2d80.3168!3d6.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3945624701235%3A0xc36768a44b94870c!2sHiniduma!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                        className="w-full h-full border-none shadow-inner"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location"
                    ></iframe>
                </div>

                {/* Decorative Map Label */}
                <div className="absolute top-10 left-10 z-20 hidden md:block">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl border border-[var(--color-secondary)]">
                        <h4 className="font-black text-[var(--color-accent)] text-xl">VEGAZ AUDIO HQ</h4>
                        <p className="text-gray-500 text-sm mt-1">Visit our main office in Galle.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}