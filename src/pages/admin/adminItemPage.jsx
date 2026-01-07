
const sampleArr = [
  {
    key: "PRD001",
    name: "Bluetooth Speaker",
    price: 4500,
    category: "audio",
    dimensions: "15cm x 10cm x 10cm",
    description: "Portable Bluetooth speaker with deep bass and long battery life.",
    availability: true,
    image: [
      "https://placehold.it/200x200",
      "https://placehold.it/200x200"
    ]
  },
  {
    key: "PRD002",
    name: "Wireless Headphones",
    price: 7800,
    category: "audio",
    dimensions: "20cm x 18cm x 8cm",
    description: "Noise-cancelling wireless headphones with premium sound quality.",
    availability: true,
    image: [
      "https://placehold.it/200x200"
    ]
  },
  {
    key: "PRD003",
    name: "Smart Watch",
    price: 12500,
    category: "wearables",
    dimensions: "4cm x 4cm x 1cm",
    description: "Smart watch with heart rate monitoring and fitness tracking.",
    availability: true,
    image: [
      "https://placehold.it/200x200"
    ]
  },
  {
    key: "PRD004",
    name: "Laptop Backpack",
    price: 3500,
    category: "accessories",
    dimensions: "45cm x 30cm x 15cm",
    description: "Water-resistant backpack suitable for 15-inch laptops.",
    availability: true,
    image: [
      "https://placehold.it/200x200"
    ]
  },
  {
    key: "PRD005",
    name: "USB-C Charger",
    price: 1800,
    category: "electronics",
    dimensions: "6cm x 6cm x 3cm",
    description: "Fast charging USB-C wall charger with overheat protection.",
    availability: false,
    image: [
      "https://placehold.it/200x200"
    ]
  }
];


import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminItemPage() {

    const [items,setItems] = useState(sampleArr);

    //Item Array 
    return (
        <div className="w-full h-full relative ">
            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>

                <tbody>
                    {
                        items.map((product)=>{
                            console.log(product);
                            return (
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "Available" : "Not Available"}</td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
            <Link to="/admin/items/add">
            <CiCirclePlus className="text-6xl text-blue-600 absolute right-10 bottom-10 hover:text-yellow-500 hover:text-7xl" />
            </Link>

      

        </div>
    )
}