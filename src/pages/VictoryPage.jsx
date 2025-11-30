import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBarChart2, FiHome } from 'react-icons/fi';

const VictoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { winner, scores, isLocalBattle } = location.state || { 
    winner: { name: 'Player Alpha' }, 
    scores: { modelA: 3000, modelB: 2500 },
    isLocalBattle: false
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const badgeVariants = {
    hidden: { scale: 0.5, rotate: -15, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        delay: 0.6,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        delay: 0.8,
      },
    },
  };

  // Confetti pieces
  const confetti = [...Array(50)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 100,
    initialRotate: Math.random() * 360,
    color: ['#00ffff', '#ff00ff', '#ffffff'][Math.floor(Math.random() * 3)],
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at bottom, #0f172a 0%, #000000 100%)'
      }}
    >
      {/* Confetti animation */}
      {confetti.map(c => (
        <motion.div
          key={c.id}
          className="absolute w-2 h-4"
          style={{
            left: `${c.x}vw`,
            backgroundColor: c.color,
            boxShadow: `0 0 10px ${c.color}`,
          }}
          initial={{
            y: `${c.y}vh`,
            rotate: c.initialRotate,
          }}
          animate={{
            y: '120vh',
            rotate: c.initialRotate + 180 + Math.random() * 180,
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}

      <div className="text-center z-10 p-4">
        <motion.div variants={badgeVariants} className="relative inline-block mb-8">
          
        </motion.div>

        <motion.h1
          variants={textVariants}
          className="text-6xl md:text-7xl font-bold font-orbitron text-white tracking-widest"
          style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.7)' }}
        >
          VICTORY
        </motion.h1>
        
        <motion.div variants={textVariants}>
          <h2 className="text-2xl text-cyan-400 mt-4">WINNER: {winner.name}</h2>
          {isLocalBattle && (
            <p className="text-xl text-white mt-2">
              Final Score: {scores.modelA} vs {scores.modelB}
            </p>
          )}
        </motion.div>

        <motion.div variants={buttonVariants} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          {!isLocalBattle && (
            <button
              onClick={() => navigate('/battle-analytics')}
              className="bg-black/20 backdrop-blur-md border border-cyan-400/50 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-3 hover:bg-cyan-400/20 transition-colors shadow-lg shadow-cyan-500/10"
            >
              <FiBarChart2 /> View Battle Analytics
            </button>
          )}
          <button
            onClick={() => navigate('/battle-mode')}
            className="bg-black/20 backdrop-blur-md border border-purple-400/50 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-3 hover:bg-purple-400/20 transition-colors shadow-lg shadow-purple-500/10"
          >
            <FiHome /> Return to Battle Selection
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VictoryPage;
