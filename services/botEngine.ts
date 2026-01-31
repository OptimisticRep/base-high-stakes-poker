
import { GameState, PlayerAction, PlayerStats, Player } from "../types";
import { evaluateHand } from "./pokerEngine";

interface BotPersonality {
  aggression: number;
  bluffFrequency: number;
  tightness: number;
  riskAversion: number;
}

const PERSONALITIES: Record<string, BotPersonality> = {
  'Bot_Satoshi': { aggression: 0.8, bluffFrequency: 0.15, tightness: 0.9, riskAversion: 0.4 },
  'Bot_Whale': { aggression: 0.9, bluffFrequency: 0.5, tightness: 0.3, riskAversion: 0.1 }, // Агрессивный кит
  'Bot_Igor': { aggression: 0.3, bluffFrequency: 0.05, tightness: 0.5, riskAversion: 0.8 },
  'Bot_Klaus': { aggression: 0.6, bluffFrequency: 0.1, tightness: 0.7, riskAversion: 0.5 },
};

const DEFAULT_PERSONALITY: BotPersonality = { aggression: 0.5, bluffFrequency: 0.2, tightness: 0.6, riskAversion: 0.5 };

export const getBotDecision = (
  gameState: GameState, 
  botIndex: number,
  allStats: Record<string, PlayerStats>
): { action: PlayerAction; amount?: number; thought: string; chatMessage?: string } => {
  const bot = gameState.players[botIndex];
  const personality = PERSONALITIES[bot.name] || DEFAULT_PERSONALITY;
  
  const hand = evaluateHand([...bot.cards, ...gameState.communityCards]);
  const callAmount = gameState.minBet - bot.currentBet;
  const potSize = gameState.pot;
  
  const humanPlayers = gameState.players.filter(p => !p.isAI && !p.isFolded);
  let respectFactor = 0;
  humanPlayers.forEach(p => {
    const stats = allStats[p.id];
    if (stats && stats.handsPlayed > 5) {
      const winRate = stats.handsWon / stats.handsPlayed;
      if (winRate > 0.4) respectFactor += 0.3;
    }
  });

  const adjustedScore = hand.score * (1 + (1 - personality.tightness) - respectFactor);
  
  let action: PlayerAction = 'check';
  let amount = 0;
  let thought = "";
  let chatMessage = "";

  // Логика принятия решения
  if (adjustedScore > 400) {
    action = 'raise';
    amount = gameState.minBet + Math.floor(200 * personality.aggression);
    thought = `Strong ${hand.description}. Increasing the pot.`;
  } 
  else if (adjustedScore > 150) {
    if (callAmount > bot.chips * 0.5) {
      action = 'fold';
      thought = "Too expensive for this hand.";
    } else {
      action = Math.random() < personality.aggression ? 'raise' : 'call';
      amount = gameState.minBet + 100;
      thought = "Maintaining pressure.";
    }
  }
  else {
    const isBluffing = Math.random() < (personality.bluffFrequency * (gameState.stage === 'river' ? 2 : 1));
    if (isBluffing && callAmount < bot.chips * 0.3) {
      action = 'raise';
      amount = gameState.minBet + 150;
      thought = "Total bluff. Let's see them sweat.";
      if (Math.random() < 0.3) chatMessage = "Scared?";
    } else if (callAmount === 0) {
      action = 'check';
      thought = "Free card, why not.";
    } else {
      action = 'fold';
      thought = "Nothing to play with.";
    }
  }

  if (action === 'raise' && amount > bot.chips + bot.currentBet) {
    amount = bot.chips + bot.currentBet;
  }

  return { action, amount, thought, chatMessage };
};
