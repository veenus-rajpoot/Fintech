import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiPause, FiPlay, FiArrowRight, FiZap } from 'react-icons/fi';

const MAX_HEALTH = 1000;

const initialRoundData = {
  command: "Generate a creative marketing campaign for sustainable fashion targeting Gen Z consumers with a budget of $50k",
  modelA: {
    responseTitle: "Future Threads",
    strategy: "TikTok influencers, AR try-ons, and sustainability showcases.",
    strength: "Social-first, creative, immersive.",
    creativity: 85,
    accuracy: 92,
    speed: 78,
  },
  modelB: {
    responseTitle: "EcoStyle Revolution",
    strategy: "User-generated content, sustainability challenges, eco-collections.",
    strength: "Community-driven, values-aligned.",
    creativity: 82,
    accuracy: 88,
    speed: 85,
  },
  commentary: {
    modelA: "Strong creative thinking with AR integration and innovative social media approach.",
    modelB: "Aligns well with Gen Z values using a community-based approach and authentic engagement."
  }
};

const generateNewRoundData = () => ({ ...initialRoundData });

const MetricBar = ({ value, label, color }) => {
  const colorClasses = {
    violet: 'from-purple-500 to-violet-500',
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
  };
  return (
    <div>
      <div className="flex justify-between text-sm mb-1 text-gray-300">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2">
        <motion.div
          className={`bg-gradient-to-r ${colorClasses[color]} h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </div>
    </div>
  );
};

const TimerBar = ({ time, maxTime }) => (
  <div className="w-full bg-gray-700/50 rounded-full h-2.5">
    <motion.div
      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2.5 rounded-full"
      initial={{ width: '100%' }}
      animate={{ width: `${(time / maxTime) * 100}%` }}
      transition={{ duration: 1, ease: 'linear' }}
    />
  </div>
);

const RoundEndModal = ({ isOpen, onNextRound, round, winnerInfo, scores, modelA, modelB }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center max-w-lg w-full"
        >
          <h2 className="text-3xl font-bold font-orbitron text-cyan-400 mb-2">Round {round} Complete!</h2>
          <p className="text-xl text-white mb-4">
            <span className={`font-bold ${winnerInfo.winner.name === modelA.name ? 'text-blue-400' : 'text-violet-400'}`}>{winnerInfo.winner.name}</span> wins this round!
          </p>
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-left space-y-3">
            <h3 className="font-bold text-lg text-center mb-2">Round Score</h3>
            <p><span className="font-bold text-blue-400">{modelA.name}:</span> +{winnerInfo.roundPoints.modelA} points</p>
            <p><span className="font-bold text-violet-400">{modelB.name}:</span> +{winnerInfo.roundPoints.modelB} points</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 mb-8 text-left space-y-3">
            <h3 className="font-bold text-lg text-center mb-2">Total Score</h3>
            <p><span className="font-bold text-blue-400">{modelA.name}:</span> {scores.modelA + winnerInfo.roundPoints.modelA}</p>
            <p><span className="font-bold text-violet-400">{modelB.name}:</span> {scores.modelB + winnerInfo.roundPoints.modelB}</p>
          </div>
          <button
            onClick={onNextRound}
            className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 transition-all"
          >
            {round < 5 ? 'Proceed to Next Round' : 'Finish Battle'} <FiArrowRight />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const LocalBattlePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { modelA, modelB } = location.state || { modelA: { name: 'GPT-4 Turbo' }, modelB: { name: 'UX Pilot 3' } };

  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(120);
  const [isPaused, setIsPaused] = useState(false);
  const [scores, setScores] = useState({ modelA: 0, modelB: 0 });
  const [roundHealth, setRoundHealth] = useState({ modelA: MAX_HEALTH, modelB: MAX_HEALTH });
  const [currentRoundData, setCurrentRoundData] = useState(initialRoundData);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [attackVisual, setAttackVisual] = useState(null);

  const handleRoundEnd = useCallback(() => {
    if (showRoundModal) return;

    let winner, roundPoints;
    if (roundHealth.modelA <= 0) {
      winner = modelB;
      roundPoints = { modelA: 50, modelB: 250 };
    } else if (roundHealth.modelB <= 0) {
      winner = modelA;
      roundPoints = { modelA: 250, modelB: 50 };
    } else { // Timer ran out
      if (roundHealth.modelA > roundHealth.modelB) {
        winner = modelA;
        roundPoints = { modelA: 250, modelB: 50 };
      } else if (roundHealth.modelB > roundHealth.modelA) {
        winner = modelB;
        roundPoints = { modelA: 50, modelB: 250 };
      } else {
        winner = { name: 'Draw' };
        roundPoints = { modelA: 100, modelB: 100 };
      }
    }
    setWinnerInfo({ winner, roundPoints });
    setShowRoundModal(true);
  }, [roundHealth, showRoundModal, modelA, modelB]);

  useEffect(() => {
    if (!isPaused && !showRoundModal && (timer > 0 && roundHealth.modelA > 0 && roundHealth.modelB > 0)) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer <= 0 || roundHealth.modelA <= 0 || roundHealth.modelB <= 0) {
      handleRoundEnd();
    }
  }, [isPaused, timer, showRoundModal, roundHealth, handleRoundEnd]);

  useEffect(() => {
    if (!isPaused && !showRoundModal && roundHealth.modelA > 0 && roundHealth.modelB > 0) {
      const attackInterval = setInterval(() => {
        const attacker = Math.random() > 0.5 ? 'modelA' : 'modelB';
        const defender = attacker === 'modelA' ? 'modelB' : 'modelA';
        const damage = Math.floor(Math.random() * 75) + 50;

        setRoundHealth(prev => ({
          ...prev,
          [defender]: Math.max(0, prev[defender] - damage)
        }));
        setAttackVisual({ target: defender, key: Date.now() });
      }, 2500);
      return () => clearInterval(attackInterval);
    }
  }, [isPaused, showRoundModal, roundHealth]);

  const proceedToNextRound = () => {
    const newScores = {
      modelA: scores.modelA + winnerInfo.roundPoints.modelA,
      modelB: scores.modelB + winnerInfo.roundPoints.modelB,
    };
    setScores(newScores);
    setShowRoundModal(false);

    if (round < 5) {
      setRound(r => r + 1);
      setCurrentRoundData(generateNewRoundData());
      setRoundHealth({ modelA: MAX_HEALTH, modelB: MAX_HEALTH });
      setTimer(120);
      setWinnerInfo(null);
    } else {
      const finalWinner = newScores.modelA > newScores.modelB ? modelA : modelB;
      navigate('/victory', { state: { winner: finalWinner, scores: newScores, isLocalBattle: true } });
    }
  };

  const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <>
      {winnerInfo && (
        <RoundEndModal
          isOpen={showRoundModal}
          onNextRound={proceedToNextRound}
          round={round}
          winnerInfo={winnerInfo}
          scores={scores}
          modelA={modelA}
          modelB={modelB}
        />
      )}
      <div className="min-h-screen bg-[#0d1117] text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold font-orbitron text-glow-blue">Battle Arena</h1>
            <div className="flex items-center gap-4 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2">
              <FiClock className="text-cyan-400" />
              <span className="font-mono text-lg">{formatTime(timer)}</span>
              <div className="w-px h-5 bg-gray-600"></div>
              <span className="font-bold">Round <span className="text-cyan-400">{round}</span>/5</span>
            </div>
            <button onClick={() => setIsPaused(!isPaused)} className="flex items-center gap-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 rounded-full px-4 py-2 hover:bg-yellow-500/30 transition-colors">
              {isPaused ? <FiPlay /> : <FiPause />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </header>
          <div className="mb-6">
            <TimerBar time={timer} maxTime={120} />
          </div>

          <div className="space-y-6">
            <section className="bg-gray-900/70 border border-gray-700 rounded-lg p-4">
              <h2 className="text-sm font-semibold text-gray-400 mb-2">Your Command</h2>
              <p className="text-gray-300">{currentRoundData.command}</p>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                key={`${attackVisual?.key}-a`}
                animate={attackVisual?.target === 'modelA' ? { scale: [1, 1.02, 1], borderColor: ["#ef4444", "#3b82f6"] } : {}}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/70 border-2 border-blue-500/70 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-blue-400">{modelA.name}</h3>
                </div>
                <p className="font-bold text-xl text-cyan-400 mb-2">"{currentRoundData.modelA.responseTitle}"</p>
                <p className="text-sm text-gray-400 mb-1"><span className="font-semibold text-gray-300">Strategy:</span> {currentRoundData.modelA.strategy}</p>
              </motion.div>
              <motion.div
                key={`${attackVisual?.key}-b`}
                animate={attackVisual?.target === 'modelB' ? { scale: [1, 1.02, 1], borderColor: ["#ef4444", "#8b5cf6"] } : {}}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/70 border-2 border-violet-500/70 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-violet-400">{modelB.name}</h3>
                </div>
                <p className="font-bold text-xl text-cyan-400 mb-2">"{currentRoundData.modelB.responseTitle}"</p>
                <p className="text-sm text-gray-400 mb-1"><span className="font-semibold text-gray-300">Strategy:</span> {currentRoundData.modelB.strategy}</p>
              </motion.div>
            </div>

            <section className="bg-gray-900/70 border border-gray-700 rounded-lg p-4">
              <h2 className="text-center font-bold text-lg mb-4 flex items-center justify-center gap-2"><FiZap /> Live Scoreboard</h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-blue-400">{modelA.name}</span>
                    <span className="text-2xl font-bold text-blue-400 font-mono">{roundHealth.modelA}</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full"
                      animate={{ width: `${(roundHealth.modelA / MAX_HEALTH) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-violet-400">{modelB.name}</span>
                    <span className="text-2xl font-bold text-violet-400 font-mono">{roundHealth.modelB}</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-violet-400 h-2.5 rounded-full"
                      animate={{ width: `${(roundHealth.modelB / MAX_HEALTH) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gray-900/70 border border-gray-700 rounded-lg p-4">
              <h2 className="text-center font-bold text-lg mb-4">Performance Metrics</h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-3">
                  <h4 className="font-bold text-blue-400">{modelA.name}</h4>
                  <MetricBar label="Creativity" value={currentRoundData.modelA.creativity} color="violet" />
                  <MetricBar label="Accuracy" value={currentRoundData.modelA.accuracy} color="green" />
                  <MetricBar label="Speed" value={currentRoundData.modelA.speed} color="blue" />
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-violet-400">{modelB.name}</h4>
                  <MetricBar label="Creativity" value={currentRoundData.modelB.creativity} color="violet" />
                  <MetricBar label="Accuracy" value={currentRoundData.modelB.accuracy} color="green" />
                  <MetricBar label="Speed" value={currentRoundData.modelB.speed} color="blue" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalBattlePage;
