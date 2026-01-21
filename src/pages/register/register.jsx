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

        axios.post("http://localhost:3000/api/users", {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            address: address,
            phone: phone
        })
        .then(() => {
            toast.success("Registration successful! Please login.");
            navigate("/login");
        })
        .catch((err) => {
            toast.error(err?.response?.data?.error || "Registration failed");
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-primary)]">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md md:max-w-xl p-8 rounded-2xl shadow-2xl border border-white/20 bg-[var(--color-secondary)]"
            >
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-28 h-28 object-cover mb-2"
                    />
                    <h2 className="text-3xl font-semibold text-[var(--color-accent)]">
                        Create Account
                    </h2>
                    <p className="text-sm text-[var(--color-accent)]/70 mt-1">
                        Join with us today
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full h-11 bg-transparent border-b-2 border-[var(--color-accent)] text-[var(--color-accent)] text-base outline-none placeholder-[var(--color-accent)]/60"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full h-11 bg-transparent border-b-2 border-[var(--color-accent)] text-[var(--color-accent)] text-base outline-none placeholder-[var(--color-accent)]/60"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-11 bg-transparent border-b-2 border-[var(--color-accent)] text-[var(--color-accent)] text-base outline-none placeholder-[var(--color-accent)]/60 mt-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-11 bg-transparent border-b-2 border-[var(--color-accent)] text-[var(--color-accent)] text-base outline-none placeholder-[var(--color-accent)]/60 mt-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Address"
                    className="w-full h-11 bg-transparent border-b-2 border-[var(--color-accent)] text-[var(--color-accent)] text-base outline-none placeholder-[var(--color-accent)]/60 mt-4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full h-11 bg-transparent border-b-2 border-[var(--color-accent)] text-[var(--color-accent)] text-base outline-none placeholder-[var(--color-accent)]/60 mt-4"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full h-12 mt-8 rounded-xl text-white text-lg font-semibold bg-[var(--color-accent)] hover:bg-[color:var(--color-accent)]/90 transition"
                >
                    Register
                </button>

                <p className="text-center text-[var(--color-accent)]/80 mt-6">
                    Already have an account?{" "}
                    <span
                        className="text-[var(--color-accent)] font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}
