import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiSearch, FiBell, FiUser, FiEye } from 'react-icons/fi';
import { FaTrophy, FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';
import { Rocket, Swords } from 'lucide-react';
import Countdown from 'react-countdown';

const StatCard = ({ icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-black/20 p-4 rounded-lg text-center"
  >
    {icon}
    <p className="text-2xl font-bold font-orbitron mt-2">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </motion.div>
);

const HomePage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000); // Message disappears after 4 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-2xl font-bold text-brand-cyan font-orbitron">Tournament has started!</span>;
    } else {
      return (
        <div className="grid grid-cols-4 gap-2 text-center">
          <div><div className="text-3xl font-orbitron">{String(days).padStart(2, '0')}</div><div className="text-xs text-gray-400">Days</div></div>
          <div><div className="text-3xl font-orbitron">{String(hours).padStart(2, '0')}</div><div className="text-xs text-gray-400">Hours</div></div>
          <div><div className="text-3xl font-orbitron">{String(minutes).padStart(2, '0')}</div><div className="text-xs text-gray-400">Minutes</div></div>
          <div><div className="text-3xl font-orbitron">{String(seconds).padStart(2, '0')}</div><div className="text-xs text-gray-400">Seconds</div></div>
        </div>
      );
    }
  };
  
  const NavLink = ({ path, children }) => (
    <button 
      onClick={() => navigate(path)} 
      className={`pb-1 transition-colors duration-300 ${location.pathname === path ? 'text-brand-pink font-bold border-b-2 border-brand-pink' : 'text-gray-300 hover:text-brand-pink'}`}
    >
      {children}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-brand-dark min-h-screen text-brand-light font-sans overflow-x-hidden">
        {/* Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 bg-brand-dark-secondary/80 backdrop-blur-lg border-b border-brand-pink/20 z-50"
        >
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-brand-pink to-brand-violet shadow-lg">
                <span className="font-bold text-xl font-orbitron text-white" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>Z</span>
              </div>
              <h1 className="text-xl font-bold font-orbitron">Zecathon Prompt Wars</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <NavLink path="/home">Home</NavLink>
              <NavLink path="/battle-mode">Battles</NavLink>
              <NavLink path="/events">Events</NavLink>
              <NavLink path="/learn">Learn</NavLink>
							  <NavLink path="/learn">Dashboard</NavLink>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input type="text" placeholder="Search..." className="bg-black/30 border border-gray-700 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/50 w-48" />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button onClick={() => navigate('/notifications')} className="p-2 rounded-full hover:bg-gray-800 transition"><FiBell /></button>
              <button className="p-2 rounded-full hover:bg-gray-800 transition"><FiUser /></button>
              <button className="bg-brand-cyan text-brand-dark font-bold py-2 px-5 rounded-full text-sm btn-glow-cyan"><Link to ='/login'>Login</Link></button>
            </div>
          </div>
        </motion.header>

        <main className="pt-24">
          {/* Hero Section */}
          <section className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="absolute inset-0 bg-[url('https://images.stockcake.com/public/e/e/4/ee483014-2d50-4f0c-95e0-dabb6ea9cc0e_large/neon-robot-night-stockcake.jpg')] bg-cover bg-center opacity-20"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <AnimatePresence>
                  {showWelcome && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
                      className="text-brand-gold font-bold text-lg mb-2 font-orbitron"
                    >
                      WELCOME!
                    </motion.div>
                  )}
                </AnimatePresence>
                <h2 className="text-5xl md:text-7xl font-bold font-orbitron my-4 text-glow-pink">Battle with AI.<br />Level Up Your Skills.</h2>
                <p className="max-w-lg text-gray-300 mb-8">
                  Challenge AI models, compete with players, and master the art of prompt engineering in epic battles.
                </p>
                <div className="flex items-center gap-4">
                  <motion.button onClick={() => navigate('/battle-mode')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold py-3 px-8 rounded-full btn-glow-cyan">
                    <Rocket size={20} /> Start Battle
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-black/30 border border-brand-cyan text-brand-cyan py-3 px-8 rounded-full hover:bg-brand-cyan/10 transition">
                    <FiPlay /> Watch Demo
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-md mx-auto md:mx-0 md:ml-auto bg-black/30 backdrop-blur-md border border-brand-cyan/30 rounded-2xl p-6 card-border-glow animate-pulsating-glow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-orbitron text-xl text-glow-cyan">Next Tournament</h3>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse-red shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                </div>
                <Countdown date={Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 14 + 1000 * 60 * 27} renderer={countdownRenderer} />
              </motion.div>
            </div>
          </section>

          {/* Dashboard Section */}
          <section className="container mx-auto px-4 py-16 relative">
              <div className="absolute inset-0 bg-[url('https://t3.ftcdn.net/jpg/11/53/13/24/360_F_1153132473_2LY5q3eFVYiyUi47vGuWDrsodxKlmpS3.jpg')] bg-cover bg-center opacity-10"></div>
              <div className="bg-black/30 backdrop-blur-md border border-brand-cyan/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 card-border-glow relative z-10">
                  <div className="flex-1">
                      <motion.h3 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-3xl font-bold font-orbitron mb-2 text-glow-cyan">Welcome back, Alex!</motion.h3>
                      <motion.p 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-gray-400 mb-6">Level 7 Prompt Master</motion.p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                          <StatCard icon={<FaTrophy className="mx-auto text-brand-cyan text-2xl"/>} value="24" label="Battles Won" delay={0.4} />
                          <StatCard icon={<FaTrophy className="mx-auto text-brand-cyan text-2xl"/>} value="1,250" label="XP Points" delay={0.5} />
                      </div>
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="bg-black/20 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-400 mb-2">Win Rate</p>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <motion.div 
                                  className="bg-brand-green h-2.5 rounded-full" 
                                  style={{boxShadow: "0 0 8px #22C55E"}}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: '89%' }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.8 }}
                              />
                          </div>
                          <p className="text-2xl font-bold font-orbitron mt-2 text-brand-green">89%</p>
                      </motion.div>
                      <motion.button 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          className="w-full mt-6 flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold py-3 px-8 rounded-full btn-glow-cyan">
                          <FiPlay /> Continue Battle
                      </motion.button>
                  </div>
                  <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="flex-shrink-0">
                      <motion.img 
                          src="https://wallpapers.com/images/hd/robot-pictures-7r7y13ibk040476d.jpg" 
                          alt="Robot Avatar" 
                          className="w-64 h-64 rounded-full border-4 border-brand-cyan animate-pulsating-glow object-cover" 
                          animate={{
                              y: [0, -10, 0],
                          }}
                          transition={{
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut"
                          }}
                      />
                  </motion.div>
              </div>
          </section>

          {/* Featured Battles Section */}
          <section className="container mx-auto px-4 py-16 relative">
            <div className="absolute inset-0 bg-[url('https://img.freepik.com/premium-photo/futuristic-arena-with-holographic-gladiator-battle_1022456-104815.jpg')] bg-cover bg-center opacity-10"></div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold font-orbitron text-center mb-12 text-glow-pink relative z-10">Featured Battles</motion.h2>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-black/30 backdrop-blur-md border border-brand-cyan/20 rounded-2xl p-6 card-border-glow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold font-orbitron">AI GPT-4 vs UX Pilot</h3>
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">LIVE</span>
                </div>
                <p className="text-gray-400 mb-4 text-sm">Creative writing challenge: Generate a compelling story opening in under 100 words.</p>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-2"><FiEye /> 107 watching</span>
                  <span>Prize: 500 XP</span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold py-3 rounded-full btn-glow-cyan">
                  <Swords size={20} /> Join Battle
                </button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-black/30 backdrop-blur-md border border-brand-cyan/20 rounded-2xl p-6 card-border-glow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold font-orbitron">Player Tournament</h3>
                  <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">STARTING SOON</span>
                </div>
                <p className="text-gray-400 mb-4 text-sm">Weekly championship: Best prompt engineering techniques competition.</p>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
                  <span className="font-bold text-white">$500 Prize Pool</span>
                  <span>32 registered</span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-3 rounded-full btn-glow-green">
                  <FaTrophy /> Register
                </button>
              </motion.div>
            </div>
          </section>

          {/* Updates & Stats Section */}
          <section className="container mx-auto px-4 py-16 relative">
              <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cvP3PKlT6VVYRjK3GfKr7IQIBWfe6ZP7zWKn94cYgJXBdWqS4Z4PPSEbCMT-IG88Ouo&usqp=CAU')] bg-cover bg-center opacity-10"></div>
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                  <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="md:col-span-2 bg-black/30 backdrop-blur-md border border-brand-cyan/20 rounded-2xl p-6 card-border-glow">
                      <h3 className="text-2xl font-bold font-orbitron mb-6 text-glow-pink">Latest Updates</h3>
                      <div className="space-y-4">
                          <div className="bg-black/20 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-1">
                                  <h4 className="font-bold text-brand-cyan font-orbitron">New AI Model Added: Gemini Pro</h4>
                                  <span className="text-xs text-gray-500">2 hours ago</span>
                              </div>
                              <p className="text-sm text-gray-400">Challenge the latest Google AI model in creative and analytical battles.</p>
                          </div>
                          <div className="bg-black/20 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-1">
                                  <h4 className="font-bold text-brand-cyan font-orbitron">Achievement System Update</h4>
                                  <span className="text-xs text-gray-500">1 day ago</span>
                              </div>
                              <p className="text-sm text-gray-400">New badges and rewards for consistent players and top performers.</p>
                          </div>
                      </div>
                  </motion.div>

                  <div className="space-y-8">
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="bg-black/30 backdrop-blur-md border border-brand-cyan/20 rounded-2xl p-6 card-border-glow">
                          <h3 className="text-xl font-bold font-orbitron mb-4">Top Players</h3>
                          <ul className="space-y-3 text-sm">
                              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><img src="https://i.pravatar.cc/24?u=a" alt="avatar" className="w-6 h-6 rounded-full" /> Sarah Chen</span> <span className="font-bold text-brand-green">94%</span></li>
                              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><img src="https://i.pravatar.cc/24?u=b" alt="avatar" className="w-6 h-6 rounded-full" /> Mike Rodriguez</span> <span className="font-bold text-brand-green">91%</span></li>
                              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><img src="https://i.pravatar.cc/24?u=c" alt="avatar" className="w-6 h-6 rounded-full" /> Emma Wilce</span> <span className="font-bold text-brand-green">88%</span></li>
                          </ul>
                      </motion.div>

                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="bg-black/30 backdrop-blur-md border border-brand-cyan/20 rounded-2xl p-6 card-border-glow">
                          <h3 className="text-xl font-bold font-orbitron mb-4">Community Stats</h3>
                          <ul className="space-y-2 text-sm text-gray-300">
                              <li className="flex justify-between">Active Players <span className="font-bold text-white">12,647</span></li>
                              <li className="flex justify-between">Battles Today <span className="font-bold text-white">3,256</span></li>
                              <li className="flex justify-between">Total Battles <span className="font-bold text-white">1.2M</span></li>
                          </ul>
                      </motion.div>
                  </div>
              </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 py-16">
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/30 backdrop-blur-md border border-brand-cyan/20 rounded-2xl p-10 text-center card-border-glow">
                  <h2 className="text-3xl font-bold font-orbitron mb-2 text-glow-cyan">Stay Updated</h2>
                  <p className="text-gray-200 mb-6">Get weekly tips and battle highlights.</p>
                  <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
                      <input type="email" placeholder="Your email" className="w-full sm:w-auto flex-grow bg-black/20 border border-brand-cyan/50 rounded-full py-3 px-5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan" />
                      <button type="submit" className="w-full sm:w-auto bg-brand-cyan text-brand-dark font-bold py-3 px-8 rounded-full btn-glow-cyan">Subscribe</button>
                  </form>
              </motion.div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-brand-dark-secondary border-t border-brand-pink/20 mt-16">
          <div className="container mx-auto px-4 py-8">
              <div className="grid md:grid-cols-4 gap-8 text-sm">
                  <div>
                      <h3 className="font-bold font-orbitron text-lg mb-4">Zecathon</h3>
                      <p className="text-gray-400">The ultimate platform for AI prompt engineering battles.</p>
                  </div>
                  <div>
                      <h3 className="font-bold font-orbitron text-lg mb-4">Quick Links</h3>
                      <ul className="space-y-2 text-gray-400">
                          <li><a href="#" className="hover:text-brand-pink transition">About Us</a></li>
                          <li><a href="#" className="hover:text-brand-pink transition">Tournaments</a></li>
                          <li><a href="#" className="hover:text-brand-pink transition">Leaderboard</a></li>
                          <li><a href="#" className="hover:text-brand-pink transition">FAQ</a></li>
                      </ul>
                  </div>
                  <div>
                      <h3 className="font-bold font-orbitron text-lg mb-4">Legal</h3>
                      <ul className="space-y-2 text-gray-400">
                          <li><a href="#" className="hover:text-brand-pink transition">Terms of Service</a></li>
                          <li><a href="#" className="hover:text-brand-pink transition">Privacy Policy</a></li>
                          <li><a href="#" className="hover:text-brand-pink transition">Cookie Policy</a></li>
                      </ul>
                  </div>
                  <div>
                      <h3 className="font-bold font-orbitron text-lg mb-4">Follow Us</h3>
                      <div className="flex space-x-4 text-gray-400">
                          <a href="#" className="hover:text-brand-pink transition"><FaTwitter size={20} /></a>
                          <a href="#" className="hover:text-brand-pink transition"><FaDiscord size={20} /></a>
                          <a href="#" className="hover:text-brand-pink transition"><FaGithub size={20} /></a>
                      </div>
                  </div>
              </div>
              <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
                  <p>&copy; {new Date().getFullYear()} Zecathon Prompt Wars. All rights reserved.</p>
              </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default HomePage;
