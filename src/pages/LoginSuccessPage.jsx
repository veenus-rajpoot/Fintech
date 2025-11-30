import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome, FiClock, FiCheckSquare, FiEye } from 'react-icons/fi';

const InfoRow = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex justify-between items-center p-4 bg-green-900/20 border border-green-400/20 rounded-lg"
  >
    <span className="text-gray-400 text-sm">{label}</span>
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      <span className="text-green-300 font-semibold text-sm tracking-widest">{value}</span>
    </div>
  </motion.div>
);

const LoginSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-brand-dark text-white flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full filter blur-3xl animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-md bg-black/30 backdrop-blur-md border border-green-400/20 rounded-2xl p-8 text-center z-10 shadow-[0_0_60px_rgba(52,211,153,0.2)]"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
          className="mx-auto mb-6 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.5)]"
        >
          <FiCheckCircle className="text-4xl text-brand-dark" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-3xl font-bold font-orbitron tracking-[0.2em] text-green-300 mb-2"
        >
          LOGIN SUCCESSFUL
        </motion.h1>
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            className="h-0.5 bg-green-400/50 mx-auto mb-8"
        />

        <div className="space-y-3 mb-8">
          <InfoRow label="Security Status" value="SECURE" delay={1.4} />
          <InfoRow label="Connection" value="ENCRYPTED" delay={1.5} />
          <InfoRow label="Access Level" value="AUTHORIZED" delay={1.6} />
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          onClick={() => navigate('/home')}
          className="w-full flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] btn-glow"
        >
          <FiHome /> Go to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default LoginSuccessPage;
