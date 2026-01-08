import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function UpdateItemPage() {

    const location = useLocation();


    const [itemKey, setItemKey] = useState(location.state.key);
    const [itemName, setItemName] = useState(location.state.name);
    const [itemPrice, setItemPrice] = useState(location.state.price);
    const [itemCategory, setItemCategory] = useState(location.state.category);
    const [itemDimensions, setItemDimensions] = useState(location.state.dimensions);
    const [itemDescription, setItemDescription] = useState(location.state.description);
    const navigate = useNavigate();
 

    async function handleAddItem() {
        console.log({
            itemKey,
            itemName,
            itemPrice,
            itemCategory,
            itemDimensions,
            itemDescription
        });

        const token = localStorage.getItem("token")



        if (token) {
            try {
                const result = await axios.put("http://localhost:3000/api/products/" + itemKey, {
                    key: itemKey,
                    name: itemName,
                    price: Number(itemPrice),
                    category: itemCategory,
                    dimensions: itemDimensions,
                    description: itemDescription
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    },
                }
                );
                toast.success(result.data.message);


                navigate("/admin/items");

            } catch (err) {
                toast.error(err.response.data.error);
            }
        } else {
            toast.error("You must be logged in to add an item.");
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Update Item
                </h1>

                <div className="flex flex-col gap-4">
                    <input
                        disabled
                        className="input-style pl-1"
                        type="text"
                        placeholder="Item Key"
                        value={itemKey}
                        onChange={(e) => setItemKey(e.target.value)}
                    />

                    <input
                        className="input-style pl-1"
                        type="text"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />

                    <input
                        className="input-style"
                        type="number"
                        placeholder="Item Price"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                    />

                    <select
                        className="input-style"
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                    >
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                        <option value="lights">Lights</option>
                    </select>

                    <input
                        className="input-style"
                        type="text"
                        placeholder="Item Dimensions"
                        value={itemDimensions}
                        onChange={(e) => setItemDimensions(e.target.value)}
                    />

                    <textarea
                        className="input-style resize-none h-24"
                        placeholder="Item Description "
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                    />

                    <button onClick={handleAddItem
                    } className="mt-2 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200">
                        Update Item
                    </button>
                    <button onClick={()=>{
                        navigate("/admin/items")
                    }} className="mt-2 bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
