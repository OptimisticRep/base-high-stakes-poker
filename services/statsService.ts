
import { PlayerStats } from '../types';

const STORAGE_KEY = 'base_poker_stats_v1';

export const getStats = (): Record<string, PlayerStats> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse stats", e);
    return {};
  }
};

/**
 * Updates player statistics in local storage.
 * Added 'country' parameter to fulfill PlayerStats interface requirements.
 */
export const updatePlayerStats = (id: string, name: string, country: string, data: Partial<Omit<PlayerStats, 'id' | 'name' | 'country'>>) => {
  const allStats = getStats();
  const current = allStats[id] || { 
    id, 
    name, 
    country,
    handsPlayed: 0, 
    handsWon: 0, 
    totalChipsWon: 0,
    tournamentsWon: 0 
  };
  
  allStats[id] = {
    ...current,
    handsPlayed: current.handsPlayed + (data.handsPlayed || 0),
    handsWon: current.handsWon + (data.handsWon || 0),
    totalChipsWon: current.totalChipsWon + (data.totalChipsWon || 0),
    tournamentsWon: current.tournamentsWon + (data.tournamentsWon || 0),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allStats));
};

export const resetStats = () => {
  localStorage.removeItem(STORAGE_KEY);
};
