import { useEffect, useState } from "react";

export default function ImageSlider({ images = [] }) {

    const [selectedImage, setSelectedImage] = useState(null);

    // Ensure first image is selected after images load
    useEffect(() => {
        if (images.length > 0) {
            setSelectedImage(images[0]);
        }
    }, [images]);

    // Loading placeholder
    if (!images.length) {
        return (
            <div className="w-full h-40 bg-gray-200 animate-pulse rounded-xl" />
        );
    }

    return (
        <div className="w-full flex flex-col items-center gap-4">

            {/* ================= Main Image ================= */}
            <div className="w-full rounded-2xl shadow-lg border border-white/10 overflow-hidden bg-white">
                <img
                    src={selectedImage}
                    alt="product-main"
                    className="
                        w-full
                        h-[260px]
                        sm:h-[350px]
                        md:h-[450px]
                        lg:h-[500px]
                        object-contain
                        transition-all
                        duration-300
                    "
                />
            </div>

            {/* ================= Thumbnails ================= */}
            <div className="
                w-full
                flex
                justify-center
                sm:justify-center
                gap-2
                overflow-x-auto
                pb-2
                no-scrollbar
                
            ">
                {images.map((image, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className={`
                            flex-shrink-0
                            w-[65px]
                            h-[65px]
                            sm:w-[80px]
                            sm:h-[80px]
                            md:w-[90px]
                            md:h-[90px]
                            rounded-lg
                            overflow-hidden
                            transition-all
                            duration-200
                            ${
                                selectedImage === image
                                    ? "ring-2 ring-[var(--color-accent)] ring-offset-2 scale-95"
                                    : "opacity-60 hover:opacity-100"
                            }
                        `}
                    >
                        <img
                            src={image}
                            alt={`product-thumb-${index}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* ================= Hide Scrollbar ================= */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `
            }} />
        </div>
    );
}
