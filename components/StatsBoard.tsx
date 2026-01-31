
import React from 'react';
import { PlayerStats } from '../types';

interface StatsBoardProps {
  stats: Record<string, PlayerStats>;
  onClose: () => void;
}

const StatsBoard: React.FC<StatsBoardProps> = ({ stats, onClose }) => {
  // Fix: Explicitly cast Object.values results to PlayerStats[] to prevent 'unknown' type errors
  const statsList = (Object.values(stats) as PlayerStats[]).sort((a, b) => b.totalChipsWon - a.totalChipsWon);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden border border-white/10 flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-blue-600/10">
          <div>
            <h2 className="text-2xl font-black tracking-tight">HALL OF FAME</h2>
            <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Base High Stakes Statistics</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {statsList.length === 0 ? (
            <div className="text-center py-12 text-slate-500 italic">No hands played yet. Enter the table to make history.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-slate-500 uppercase font-bold tracking-widest border-b border-white/5">
                  <th className="pb-4">Player</th>
                  <th className="pb-4 text-center">Hands</th>
                  <th className="pb-4 text-center">Win Rate</th>
                  <th className="pb-4 text-right">Total Won</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {statsList.map((stat) => {
                  const winRate = stat.handsPlayed > 0 
                    ? Math.round((stat.handsWon / stat.handsPlayed) * 100) 
                    : 0;
                  return (
                    <tr key={stat.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4 font-bold text-slate-200">{stat.name}</td>
                      <td className="py-4 text-center text-slate-400 font-medium">{stat.handsPlayed}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${winRate > 40 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                          {winRate}%
                        </span>
                      </td>
                      <td className="py-4 text-right font-black text-blue-400">${stat.totalChipsWon.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-black/40 text-center">
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            Statistics are persisted locally in your browser. <br/> 
            Beat the Gemini agents to climb the leaderboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsBoard;
