import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [selectedImge, setSelectedImage] = useState(images[0]);
    return(
        <div className="w-full h-full flex flex-col items-center ">
            <img src={selectedImge} alt="product" className="w-[90%] h-[450px]object-cover" />
            <div className="w-full h-[150px] flex justify-center ">
                {
                    images.map((image,index)=>{
                        return(
                            <img key={index} src={image} alt={"product-"+index} className={`w-[30%] h-full object-cover p-2 cursor-pointer ${image == selectedImge && "border-3 border-accent"}`} onClick={()=>{setSelectedImage(image)}}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
