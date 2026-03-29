import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogOut, ChevronLeft, Play } from 'lucide-react';
import BottomNav from '../../components/BottomNav';
import { motion } from 'framer-motion';
import api from '../../api/api';

const Profile = () => {
  const { id, partnerId } = useParams();
  const activeId = partnerId || id;
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/api/food-partner/${activeId}`);
        setProfile(response.data.foodPartner);
        setVideos(response.data.foods || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    if (activeId) fetchProfile();
  }, [activeId]);

  const handleLogout = async () => {
    try {
      await api.get('/api/auth/user/logout');
      await api.get('/api/auth/food-partner/logout');
      navigate('/user/login');
    } catch {
      navigate('/user/login');
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center font-sans uppercase tracking-[0.2em] font-bold text-xs animate-pulse">
        Loading Profile...
      </div>
    );
  }

  const totalMeals = videos.length;
  const customersServed = videos.reduce((acc, v) => acc + (v.likeCount || 0) + (v.savesCount || 0), 0);

  const formatStat = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white flex flex-col font-sans pb-24 transition-all duration-400 no-scrollbar overflow-y-auto">
        
        {/* Profile Header */}
        <div className="relative p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-white/85 dark:bg-white/5 border border-gray-200 dark:border-white/10 
                         text-primary px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer text-[12px] 
                         font-bold backdrop-blur-md shadow-sm transition-transform hover:scale-105 lowercase"
            >
              <LogOut size={16} strokeWidth={2.5} />
              <span>logout</span>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-[30%] bg-gradient-to-br from-primary/20 to-transparent border border-gray-100 dark:border-white/5 shadow-lg" 
            />
            
            <div className="flex flex-col gap-2 flex-1">
              <h1 className="text-xl font-extrabold tracking-tight">
                {profile.name || profile.contactName || 'Business Name'}
              </h1>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-tight">
                {profile.address || 'Business Address'}
              </p>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-5 rounded-3xl flex flex-col items-start gap-1 shadow-sm border-gray-100/50 dark:border-white/5"
            >
              <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-extrabold">total recipes</span>
              <span className="text-2xl font-black text-black dark:text-white">{formatStat(totalMeals)}</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-5 rounded-3xl flex flex-col items-start gap-1 shadow-sm border-gray-100/50 dark:border-white/5"
            >
              <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-extrabold">reach</span>
              <span className="text-2xl font-black text-black dark:text-white">{formatStat(customersServed)}</span>
            </motion.div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="px-1 grid grid-cols-3 gap-1">
          {videos.map((video, index) => (
            <motion.div 
              key={video._id || index} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="aspect-[9/16] bg-gray-100 dark:bg-white/5 rounded-sm overflow-hidden cursor-pointer relative group"
              onClick={() => navigate('/', { state: { scrollToVideoId: video._id } })}
            >
              <video 
                src={video.video} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                muted 
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="scale-75 text-white">
                  <Play size={24} fill="white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <BottomNav />
    </>
  );
};

export default Profile;
