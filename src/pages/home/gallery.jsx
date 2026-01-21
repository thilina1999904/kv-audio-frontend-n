import React from 'react';
import banner from "../../assets/gallery/banner.jfif";
import event1 from "../../assets/gallery/1.jpg";
import event2 from "../../assets/gallery/2.jpg";
import event3 from "../../assets/gallery/3.jpg";
import event4 from "../../assets/gallery/4.jpg";
import event5 from "../../assets/gallery/5.jpg";
import event6 from "../../assets/gallery/6.jpg";
import event7 from "../../assets/gallery/7.jpg";
import Footer from '../../components/footer';

export default function Gallery() {
    const galleryItems = [
        { id: 1, title: "Grand Concert", img: event1, size: "large" },
        { id: 2, title: "Wedding Setup", img: event2, size: "small" },
        { id: 3, title: "Corporate Stage", img: event3, size: "small" },
        { id: 4, title: "Night Event", img: event4, size: "large" },
        { id: 5, title: "DJ Sound Mix", img: event5, size: "small" },
        { id: 6, title: "Live Performance", img: event6, size: "small" },
        { id: 7, title: "Exhibition Setup", img: event7, size: "small" },
    ];

    return (
        <div className="w-full min-h-screen bg-[var(--color-primary)] ">
            
            {/* --- Hero Banner Section --- */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img 
                    src={banner} 
                    className="absolute inset-0 w-full h-full object-cover scale-105" 
                    alt="Gallery Banner" 
                />
                
                <div className="relative z-20 text-center px-6">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-3 md:mb-4 tracking-tight uppercase">
                        Our <span className="text-[var(--color-secondary)]">Moments</span>
                    </h1>
                    <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[var(--color-accent)] mx-auto rounded-full mb-4 md:mb-6"></div>
                    <p className="text-white/90 text-xs sm:text-sm md:text-xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
                        Take a look at the spectacular events we've powered with our professional gear.
                    </p>
                </div>
            </div>

            {/* --- Gallery Grid Section --- */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 md:py-20">
                
                {/* Responsive Grid Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
                    <div className='text-center w-full md:text-left'>
                        <h2 className="text-[var(--color-accent)] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-1 md:mb-2 text-center md:text-left">Portfolio</h2>
                        <h3 className="text-2xl md:text-4xl font-bold text-gray-800 italic font-serif leading-tight">Featured Gallery</h3>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm md:max-w-xs md:text-right font-light text-center w-full">
                        Capturing the essence of high-quality sound and light across Sri Lanka.
                    </p>
                </div>

                {/* Optimized Masonry-style Grid */}
                {/* 'grid-flow-dense' helps fill in gaps created by large items */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 grid-flow-dense">
                    {galleryItems.map((item) => (
                        <div 
                            key={item.id} 
                            className={`group relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 
                            ${item.size === "large" 
                                ? "col-span-2 lg:col-span-1 lg:row-span-2 h-[250px] sm:h-[350px] lg:h-auto" 
                                : "col-span-1 h-[150px] sm:h-[250px] md:h-[300px]"
                            }`}
                        >
                            {/* Image */}
                            <img 
                                src={item.img} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                alt={item.title} 
                                loading="lazy"
                            />
                            
                            {/* Hover Overlay - Hidden on small mobile touch, visible on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-8 text-white">
                                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase mb-1 opacity-80">Our Work</span>
                                <h4 className="text-sm md:text-2xl font-bold truncate">{item.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}