import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCpu, FiLayers, FiSliders, FiZap, FiArrowRight, FiChevronDown, FiSearch, FiUploadCloud, FiSettings, FiUsers, FiClock } from 'react-icons/fi';

const TeamLobbyPage = () => {
  const navigate = useNavigate();
  const [wordCount, setWordCount] = useState(600);
  const [tokenLimit, setTokenLimit] = useState(1000);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const layers = [
    { name: 'Crystal Wastes', players: '2-4', image: 'https://i.imgur.com/Y8LL3g5.png' },
    { name: 'Orbital Station', players: '2-8', image: 'https://i.imgur.com/sT3A1xL.png' },
    { name: 'Neon City', players: '4-16', image: 'https://i.imgur.com/rO2rYgJ.png' },
  ];

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
    >
      <div className="container mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-glow-cyan mb-2">Team Battle Lobby</h1>
          <p className="text-lg text-gray-400">Assemble your squad and configure the rules of engagement.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div variants={itemVariants} className="bg-black/20 p-6 rounded-2xl border border-brand-cyan/30">
              <h2 className="text-xl font-bold font-orbitron mb-4 flex items-center gap-2"><FiCpu /> AI Model Selection</h2>
              <div className="space-y-3">
                <div className="bg-gray-800/50 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://i.imgur.com/j2qL3vR.png" alt="GPT-4 Turbo" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold">GPT-4 Turbo</h3>
                      <p className="text-xs text-gray-400">Recommended</p>
                    </div>
                  </div>
                  <button className="text-xs text-brand-cyan hover:text-white">Change</button>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-3">
                    <img src="https://i.imgur.com/A4yJ0bH.png" alt="UX Pilot-3" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold">UX Pilot-3</h3>
                      <p className="text-xs text-gray-400">Creative AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-black/20 p-6 rounded-2xl border border-brand-pink/30">
              <h2 className="text-xl font-bold font-orbitron mb-4 flex items-center gap-2 text-glow-pink"><FiSliders /> Advanced Rules</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 flex justify-between">Token Limit <span>{tokenLimit}</span></label>
                  <input type="range" min="500" max="2000" value={tokenLimit} onChange={(e) => setTokenLimit(e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-slider mt-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 flex justify-between">Word Count Max <span>{wordCount}</span></label>
                  <input type="range" min="100" max="1000" value={wordCount} onChange={(e) => setWordCount(e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-slider-pink mt-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Prohibited Keywords</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-red-500/30 text-red-300 text-xs px-2 py-1 rounded-full">boring</span>
                    <span className="bg-red-500/30 text-red-300 text-xs px-2 py-1 rounded-full">simple</span>
                    <button className="text-xs text-gray-400 hover:text-white">+ Add</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div variants={itemVariants} className="bg-black/20 p-6 rounded-2xl border border-brand-cyan/30">
              <h2 className="text-xl font-bold font-orbitron mb-4 flex items-center gap-2"><FiSettings /> Battle Parameters</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Time Limit</label>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg mt-1">
                    <span>10 Minutes</span>
                    <FiClock />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Scenario Layer</label>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg mt-1">
                    <span>Crystal Wastes</span>
                    <FiChevronDown />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Scenario Type</label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {['Speed', 'Strategy', 'Creative'].map(type => (
                      <button key={type} className={`p-2 text-sm rounded-md border ${type === 'Strategy' ? 'bg-brand-cyan/20 border-brand-cyan' : 'bg-gray-800/50 border-gray-600 hover:bg-brand-cyan/20 hover:border-brand-cyan'}`}>{type}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-black/20 p-6 rounded-2xl border border-brand-violet/30">
              <h2 className="text-2xl font-bold font-orbitron mb-4 text-glow-violet flex items-center gap-2"><FiZap /> Scenario Generator</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Theme</label>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg mt-1">
                    <span>Sci-Fi Epic</span>
                    <FiChevronDown />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Tone</label>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg mt-1">
                    <span>Gritty & Realistic</span>
                    <FiChevronDown />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div variants={itemVariants} className="bg-black/20 p-6 rounded-2xl border border-brand-cyan/30">
              <h2 className="text-xl font-bold font-orbitron mb-4 flex items-center gap-2"><FiLayers /> Select Your Layer</h2>
              <div className="space-y-4">
                {layers.map((layer, index) => (
                  <div key={index} className={`relative rounded-lg overflow-hidden group cursor-pointer border-2 ${index === 0 ? 'border-brand-cyan' : 'border-transparent'}`}>
                    <img src={layer.image} alt={layer.name} className="w-full h-20 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-2">
                      <h3 className="font-bold text-sm">{layer.name}</h3>
                      <p className="text-xs text-gray-300">{layer.players} Players</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-black/20 p-6 rounded-2xl border border-brand-green/30">
              <h2 className="text-xl font-bold font-orbitron mb-4 flex items-center gap-2 text-glow-green"><FiUsers /> Matchmaking</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Matchmaking Privacy</span>
                  <div className="w-10 h-5 bg-gray-600 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Finding players... 3/4</p>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-brand-green h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <button onClick={() => navigate('/team-command')} className="bg-brand-green text-white font-bold py-3 px-10 rounded-full btn-glow-green text-lg">
            <FiArrowRight className="inline mr-2" /> Start Game
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamLobbyPage;
