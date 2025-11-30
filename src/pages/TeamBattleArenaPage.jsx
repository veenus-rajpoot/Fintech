import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiClock, FiAward, FiShield, FiMessageSquare, FiX, FiSend, FiBarChart2, FiGrid } from 'react-icons/fi';

const CharacterCard = ({ name, image, hp, maxHp, color, isTakingDamage }) => {
  const hpPercentage = (hp / maxHp) * 100;
  const cardColor = `border-${color}/50`;
  const textColor = `text-glow-${color}`;

  return (
    <motion.div
      className={`bg-black/30 p-4 rounded-2xl border ${cardColor} transition-all duration-300 ${isTakingDamage ? 'scale-105 shadow-2xl shadow-red-500/50' : 'scale-100'}`}
      layout
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
        <AnimatePresence>
          {isTakingDamage && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FiZap className="text-red-500 text-6xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h3 className={`font-bold font-orbitron text-center text-lg mb-2 ${textColor}`}>{name}</h3>
      <div>
        <div className="w-full bg-gray-800/50 rounded-full h-2.5 border border-gray-700">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r from-red-500 to-red-700`}
            animate={{ width: `${hpPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <p className="text-center text-xs mt-1 text-gray-400">{hp} / {maxHp} HP</p>
      </div>
    </motion.div>
  );
};

const TeamStatBar = ({ name, color, score, characters }) => {
  const totalHp = useMemo(() => characters.reduce((acc, char) => acc + char.hp, 0), [characters]);
  const maxHp = useMemo(() => characters.reduce((acc, char) => acc + char.maxHp, 0), [characters]);
  const hpPercentage = maxHp > 0 ? (totalHp / maxHp) * 100 : 0;
  const teamColor = `text-glow-${color}`;

  return (
    <div className="flex-1">
      <h2 className={`text-xl md:text-2xl font-bold font-orbitron ${teamColor} mb-2 text-center`}>{name}</h2>
      <div className="w-full bg-gray-800/50 rounded-full h-4 border border-gray-600 relative overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r from-red-400 to-red-600`}
          animate={{ width: `${hpPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1 px-1">
        <span className="font-bold">HP: {totalHp} / {maxHp}</span>
        <span className="font-bold">Score: {score}</span>
      </div>
    </div>
  );
};

const CommunicationModal = ({ isOpen, onClose, messages, onSendMessage }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-[#10142c] border border-gray-700 rounded-2xl w-full max-w-md shadow-lg flex flex-col"
                >
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="text-lg font-bold font-orbitron text-glow-cyan">Team Comms</h3>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700"><FiX /></button>
                    </div>
                    <div className="p-6 h-64 overflow-y-auto space-y-4 text-sm">
                        {messages.map((msg, index) => (
                            <p key={index}>
                                <strong className={msg.sender === 'You' ? 'text-violet-400' : 'text-cyan-400'}>
                                    {msg.sender}:
                                </strong> {msg.text}
                            </p>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                        />
                        <button type="submit" className="bg-brand-cyan text-white rounded-lg px-4 py-2 hover:bg-cyan-500 transition-colors flex items-center justify-center">
                            <FiSend />
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const TeamBattleArenaPage = () => {
  const navigate = useNavigate();
  const initialTeams = useMemo(() => ({
    cyberWarriors: {
      name: 'CYBER WARRIORS',
      color: 'cyan',
      characters: [
        { id: 1, name: 'CommanderX', image: 'https://images.stockcake.com/public/7/f/7/7f7bb4ed-c47b-410e-abab-7543a92ef92c_large/neon-robot-awakens-stockcake.jpg', hp: 1000, maxHp: 1000, isTakingDamage: false },
        { id: 2, name: 'TechNinja', image: 'https://media.craiyon.com/2025-05-07/9nM55iW5TseJOsk_IFNFfg.webp', hp: 1000, maxHp: 1000, isTakingDamage: false },
      ]
    },
    quantumHunters: {
      name: 'QUANTUM HUNTERS',
      color: 'violet',
      characters: [
        { id: 3, name: 'QuantumQueen', image: 'https://images.stockcake.com/public/c/2/1/c21d5b4d-ee51-4924-9952-c557df3ba38e_large/neon-robot-rising-stockcake.jpg', hp: 1000, maxHp: 1000, isTakingDamage: false },
        { id: 4, name: 'CyberSam', image: 'https://media.craiyon.com/2025-04-24/iCyzNaW_QwKtyARi_inYKA.webp', hp: 1000, maxHp: 1000, isTakingDamage: false },
      ]
    }
  }), []);

  const [teams, setTeams] = useState(initialTeams);
  const [scores, setScores] = useState({ cyberWarriors: 0, quantumHunters: 0 });
  const [timeLeft, setTimeLeft] = useState(180);
  const [commentary, setCommentary] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'CommanderX', text: 'Alright team, let\'s sync up. Focus fire on their highest threat.' },
    { sender: 'TechNinja', text: 'Copy that. I\'ll try to disable their shields first.' }
  ]);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [endGameStatus, setEndGameStatus] = useState(null);
  const [isCommModalOpen, setIsCommModalOpen] = useState(false);
  const battleIntervalRef = useRef(null);
  const timerRef = useRef(null);

  const endBattle = (status, winner = null) => {
    if (isBattleOver) return;
    setIsBattleOver(true);
    setEndGameStatus(status);
    clearInterval(battleIntervalRef.current);
    clearInterval(timerRef.current);

    setTimeout(() => {
      if (status === 'victory') {
        navigate('/team-victory', { state: { winner, scores, teams } });
      } else {
        navigate('/team-command-center', { state: { teams } });
      }
    }, 3000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endBattle('defeat');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    battleIntervalRef.current = setInterval(() => {
      setTeams(prevTeams => {
        if (isBattleOver) return prevTeams;
        let newTeams = JSON.parse(JSON.stringify(prevTeams));
        
        const attackingTeamKey = Math.random() > 0.5 ? 'cyberWarriors' : 'quantumHunters';
        const defendingTeamKey = attackingTeamKey === 'cyberWarriors' ? 'quantumHunters' : 'cyberWarriors';

        const attackers = newTeams[attackingTeamKey].characters.filter(c => c.hp > 0);
        const defenders = newTeams[defendingTeamKey].characters.filter(c => c.hp > 0);

        if (attackers.length === 0 || defenders.length === 0) return prevTeams;

        const attacker = attackers[Math.floor(Math.random() * attackers.length)];
        const target = defenders[Math.floor(Math.random() * defenders.length)];
        
        const damage = Math.floor(Math.random() * 150) + 50;

        target.hp = Math.max(0, target.hp - damage);
        target.isTakingDamage = true;

        setScores(prevScores => ({
          ...prevScores,
          [attackingTeamKey]: prevScores[attackingTeamKey] + damage
        }));

        const newComment = {
          icon: <FiZap className="text-yellow-400" />,
          text: `${attacker.name} hits ${target.name} for ${damage} DMG!`,
          id: Date.now() + Math.random()
        };
        setCommentary(prev => [newComment, ...prev.slice(0, 4)]);

        setTimeout(() => {
          setTeams(currentTeams => {
            const resetTeams = JSON.parse(JSON.stringify(currentTeams));
            const charToReset = [...resetTeams.cyberWarriors.characters, ...resetTeams.quantumHunters.characters].find(c => c.id === target.id);
            if (charToReset) charToReset.isTakingDamage = false;
            return resetTeams;
          });
        }, 500);

        const quantumHuntersDefeated = newTeams.quantumHunters.characters.every(c => c.hp <= 0);
        const cyberWarriorsDefeated = newTeams.cyberWarriors.characters.every(c => c.hp <= 0);

        if (quantumHuntersDefeated) {
          endBattle('victory', newTeams.cyberWarriors);
        } else if (cyberWarriorsDefeated) {
          endBattle('victory', newTeams.quantumHunters);
        }

        return newTeams;
      });
    }, 2000);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(battleIntervalRef.current);
    };
  }, [isBattleOver]);

  const handleSendMessage = (text) => {
    const newMessage = { sender: 'You', text };
    setChatMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
        const replier = teams.cyberWarriors.characters.find(c => c.name !== 'You');
        const reply = { sender: replier.name, text: 'Roger that.' };
        setChatMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
    <CommunicationModal 
        isOpen={isCommModalOpen} 
        onClose={() => setIsCommModalOpen(false)}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-dark text-white font-sans p-4 sm:p-8 flex flex-col"
      style={{ background: 'radial-gradient(circle at top, #1a2035 0%, #0f172a 70%)' }}
    >
      <motion.div className="flex justify-between items-center mb-8 bg-black/20 p-4 rounded-xl border border-white/10 gap-4 md:gap-8">
        <TeamStatBar name={teams.cyberWarriors.name} color="cyan" score={scores.cyberWarriors} characters={teams.cyberWarriors.characters} />
        <div className="flex flex-col items-center">
          <FiClock className="text-3xl text-red-500 animate-pulse" />
          <div className="text-4xl font-bold font-mono text-red-400">{formatTime(timeLeft)}</div>
        </div>
        <TeamStatBar name={teams.quantumHunters.name} color="violet" score={scores.quantumHunters} characters={teams.quantumHunters.characters} />
      </motion.div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-2 space-y-8">
          {teams.cyberWarriors.characters.map(char => <CharacterCard key={char.id} {...char} color="cyan" />)}
        </div>

        <div className="md:col-span-1 flex flex-col items-center justify-start gap-4">
          <motion.button
            onClick={() => navigate('/team-command-center', { state: { teams } })}
            disabled={isBattleOver}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full btn-glow-blue text-md hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isBattleOver ? 1 : 1.05 }}
            whileTap={{ scale: isBattleOver ? 1 : 0.95 }}
          >
            <FiGrid /> Command Center
          </motion.button>
          <motion.button
            onClick={() => setIsCommModalOpen(true)}
            disabled={isBattleOver}
            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full btn-glow-green text-md hover:bg-green-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isBattleOver ? 1 : 1.05 }}
            whileTap={{ scale: isBattleOver ? 1 : 0.95 }}
          >
            <FiMessageSquare /> Chat
          </motion.button>
          
          <div className="w-full bg-black/20 p-4 rounded-xl border border-white/10 mt-4">
            <h3 className="font-bold font-orbitron text-center mb-3 text-glow-yellow flex items-center justify-center gap-2"><FiBarChart2 /> BATTLE LOG</h3>
            <div className="space-y-2 h-48 overflow-y-auto text-sm pr-2">
              <AnimatePresence initial={false}>
                {commentary.map(c => (
                  <motion.div 
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <span className="mt-0.5">{c.icon}</span>
                    <span>{c.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          {teams.quantumHunters.characters.map(char => <CharacterCard key={char.id} {...char} color="violet" />)}
        </div>
      </div>
      
      <AnimatePresence>
        {isBattleOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50"
          >
            <FiAward className="text-yellow-400 text-8xl mb-4 animate-bounce" />
            <h2 className="text-5xl font-orbitron text-glow-yellow">BATTLE OVER</h2>
            <p className="mt-4 text-lg">
                {endGameStatus === 'victory' ? 'Calculating results...' : 'Returning to Command Center...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
};

export default TeamBattleArenaPage;
