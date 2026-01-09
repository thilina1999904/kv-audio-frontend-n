export default function ProductCard({ item }) {
    return (
        <div className="w-[280px] h-[450px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

            {/* Product Image */}
            <div className="w-full h-[180px] bg-gray-100 flex justify-center items-center">
                <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 ">

                {/* Name */}
                <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {item.name}
                </h2>

                {/* Category */}
                <p className="text-sm text-gray-500 capitalize mt-[10px]">
                    Category: {item.category}
                </p>

                {/* Dimensions */}
                <p className="text-sm text-gray-500  mt-[10px]">
                    Dimensions: {item.dimensions}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600  mt-[10px] line-clamp-2">
                    {item.description}
                </p>

                {/* Price */}
                <p className="text-lg font-bold text-green-600  mt-[10px] flex justify-between">
                    Rs. {item.price.toLocaleString()}
                    {/* Availability */}
                    <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full 
                        ${item.availability
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"}`}
                    >
                        {item.availability ? "In Stock" : "Out of Stock"}
                    </span>
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4">

                    {/* Action */}
                    <button className=" w-full text-sm font-medium text-white bg-[#efac38] px-4 py-2 rounded-lg hover:bg-[#e39a20] transition mt-[20px]">
                        View Details
                    </button>

                </div>
            </div>
        </div>
    );
}
