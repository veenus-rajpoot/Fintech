import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiBarChart2, FiTrendingUp, FiZap, FiShield, FiTarget, FiCheckCircle, FiXCircle, FiArrowLeft } from 'react-icons/fi';

const data = [
  { name: 'Round 1', 'Cyber Warriors': 400, 'Quantum Hunters': 240 },
  { name: 'Round 2', 'Cyber Warriors': 300, 'Quantum Hunters': 139 },
  { name: 'Round 3', 'Cyber Warriors': 200, 'Quantum Hunters': 980 },
  { name: 'Round 4', 'Cyber Warriors': 278, 'Quantum Hunters': 390 },
  { name: 'Round 5', 'Cyber Warriors': 189, 'Quantum Hunters': 480 },
  { name: 'Round 6', 'Cyber Warriors': 239, 'Quantum Hunters': 380 },
  { name: 'Round 7', 'Cyber Warriors': 349, 'Quantum Hunters': 430 },
];

const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-4"
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(45, 55, 72, 0.7)' }}
  >
    <div className={`p-3 rounded-full bg-${color}-500/20 text-${color}-400`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const LiveScoreboard = ({ scores, teams }) => (
  <div className="bg-black/30 backdrop-blur-md border border-brand-cyan/30 rounded-2xl p-6 w-full text-center card-border-glow">
    <h3 className="font-bold font-orbitron mb-4 text-glow-cyan flex items-center justify-center gap-2 text-xl"><FiBarChart2 /> LIVE SCOREBOARD</h3>
    <div className="space-y-3 text-left text-base">
      <div className="flex justify-between items-center bg-cyan-900/30 p-3 rounded-md">
        <span className="font-semibold text-cyan-400">{teams.cyberWarriors.name}:</span>
        <span className="font-bold text-2xl">{scores.cyberWarriors}</span>
      </div>
      <div className="flex justify-between items-center bg-violet-900/30 p-3 rounded-md">
        <span className="font-semibold text-violet-400">{teams.quantumHunters.name}:</span>
        <span className="font-bold text-2xl">{scores.quantumHunters}</span>
      </div>
    </div>
  </div>
);

const BattleAnalyticsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teams, scores } = location.state || {
    teams: {
      cyberWarriors: { name: 'CYBER WARRIORS' },
      quantumHunters: { name: 'QUANTUM HUNTERS' }
    },
    scores: { cyberWarriors: 0, quantumHunters: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      className="min-h-screen bg-brand-dark text-white font-sans p-4 sm:p-8"
      style={{ background: 'radial-gradient(circle at top, #1a2035 0%, #0f172a 70%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-glow-cyan">Battle Analytics</h1>
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <FiArrowLeft /> Back
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <LiveScoreboard scores={scores} teams={teams} />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-black/20 p-6 rounded-2xl border border-brand-violet/30">
            <h2 className="text-2xl font-bold font-orbitron mb-6 text-glow-violet flex items-center gap-3"><FiTrendingUp /> Performance Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis dataKey="name" stroke="#a0aec0" />
                <YAxis stroke="#a0aec0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    borderColor: '#4a5568',
                    color: '#cbd5e0'
                  }}
                />
                <Legend wrapperStyle={{ color: '#cbd5e0' }} />
                <Line type="monotone" dataKey="Cyber Warriors" stroke="#22d3ee" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Quantum Hunters" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-8">
          <h2 className="text-2xl font-bold font-orbitron mb-6 text-glow-pink">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<FiZap size={24} />} label="Total Damage Dealt" value="15,832" color="red" />
            <StatCard icon={<FiShield size={24} />} label="Damage Blocked" value="7,210" color="blue" />
            <StatCard icon={<FiTarget size={24} />} label="Highest Crit" value="789" color="yellow" />
            <StatCard icon={<FiCheckCircle size={24} />} label="Accuracy" value="91.3%" color="green" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BattleAnalyticsPage;
