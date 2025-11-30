import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiLock, FiUnlock, FiCheck, FiX, FiAward, FiZap, FiUser, FiCpu } from 'react-icons/fi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BattleArenaPage = () => {
  const navigate = useNavigate();
  const [playerEnergy, setPlayerEnergy] = useState(78);
  const [aiEnergy, setAiEnergy] = useState(66);
  const [isLocked, setIsLocked] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      // Navigate to victory page when timer ends
      navigate('/victory');
    }
  }, [timer, navigate]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.5 } },
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
      className="min-h-screen bg-brand-dark text-white font-sans p-4"
      style={{
        background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)'
      }}
    >
      <div className="absolute inset-0 bg-[url('https://i.imgur.com/m5or4n0.png')] bg-cover bg-center opacity-20"></div>
      <div className="relative container mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-4 bg-black/30 p-3 rounded-lg">
          <h1 className="text-xl font-bold font-orbitron">Prompt Wars</h1>
          <div className="flex items-center gap-4 text-sm">
            <span>Round 3</span>
            <span>My Stats: 2W-1L</span>
            <button className="hover:text-brand-cyan">Profile</button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left Panel: Command Center */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
              <h2 className="text-lg font-bold font-orbitron mb-2 text-glow-blue">Your Command Center</h2>
              <textarea
                placeholder="Enter your AI battle prompt..."
                className="w-full h-24 bg-black/30 p-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLocked}
              ></textarea>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setIsLocked(!isLocked)}
                  className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md text-sm transition-colors ${isLocked ? 'bg-yellow-500/80 hover:bg-yellow-400' : 'bg-gray-600 hover:bg-gray-500'}`}
                >
                  {isLocked ? <FiLock /> : <FiUnlock />} {isLocked ? 'Unlock Command' : 'Lock Command'}
                </button>
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md text-sm bg-green-500/80 hover:bg-green-400 disabled:bg-gray-700 disabled:cursor-not-allowed"
                  disabled={isLocked || isSubmitted}
                >
                  <FiSend /> Submit
                </button>
              </div>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50 text-center">
              <h3 className="text-md font-bold font-orbitron mb-2">Player Alpha</h3>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42nnAyAw2rXlFEYYStN2IZTmzPdskv6kY9cM7l13DxxZsizaSs0SQyPT1OeBHoB1BAKQ&usqp=CAU" alt="Player Alpha Avatar" className="w-32 h-32 mx-auto rounded-lg object-cover border-2 border-blue-400 mb-2" />
              <div className="w-full bg-gray-700 rounded-full h-4 border border-gray-600">
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-cyan-300 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${playerEnergy}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-sm mt-1">Energy: {playerEnergy}%</p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
              <h3 className="text-md font-bold font-orbitron mb-2">Your Performance</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>Accuracy</span><span>92%</span></div>
                <div className="flex justify-between"><span>Creativity</span><span>87%</span></div>
              </div>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
              <h3 className="text-md font-bold font-orbitron mb-2">Scoreboard</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="flex justify-between"><span>Player Alpha</span><span>2,340</span></div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1"><div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '80%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between"><span>AI Nexus</span><span>2,180</span></div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1"><div className="bg-red-400 h-1.5 rounded-full" style={{ width: '75%' }}></div></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Panel: VS Screen */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-center justify-center bg-black/30 p-4 rounded-lg border border-gray-700">
            <div className="w-full flex justify-between items-center px-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/30 border-2 border-blue-400 flex items-center justify-center">
                  <FiUser className="text-3xl text-blue-300" />
                </div>
                <p className="font-bold mt-2">PLAYER ALPHA</p>
                <p className="text-2xl font-orbitron text-blue-300">2847</p>
              </div>
              <div className="text-5xl font-orbitron text-gray-500">VS</div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-500/30 border-2 border-red-400 flex items-center justify-center">
                  <FiCpu className="text-3xl text-red-300" />
                </div>
                <p className="font-bold mt-2">AI NEXUS</p>
                <p className="text-2xl font-orbitron text-red-300">2147</p>
              </div>
            </div>
            <div className="my-6 text-center">
              <div className="text-5xl font-orbitron text-yellow-400 text-glow-yellow">{formatTime(timer)}</div>
              <div className="bg-yellow-500/80 text-black text-xs font-bold px-3 py-1 rounded-full mt-2 animate-pulse">Live Commentary: Incredible prompt!</div>
            </div>
            <div className="w-full px-4">
              <h3 className="text-center text-sm font-orbitron mb-2">Battle Intensity Timeline</h3>
              <div className="grid grid-cols-10 gap-1 h-16">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={`rounded-sm ${['bg-green-500', 'bg-yellow-500', 'bg-red-500'][Math.floor(Math.random() * 3)]}`}></div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel: AI Response */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50">
              <h2 className="text-lg font-bold font-orbitron mb-2 text-glow-red">AI Nexus Response</h2>
              <p className="text-sm text-gray-300">Analyzing opponent strategy... Deploying counter-narrative with enhanced logical framework.</p>
            </div>
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50 text-center">
              <h3 className="text-md font-bold font-orbitron mb-2">AI Nexus</h3>
              <img src="https://png.pngtree.com/background/20250211/original/pngtree-a-futuristic-neon-lit-humanoid-robot-striking-dynamic-pose-amidst-colorful-picture-image_16107814.jpg" alt="AI Nexus Avatar" className="w-32 h-32 mx-auto rounded-lg object-cover border-2 border-red-400 mb-2" />
              <div className="w-full bg-gray-700 rounded-full h-4 border border-gray-600">
                <motion.div
                  className="bg-gradient-to-r from-red-400 to-orange-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${aiEnergy}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-sm mt-1">Energy: {aiEnergy}%</p>
            </div>
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50">
              <h3 className="text-md font-bold font-orbitron mb-2">Battle Analytics</h3>
              <div className="text-xs space-y-1 text-gray-400 font-mono">
                <p>&gt; prompt_executed: creative_narrative</p>
                <p>&gt; ai_counter: logical_framework</p>
                <p>&gt; damage_calculated: +247</p>
              </div>
            </div>
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50">
              <h3 className="text-md font-bold font-orbitron mb-2">Objectives</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="flex justify-between"><span>Target Score: 3000</span><span>95%</span></div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1"><div className="bg-green-400 h-1.5 rounded-full" style={{ width: '95%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between"><span>Consecutive Wins: 3</span><span>2x</span></div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1"><div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '66%' }}></div></div>
                </div>
              </div>
              <div className="mt-3 p-2 bg-yellow-500/20 text-yellow-300 rounded-md text-center text-sm font-bold flex items-center justify-center gap-2">
                <FiZap /> Speed Demon Unlocked!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BattleArenaPage;
