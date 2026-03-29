import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

export default function FoodPartnerRegister(){
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      await api.post("/api/auth/food-partner/register", {
        name,
        contactName,
        phone,
        address,
        email,
        password
      });
      navigate("/food-partner/login");
    } catch (error) {
      console.error("There was an error Registering", error);
      alert(error.response?.data?.message || "An error occurred during registration");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-black font-sans transition-all duration-400">
      <div className="w-[400px] max-w-full bg-white/85 dark:bg-[#121214]/80 text-black dark:text-white rounded-xl shadow-xl p-8 backdrop-blur-md flex flex-col gap-6 border border-white/30 dark:border-white/5 relative overflow-hidden">
        {/* Premium Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e51d38] to-[#ff4d5a] opacity-60"></div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-1.5">Create a Food-Partner account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Set up your business to start receiving orders.</p>
          
          <div className="flex gap-2.5 mt-3 justify-center">
            <Link to="/user/register" className="text-[12px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full font-medium transition-all hover:text-[#e51d38] hover:border-[#e51d38]">Register as user</Link>
            <Link to="/food-partner/register" className="text-[12px] text-[#e51d38] border border-[#e51d38] px-3 py-1.5 rounded-full font-medium transition-all">Register as food partner</Link>
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Business name</label>
            <input 
              type="text" 
              name="businessName" 
              placeholder="Your restaurant or shop" 
              className="p-3 px-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
              required 
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[13px] font-semibold ml-0.5">Contact name</label>
              <input 
                type="text" 
                name="contactName" 
                placeholder="Owner" 
                className="p-3 px-3.5 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
                required 
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[13px] font-semibold ml-0.5">Phone</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone" 
                className="p-3 px-3.5 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
                required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Address</label>
            <input 
              type="text" 
              name="address" 
              placeholder="Street address, city, state" 
              className="p-3 px-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
              required 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="business@domain.com" 
              className="p-3 px-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
              required 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create a password" 
              className="p-3 px-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
              required 
            />
          </div>

          <button className="mt-1.5 bg-gradient-to-r from-[#e51d38] to-[#ff4d5a] text-white border-none p-3.5 rounded-lg cursor-pointer font-semibold text-sm shadow-[0_10px_20px_rgba(229,29,56,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_25px_rgba(229,29,56,0.3)] active:translate-y-0" 
                  type="submit">
            Create Partner account
          </button>

          <div className="flex justify-center items-center gap-2 mt-1 text-sm font-medium">
            <span className="text-gray-500 dark:text-gray-400">Already onboarded?</span>
            <Link className="text-[#e51d38] font-bold hover:underline" to="/food-partner/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
