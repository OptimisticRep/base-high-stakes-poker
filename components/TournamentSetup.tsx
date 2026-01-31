
import React, { useState } from 'react';

const COUNTRIES = [
  { name: 'USA', flag: '🇺🇸' }, { name: 'Russia', flag: '🇷🇺' }, 
  { name: 'UK', flag: '🇬🇧' }, { name: 'Japan', flag: '🇯🇵' },
  { name: 'Brazil', flag: '🇧🇷' }, { name: 'Germany', flag: '🇩🇪' },
  { name: 'China', flag: '🇨🇳' }, { name: 'France', flag: '🇫🇷' }
];

interface TournamentSetupProps {
  onStart: (humans: {name: string, country: string}[], bots: number, rounds: number, mode: 'championship' | 'global') => void;
  onCancel: () => void;
}

const TournamentSetup: React.FC<TournamentSetupProps> = ({ onStart, onCancel }) => {
  const [humans, setHumans] = useState([{ name: 'Player 1', country: 'USA' }]);
  const [bots, setBots] = useState(2);
  const [rounds, setRounds] = useState(5);
  const [mode, setMode] = useState<'championship' | 'global'>('global');

  const addHuman = () => {
    if (humans.length < 4) setHumans([...humans, { name: `Player ${humans.length + 1}`, country: 'Russia' }]);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-300">
      <div className="glass-card w-full max-w-xl rounded-[2.5rem] border border-blue-500/30 p-10 space-y-8 shadow-[0_0_100px_rgba(0,82,255,0.15)] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
        
        <div className="text-center relative z-10">
          <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest mb-4">BASE NETWORK L2</div>
          <h2 className="text-4xl font-black italic tracking-tighter text-white">GLOBAL ARENA</h2>
          <p className="text-slate-400 text-xs mt-2 uppercase font-bold tracking-[0.3em]">Cross-Border Championships</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 relative z-10">
          <button 
            onClick={() => setMode('global')}
            className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${mode === 'global' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            GLOBAL PRO LEAGUE
          </button>
          <button 
            onClick={() => setMode('championship')}
            className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${mode === 'championship' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            LOCAL TOURNAMENT
          </button>
        </div>

        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 relative z-10">
          <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest">Register Participants</label>
          {humans.map((p, i) => (
            <div key={i} className="flex gap-2 animate-in slide-in-from-left-4 duration-300">
              <input 
                type="text" 
                value={p.name}
                onChange={(e) => {
                  const n = [...humans];
                  n[i].name = e.target.value;
                  setHumans(n);
                }}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all text-sm font-bold"
              />
              <select 
                value={p.country}
                onChange={(e) => {
                  const n = [...humans];
                  n[i].country = e.target.value;
                  setHumans(n);
                }}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white outline-none text-xl"
              >
                {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.flag}</option>)}
              </select>
            </div>
          ))}
          {humans.length < 4 && (
            <button onClick={addHuman} className="w-full py-3 border border-dashed border-white/20 rounded-xl text-[10px] font-black text-slate-500 hover:border-blue-500 hover:text-blue-400 transition-all uppercase">+ Add Seat</button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Pros</label>
            <select value={bots} onChange={(e) => setBots(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none font-bold">
              {[0, 1, 2, 3, 4, 6].map(n => <option key={n} value={n}>{n} Agents</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Match Length</label>
            <select value={rounds} onChange={(e) => setRounds(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none font-bold">
              {[5, 10, 25, 50].map(n => <option key={n} value={n}>{n} Hands</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-4 relative z-10">
          <button onClick={onCancel} className="flex-1 py-5 rounded-2xl font-black border border-white/10 hover:bg-white/5 transition-all text-slate-500 text-xs tracking-widest">DISCONNECT</button>
          <button 
            onClick={() => onStart(humans, bots, rounds, mode)}
            className="flex-1 base-gradient py-5 rounded-2xl font-black glow-blue hover:scale-105 active:scale-95 transition-all text-xs tracking-widest uppercase"
          >
            {mode === 'global' ? 'Connect to Base Arena' : 'Start Match'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentSetup;
