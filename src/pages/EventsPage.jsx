import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import { FiCalendar, FiClock, FiAward, FiUsers, FiSettings, FiHome, FiBarChart2, FiZap, FiRadio, FiChevronLeft, FiUser } from 'react-icons/fi';
import { FaHistory } from 'react-icons/fa';

const NavItem = ({ icon, label, active, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-300 ${
      active ? 'bg-cyan-400/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-64 bg-[#060b18] p-4 flex-col hidden lg:flex"
    >
      <div className="flex items-center mb-12">
        <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg">
          <span className="font-bold text-xl text-white">Z</span>
        </div>
        <h1 className="text-xl font-bold ml-2">Zecathon</h1>
      </div>
      <ul className="flex-1">
        <NavItem icon={<FiBarChart2 size={20} />} label="Dashboard" onClick={() => navigate('/home')} />
        <NavItem icon={<FiUser size={20} />} label="Profile" />
        <NavItem icon={<FaHistory size={20} />} label="Battle History" />
        <NavItem icon={<FiAward size={20} />} label="Achievements" />
        <NavItem icon={<FiCalendar size={20} />} label="Events" active />
        <NavItem icon={<FiUsers size={20} />} label="Community" />
        <NavItem icon={<FiSettings size={20} />} label="Settings" />
      </ul>
      <div className="mt-auto">
        <NavItem icon={<FiHome size={20} />} label="Back to Home" onClick={() => navigate('/home')} />
      </div>
    </motion.div>
  );
};

const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span className="text-red-500 font-bold">Event Live!</span>;
  } else {
    return (
      <span className="font-mono text-xl text-cyan-300 tracking-wider">
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    );
  }
};

const EventCard = ({ event, statusStyles, buttonStyles }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 card-border-glow-subtle flex flex-col"
  >
    <div className={`inline-flex items-center gap-2 text-sm font-bold self-start px-2 py-1 rounded-full border ${statusStyles[event.status].tag} ${statusStyles[event.status].text}`}>
      {statusStyles[event.status].icon} {event.status}
    </div>
    <h3 className="text-xl font-bold my-3">{event.title}</h3>
    <p className="text-gray-400 text-sm mb-4 flex-grow">{event.description}</p>
    <div className="text-sm text-gray-400 mb-4">
      {event.status === 'UPCOMING' ? 'Starts In' : 'Time Remaining'}
      <Countdown date={event.time} renderer={countdownRenderer} />
    </div>
    <button className={`w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r ${buttonStyles[event.color]} transition-all duration-300 transform hover:scale-105`}>
      {event.button}
    </button>
  </motion.div>
);

const PastEventCard = ({ event }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="bg-gradient-to-br from-blue-900/50 to-blue-900/20 p-6 rounded-xl border border-blue-400/30"
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p className="text-xs text-gray-400">{event.date}</p>
    </div>
    <ul className="space-y-3">
      {event.winners.map((winner) => (
        <li key={winner.rank} className="flex items-center bg-black/30 p-3 rounded-lg">
          <span className="text-lg font-bold w-8 text-center text-yellow-400">{winner.rank}</span>
          <img src={`https://i.pravatar.cc/40?u=${winner.avatar}`} alt={winner.name} className="w-8 h-8 rounded-full mx-3 border-2 border-cyan-400/50" />
          <span className="font-semibold flex-grow">{winner.name}</span>
          <span className="font-mono text-cyan-300">{winner.points} pts</span>
        </li>
      ))}
    </ul>
    <button className="mt-6 w-full text-center text-sm font-semibold text-cyan-300 hover:text-white transition-colors duration-300">
      View Full Results
    </button>
  </motion.div>
);

