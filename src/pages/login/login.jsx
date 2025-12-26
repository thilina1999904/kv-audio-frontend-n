import { useState } from "react"
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(email, password);

        axios.post("http://localhost:3000/api/users/login", {
            email: email,
            password: password
        })
            .then((res) => {
                console.log(res);
                toast.success("Login Successfully")
                const user = res.data.user
                if (user.role === "admin") {
                    navigate("/admin/")
                } else {
                    navigate("/")
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.error)
            });
    }


    return (

        <div className=" bg-picture w-full h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[500px] h-[500px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative">
                    <img src="/logo.png" alt="" className="w-[200px] h-[200px]  top-1 object-cover" />

                    <input type="email" placeholder="Enter Your Email" className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder="Enter Your Password" className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6" value={password} onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg my-8 ">
                        Login
                    </button>
                </div>
            </form>
        </div>

    )
}



















































// import { useState } from "react"
// import "./login.css";

// export default function LoginPage() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     function login(){
//        console.log(email,password)
//     }

//     return (
//         <div className=" bg-picture w-full h-screen flex justify-center items-center">
//             <div className="w-[500px] h-[500px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative">
//                 <img src="/logo.png" alt="" className="w-[200px] h-[200px]  top-1 object-cover" />

//                 <input type="email" placeholder="Enter Your Email" className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none " value={email} onChange={(e)=>{
//                     setEmail(e.target.value)
//                 }}/>

//                 <input type="password" placeholder="Enter Your Password" className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6" value={password} onChange={(e)=>{
//                     setPassword(e.target.value)
//                 }}/>

//                 <button className="w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg my-8 " onClick={login}>
//                     Login
//                 </button>
//             </div>
//         </div>
//     )
// }