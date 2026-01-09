import { useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        console.log({
            firstName,
            lastName,
            email,
            password,
            address,
            phone
        });
        axios.post("http://localhost:3000/api/users", {

            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            address: address,
            phone: phone
        }).then((res) => {
            toast.success("Registration successful! Please login.");
            navigate("/login");

        }).catch((err) => {
            toast.error(err?.response?.data?.error || "Registration failed");
        });
    }

        return (
            <div className="bg-picture w-full h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit}>
                    <div className="w-[500px] h-[700px] backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center">

                        <img
                            src="/logo.png"
                            alt="logo"
                            className="w-[180px] h-[180px] object-cover mb-4"
                        />

                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Address"
                            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg my-8"
                        >
                            Register
                        </button>

                    </div>
                </form>
            </div>
        );
    }


    //Thilina123@gmail.com
    //12345