const EventsPage = () => {
  const navigate = useNavigate();

  const allEvents = [
    { id: 1, status: 'LIVE', title: 'Quantum Arena', description: 'Battle royale in virtual reality space with 100 players competing for the ultimate prize.', time: Date.now() + 10000000, button: 'Join Battle', color: 'purple' },
    { id: 2, status: 'LIVE', title: 'Code Clash', description: 'A fast-paced coding duel against top programmers.', time: Date.now() + 2500000, button: 'Spectate', color: 'purple' },
    { id: 3, status: 'UPCOMING', title: 'Neon Speedway', description: 'High-speed racing tournament through cyberpunk cityscapes.', time: Date.now() + 500000, button: 'Register Now', color: 'orange' },
    { id: 4, status: 'UPCOMING', title: 'Digital Fortress', description: 'Strategic warfare in a post-apocalyptic digital world.', time: Date.now() + 86400000, button: 'Set Reminder', color: 'blue' },
  ];

  const pastEvents = [
    {
      id: 5,
      title: 'Cyberpunk Championship',
      date: 'NOV 28, 2024',
      winners: [
        { rank: 1, name: 'NeoGamer', avatar: 'a', points: '15,420' },
        { rank: 2, name: 'CyberQueen', avatar: 'b', points: '14,890' },
        { rank: 3, name: 'QuantumHero', avatar: 'c', points: '14,320' },
      ],
    },
    {
      id: 6,
      title: 'Neural Network Battle',
      date: 'NOV 25, 2024',
      winners: [
        { rank: 1, name: 'AImaster', avatar: 'd', points: '18,750' },
        { rank: 2, name: 'TechNinja', avatar: 'e', points: '17,920' },
        { rank: 3, name: 'CodeWarrior', avatar: 'f', points: '16,540' },
      ],
    },
  ];

  const statusStyles = {
    LIVE: { icon: <FiRadio />, text: 'text-red-400', tag: 'bg-red-500/20 border-red-500/50' },
    UPCOMING: { icon: <FiClock />, text: 'text-orange-400', tag: 'bg-orange-500/20 border-orange-500/50' },
  };

  const buttonStyles = {
    purple: 'from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700',
    orange: 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
    blue: 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700',
  };

  const liveEvents = allEvents.filter(event => event.status === 'LIVE');
  const upcomingEvents = allEvents.filter(event => event.status === 'UPCOMING');

  return (
    <div className="flex min-h-screen bg-dark-navy text-gray-200 font-sans">
      <Sidebar />
      <main 
        className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative"
        style={{
            backgroundImage: `url('https://img.freepik.com/free-photo/cyberpunk-cityscape-with-neon-lights_23-2151966362.jpg?semt=ais_hybrid&w=740')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button onClick={() => navigate('/home')} className="lg:hidden flex items-center text-cyan-400 hover:text-cyan-200 mb-4">
              <FiChevronLeft /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-300">
              GAME EVENTS
            </h1>
            <p className="text-gray-400 mt-2">Compete in the ultimate gaming competitions</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="my-8 p-1.5 bg-gray-800/30 rounded-lg inline-flex items-center space-x-2 border border-gray-700 sticky top-4 z-20">
            {['Live', 'Upcoming', 'Past'].map((tab) => (
              <a
                key={tab}
                href={`#${tab.toLowerCase()}`}
                className="px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 text-gray-300 hover:bg-cyan-500/80 hover:text-white"
              >
                {tab}
              </a>
            ))}
          </motion.div>

          <div className="space-y-16">
            <section id="live">
              <h2 className="text-3xl font-bold mb-6 text-cyan-300 text-glow-cyan border-l-4 border-cyan-400 pl-4">Live Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveEvents.map((event) => (
                  <EventCard key={event.id} event={event} statusStyles={statusStyles} buttonStyles={buttonStyles} />
                ))}
              </div>
            </section>

            <section id="upcoming">
              <h2 className="text-3xl font-bold mb-6 text-orange-400 text-glow-pink border-l-4 border-orange-400 pl-4">Upcoming Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} statusStyles={statusStyles} buttonStyles={buttonStyles} />
                ))}
              </div>
            </section>

            <section id="past">
              <h2 className="text-3xl font-bold mb-6 text-blue-400 text-glow-cyan border-l-4 border-blue-400 pl-4">Past Events & Rankings</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {pastEvents.map((event) => (
                  <PastEventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
