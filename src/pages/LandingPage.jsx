import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Play, HelpCircle, Globe, Settings, BrainCircuit, Trophy, Users } from 'lucide-react';

const SideNavItem = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="flex flex-col items-center space-y-2 group cursor-pointer"
  >
    <div className="w-12 h-12 bg-black bg-opacity-25 border border-cyan-400/50 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-400/20 group-hover:shadow-cyan-glow">
      <Icon className="w-6 h-6 text-cyan-400 transition-all duration-300 group-hover:text-white" />
    </div>
    <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">{label}</span>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="bg-black bg-opacity-25 border border-cyan-400/30 p-4 rounded-lg text-center backdrop-blur-sm transition-all duration-300 hover:bg-cyan-900/30 hover:-translate-y-2 hover:border-cyan-400"
  >
    <Icon className="w-10 h-10 mx-auto mb-3 text-cyan-400" />
    <h3 className="font-bold text-lg text-white mb-1">{title}</h3>
    <p className="text-sm text-gray-300">{description}</p>
  </motion.div>
);

function LandingPage() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-5xl bg-black/30 border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-500/10 backdrop-blur-md p-8 md:p-12"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-pink rounded-lg flex items-center justify-center text-white text-4xl font-black shadow-lg">
              Z
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-widest text-glow"
          >
            Zecathon
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white uppercase tracking-wider">Prompt Wars</h2>
            <p className="text-xs text-cyan-300 uppercase tracking-[0.2em]">Where Prompts Become Power</p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 max-w-xl text-gray-300"
          >
            Enter the ultimate battleground of creativity and artificial intelligence. Challenge minds, craft prompts, and dominate the digital arena.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 w-full"
          >
            <button className="button-glow w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold rounded-md transition-all duration-300 hover:bg-cyan-400 hover:text-black">
              <LogIn size={20} /><Link to='/login'> LOGIN</Link>
            </button>
            <button className="button-glow w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-cyan-400 text-black font-bold rounded-md transition-all duration-300 hover:bg-cyan-300 shadow-cyan-glow">
              <UserPlus size={20} /> <Link to='/signup'>SIGN UP</Link>
            </button>
            <button className="button-glow w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold rounded-md transition-all duration-300 hover:bg-cyan-400 hover:text-black">
              <Play size={20} /> PLAY AS GUEST
            </button>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-cyan-400/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard icon={BrainCircuit} title="AI Battles" description="Engage in epic prompt battles against advanced AI systems." delay={1.2} />
          <FeatureCard icon={Trophy} title="Leaderboards" description="Climb the ranks and prove your prompt mastery." delay={1.4} />
          <FeatureCard icon={Users} title="Multiplayer" description="Challenge friends in real-time prompt competitions." delay={1.6} />
        </div>
      </motion.div>

      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-6">
        <SideNavItem icon={HelpCircle} label="Help" delay={1.8} />
        <SideNavItem icon={Globe} label="Language" delay={2.0} />
        <SideNavItem icon={Settings} label="Settings" delay={2.2} />
      </div>
    </div>
  );
}
export default LandingPage;