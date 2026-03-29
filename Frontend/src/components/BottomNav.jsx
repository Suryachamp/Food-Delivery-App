import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Bookmark, LogOut, Sun, Moon } from 'lucide-react';
import api from '../api/api';
import { useTheme } from '../context/ThemeContext.jsx';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isHome = location.pathname === '/';
  const isSaved = location.pathname.startsWith('/saved');

  const handleLogout = async () => {
    try {
      await api.get('/api/auth/user/logout');
      await api.get('/api/auth/food-partner/logout');
      navigate('/user/login');
    } catch {
      navigate('/user/login');
    }
  };

  const navVariants = {
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[70px] flex justify-around items-center z-[100] pb-[env(safe-area-inset-bottom)] 
                    bg-white/85 dark:bg-[#121214]/80 backdrop-blur-xl border-t border-white/30 dark:border-white/5 
                    shadow-[0_-10px_40px_rgba(0,0,0,0.05)] font-sans">

      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={navVariants}
        onClick={() => navigate('/')}
        className={`flex flex-col items-center gap-1 cursor-pointer w-[60px] lowercase tracking-wide transition-colors duration-300 relative
                    ${isHome ? 'text-primary font-bold' : 'text-gray-500 dark:text-gray-400 font-medium'}`}
      >
        <Home size={22} strokeWidth={isHome ? 2.5 : 2} />
        <span className="text-[10px]">home</span>
        {isHome && (
          <motion.div layoutId="navIndicator" className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary" />
        )}
      </motion.button>

      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={navVariants}
        onClick={() => navigate('/saved')}
        className={`flex flex-col items-center gap-1 cursor-pointer w-[60px] lowercase tracking-wide transition-colors duration-300 relative
                    ${isSaved ? 'text-primary font-bold' : 'text-gray-500 dark:text-gray-400 font-medium'}`}
      >
        <Bookmark size={22} strokeWidth={isSaved ? 2.5 : 2} />
        <span className="text-[10px]">saved</span>
        {isSaved && (
          <motion.div layoutId="navIndicator" className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary" />
        )}
      </motion.button>

      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={navVariants}
        onClick={toggleTheme}
        className="flex flex-col items-center gap-1 cursor-pointer w-[60px] lowercase tracking-wide transition-colors duration-200
                   text-gray-500 dark:text-gray-400 font-medium hover:text-primary dark:hover:text-primary"
      >
        {isDark ? <Sun size={22} strokeWidth={2} /> : <Moon size={22} strokeWidth={2} />}
        <span className="text-[10px] font-bold">{isDark ? 'light' : 'dark'}</span>
      </motion.button>

      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={navVariants}
        onClick={handleLogout}
        className="flex flex-col items-center gap-1 cursor-pointer w-[60px] lowercase tracking-wide transition-colors duration-300
                   text-primary font-extrabold opacity-90 hover:opacity-100"
      >
        <LogOut size={22} strokeWidth={2.5} />
        <span className="text-[10px]">logout</span>
      </motion.button>
    </div>
  );
};

export default BottomNav;
