
import React, { useState } from 'react';
import { Card } from '../types';

interface PokerCardProps {
  card?: Card;
  hidden?: boolean;
  isPlayerCard?: boolean;
}

const PokerCard: React.FC<PokerCardProps> = ({ card, hidden, isPlayerCard }) => {
  const [peeking, setPeeking] = useState(false);

  // If hidden (AI's card or deck), show back
  if (hidden || !card) {
    return (
      <div className="w-12 h-18 sm:w-16 sm:h-24 bg-blue-900 border-2 border-blue-400 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300">
        <div className="w-8 h-12 border border-blue-400/30 rounded flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-400/20 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const suitIcons = {
    spades: '♠',
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣'
  };

  return (
    <div 
      onMouseDown={() => isPlayerCard && setPeeking(true)}
      onMouseUp={() => isPlayerCard && setPeeking(false)}
      onMouseLeave={() => isPlayerCard && setPeeking(false)}
      onTouchStart={() => isPlayerCard && setPeeking(true)}
      onTouchEnd={() => isPlayerCard && setPeeking(false)}
      className={`
        w-12 h-18 sm:w-16 sm:h-24 glass-card border-2 border-white/20 rounded-lg flex flex-col justify-between p-1 sm:p-2 shadow-2xl transition-all duration-300
        ${isRed ? 'text-rose-500' : 'text-slate-200'}
        ${isPlayerCard && !peeking ? 'blur-md brightness-50 cursor-pointer scale-95' : 'blur-0 scale-100'}
      `}
    >
      <div className="text-xs sm:text-lg font-bold leading-none">{card.rank}</div>
      <div className="text-xl sm:text-3xl self-center">{suitIcons[card.suit]}</div>
      <div className="text-xs sm:text-lg font-bold leading-none self-end rotate-180">{card.rank}</div>
      
      {isPlayerCard && !peeking && (
        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white/50 uppercase tracking-tighter">Hold to peek</div>
      )}
    </div>
  );
};

export default PokerCard;
