import { useState, useEffect } from "react";
import homeImg1 from "../../assets/home/1.jpg";
import homeImg2 from "../../assets/home/2.jpg";
import homeImg3 from "../../assets/home/3.jpg";
import homeImg4 from "../../assets/home/png.png";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Footer from "../../components/footer";

export default function Home() {
    const images = [homeImg1, homeImg2, homeImg3];
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // Intersection Observer එක setup කිරීම
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

 const stats = [
    { id: 1, number: 500, suffix: "+", label: "Events Managed" }, // Changed from "Clients"
    { id: 2, number: 100, suffix: "+", label: "Gear Inventory" }, // Focus on gear availability
    { id: 3, number: 5, suffix: "+", label: "Years Experience" },
    { id: 4, number: 24, suffix: "/7", label: "Technical Support" }, // Crucial for rentals
];

   const leftFeatures = [
    { id: 1, title: "Next-Day Delivery", desc: "Fast delivery to your event venue across Sri Lanka." },
    { id: 2, title: "Full Setup & Soundcheck", desc: "Our engineers handle the installation and tuning." }
];

    // දකුණු පැත්තේ පෙන්වන විස්තර
    const rightFeatures = [
        { id: 3, title: "Plug & Play", desc: "No drivers needed, works instantly with any DAW." },
        { id: 4, title: "2 Year Warranty", desc: "Full coverage for all internal components." }
    ];

    // රූපය මත ඇති තිත් (Dots)
    const hotspots = [
        { id: 1, top: "25%", left: "30%", title: "Pro Preamp", desc: "Crystal clear audio capture." },
        { id: 2, top: "50%", left: "65%", title: "Gold Connectors", desc: "Zero noise interference." },
        { id: 3, top: "75%", left: "40%", title: "Built-in FX", desc: "Professional reverb & delay." },
    ];

    const reviews = [
        {
            id: 1,
            name: "Kasun Perera",
            role: "Music Producer",
            comment: "The audio quality of the mixers I bought from VEGAZ Audio is world-class. Highly recommended!",
            rating: 5,
            image: "https://i.pravatar.cc/150?u=1"
        },
        {
            id: 2,
            name: "Dilini Silva",
            role: "Vocalist",
            comment: "Fast delivery and the customer support team guided me to choose the perfect microphone.",
            rating: 4,
            image: "https://i.pravatar.cc/150?u=2"
        },
        {
            id: 3,
            name: "Arjun Ratnayake",
            role: "Studio Engineer",
            comment: "Genuine products for a fair price. Best place in Sri Lanka for pro audio gear.",
            rating: 5,
            image: "https://i.pravatar.cc/150?u=3"
        }

    ];



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="w-full min-h-screen bg-[var(--color-primary)] overflow-x-hidden">
            

            {/* 1. Hero Banner Section */}
            <div className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] relative overflow-hidden">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                    >
                        <img src={img} alt="Banner" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                ))}

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                    <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-bold drop-shadow-2xl leading-tight">
                        Welcome to <br className="sm:hidden" /> VEGAZ Audio
                    </h1>
                    <p className="text-white/80 text-xs sm:text-lg md:text-xl mt-3 tracking-[0.2em] uppercase font-light">
                        Experience the Premium Sound
                    </p>
                    <button
                        onClick={() => navigate("/items")}
                        className="mt-6 sm:mt-8 px-6 py-2.5 sm:px-10 sm:py-3 bg-white text-black text-sm sm:text-base font-bold rounded-full hover:bg-accent hover:text-white transition shadow-xl active:scale-95"
                    >
                        BOOK NOW
                    </button>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i === currentIndex ? "w-6 bg-white" : "w-2 bg-white/30"}`} />
                    ))}
                </div>
            </div>

            {/* 2. Content Section */}
           <section className="w-full py-12 md:py-24 px-4 sm:px-8 bg-[var(--color-secondary)]">
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-16">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-5 md:space-y-8 order-2 lg:order-1">
            <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase">
                Premium Event Solutions
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-accent)] leading-tight">
                Professional Sound <br />
                <span className="text-accent">For Your Next Event</span>
            </h2>
            
            <p className="text-[var(--color-accent)]/70 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Don’t just play music—create an atmosphere. We provide high-end sound system rentals 
                for weddings, corporate events, and live concerts. From crisp vocals to 
                ground-shaking bass, we bring the concert experience to you.
            </p>

            {/* Rental Benefits List */}
            <ul className="text-[var(--color-accent)]/80 text-sm space-y-2 text-left max-w-fit mx-auto lg:mx-0">
                <li className="flex items-center gap-2">✅ Professional Delivery & Setup</li>
                <li className="flex items-center gap-2">✅ On-site Technical Support</li>
                <li className="flex items-center gap-2">✅ Custom Packages for Any Crowd</li>
            </ul>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <button
                    onClick={() => navigate("/items")}
                    className="px-8 py-3 bg-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition w-full sm:w-auto uppercase tracking-wider"
                >
                    View Rental Gear
                </button>
                <button 
                    onClick={() => navigate("/contact")} 
                    className="px-8 py-3 border border-accent text-accent font-bold rounded-xl hover:bg-accent hover:text-white transition w-full sm:w-auto"
                >
                    Get a Quote
                </button>
            </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 w-full order-1 lg:order-2">
            <div className="relative group p-2">
                {/* Decorative background box */}
                <div className="absolute inset-0 bg-accent rounded-3xl rotate-3 group-hover:rotate-0 transition duration-500 opacity-20"></div>
                
                {/* Image - Ideally should be a photo of a live event or a speaker stack */}
                <img
                    src={homeImg1}
                    alt="Live Event Sound Setup"
                    className="relative rounded-3xl shadow-2xl w-full h-[300px] sm:h-[450px] object-cover"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl hidden md:block">
                    <p className="text-black font-bold text-xl">LKR 1,000+</p>
                    <p className="text-gray-500 text-xs uppercase font-bold">Starting per day</p>
                </div>
            </div>
        </div>

    </div>
</section>

            {/* 3. Numbered Counters Section */}
            <section ref={ref} className="w-full py-16 bg-accent text-white">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat) => (
                            <div key={stat.id} className="flex flex-col items-center space-y-2 group">
                                <div className="text-4xl md:text-6xl font-extrabold flex items-baseline">

                                    {inView ? (
                                        <CountUp start={0} end={stat.number} duration={3} />
                                    ) : (
                                        <span>0</span>
                                    )}
                                    <span className="text-white/70 text-2xl md:text-4xl ml-1">
                                        {stat.suffix}
                                    </span>
                                </div>
                                <p className="text-xs md:text-sm uppercase tracking-widest font-medium opacity-80 group-hover:opacity-100 transition">
                                    {stat.label}
                                </p>
                                <div className="w-8 h-1 bg-white/20 rounded-full group-hover:w-16 group-hover:bg-white transition-all duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full py-20 bg-[var(--color-primary)]">
                <div className="max-w-[1400px] mx-auto px-4">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-accent)]">Why It's Professional</h2>
                        <p className="text-accent/50 mt-2 uppercase tracking-widest text-sm">Advanced Engineering</p>
                    </div>

                    {/* Main Grid: Desktop වලදී තීරු 3ක් ලෙස පෙනේ */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12">

                        {/* Left Side Features */}
                        <div className="space-y-12 order-2 lg:order-1">
                            {leftFeatures.map(f => (
                                <div key={f.id} className="text-center lg:text-right group">
                                    <h4 className="text-xl font-bold text-accent group transition">{f.title}</h4>
                                    <p className="text-accent/60 mt-2 text-sm leading-relaxed">{f.desc}</p>
                                    <div className="h-1 w-12 bg-accent/20 mt-4 ml-auto hidden lg:block group-hover:w-24 group-hover:bg-accent transition-all"></div>
                                </div>
                            ))}
                        </div>

                        {/* Center: Image with Hotspots */}
                        <div className="relative order-1 lg:order-2 flex justify-center">
                            <img
                                src={homeImg4}
                                alt="Pro Audio Gear"
                                className="w-full max-w-md drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
                            />

                            {/* Hotspots */}
                            {hotspots.map((spot) => (
                                <div key={spot.id} className="absolute hidden md:block" style={{ top: spot.top, left: spot.left }}>
                                    <div className="relative group/dot">
                                        <span className="animate-ping absolute h-6 w-6 rounded-full bg-accent opacity-75"></span>
                                        <span className="relative h-3 w-3 rounded-full bg-accent border border-white block"></span>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 p-3 bg-white text-black rounded-xl shadow-2xl opacity-0 group-hover/dot:opacity-100 transition duration-300 z-50 pointer-events-none">
                                            <p className="font-bold text-sm text-accent">{spot.title}</p>
                                            <p className="text-xs opacity-70">{spot.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Side Features */}
                        <div className="space-y-12 order-3">
                            {rightFeatures.map(f => (
                                <div key={f.id} className="text-center lg:text-left group">
                                    <h4 className="text-xl font-bold text-accent transition">{f.title}</h4>
                                    <p className="text-accent/60 mt-2 text-sm leading-relaxed">{f.desc}</p>
                                    <div className="h-1 w-12 bg-accent/20 mt-4 mr-auto hidden lg:block group-hover:w-24 group-hover:bg-accent transition-all"></div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full py-20 bg-[var(--color-secondary)]">
                <div className="max-w-[1400px] mx-auto px-4">

                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-accent)]">What Our Clients Say</h2>
                        <p className="text-accent/50 mt-2 uppercase tracking-widest text-sm">Trusted by Professionals</p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((rev) => (
                            <div key={rev.id} className="bg-[var(--color-primary)] p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">

                                {/* Quote Icon Background */}
                                <FaQuoteLeft className="absolute -top-2 -right-2 text-accent/5 text-8xl" />

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(rev.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-500 text-sm" />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-[var(--color-accent)]/80 italic leading-relaxed mb-6 relative z-10">
                                    "{rev.comment}"
                                </p>

                                {/* User Profile */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={rev.image}
                                        alt={rev.name}
                                        className="w-12 h-12 rounded-full border-2 border-accent object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-[var(--color-accent)]">{rev.name}</h4>
                                        <p className="text-xs text-accent/50 uppercase font-semibold">{rev.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <Footer />


        </div>
    );
}

