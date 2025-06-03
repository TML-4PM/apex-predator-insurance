
import React from 'react';
import { Mountain, Globe, Star, Crown, Gift, Snowflake } from 'lucide-react';

export const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'terrestrial': return <Mountain className="w-6 h-6 text-brown-500" />;
    case 'marine': return <Globe className="w-6 h-6 text-blue-500" />;
    case 'aerial': return <Star className="w-6 h-6 text-sky-500" />;
    case 'reptile': return <Crown className="w-6 h-6 text-green-500" />;
    case 'insect': return <Star className="w-6 h-6 text-orange-500" />;
    case 'regional': return <Globe className="w-6 h-6 text-purple-500" />;
    case 'experience': return <Star className="w-6 h-6 text-yellow-500" />;
    case 'seasonal': return <Snowflake className="w-6 h-6 text-cyan-500" />;
    case 'ultimate': return <Crown className="w-6 h-6 text-red-500" />;
    default: return <Gift className="w-6 h-6 text-gray-500" />;
  }
};

export const getCategoryColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'terrestrial': return 'border-brown-200 bg-brown-50';
    case 'marine': return 'border-blue-200 bg-blue-50';
    case 'aerial': return 'border-sky-200 bg-sky-50';
    case 'reptile': return 'border-green-200 bg-green-50';
    case 'insect': return 'border-orange-200 bg-orange-50';
    case 'regional': return 'border-purple-200 bg-purple-50';
    case 'experience': return 'border-yellow-200 bg-yellow-50';
    case 'seasonal': return 'border-cyan-200 bg-cyan-50';
    case 'ultimate': return 'border-red-200 bg-red-50 border-2';
    default: return 'border-gray-200 bg-gray-50';
  }
};
