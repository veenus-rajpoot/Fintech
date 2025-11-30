import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiUserPlus, FiMessageSquare, FiAward, FiSettings, FiHome, FiBarChart2, FiCalendar, FiUsers, FiChevronLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi';
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
        <NavItem icon={<FiUserPlus size={20} />} label="Profile" />
        <NavItem icon={<FaHistory size={20} />} label="Battle History" />
        <NavItem icon={<FiAward size={20} />} label="Achievements" />
        <NavItem icon={<FiCalendar size={20} />} label="Events" onClick={() => navigate('/events')} />
        <NavItem icon={<FiBell size={20} />} label="Notifications" active />
        <NavItem icon={<FiUsers size={20} />} label="Community" />
        <NavItem icon={<FiSettings size={20} />} label="Settings" />
      </ul>
      <div className="mt-auto">
        <NavItem icon={<FiHome size={20} />} label="Back to Home" onClick={() => navigate('/team-battle-setup')} />
      </div>
    </motion.div>
  );
};

const colorMap = {
  green: 'bg-green-500/20 text-green-400',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  blue: 'bg-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/20 text-purple-400',
};

const NotificationItem = ({ icon, color, title, time, unread, onAction, children }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
    transition={{ duration: 0.5 }}
    className="flex items-start space-x-4 p-4 bg-black/20 rounded-lg border border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-300 relative"
  >
    {unread && <div className="absolute top-3 right-3 w-2 h-2 bg-cyan-400 rounded-full"></div>}
    <div className={`p-3 rounded-full ${colorMap[color] || 'bg-gray-500/20 text-gray-400'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-semibold text-white">{title}</p>
      <p className="text-sm text-gray-400">{time}</p>
      {children && <div className="mt-3">{children}</div>}
      {onAction && (
        <div className="flex items-center gap-4 mt-3">
          <button onClick={() => onAction('accept')} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-green-500/80 rounded-lg hover:bg-green-500 transition-colors">
            <FiCheckCircle /> Accept
          </button>
          <button onClick={() => onAction('decline')} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors">
            <FiXCircle /> Decline
          </button>
        </div>
      )}
    </div>
  </motion.div>
);

const initialNotifications = {
  All: [
    { id: 1, icon: <FiUserPlus size={20} />, color: 'green', title: 'New follower!', time: '2 minutes ago', unread: true, content: 'User "CyberNinja" started following you.' },
    { id: 2, icon: <FiAward size={20} />, color: 'yellow', title: 'Achievement Unlocked: "Veteran"', time: '1 hour ago', unread: true, content: 'You have completed 50 battles.' },
    { id: 3, icon: <FiMessageSquare size={20} />, color: 'blue', title: 'Team Invite', time: '3 hours ago', unread: false, content: 'Team "Quantum Leapers" has invited you to join.', actions: true },
    { id: 4, icon: <FiBell size={20} />, color: 'purple', title: 'Tournament Starting Soon', time: '1 day ago', unread: false, content: '"Neon Speedway" begins in 24 hours. Don\'t miss it!' },
  ],
  Mentions: [
    { id: 3, icon: <FiMessageSquare size={20} />, color: 'blue', title: 'Team Invite', time: '3 hours ago', unread: false, content: 'Team "Quantum Leapers" has invited you to join.', actions: true },
  ],
  System: [
    { id: 2, icon: <FiAward size={20} />, color: 'yellow', title: 'Achievement Unlocked: "Veteran"', time: '1 hour ago', unread: true, content: 'You have completed 50 battles.' },
    { id: 4, icon: <FiBell size={20} />, color: 'purple', title: 'Tournament Starting Soon', time: '1 day ago', unread: false, content: '"Neon Speedway" begins in 24 hours. Don\'t miss it!' },
  ]
};

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);
  const navigate = useNavigate();

  const handleNotificationAction = (notificationId) => {
    // This is a client-side simulation. In a real app, you'd make an API call.
    const updatedNotifications = {
      All: notifications.All.filter(n => n.id !== notificationId),
      Mentions: notifications.Mentions.filter(n => n.id !== notificationId),
      System: notifications.System.filter(n => n.id !== notificationId),
    };
    setNotifications(updatedNotifications);
  };

  return (
    <div className="flex min-h-screen bg-dark-navy text-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-hexagons overflow-y-auto">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button onClick={() => navigate('/home')} className="lg:hidden flex items-center text-cyan-400 hover:text-cyan-200 mb-4">
              <FiChevronLeft /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-300">
              Notifications
            </h1>
            <p className="text-gray-400 mt-2">Stay updated with your latest activities and alerts.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="my-8 p-1.5 bg-gray-800/30 rounded-lg inline-flex items-center space-x-2 border border-gray-700">
            {['All', 'Mentions', 'System'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${
                  activeTab === tab ? 'bg-cyan-500/80 text-white' : 'text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          <div className="space-y-4">
            <AnimatePresence>
              {notifications[activeTab].map(item => (
                <NotificationItem 
                  key={item.id} 
                  {...item}
                  onAction={item.actions ? () => handleNotificationAction(item.id) : null}
                >
                  <p className="text-gray-300">{item.content}</p>
                </NotificationItem>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationPage;
