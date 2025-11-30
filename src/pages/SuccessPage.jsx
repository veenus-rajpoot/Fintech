import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiSettings, FiShield, FiCheckCircle, FiClock, FiMapPin, FiSmartphone, FiArrowRight, FiZap } from 'react-icons/fi';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-brand-dark text-white flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-900/30 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-purple-900/30 rounded-full filter blur-3xl"></div>
      <div className="absolute top-[20%] right-[15%] w-8 h-8 bg-cyan-400/50 rounded-full filter blur-md animate-pulse">
        <FiZap className="w-full h-full text-cyan-200"/>
      </div>

      <div className="w-full max-w-md text-center z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="w-full h-12 border-2 border-green-400/50 rounded-full flex items-center justify-center">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="absolute left-0 top-0 h-full bg-green-400/20 rounded-full"
             />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.5)]"
          >
            <FiCheckCircle className="text-4xl text-brand-dark" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          className="text-4xl font-bold font-orbitron tracking-widest mb-4"
        ><br />
          SUCCESSFUL
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="text-gray-400 mb-8"
        >
          Welcome to the future. Your digital identity has been verified and access has been granted.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/home')}
            className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] btn-glow"
          >
            <FiHome /> GO TO HOME NOW <FiArrowRight />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SuccessPage;
