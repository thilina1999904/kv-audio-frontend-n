export default function MobileNavPanel({ isOpen, setOpen }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />

            {/* Side Panel */}
            <div className="relative h-full w-[300px] bg-white shadow-2xl animate-slideIn">
                {/* Header */}
                <div className="flex items-center justify-between h-[70px] px-4 bg-accent text-white">
                    {/* <h2 className="text-lg font-semibold">Menu</h2> */}
                    <button
                        onClick={() => setOpen(false)}
                        className="text-xl font-bold hover:scale-110 transition"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    <a href="/" className="block text-gray-700 hover:text-accent">
                        Home
                    </a>
                    <a href="/items" className="block text-gray-700 hover:text-accent">
                        Items
                    </a>
                    <a href="/gallery" className="block text-gray-700 hover:text-accent">
                        Gallery
                    </a>
                    <a href="/contact" className="block text-gray-700 hover:text-accent">
                        Contact
                    </a>
                </div>
            </div>
        </div>
    );
}
