import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiBook, FiVideo, FiMessageSquare, FiHelpCircle, FiAward, FiTrendingUp, FiUser, FiBell, FiStar } from 'react-icons/fi';
import { FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const StatCard = ({ value, label, icon }) => (
  <motion.div 
    className="text-center bg-white/5 p-4 rounded-lg"
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)'}}
  >
    {icon}
    <p className="text-4xl font-bold mt-2">{value}</p>
    <p className="text-gray-400">{label}</p>
  </motion.div>
);

const PathCard = ({ icon, title, description, duration, buttonText, buttonColor, locked }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -8, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
    className={`bg-[#3a315e]/60 p-6 rounded-2xl flex flex-col text-center items-center ${locked ? 'opacity-60' : ''}`}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-2">{description}</p>
    <p className="text-gray-500 text-xs mb-6">{duration}</p>
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full py-3 rounded-lg font-bold text-sm ${buttonColor} ${locked ? 'cursor-not-allowed' : 'hover:opacity-90 transition-opacity'}`}>
      {locked ? 'Unlock Path' : buttonText}
    </motion.button>
  </motion.div>
);

const ResourceButton = ({ icon, title, subtitle }) => (
    <motion.button 
      whileHover={{ x: 5, backgroundColor: '#4a416e' }}
      className="w-full text-left flex items-center gap-4 p-4 bg-[#3a315e]/60 rounded-lg transition-colors">
        <div className="text-2xl text-purple-400">{icon}</div>
        <div>
            <p className="font-bold">{title}</p>
            <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
    </motion.button>
);

const learningData = [
    { name: 'Week 1', topics: 2, points: 100 },
    { name: 'Week 2', topics: 4, points: 250 },
    { name: 'Week 3', topics: 3, points: 400 },
    { name: 'Week 4', topics: 5, points: 550 },
    { name: 'Week 5', topics: 6, points: 700 },
    { name: 'This Week', topics: 8, points: 850 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};


const LearnPage = () => {
  const navigate = useNavigate();
  const learningProgressRef = useRef(null);
  const videoTutorialsRef = useRef(null);

  const handleScrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="min-h-screen text-white font-sans bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('https://w0.peakpx.com/wallpaper/757/388/HD-wallpaper-neon-pink-background-blue-dark-abstract-glowing-loveurhunny.jpg')` }}
    >
      <div className="min-h-screen bg-black/60 backdrop-blur-sm">
        {/* Header */}
        <header className="container mx-auto px-6 py-4 flex justify-between items-center sticky top-0 bg-black/20 backdrop-blur-md z-50">
          <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg">
                  <span className="font-bold text-xl text-white">Z</span>
              </div>
              <h1 className="text-xl font-bold">Zecathon Prompt Wars</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
              <button onClick={() => navigate('/home')} className="text-gray-300 hover:text-white transition">Dashboard</button>
              <button onClick={() => navigate('/learn')} className="text-white font-bold border-b-2 border-purple-500 pb-1">Learn</button>
              <button onClick={() => navigate('/battle-mode')} className="text-gray-300 hover:text-white transition">Battles</button>
              <button onClick={() => navigate('/events')} className="text-gray-300 hover:text-white transition">Community</button>
          </nav>
          <div className="flex items-center gap-4">
              <button onClick={() => navigate('/notifications')} className="p-2 rounded-full hover:bg-white/10 transition"><FiBell /></button>
              <button className="p-2 rounded-full hover:bg-white/10 transition"><FiUser /></button>
              <img src="https://i.pravatar.cc/40?u=a" alt="avatar" className="w-8 h-8 rounded-full border-2 border-purple-500" />
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          {/* Hero */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300 mb-4">
              Improve Your Ai Knowledge Through Strategic letearning
            </h2>
            <p className="max-w-3xl mx-auto text-gray-300 mb-8">
              Enhance your  skills with our comprehensive tutorials, interactive quizzes, and battle strategies. From beginner basics to advanced techniques.
            </p>
            <div className="flex justify-center items-center gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleScrollTo(learningProgressRef)} className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition">Start Learning</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleScrollTo(videoTutorialsRef)} className="flex items-center gap-2 border border-gray-600 text-white py-3 px-8 rounded-lg hover:bg-white/10 transition">
                <FiPlay /> Watch Demo
              </motion.button>
            </div>
          </motion.section>

          {/* Learning Progress */}
          <motion.section 
              ref={learningProgressRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
              className="bg-[#3a315e]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-20"
          >
              <h3 className="text-3xl font-bold mb-8 text-center">Your Learning Progress</h3>
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                  <StatCard value="12" label="Completed" icon={<FiAward className="mx-auto text-green-400 text-3xl"/>} />
                  <StatCard value="8" label="In Progress" icon={<FiTrendingUp className="mx-auto text-blue-400 text-3xl"/>} />
                  <StatCard value="850" label="Points Earned" icon={<FiStar className="mx-auto text-yellow-400 text-3xl"/>} />
                  <StatCard value="5" label="Badges" icon={<FaTrophy className="mx-auto text-orange-400 text-3xl"/>} />
              </motion.div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={learningData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none', color: '#fff' }} />
                        <Legend />
                        <Line type="monotone" dataKey="topics" name="Topics Mastered" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="points" name="Total Points" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
              </div>
          </motion.section>

          {/* Recommended Learning Paths */}
          <motion.section 
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <h3 className="text-3xl font-bold mb-8 text-center">Recommended Learning Paths</h3>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <PathCard icon={<FaGraduationCap className="text-green-400"/>} title="Beginner Path" description="Basics & core trading concepts" duration="2-3 hrs • 8 tutorials" buttonText="Start Path" buttonColor="bg-green-500 text-white" />
              <PathCard icon={<FiTrendingUp className="text-blue-400"/>} title="Intermediate Path" description="Technical analysis + battle strategies" duration="4-5 hrs • 12 tutorials" buttonText="Continue Path" buttonColor="bg-blue-500 text-white" />
              <PathCard icon={<FaTrophy className="text-yellow-400"/>} title="Advanced Path" description="Master complex strategies" duration="6-8 hrs • 15 tutorials" buttonText="Unlock Path" buttonColor="bg-gray-700 text-gray-400" locked />
            </motion.div>
          </motion.section>

          {/* Additional Content */}
          <motion.section 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
              <div className="md:col-span-1 space-y-4">
                  <h3 className="text-xl font-bold mb-2">Additional Resources</h3>
                  <ResourceButton icon={<FiBook />} title="eBooks" subtitle="Comprehensive guides" />
                  <ResourceButton icon={<FiVideo />} title="Live Webinars" subtitle="Expert sessions" />
                  <ResourceButton icon={<FiMessageSquare />} title="Discussion Forum" subtitle="Connect with learners" />
                  <ResourceButton icon={<FiHelpCircle />} title="FAQs" subtitle="Quick answers" />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                      <h3 className="text-xl font-bold mb-6">Interactive Quizzes</h3>
                      <div className="space-y-4">
                          <div className="bg-[#3a315e]/60 p-4 rounded-lg">
                              <p className="font-bold">Game Mechanics Quiz</p>
                              <div className="flex justify-between items-center text-sm my-2">
                                  <span className="text-green-400">8/10 correct</span>
                              </div>
                              <div className="w-full bg-black/30 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: '80%'}}></div></div>
                          </div>
                          <div className="bg-[#3a315e]/60 p-4 rounded-lg">
                              <p className="font-bold">Analysis Types Quiz</p>
                              <p className="text-sm text-gray-400 my-2">Not started</p>
                              <button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded-lg font-bold text-sm">Take Quiz</button>
                          </div>
                      </div>
                  </div>
                  <div ref={videoTutorialsRef}>
                      <h3 className="text-xl font-bold mb-6">Video Tutorials</h3>
                      <div className="space-y-4">
                          <div className="bg-[#3a315e]/60 rounded-lg overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop" alt="Technical Analysis" className="w-full h-32 object-cover"/>
                              <div className="p-4">
                                  <p className="font-bold">Technical vs Fundamental</p>
                                  <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                                      <span>18 min</span>
                                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">Intermediate</span>
                                  </div>
                              </div>
                          </div>
                          <div className="bg-[#3a315e]/60 rounded-lg overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop" alt="Winning Strategies" className="w-full h-32 object-cover"/>
                              <div className="p-4">
                                  <p className="font-bold">Winning Strategies</p>
                                  <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                                      <span>25 min</span>
                                      <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full">Advanced</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="lg:col-span-2">
                      <h3 className="text-xl font-bold mb-6">Community Contributions</h3>
                      <div className="space-y-4">
                          <div className="bg-[#3a315e]/60 p-4 rounded-lg">
                              <p className="font-bold">Advanced Prompt Crafting</p>
                              <p className="text-sm text-gray-400">by @trader_pro • 2 days ago</p>
                              <div className="flex items-center gap-2 text-sm text-yellow-400 mt-2"><FiStar className="fill-current"/> 4.8 <span className="text-gray-500">156 views</span></div>
                          </div>
                          <div className="bg-[#3a315e]/60 p-4 rounded-lg">
                              <p className="font-bold">Risk Management Tips</p>
                              <p className="text-sm text-gray-400">by @finwiz • 5 days ago</p>
                              <div className="flex items-center gap-2 text-sm text-yellow-400 mt-2"><FiStar className="fill-current"/> 4.6 <span className="text-gray-500">89 views</span></div>
                          </div>
                          <button className="w-full border-2 border-purple-600 text-purple-300 font-bold py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors">Submit Tutorial</button>
                      </div>
                  </div>
              </div>
          </motion.section>
        </main>

        <footer className="border-t border-white/10 mt-16">
          <div className="container mx-auto px-6 py-6 text-center text-gray-400 text-sm flex justify-between items-center">
              <div>
                  <a href="#" className="hover:text-white">Privacy Policy</a>
                  <span className="mx-2">·</span>
                  <a href="#" className="hover:text-white">Terms of Service</a>
                  <span className="mx-2">·</span>
                  <a href="#" className="hover:text-white">Support</a>
              </div>
              <p>&copy; {new Date().getFullYear()} FinBattle Learn. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LearnPage;
