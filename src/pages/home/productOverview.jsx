import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imagesSlider";

export default function ProductOverview(){

    const params = useParams();
    const key = params.key;
    const [lodingStatus, setLodingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(()=>{
        axios.get("http://localhost:3000/api/products/" + key)
        .then((res)=>{
            setProduct(res.data);
            setLodingStatus("loaded");
            console.log(res.data);
        })
        .catch((error)=>{
            setLodingStatus("error");
        })
    },[])

    return (
        <div className="w-full h-full flex justify-center">
            {
                lodingStatus == "loading" && 
                <div className="w-full h-full flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-t-accent border-b-2 border-b-accent"></div>
                </div>
            }
                l
            {
                lodingStatus == "loaded" &&
                <div  className="w-full h-full flex justify-center items-center">
                    <div className="w-[49%] h-full">
                        <ImageSlider images ={product.image}/>
                    </div>
                    <div className="w-[49%] h-full flex flex-col items-center ">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-gray-600 mb-4">Category : {product.category}</p>
                        <p className="text-gray-600 mb-4">Description : {product.description}</p>
                        <p className="text-gray-600 mb-4">Dimensions : {product.dimensions}</p>
                        
                        <p className="text-lg font-semibold text-green-600">Rs. {product.price.toLocaleString()}</p>
                    </div>
                </div>
            }
            {
                lodingStatus == "error" &&
                <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-red-600">Error loading product details. Please try again later.</h1>
                </div>
            }
        </div>
    )
}