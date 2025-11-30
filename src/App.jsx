import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { AnimatePresence } from 'framer-motion';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LoginSuccessPage from './pages/LoginSuccessPage';
import SuccessPage from './pages/SuccessPage';
import BattleModePage from './pages/BattleModePage';
import SoloBattleSetupPage from './pages/SoloBattleSetupPage';
import TeamBattleSetupPage from './pages/TeamBattleSetupPage';
import TeamLobbyPage from './pages/TeamLobbyPage';
import TeamCommandCenterPage from './pages/TeamCommandCenterPage';
import BattleArenaPage from './pages/BattleArenaPage';
import TeamBattleArenaPage from './pages/TeamBattleArenaPage';
import BattleAnalyticsPage from './pages/BattleAnalyticsPage';
import VictoryPage from './pages/VictoryPage';
import TeamVictoryPage from './pages/TeamVictoryPage';
import TeamStatsPage from './pages/TeamStatsPage';
import EventsPage from './pages/EventsPage';
import LocalBattlePage from './pages/LocalBattlePage';
import LearnPage from './pages/LearnPage';
import LandingPage from './pages/LandingPage';
import NotificationPage from './pages/NotificationPage';

function AnimatedRoutes() {
  const [session, setSession] = useState(null);

  const location = useLocation();

   useEffect(() => {
    // Get current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path="/login-success" element={<LoginSuccessPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/battle-mode" element={<BattleModePage />} />
        <Route path="/solo-battle-setup" element={<SoloBattleSetupPage />} />
        <Route path="/team-battle-setup" element={<TeamBattleSetupPage />} />
        <Route path="/team-lobby" element={<TeamLobbyPage />} />
        <Route path="/team-command-center" element={<TeamCommandCenterPage />} />
        <Route path="/battle-arena" element={<BattleArenaPage />} />
        <Route path="/team-battle-arena" element={<TeamBattleArenaPage />} />
        <Route path="/battle-analytics" element={<BattleAnalyticsPage />} />
        <Route path="/victory" element={<VictoryPage />} />
        <Route path="/team-victory" element={<TeamVictoryPage />} />
        <Route path="/team-stats" element={<TeamStatsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/local-battle" element={<LocalBattlePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes  />
    </Router>
  );
}

export default App;
