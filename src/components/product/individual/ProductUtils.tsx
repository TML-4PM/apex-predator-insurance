
import React from 'react';
import { Star, Zap, Crown, Skull } from 'lucide-react';

export const getRarityIcon = (rarity: string) => {
  switch (rarity) {
    case 'common': return <Star className="w-4 h-4 text-gray-500" />;
    case 'uncommon': return <Zap className="w-4 h-4 text-green-500" />;
    case 'rare': return <Crown className="w-4 h-4 text-blue-500" />;
    case 'legendary': return <Skull className="w-4 h-4 text-purple-500" />;
    case 'mythic': return <Crown className="w-4 h-4 text-red-500" />;
    default: return <Star className="w-4 h-4 text-gray-500" />;
  }
};

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-gray-200 bg-gray-50';
    case 'uncommon': return 'border-green-200 bg-green-50';
    case 'rare': return 'border-blue-200 bg-blue-50';
    case 'legendary': return 'border-purple-200 bg-purple-50';
    case 'mythic': return 'border-red-200 bg-red-50';
    default: return 'border-gray-200 bg-gray-50';
  }
};
