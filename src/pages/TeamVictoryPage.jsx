import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiBarChart2, FiRepeat, FiHome, FiMessageSquare, FiShare2, FiX } from 'react-icons/fi';

const StatRow = ({ metric, teamA, teamB }) => (
  <div className="grid grid-cols-3 gap-4 py-2 text-sm">
    <div className="text-gray-400">{metric}</div>
    <div className="text-center font-bold text-cyan-300">{teamA}</div>
    <div className="text-center font-bold text-violet-300">{teamB}</div>
  </div>
);

const ActionButton = ({ icon, label, color, onClick }) => (
  <motion.button
    whileHover={{ y: -5, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex flex-col items-center justify-center gap-2 rounded-lg p-4 text-white font-bold text-sm transition-all duration-300 ${color}`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);

const TeamVictoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Provide a more robust fallback
  const { winner, scores, teams } = location.state || {
    winner: { name: 'CYBER WARRIORS', color: 'cyan' },
    scores: { cyberWarriors: 0, quantumHunters: 0 },
    teams: {
        cyberWarriors: { name: 'CYBER WARRIORS' },
        quantumHunters: { name: 'QUANTUM HUNTERS' }
    }
  };

  const loser = teams.cyberWarriors.name === winner.name ? teams.quantumHunters : teams.cyberWarriors;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-black text-white font-sans flex flex-col justify-between"
      style={{
        background: 'radial-gradient(ellipse at bottom, #0f172a 0%, #000000 100%)'
      }}
    >
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
          <FiAward className="text-yellow-400 text-5xl md:text-6xl drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <h1 className={`text-4xl md:text-5xl font-bold font-orbitron text-glow-${winner.color} tracking-wider uppercase`} style={{ textShadow: '0 0 15px var(--glow-color)' }}>
            {winner.name} DOMINATE
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="my-8">
          <div className="bg-black/30 backdrop-blur-md border border-yellow-400/30 rounded-lg p-4 text-center">
            <h2 className="font-bold font-orbitron text-yellow-400 mb-2">ACHIEVEMENTS</h2>
            <div className="bg-gray-800/50 p-3 rounded-md flex items-center justify-center gap-3">
              <FiAward className="text-yellow-400 text-2xl" />
              <span className="font-bold">MVP of the League</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full max-w-2xl bg-black/30 backdrop-blur-md border border-brand-cyan/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold font-orbitron mb-4 text-center text-glow-cyan">FINAL SCORE</h2>
          <div className="grid grid-cols-3 gap-4 pb-2 border-b border-brand-cyan/50 text-sm font-bold uppercase">
            <div>Metric</div>
            <div className={`text-center text-glow-${winner.color}`}>{winner.name}</div>
            <div className={`text-center text-glow-${loser.color}`}>{loser.name}</div>
          </div>
          <div className="mt-2">
            <StatRow metric="Total Points" teamA={scores.cyberWarriors} teamB={scores.quantumHunters} />
            <StatRow metric="Avg Creativity" teamA="86%" teamB="78%" />
            <StatRow metric="Avg Accuracy" teamA="92%" teamB="88%" />
            <StatRow metric="Total Prompts" teamA="15" teamB="14" />
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="w-full bg-black/40 backdrop-blur-lg p-4">
        <div className="grid grid-cols-6 gap-4 max-w-4xl mx-auto">
          <ActionButton icon={<FiBarChart2 size={24} />} label="Analytics" color="bg-blue-600 hover:bg-blue-500" onClick={() => navigate('/battle-analytics', { state: { winner, scores, teams } })} />
          <ActionButton icon={<FiRepeat size={24} />} label="Retry Round" color="bg-yellow-600 hover:bg-yellow-500" onClick={() => navigate('/team-battle-setup')} />
          <ActionButton icon={<FiShare2 size={24} />} label="Replay" color="bg-teal-600 hover:bg-teal-500" />
          <ActionButton icon={<FiMessageSquare size={24} />} label="Chat" color="bg-green-600 hover:bg-green-500" />
          <ActionButton icon={<FiHome size={24} />} label="Next Round" color="bg-orange-600 hover:bg-orange-500" onClick={() => navigate('/team-battle-setup')} />
          <ActionButton icon={<FiX size={24} />} label="Exit" color="bg-red-600 hover:bg-red-500" onClick={() => navigate('/home')} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamVictoryPage;
