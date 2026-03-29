import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

export default function UserLogin(){
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      await api.post("/api/auth/user/login", {
        email,
        password
      })
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred during login");
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-[400px] max-w-full bg-white/85 dark:bg-[#121214]/80 text-black dark:text-white rounded-xl shadow-xl p-8 backdrop-blur-md flex flex-col gap-6 border border-white/30 dark:border-white/5 relative overflow-hidden">
        {/* Premium Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e51d38] to-[#ff4d5a] opacity-60"></div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-1.5">Welcome back, Foodie</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Sign in to continue to your account.</p>
          
          <div className="flex gap-2.5 mt-3 justify-center">
            <Link to="/user/register" className="text-[12px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full font-medium transition-all hover:text-[#e51d38] hover:border-[#e51d38]">Register as user</Link>
            <Link to="/food-partner/register" className="text-[12px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full font-medium transition-all hover:text-[#e51d38] hover:border-[#e51d38]">Register as food partner</Link>
          </div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="you@domain.com" 
              className="p-3 px-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
              required 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Your password" 
              className="p-3 px-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
              required 
            />
          </div>

          <button className="mt-1.5 bg-gradient-to-r from-[#e51d38] to-[#ff4d5a] text-white border-none p-3.5 rounded-lg cursor-pointer font-semibold text-sm shadow-[0_10px_20px_rgba(229,29,56,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_25px_rgba(229,29,56,0.3)] active:translate-y-0" 
                  type="submit">
            Sign in
          </button>

          <div className="flex justify-center items-center gap-2 mt-1 text-sm font-medium">
            <span className="text-gray-500 dark:text-gray-400">New here?</span>
            <Link className="text-[#e51d38] font-bold hover:underline" to="/user/register">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
