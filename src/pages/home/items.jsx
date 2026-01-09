import axios from "axios"
import { use, useEffect } from "react"
import { useState } from "react"
import ProductCard from "../../components/productCard";


export default function Items() {

    const [state, setState] = useState("loading");//loading,sucess,error
    const [items, setItems] = useState([])

    useEffect(() => {
        if (state == "loading")
            axios.get("http://localhost:3000/api/products")
                
                .then((res) => {
                    console.log(res.data);
                    setItems(res.data);
                    setState("sucess");
                }).catch((err) => {
                    toast.error(err?.response?.data?.error || "Failed to fetch items");
                    setState("error");
                })
    }, [])
    return (
        <div className="w-full h-full flex flex-wrap gap-4 justify-center pt-[50px]">
            {
                state == "loading" && 
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

            }
            {
                state == "sucess" &&
                items.map((item)=>{

                    return(
                        <ProductCard key ={item.key} item={item}/>
                    )
                })
            }
        </div>
    )
}

