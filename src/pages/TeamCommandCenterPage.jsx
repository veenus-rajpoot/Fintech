import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiMessageSquare, FiChevronsLeft, FiSend, FiRepeat } from 'react-icons/fi';

const PlayerStatus = ({ player }) => {
  const isDefeated = player.hp <= 0;
  const statusText = isDefeated ? 'DEFEATED' : 'OPERATIONAL';
  const statusColor = isDefeated ? 'text-red-500' : 'text-green-500';
  const statusIcon = isDefeated ? <FiXCircle /> : <FiCheckCircle />;

  return (
    <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <img src={`https://i.pravatar.cc/40?u=${player.name}`} alt={player.name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-bold">{player.name}</h3>
          <p className={`text-xs flex items-center gap-1 ${statusColor}`}>
            {statusIcon}
            <span>{statusText}</span>
          </p>
        </div>
      </div>
      <span className="font-bold text-lg text-white">{Math.round((player.hp / player.maxHp) * 100)}% HP</span>
    </div>
  );
};

const TeamColumn = ({ team, color, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={`bg-black/20 p-6 rounded-2xl border border-${color}-500/50 flex flex-col h-full`}>
      <h2 className={`text-2xl font-bold font-orbitron mb-6 text-glow-${color}`}>{team.name}</h2>
      <div className="space-y-4 mb-6">
        {team.characters.map(player => (
          <PlayerStatus key={player.id} player={player} />
        ))}
      </div>
      <div className="flex-grow flex flex-col mt-auto">
        <h3 className="font-bold font-orbitron mb-2 flex items-center gap-2"><FiMessageSquare /> TEAM CHAT</h3>
        <div className="bg-gray-800/50 p-4 rounded-lg flex-grow text-sm space-y-2 min-h-[150px] max-h-[200px] overflow-y-auto">
          {messages.map((msg, index) => (
            <p key={index}><span className={`font-bold text-${color}`}>{msg.sender}:</span> {msg.text}</p>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-gray-900/80 border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-pink"
          />
          <button type="submit" className="bg-brand-pink text-white rounded-full p-3 hover:bg-pink-500 transition-colors">
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

const TeamCommandCenterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teams } = location.state || {
    teams: {
      cyberWarriors: { name: 'CYBER WARRIORS', characters: [{id: 1, name: 'CommanderX', hp: 800, maxHp: 1000}, {id: 2, name: 'TechNinja', hp: 1000, maxHp: 1000}] },
      quantumHunters: { name: 'QUANTUM HUNTERS', characters: [{id: 3, name: 'QuantumQueen', hp: 0, maxHp: 1000}, {id: 4, name: 'CyberSam', hp: 500, maxHp: 1000}] }
    }
  };

  const [cyberMessages, setCyberMessages] = useState([
    { sender: 'CommanderX', text: 'Tough loss. Let\'s regroup.' },
    { sender: 'TechNinja', text: 'Agreed. We need a new strategy.' }
  ]);

  const [quantumMessages, setQuantumMessages] = useState([
    { sender: 'QuantumQueen', text: 'We were outplayed. What\'s the plan?' },
    { sender: 'CyberSam', text: 'Analyzing their patterns. We go again.' }
  ]);

  const handleSendCyberMessage = (text) => {
    setCyberMessages(prev => [...prev, { sender: 'You', text }]);
    setTimeout(() => {
      const replier = teams.cyberWarriors.characters.find(c => c.name !== 'You');
      setCyberMessages(prev => [...prev, { sender: replier.name, text: 'Roger that.' }]);
    }, 1500);
  };

  const handleSendQuantumMessage = (text) => {
    setQuantumMessages(prev => [...prev, { sender: 'You', text }]);
    setTimeout(() => {
      const replier = teams.quantumHunters.characters.find(c => c.name !== 'You' && c.hp > 0) || teams.quantumHunters.characters[1];
      setQuantumMessages(prev => [...prev, { sender: replier.name, text: 'Understood.' }]);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-dark text-white font-sans p-4 sm:p-8"
      style={{ background: 'radial-gradient(circle at top, #1a2035 0%, #0f172a 70%)' }}
    >
      <div className="container mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-glow-pink">Team Command Center</h1>
          <p className="text-gray-400 mt-2">The battle is over. Regroup and plan your next move.</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="grid md:grid-cols-2 gap-8">
          <TeamColumn team={teams.cyberWarriors} color="cyan" messages={cyberMessages} onSendMessage={handleSendCyberMessage} />
          <TeamColumn team={teams.quantumHunters} color="violet" messages={quantumMessages} onSendMessage={handleSendQuantumMessage} />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="mt-12 text-center">
          <button 
            onClick={() => navigate('/team-battle-arena')}
            className="bg-brand-pink text-white font-bold py-3 px-8 rounded-full btn-glow-pink text-lg hover:bg-pink-500 transition-colors flex items-center gap-2 mx-auto"
          >
            <FiRepeat /> Return to Arena
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamCommandCenterPage;
