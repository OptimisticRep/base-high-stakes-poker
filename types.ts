
export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export type PlayerAction = 'fold' | 'check' | 'call' | 'raise';

export interface ChatMessage {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  country: string;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  avatar: string;
  chips: number;
  cards: Card[];
  isAI: boolean;
  lastAction?: string;
  isFolded: boolean;
  currentBet: number;
  tournamentPoints: number;
  ping: number;
}

export type GameStage = 'dealing' | 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

export interface GameState {
  players: Player[];
  communityCards: Card[];
  pot: number;
  dealerIndex: number;
  currentPlayerIndex: number;
  stage: GameStage;
  minBet: number;
  deck: Card[];
  gameMode: 'casual' | 'championship' | 'global';
  roundNumber: number;
  maxRounds: number;
  roomId?: string;
}

export interface PlayerStats {
  id: string;
  name: string;
  country: string;
  handsPlayed: number;
  handsWon: number;
  totalChipsWon: number;
  tournamentsWon: number;
}
