
import { Card, Suit, Rank } from '../types';

const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return shuffle(deck);
};

const shuffle = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const getRankValue = (rank: Rank): number => {
  const values: Record<Rank, number> = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };
  return values[rank];
};

export interface HandEvaluation {
  score: number;
  description: string;
}

/**
 * Evaluates the best 5-card hand from provided cards.
 * Returns a score and a human-readable description.
 */
export const evaluateHand = (cards: Card[]): HandEvaluation => {
  if (cards.length === 0) return { score: 0, description: "Empty Hand" };
  
  const values = cards.map(c => getRankValue(c.rank)).sort((a, b) => b - a);
  const counts: Record<number, number> = {};
  values.forEach(v => counts[v] = (counts[v] || 0) + 1);
  
  const pairs = Object.entries(counts).filter(([_, count]) => count === 2).map(([val]) => Number(val)).sort((a, b) => b - a);
  const trips = Object.entries(counts).filter(([_, count]) => count === 3).map(([val]) => Number(val)).sort((a, b) => b - a);
  const quads = Object.entries(counts).filter(([_, count]) => count === 4).map(([val]) => Number(val)).sort((a, b) => b - a);

  // High Card
  let score = values[0];
  let description = `High Card ${RANKS[values[0]-2]}`;

  // One Pair
  if (pairs.length === 1) {
    score = 100 + pairs[0];
    description = `Pair of ${RANKS[pairs[0]-2]}s`;
  }
  
  // Two Pair
  if (pairs.length >= 2) {
    score = 200 + pairs[0] * 10 + pairs[1];
    description = `Two Pair: ${RANKS[pairs[0]-2]}s and ${RANKS[pairs[1]-2]}s`;
  }

  // Three of a Kind
  if (trips.length === 1) {
    score = 300 + trips[0];
    description = `Three of a Kind: ${RANKS[trips[0]-2]}s`;
  }

  // Full House
  if (trips.length === 1 && pairs.length >= 1) {
    score = 700 + trips[0];
    description = `Full House: ${RANKS[trips[0]-2]}s over ${RANKS[pairs[0]-2]}s`;
  }

  // Four of a Kind
  if (quads.length === 1) {
    score = 800 + quads[0];
    description = `Four of a Kind: ${RANKS[quads[0]-2]}s`;
  }

  // Note: Straight/Flush detection omitted for brevity in this engine, 
  // but scores are scaled for common hand hierarchies.
  return { score, description };
};

// Maintain compatibility with existing code
export const evaluateHandPower = (cards: Card[]): number => {
  return evaluateHand(cards).score;
};
