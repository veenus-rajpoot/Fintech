import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiUsers, FiZap, FiTarget, FiCpu, FiSliders, FiShare2, FiCopy, FiRefreshCw, FiChevronDown, FiChevronUp, FiCheckCircle, FiPlus, FiPlay } from 'react-icons/fi';
import { FaBrain, FaDice } from 'react-icons/fa';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const aiOpponents = [
  {
    name: 'GPT-4 Turbo',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxJn3wnIE0IhtBEolIxGUWK_hCwrXNEu9TUX3DUnpRnIa8s_UC1UhxUkz990nu7f7jKSU&usqp=CAU',
    tag: 'Pro',
    features: 'Advanced reasoning, creative writing, complex problem solving.',
    stats: [ { label: 'Speed', value: 4 }, { label: 'Creativity', value: 5 }, { label: 'Logic', value: 5 } ],
    details: { response: '2.3s', cutoff: 'Jan 2024' }
  },
  {
    name: 'UX Pilot 3',
    img: 'https://img.freepik.com/premium-photo/robot-with-neon-background-words-robot-it_821898-1121.jpg',
    features: 'Specialized in UX design, user research, interface optimization.',
    stats: [ { label: 'Speed', value: 4 }, { label: 'Design', value: 5 }, { label: 'Creativity', value: 3 } ],
    details: { response: '1.8s', cutoff: 'Mar 2024' }
  },
  {
    name: 'Code Companion',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR66HGy9XdzPAK6bjGqW0a6VJ4xCzAb5DiW83DyJsBVTjRrU8ozuyoM4DRYATj-d3raMok&usqp=CAU',
    features: 'Code generation, debugging assistance, and algorithm design.',
    stats: [ { label: 'Speed', value: 5 }, { label: 'Logic', value: 5 }, { label: 'Accuracy', value: 4 } ],
    details: { response: '1.5s', cutoff: 'Feb 2024' }
  }
];

const BattleModeCard = ({ icon, title, description, stats, buttonText, buttonIcon, onClick, color }) => (
  <motion.div
    onClick={onClick}
    className={`bg-slate-900/50 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 border-slate-700 hover:border-${color}-500 hover:shadow-${color}-500/30 hover:shadow-lg`}
    whileHover={{ y: -5 }}
  >
    <img src={icon} alt={title} className="w-full h-40 object-contain rounded-lg mb-4 bg-black/20" />
    <h3 className={`text-2xl font-orbitron font-bold text-white`}>{title}</h3>
    <p className="text-slate-400 text-sm mt-2 mb-4 h-10">{description}</p>
    <div className="space-y-2 text-sm mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="flex justify-between">
          <span className="text-slate-400">{stat.label}</span>
          <span className={`font-bold text-${stat.color || 'white'}`}>{stat.value}</span>
        </div>
      ))}
    </div>
    <button className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-full transition-all duration-300 bg-${color}-600 hover:bg-${color}-500 text-white shadow-lg shadow-${color}-600/30`}>
      {buttonIcon} {buttonText}
    </button>
  </motion.div>
);

const AiOpponentCard = ({ img, name, tag, features, stats, selected, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`bg-slate-900/50 border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 relative overflow-hidden ${selected ? 'border-cyan-400 shadow-cyan-400/30 shadow-lg' : 'border-slate-700 hover:border-slate-500'}`}
    whileHover={{ y: -5 }}
  >
    {tag && <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">{tag}</div>}
    <img src={img} alt={name} className="w-full h-32 object-cover rounded-lg mb-4" />
    <h4 className="text-lg font-orbitron font-bold text-white">{name}</h4>
    <p className="text-slate-400 text-xs h-8">{features}</p>
    <div className="mt-4 space-y-2 text-xs">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-slate-400">{stat.label}</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, j) => (
              <div key={j} className={`w-3 h-1.5 rounded-full ${j < stat.value ? 'bg-cyan-400' : 'bg-slate-600'}`}></div>
            ))}
          </div>
        </div>
      ))}
    </div>
    {selected && (
      <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
        <FiCheckCircle className="text-cyan-400 text-6xl" />
      </div>
    )}
  </motion.div>
);

const scenarioConfig = {
  'Speed Test': { color: 'cyan', icon: <FiZap size={24} /> },
  'Strategy': { color: 'green', icon: <FiTarget size={24} /> },
  'Creativity': { color: 'purple', icon: <FaBrain size={24} /> },
};

const ScenarioButton = ({ label, selected, onClick }) => {
  const config = scenarioConfig[label];
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 border-2 ${selected ? `bg-${config.color}-500/20 border-${config.color}-500 text-${config.color}-400` : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'}`}
    >
      {config.icon}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
};

