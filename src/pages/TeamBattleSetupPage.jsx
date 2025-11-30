import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiLayers, FiSliders, FiZap, FiArrowRight, FiChevronDown, FiSearch, FiUploadCloud, FiSettings, FiCheck, FiClock, FiShield, FiStar, FiSave, FiX, FiMail, FiUserPlus, FiCheckCircle, FiRefreshCw, FiUsers } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';

const models = [
  { id: 'gpt4', name: 'GPT-4 Turbo', tag: 'Pro', image: 'https://i.imgur.com/j2qL3vR.png', strengths: ['Advanced reasoning', 'Creative writing', 'Fast response'], recommendedFor: 'Strategy, Creativity' },
  { id: 'claude3', name: 'Claude 3 Opus', tag: 'Standard', image: 'https://i.imgur.com/sN2H5Y1.png', strengths: ['High-level comprehension', 'Vision capabilities', 'Nuanced understanding'], recommendedFor: 'Analysis, Technical' },
];

const layers = [
  { name: 'Crystal Wastes', description: 'Survive the harsh alien terrain', players: '2-4', difficulty: 'Extreme', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ70-kKqgCo_7ha2fZHd7RnVoF_x6TH6hjpDQ&s' },
  { name: 'Orbital Station', description: 'Close quarters combat in zero-g', players: '2-8', difficulty: 'Medium', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToegB7SVxxg2OaQBLcVV7Ilz6GnZbjFOXVAQ&s' },
  { name: 'Neon City', description: 'Urban warfare in a cyberpunk metropolis', players: '4-16', difficulty: 'Hard', image: 'https://img.freepik.com/free-vector/background-with-night-city-neon-lights_1441-2597.jpg?semt=ais_items_boosted&w=740' },
];

const friends = [
    { id: 1, name: 'Raptor', avatar: 'https://i.pravatar.cc/48?u=friend1', online: true },
    { id: 2, name: 'Hexa', avatar: 'https://i.pravatar.cc/48?u=friend2', online: true },
    { id: 3, name: 'Cygnus', avatar: 'https://i.pravatar.cc/48?u=friend3', online: false },
    { id: 4, name: 'Orion', avatar: 'https://i.pravatar.cc/48?u=friend4', online: true },
    { id: 5, name: 'Nova', avatar: 'https://i.pravatar.cc/48?u=friend5', online: false },
    { id: 6, name: 'Pulsar', avatar: 'https://i.pravatar.cc/48?u=friend6', online: true },
];

const opponents = [
    { id: 1, name: 'Vortex', avatar: 'https://i.pravatar.cc/48?u=opponent1' },
    { id: 2, name: 'Blaze', avatar: 'https://i.pravatar.cc/48?u=opponent2' },
    { id: 3, name: 'Shadow', avatar: 'https://i.pravatar.cc/48?u=opponent3' },
    { id: 4, name: 'Ghost', avatar: 'https://i.pravatar.cc/48?u=opponent4' },
    { id: 5, name: 'Reaper', avatar: 'https://i.pravatar.cc/48?u=opponent5' },
    { id: 6, name: 'Fury', avatar: 'https://i.pravatar.cc/48?u=opponent6' },
];

const scenarioTypes = {
  'Strategy': 'bg-green-500 text-white',
  'Creative': 'bg-brand-violet text-white',
  'Technical': 'bg-yellow-500 text-white',
  'Analysis': 'bg-brand-pink text-white'
};

const Section = ({ title, children, className = '', bgImage = null }) => (
  <motion.div
    variants={itemVariants}
    className={`relative bg-[#10142c]/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm overflow-hidden ${className}`}
  >
    {bgImage && (
      <>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 z-0 bg-black/80"></div>
      </>
    )}
    <div className="relative z-10">
      <h2 className="text-xl font-bold font-orbitron text-gray-300 mb-6 tracking-wider uppercase">{title}</h2>
      {children}
    </div>
  </motion.div>
);

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

const InviteFriendsModal = ({ isOpen, onClose, friends, selectedFriends, onToggleFriend, onSendInvites, inviteStatus }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-[#10142c] border border-gray-700 rounded-2xl w-full max-w-md shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-2xl font-bold font-orbitron text-glow-cyan">Invite Friends</h3>
          </div>
          <div className="p-6 max-h-[50vh] overflow-y-auto space-y-3">
            {friends.map(friend => (
              <div
                key={friend.id}
                onClick={() => friend.online && onToggleFriend(friend.id)}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${friend.online ? 'cursor-pointer bg-gray-800/50 hover:bg-gray-700/70' : 'opacity-50 bg-gray-800/30'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full" />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#10142c] ${friend.online ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{friend.name}</p>
                    <p className="text-sm text-gray-400">{friend.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                {friend.online && (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedFriends.includes(friend.id) ? 'bg-brand-cyan border-brand-cyan' : 'border-gray-600'}`}>
                    {selectedFriends.includes(friend.id) && <FiCheck className="text-brand-dark" />}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-gray-800">
            <motion.button
              key={inviteStatus}
              onClick={onSendInvites}
              disabled={inviteStatus !== 'idle' || selectedFriends.length === 0}
              className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-lg
                ${inviteStatus === 'idle' && selectedFriends.length > 0 && 'bg-brand-violet hover:bg-brand-violet/80'}
                ${(inviteStatus !== 'idle' || selectedFriends.length === 0) && 'bg-gray-600 cursor-not-allowed opacity-70'}
                ${inviteStatus === 'sending' && 'bg-yellow-500'}
                ${inviteStatus === 'sent' && 'bg-green-500'}`}
            >
              {inviteStatus === 'idle' && <><FiUserPlus /> Send Invites ({selectedFriends.length})</>}
              {inviteStatus === 'sending' && <>Sending...</>}
              {inviteStatus === 'sent' && <><FiCheckCircle /> Invites Sent!</>}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const OpponentSearchAnimation = ({ opponents }) => {
    const duplicatedOpponents = [...opponents, ...opponents, ...opponents];
    return (
        <div className="w-full text-center">
            <p className="text-yellow-400 mb-4 animate-pulse">Searching for opponent...</p>
            <div className="relative h-20 w-full overflow-hidden bg-gray-900/30 rounded-lg">
                <motion.div
                    className="absolute top-0 left-0 flex items-center h-full"
                    animate={{ x: ['0%', '-66.66%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 15,
                        repeat: Infinity,
                    }}
                >
                    {duplicatedOpponents.map((op, index) => (
                        <div key={index} className="flex-shrink-0 w-32 flex flex-col items-center justify-center p-2">
                            <img src={op.avatar} alt={op.name} className="w-12 h-12 rounded-lg mb-1" />
                            <p className="text-xs text-gray-400 truncate">{op.name}</p>
                        </div>
                    ))}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#10142c] via-transparent to-[#10142c]"></div>
            </div>
        </div>
    );
};


const TeamBattleSetupPage = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedLayer, setSelectedLayer] = useState(layers[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [matchedOpponent, setMatchedOpponent] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [inviteStatus, setInviteStatus] = useState('idle');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium');
  const [battleFocus, setBattleFocus] = useState('Creative');
  const [scenarioType, setScenarioType] = useState(null);

  const difficultyBonus = { Easy: 100, Medium: 200, Hard: 300 }[difficulty];

  useEffect(() => {
    setIsSearching(true);
  }, []);

  useEffect(() => {
    if (isSearching) {
      const searchTimeout = setTimeout(() => {
        const availableOpponents = opponents.filter(op => op.id !== matchedOpponent?.id);
        const randomOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
        setMatchedOpponent(randomOpponent);
        setIsSearching(false);
      }, 4000);
      return () => clearTimeout(searchTimeout);
    }
  }, [isSearching]);

  const handleToggleFriend = (friendId) => {
    setSelectedFriends(prev => prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]);
  };

  const handleSendInvites = () => {
    if (selectedFriends.length === 0) return;
    setInviteStatus('sending');
    setTimeout(() => {
      setInviteStatus('sent');
      setTimeout(() => {
        setInviteStatus('idle');
        setIsInviteModalOpen(false);
        setSelectedFriends([]);
      }, 1500);
    }, 2000);
  };

  const handleRetryMatch = () => {
    setMatchedOpponent(null);
    setIsSearching(true);
  };

  return (
    <>
      <InviteFriendsModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        friends={friends}
        selectedFriends={selectedFriends}
        onToggleFriend={handleToggleFriend}
        onSendInvites={handleSendInvites}
        inviteStatus={inviteStatus}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-brand-dark text-white font-sans p-4 sm:p-6 lg:p-8"
        style={{ background: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url('https://thumbs.dreamstime.com/z/futuristic-green-robots-lined-up-high-tech-facility-showcasing-advanced-technology-futuristic-green-robots-lined-up-high-385743763.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="max-w-screen-xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-glow-purple mb-2">TEAM BATTLE SETUP</h1>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="relative bg-[#10142c]/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-center text-center overflow-hidden min-h-[350px]" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW22t7KCqhDwDBqPBM1kbK1auwDNUiTcRbJaM-9m048aj8CFxhm2zZq4LY7KhErVd51rw&usqp=CAU')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-black/60 z-0"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <img src="https://miro.medium.com/v2/resize:fit:1024/0*a_WFeQvfdVnjfigN.jpg" alt="Team Battle Icon" className="w-48 h-48 object-contain mb-4"/>
                <h3 className="text-2xl font-bold font-orbitron text-glow-purple">Team Battle</h3>
                <p className="text-gray-400 mt-2 max-w-xs">Collaborate with AI allies to dominate the prompt arena.</p>
              </div>
            </div>
            
            <div className="relative bg-[#10142c]/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-around overflow-hidden min-h-[350px]" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtWm_Mq3KuvuXNZH077MmcBzIXTnbpRv6ObKf0YF5mInWOltEh4cFi9yFH-3g5FUPiLe8&usqp=CAU')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-black/70 z-0"></div>
              <div className="relative z-10 space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-300 mb-4">Invite Friends</h3>
                    <button onClick={() => setIsInviteModalOpen(true)} className="w-full bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 text-lg">
                        <FiUsers /> Open Friend List
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-300 mb-4">Live Matching</h3>
                    <div className="bg-gray-900/50 p-3 rounded-lg min-h-[124px] flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {isSearching ? (
                          <motion.div key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                            <OpponentSearchAnimation opponents={opponents} />
                          </motion.div>
                        ) : matchedOpponent ? (
                          <motion.div key="matched" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src={matchedOpponent.avatar} alt={matchedOpponent.name} className="w-12 h-12 rounded-lg border-2 border-brand-green"/>
                              <div>
                                  <p className="text-sm text-gray-400">Opponent Found</p>
                                  <p className="font-bold text-white text-lg">{matchedOpponent.name}</p>
                              </div>
                            </div>
                            <button onClick={handleRetryMatch} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors">
                              <FiRefreshCw />
                            </button>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Section title="AI Model Selection">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-full max-w-xs">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder="Search AI models..." className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-brand-cyan focus:outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setBattleFocus('Speed')} className={`px-4 py-2 text-sm rounded-lg font-semibold transition-colors ${battleFocus === 'Speed' ? 'bg-brand-cyan text-brand-dark' : 'bg-gray-700 hover:bg-gray-600'}`}>Speed</button>
                    <button onClick={() => setBattleFocus('Creative')} className={`px-4 py-2 text-sm rounded-lg font-semibold transition-colors ${battleFocus === 'Creative' ? 'bg-brand-pink text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>Creative</button>
                    <button className="px-4 py-2 text-sm rounded-lg bg-brand-violet text-white hover:bg-brand-violet/80 transition-colors">Compare</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {models.map(model => (
                    <div key={model.id} onClick={() => setSelectedModel(model)} className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${selectedModel.id === model.id ? 'border-brand-cyan bg-brand-cyan/10' : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'}`}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <img src={model.image} alt={model.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg">{model.name}</h3>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${model.tag === 'Pro' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{model.tag}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 mt-2">
                            <div>
                              <h4 className="text-sm text-gray-400 font-semibold">Strengths</h4>
                              <ul className="mt-1 space-y-1">
                                {model.strengths.map(s => <li key={s} className="flex items-center gap-2 text-xs text-gray-300"><FiCheck className="text-green-400" /> {s}</li>)}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm text-gray-400 font-semibold">Recommended for</h4>
                              <p className="text-xs text-gray-300 mt-1">{model.recommendedFor}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <Section title="Battle Parameters" className="md:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Difficulty Level</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => setDifficulty('Easy')} className={`p-2 text-sm rounded-md border font-semibold transition-colors ${difficulty === 'Easy' ? 'bg-green-500 text-white border-green-500' : 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30'}`}>Easy</button>
                        <button onClick={() => setDifficulty('Medium')} className={`p-2 text-sm rounded-md border font-semibold transition-colors ${difficulty === 'Medium' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30'}`}>Medium</button>
                        <button onClick={() => setDifficulty('Hard')} className={`p-2 text-sm rounded-md border font-semibold transition-colors ${difficulty === 'Hard' ? 'bg-red-500 text-white border-red-500' : 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30'}`}>Hard</button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Time Limit</h4>
                      <div className="bg-gray-900/50 p-3 rounded-lg flex items-center gap-2">
                        <FiClock className="text-brand-pink" />
                        <span>10 minutes</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Scenario Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(scenarioTypes).map(type => (
                          <button 
                            key={type} 
                            onClick={() => setScenarioType(type)}
                            className={`p-2 text-sm rounded-md font-semibold transition-colors ${
                              scenarioType === type 
                              ? scenarioTypes[type]
                              : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Section>
                <Section 
                  title="Select Your Layer" 
                  className="md:col-span-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    {layers.map(layer => (
                      <div key={layer.name} onClick={() => setSelectedLayer(layer)} className={`relative rounded-lg overflow-hidden group cursor-pointer border-2 ${selectedLayer.name === layer.name ? 'border-brand-cyan' : 'border-transparent'}`}>
                        <img src={layer.image} alt={layer.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-3">
                          <h3 className="font-bold text-md">{layer.name}</h3>
                          <p className="text-xs text-gray-300">{layer.description}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-red-500/50 px-1.5 py-0.5 rounded">{layer.difficulty}</span>
                            <span className="text-xs bg-blue-500/50 px-1.5 py-0.5 rounded">{layer.players}</span>
                          </div>
                        </div>
                        {selectedLayer.name === layer.name && <div className="absolute top-2 right-2 bg-brand-cyan text-brand-dark rounded-full p-1"><FiCheck/></div>}
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                <Section title="Battle Preview">
                    <div className="space-y-4 text-sm">
                        <h4 className="text-md font-semibold text-gray-300">Configuration</h4>
                        <div className="space-y-2 text-gray-400 border-b border-gray-800 pb-4">
                            <div className="flex justify-between"><span>Mode:</span> <span className="text-white font-semibold">{selectedFriends.length > 0 ? 'Team Battle' : 'Solo Battle'}</span></div>
                            <div className="flex justify-between"><span>AI Model:</span> <span className="text-white font-semibold">{selectedModel.name}</span></div>
                            <div className="flex justify-between"><span>Layer:</span> <span className="text-white font-semibold">{selectedLayer.name}</span></div>
                            <div className="flex justify-between"><span>Difficulty:</span> <span className="text-white font-semibold">{difficulty}</span></div>
                            <div className="flex justify-between"><span>Focus:</span> <span className="text-white font-semibold">{battleFocus}</span></div>
                            <div className="flex justify-between"><span>Scenario:</span> <span className="text-white font-semibold">{scenarioType || 'N/A'}</span></div>
                        </div>
                        <h4 className="text-md font-semibold text-gray-300">Estimated Scoring</h4>
                        <div className="space-y-2 text-gray-400 border-b border-gray-800 pb-4">
                            <div className="flex justify-between"><span>Base Points:</span> <span className="text-green-400 font-semibold">500</span></div>
                            <div className="flex justify-between"><span>Speed Bonus:</span> <span className="text-green-400 font-semibold">{battleFocus === 'Speed' ? 150 : 50}</span></div>
                            <div className="flex justify-between"><span>Difficulty Bonus:</span> <span className="text-green-400 font-semibold">{difficultyBonus}</span></div>
                        </div>
                        <h4 className="text-md font-semibold text-gray-300">Saved Presets</h4>
                        <div className="space-y-2">
                            <button className="w-full flex justify-between items-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700"><span>Quick Duel</span> <FiArrowRight/></button>
                            <button className="w-full flex justify-between items-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700"><span>Logic Master</span> <FiArrowRight/></button>
                        </div>
                    </div>
                </Section>
                <Section title="Quick Actions">
                    <div className="flex flex-col gap-3">
                        <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/20 transition-colors"><FiStar/> Save Current Setup</button>
                        <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"><FiUploadCloud/> Share</button>
                        <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"><FiSliders/> Sandbox Mode</button>
                    </div>
                </Section>
              </div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-4">
              <button onClick={() => navigate('/team-battle-arena')} className="flex items-center gap-2 bg-brand-green text-white font-bold py-3 px-8 rounded-full btn-glow-green text-lg">
                  <FiZap /> Start Battle
              </button>
              <button className="flex items-center gap-2 bg-brand-violet text-white font-bold py-3 px-8 rounded-full hover:bg-brand-violet/80 transition-colors text-lg">
                  <FiSave /> Save Preset
              </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default TeamBattleSetupPage;
