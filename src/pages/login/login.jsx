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
                    navigate("/admin/dashboard");
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-primary)]">
            <form onSubmit={handleOnSubmit} className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/20 bg-[var(--color-secondary)]">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-28 h-28 object-cover mb-2"
                    />
                    <h2 className="text-3xl font-semibold text-[var(--color-accent)]">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-[var(--color-accent)]/70 mt-1">
                        Login to Continue
                    </p>
                </div>

                <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full h-11 bg-transparent border-b-2 border-[var(--color-accent)] text-[var(--color-accent)] text-base outline-none placeholder-[var(--color-accent)]/60"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-full h-11 bg-transparent border-b-2 border-[var(--color-accent)] text-[var(--color-accent)] text-base outline-none placeholder-[var(--color-accent)]/60 mt-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full h-12 mt-6 rounded-xl text-white text-lg font-semibold bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 transition"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={googleLogin}
                    className="w-full h-12 mt-4 rounded-xl text-white text-lg font-semibold bg-red-500 hover:bg-red-600 transition"
                >
                    Login With Google
                </button>

                <p className="text-center text-[var(--color-accent)]/80 mt-6">
                    Don't have an account?{" "}
                    <span
                        className="text-[var(--color-accent)] font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}