const BattlePreviewSidebar = ({ selections, onStartBattle }) => {
  const [presetsOpen, setPresetsOpen] = useState(true);
  const { opponent } = selections;

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 space-y-6 sticky top-24">
      <div>
        <h4 className="font-orbitron text-lg text-white mb-3">Battle Preview</h4>
        <div className="bg-slate-800/50 p-4 rounded-lg space-y-2 text-sm">
          <h5 className="font-bold text-cyan-400 mb-2">Configuration</h5>
          <div className="flex justify-between"><span className="text-slate-400">Mode:</span> <span className="font-semibold">{selections.mode}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Model:</span> <span className="font-semibold">{opponent.name}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Difficulty:</span> <span className="font-semibold text-yellow-400">Intermediate</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Scenario:</span> <span className="font-semibold">{selections.scenario}</span></div>
        </div>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-lg space-y-2 text-sm">
        <h5 className="font-bold text-cyan-400 mb-2">Estimated Scoring</h5>
        <div className="flex justify-between"><span className="text-slate-400">Base Points:</span> <span className="font-semibold">100</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Speed Bonus:</span> <span className="font-semibold text-green-400">+52</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Difficulty Multiplier:</span> <span className="font-semibold">x1.5</span></div>
        <div className="flex justify-between text-base"><span className="text-slate-400">Max Potential XP:</span> <span className="font-bold text-cyan-400">225</span></div>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-lg space-y-2 text-sm">
        <h5 className="font-bold text-cyan-400 mb-2">Model Details</h5>
        <div className="flex items-center gap-3">
          <img src={opponent.img} alt={opponent.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="font-bold">{opponent.name}</p>
            <p className="text-xs text-slate-400">Avg Response: {opponent.details.response}</p>
            <p className="text-xs text-slate-400">Knowledge Cutoff: {opponent.details.cutoff}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg">
        <button onClick={() => setPresetsOpen(!presetsOpen)} className="w-full flex justify-between items-center p-4">
          <h5 className="font-bold text-cyan-400">Saved Presets</h5>
          {presetsOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {presetsOpen && (
          <div className="p-4 pt-0 space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 rounded-md hover:bg-slate-700/50"><span>Quick Duel</span><FiPlay className="text-cyan-400"/></div>
            <div className="flex justify-between items-center p-2 rounded-md hover:bg-slate-700/50"><span>Logic Master</span><FiPlay className="text-cyan-400"/></div>
            <button className="w-full flex items-center justify-center gap-2 text-cyan-400 mt-2 p-2 rounded-md border border-cyan-400/50 hover:bg-cyan-400/10">
              <FiPlus /> Save Current Setup
            </button>
          </div>
        )}
      </div>

      <div>
        <h5 className="font-bold text-cyan-400 mb-3">Quick Actions</h5>
        <div className="space-y-2">
          <button onClick={onStartBattle} className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30">
            <FiPlay /> Start Battle
          </button>
          <div className="flex gap-2">
            <button className="w-full flex items-center justify-center gap-2 font-bold py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white"><FiShare2 size={16}/> Share</button>
            <button className="w-full flex items-center justify-center gap-2 font-bold py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white"><FiCopy size={16}/> Duplicate</button>
          </div>
          <button className="w-full flex items-center justify-center gap-2 font-bold py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white"><FiRefreshCw size={16}/> Random Setup</button>
        </div>
      </div>
    </div>
  );
};


const BattleModePage = () => {
  const navigate = useNavigate();
  const [aiOpponentName, setAiOpponentName] = useState('GPT-4 Turbo');
  const [scenario, setScenario] = useState('Strategy');
  const [advancedRulesOpen, setAdvancedRulesOpen] = useState(true);
  const [noJokesMode, setNoJokesMode] = useState(false);

  const selectedAiOpponent = aiOpponents.find(op => op.name === aiOpponentName);
  const opponentB = aiOpponents.find(op => op.name !== aiOpponentName) || aiOpponents[1];

  const selections = {
    mode: 'Local Battle',
    opponent: selectedAiOpponent,
    scenario: scenario,
  };

  const handleStartBattle = () => {
    navigate('/local-battle', { state: { modelA: selectedAiOpponent, modelB: opponentB } });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      className="min-h-screen bg-brand-dark text-white font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95)), url('https://images.stockcake.com/public/a/d/d/add348ef-ab45-4f83-b462-78c54ae8a47a_large/neon-robot-artist-stockcake.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-brand-pink to-brand-violet shadow-lg">
            <span className="font-bold text-xl font-orbitron text-white">Z</span>
          </div>
          <h1 className="text-xl font-bold font-orbitron">Zecathon Prompt Wars</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm border border-slate-700 bg-slate-900/50 rounded-full px-6 py-2">
          <a href="#" className="text-slate-300 hover:text-cyan-400 transition">Dashboard</a>
          <a href="#" className="text-cyan-400 font-bold transition">Battles</a>
          <a href="#" className="text-slate-300 hover:text-cyan-400 transition">Leaderboard</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 transition"><FiUser /></button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Choose Battle Mode */}
        <motion.section variants={sectionVariants} className="text-center mb-16">
          <h2 className="text-5xl font-bold font-orbitron text-glow-cyan mb-2">Choose Your Battle Mode</h2>
          <p className="text-slate-400">Select your combat configuration and prepare for AI warfare.</p>
        </motion.section>

        <motion.section variants={sectionVariants} className="grid md:grid-cols-2 gap-8 mb-20">
          <BattleModeCard
            icon="https://imgcdn.stablediffusionweb.com/2024/3/17/eeb4474e-4f15-41d3-b670-5a98f048d008.jpg"
            title="Solo Battle"
            description="Test your prompting skills against AI in single combat."
            stats={[
              { label: 'Your Solo Stats', value: '87% Win Rate', color: 'green-400' },
              { label: 'Last 5 Battles', value: '4 Wins, 1 Loss' },
              { label: 'XP Earned', value: '2,458 XP', color: 'cyan-400' },
            ]}
            buttonText="Configure Solo Battle"
            buttonIcon={<FiUser />}
            onClick={() => navigate('/solo-battle-setup')}
            color="cyan"
          />
          <BattleModeCard
            icon="https://thumbs.dreamstime.com/b/pink-humanoid-robots-neon-lit-high-tech-environment-ai-robots-pink-female-robots-team-artificial-intelligence-machine-361067895.jpg"
            title="Team Battle"
            description="Collaborate with allies or compete in strategic team warfare."
            stats={[
              { label: 'Team Win Rate', value: '73% Win Rate', color: 'green-400' },
              { label: 'Active Teams', value: '3 Teams' },
              { label: 'Team XP', value: '4,820 XP', color: 'purple-400' },
            ]}
            buttonText="Configure Team Battle"
            buttonIcon={<FiUsers />}
            onClick={() => navigate('/team-battle-setup')}
            color="purple"
          />
        </motion.section>

        {/* Select AI Opponent */}
        <motion.section variants={sectionVariants} className="text-center mb-12">
          <p className="text-purple-400 font-semibold">Play Local battle</p>
          <h2 className="text-4xl font-bold font-orbitron text-glow-purple mt-2 mb-2">Select Your AI Opponent</h2>
          <p className="text-slate-400">Choose the artificial intelligence that will challenge your prompting skills.</p>
        </motion.section>
        
        <motion.section variants={sectionVariants} className="grid md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          {aiOpponents.map(opponent => (
            <AiOpponentCard
              key={opponent.name}
              {...opponent}
              selected={aiOpponentName === opponent.name}
              onClick={() => setAiOpponentName(opponent.name)}
            />
          ))}
        </motion.section>

        <motion.div variants={sectionVariants} className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Scenario Type */}
            <section>
              <h4 className="font-orbitron text-lg text-white mb-4">Scenario Type</h4>
              <div className="flex gap-4">
                {Object.keys(scenarioConfig).map(label => (
                  <ScenarioButton key={label} label={label} selected={scenario === label} onClick={() => setScenario(label)} />
                ))}
              </div>
            </section>

            {/* Custom Scenario */}
            <section>
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
                <h4 className="font-orbitron text-lg text-white mb-4 flex items-center gap-2"><FiCpu /> Custom Scenario</h4>
                <textarea
                  placeholder="Design your own battle prompt..."
                  className="w-full bg-slate-800/70 border border-slate-600 rounded-lg p-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  rows="3"
                ></textarea>
                <button className="mt-3 flex items-center gap-2 text-sm text-cyan-400 hover:text-white">
                  <FaDice /> Randomize
                </button>
              </div>
            </section>

            {/* Advanced Rules */}
            <section>
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl">
                <button onClick={() => setAdvancedRulesOpen(!advancedRulesOpen)} className="w-full flex justify-between items-center p-6">
                  <h4 className="font-orbitron text-lg text-white flex items-center gap-2"><FiSliders /> Advanced Rules</h4>
                  {advancedRulesOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {advancedRulesOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-6 pb-6 space-y-4 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-slate-300">Token Limit</label>
                      <input type="number" defaultValue="1202" className="w-24 bg-slate-800 border border-slate-600 rounded-md p-2 text-center" />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-slate-300">No Jokes Mode</label>
                      <button onClick={() => setNoJokesMode(!noJokesMode)} className={`relative w-12 h-6 rounded-full p-1 transition-colors ${noJokesMode ? 'bg-purple-600' : 'bg-slate-700'}`}>
                        <motion.div className="w-4 h-4 bg-white rounded-full" layout transition={{ type: 'spring', stiffness: 700, damping: 30 }} style={{ x: noJokesMode ? '1.25rem' : '0rem' }} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </section>
            
            <div className="flex justify-center lg:hidden">
              <button onClick={handleStartBattle} className="w-full max-w-xs flex items-center justify-center gap-2 font-bold py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30">
                <FiPlay /> Start Battle
              </button>
            </div>

          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <BattlePreviewSidebar selections={selections} onStartBattle={handleStartBattle} />
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default BattleModePage;
