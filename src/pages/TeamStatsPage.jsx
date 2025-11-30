import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiTrendingUp } from 'react-icons/fi';

const StatRow = ({ metric, teamA, teamB }) => (
  <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-700/50 text-sm">
    <div className="text-gray-400">{metric}</div>
    <div className="text-center font-bold">{teamA}</div>
    <div className="text-center font-bold">{teamB}</div>
  </div>
);

const EnergyBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-400">{label}</span>
      <span className="font-bold">{value}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <motion.div
        className={`h-2.5 rounded-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  </div>
);

const Objective = ({ text, status }) => (
  <div className="flex items-center gap-3 text-sm">
    {status === 'complete' && <FiCheckCircle className="text-green-400" />}
    {status === 'incomplete' && <FiXCircle className="text-red-500" />}
    {status === 'progress' && <div className="w-4 h-4 border-2 border-yellow-400 rounded-full"></div>}
    <span className={status === 'complete' ? 'text-gray-500 line-through' : ''}>{text}</span>
    {status === 'progress' && <span className="ml-auto font-bold">{status.progress}%</span>}
  </div>
);

const TeamStatsPage = () => {
  const navigate = useNavigate();

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
      className="min-h-screen bg-brand-dark text-white font-sans p-4 sm:p-8"
      style={{
        background: 'radial-gradient(circle at top, #1a2035 0%, #0f172a 70%)'
      }}
      onClick={() => navigate('/team-victory')}
    >
      <div className="container mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-glow-cyan">Live Statistics & Scoreboard</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Scoreboard */}
          <motion.div variants={itemVariants} className="bg-black/20 p-6 rounded-2xl border border-brand-cyan/30">
            <h2 className="text-2xl font-bold font-orbitron mb-6 text-glow-cyan">TEAM SCOREBOARD</h2>
            <div className="grid grid-cols-3 gap-4 pb-3 border-b-2 border-brand-cyan/50 text-sm font-bold">
              <div>Metric</div>
              <div className="text-center">Cyber Warriors</div>
              <div className="text-center">Quantum Hunters</div>
            </div>
            <div className="space-y-2 mt-2">
              <StatRow metric="Total Points" teamA="2847" teamB="2156" />
              <StatRow metric="Avg Creativity" teamA="86%" teamB="78%" />
              <StatRow metric="Avg Accuracy" teamA="92%" teamB="88%" />
              <StatRow metric="Total Prompts" teamA="15" teamB="14" />
              <StatRow metric="Top Contributor" teamA="CommanderX" teamB="QuantumQueen" />
            </div>
            <div className="mt-8 space-y-4">
              <EnergyBar label="Team A Energy" value={84} color="from-cyan-400 to-blue-500" />
              <EnergyBar label="Team B Energy" value={67} color="from-violet-400 to-purple-500" />
            </div>
          </motion.div>

          {/* Right Column: Analytics & Objectives */}
          <motion.div variants={itemVariants} className="bg-black/20 p-6 rounded-2xl border border-brand-violet/30">
            <h2 className="text-2xl font-bold font-orbitron mb-6 text-glow-violet">LIVE ANALYTICS</h2>
            <div className="bg-gray-800/50 h-64 rounded-lg flex items-center justify-center mb-8">
              <FiTrendingUp className="text-5xl text-gray-600" />
            </div>
            <h3 className="font-bold font-orbitron mb-4">VICTORY OBJECTIVES</h3>
            <div className="space-y-3">
              <Objective text="Reach 5000 points" status="progress" progress="57" />
              <Objective text="Win 3 consecutive rounds" status="progress" progress="66" />
              <Objective text="Keep accuracy > 90%" status="complete" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamStatsPage;
