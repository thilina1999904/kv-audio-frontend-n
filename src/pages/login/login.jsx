import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    /* ---------------- Google Login ---------------- */
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.post(
                    "http://localhost:3000/api/users/google",
                    {
                        accessToken: tokenResponse.access_token,
                    }
                );

                toast.success("Google Login Successful");
                localStorage.setItem("token", res.data.token);

                if (res.data.user.role === "admin") {
                    navigate("/admin/");
                } else {
                    navigate("/");
                }
            } catch (err) {
                console.error(err);
                toast.error("Google login failed");
            }
        },
        onError: () => {
            toast.error("Google Login Failed");
        },
    });

    /* ---------------- Email Login ---------------- */
    function handleOnSubmit(e) {
        e.preventDefault();

        axios
            .post("http://localhost:3000/api/users/login", {
                email,
                password,
            })
            .then((res) => {
                toast.success("Login Successfully");
                localStorage.setItem("token", res.data.token);

                if (res.data.user.role === "admin") {
                    navigate("/admin/");
                } else {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response?.data?.error || "Login failed");
            });
    }

    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[500px] h-[500px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col">

                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-[200px] h-[200px] object-cover mb-6"
                    />

                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg my-6"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={googleLogin}
                        className="w-[300px] h-[50px] bg-red-500 text-2xl text-white rounded-lg"
                    >
                        Login With Google
                    </button>

                </div>
            </form>
        </div>
    );
}
