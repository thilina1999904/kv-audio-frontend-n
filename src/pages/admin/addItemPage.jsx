import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../../public/utils/mediaUpload";


export default function AddItemPage() {

    const [itemKey, setItemKey] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemCategory, setItemCategory] = useState("audio");
    const [itemDimensions, setItemDimensions] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const navigate = useNavigate();
    const [itemImages, setItemImages] = useState([]);

    async function handleAddItem() {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You must be logged in");
            return;
        }

        try {
            const promises = [];

            for (let i = 0; i < itemImages.length; i++) {
                const promise = mediaUpload(itemImages[i]);
                promises.push(promise);
            }

            const imageUrls = await Promise.all(promises);   // now contains URLs

            const result = await axios.post("http://localhost:3000/api/products", {
                key: itemKey,
                name: itemName,
                price: Number(itemPrice),
                category: itemCategory,
                dimensions: itemDimensions,
                description: itemDescription,
                image: imageUrls,   // real uploaded URLs
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            toast.success(result.data.message);
            navigate("/admin/items");

        } catch (err) {
            toast.error(err.response?.data?.error || "Upload failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add New Item
                </h1>

                <div className="flex flex-col gap-4">
                    <input
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

                    <input type="file" multiple onChange={(e) => setItemImages(Array.from(e.target.files))} />



                    <button onClick={handleAddItem
                    } className="mt-2 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200">
                        Add Item
                    </button>


                    <button onClick={() => {
                        navigate("/admin/items")
                    }} className="mt-2 bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
