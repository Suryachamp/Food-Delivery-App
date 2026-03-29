import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 overflow-x-hidden relative">
      {/* Decorative Premium Background for Desktop/Tablet */}
      <div className="hidden md:block fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-blue-500/5 blur-[80px]"></div>
      </div>

      {/* Main Responsive Container */}
      <div className="relative z-10 flex justify-center min-h-screen">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-[500px] md:shadow-[0_0_80px_rgba(0,0,0,0.1)] dark:md:shadow-[0_0_80px_rgba(0,0,0,0.4)] md:my-4 md:rounded-[40px] md:border md:border-white/10 overflow-hidden bg-white dark:bg-[#09090b] relative flex flex-col"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainLayout;
