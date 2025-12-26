import { useState } from "react"

export default function Testing() {

    const [count, setCount] = useState(0)
    //cocunet,banana,apple,other
    const [itemName,setItemName] = useState("Coconut")

    return (
        <div className="w-full h-screen bg-red-300 flex flex-col justify-center items-center">
            <h1 className="text-9xl">{count} {itemName}s</h1>
            <button className="w-[100px] h-[50px] bg-black text-white rounded-l-lg text-3xl" onClick={() => {

                const newCount = count + 1
                setCount(newCount)

            }}>Count
            </button>

            <div className=" p-4 flex w-full justify-evenly ">
                <button className="w-[200px] h-[50px] bg-black text-white rounded-l-lg text-3xl p-2" onClick={()=>{
                    setItemName("coconut")
                }} >Cocunut</button>
                <button className="w-[200px] h-[50px] bg-black text-white rounded-l-lg text-3xl p-2" onClick={()=>{
                    setItemName("banana")
                }} >Banana</button>
                <button className="w-[200px] h-[50px] bg-black text-white rounded-l-lg text-3xl p-2" onClick={()=>{
                    setItemName("apple")
                }} >Apple</button>
                <button className="w-[200px] h-[50px] bg-black text-white rounded-lg text-3xl p-2" onClick={()=>{
                    setItemName("other")
                }} >Other</button>
            </div>
        </div>
    )
}