'use client'
import Link from "next/link";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/loader";



export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        console.log(email,password);
        setLoading(true);
        const response = await axios.post('https://ivykids.onrender.com/api/user/login', {
          email,
          password,
        });
        setLoading(false);

        console.log(response.data.token);


        if (response.data.token) {
          router.push('/home');
          console.log("Login success");
        }
        localStorage.setItem("authorization", JSON.stringify(response.data.token));
        localStorage.setItem("userId", JSON.stringify(response.data.userId));
      } catch (error) {
        console.error('Login error:', error.response.data);
        alert(error.response.data.message);
        setLoading(false);
      }
    }

  return (
    <div className="bg-[#ffffff] flex min-h-screen justify-center items-center flex-col gap-10">

      <div className="flex bg-gray-200 rounded-2xl p-12 flex-col">

        <div className="flex justify-center mb-6 text-xl">Login to your account</div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-[300px] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className={`${loading?'bg-red-400':'bg-blue-500'} text-white px-4 py-2 w-full mt-4`}
            type="submit"
          >
           {loading ? <Loading /> : 'Login'}
          </button>
        </form>



        <div className="flex justify-center mt-4 text-xs">New?<Link href="/" className="ml-[4px] text-[#2B4C8C]">Sign Up</Link></div>

      </div>
    </div>

  )
}