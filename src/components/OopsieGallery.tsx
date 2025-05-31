
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { useOopsies } from '@/hooks/useOopsies';
import EnhancedShareButton from './EnhancedShareButton';
import { formatDistanceToNow } from 'date-fns';

const categoryLabels = {
  'ai_fail': 'AI Fail',
  'adventure_gone_wrong': 'Adventure Gone Wrong',
  'insurance_claim': 'Insurance Claim',
  'wildlife_encounter': 'Wildlife Encounter',
  'equipment_failure': 'Equipment Failure',
  'other': 'Other'
};

const categoryColors = {
  'ai_fail': 'bg-purple-100 text-purple-800',
  'adventure_gone_wrong': 'bg-orange-100 text-orange-800',
  'insurance_claim': 'bg-blue-100 text-blue-800',
  'wildlife_encounter': 'bg-green-100 text-green-800',
  'equipment_failure': 'bg-red-100 text-red-800',
  'other': 'bg-gray-100 text-gray-800'
};

interface OopsieGalleryProps {
  showFeatured?: boolean;
  category?: string;
  limit?: number;
}

const OopsieGallery = ({ showFeatured = false, category, limit }: OopsieGalleryProps) => {
  const { oopsies, loading, likeOopsie } = useOopsies();
  const [likedOopsies, setLikedOopsies] = useState<Record<string, boolean>>({});

  const filteredOopsies = oopsies
    .filter(oopsie => {
      if (showFeatured && !oopsie.is_featured) return false;
      if (category && oopsie.category !== category) return false;
      return true;
    })
    .slice(0, limit);

  const handleLike = async (oopsieId: string) => {
    if (likedOopsies[oopsieId]) return;
    
    await likeOopsie(oopsieId);
    setLikedOopsies(prev => ({ ...prev, [oopsieId]: true }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit || 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredOopsies.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-apex-darkgray/50 mb-4" />
        <h3 className="text-lg font-semibold text-apex-black mb-2">No oopsies found</h3>
        <p className="text-apex-darkgray/70">
          {category ? `No oopsies in the ${categoryLabels[category as keyof typeof categoryLabels]} category yet.` : 'No oopsies to display yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredOopsies.map((oopsie) => (
        <Card key={oopsie.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          {oopsie.image_url && (
            <div className="aspect-square relative overflow-hidden">
              <img
                src={oopsie.image_url}
                alt={oopsie.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute top-3 left-3">
                <Badge className={categoryColors[oopsie.category]}>
                  {categoryLabels[oopsie.category]}
                </Badge>
              </div>
              {oopsie.is_featured && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-apex-red text-white">
                    <TrendingUp size={12} className="mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>
          )}
          
          <CardContent className="p-4">
            <h3 className="font-bold text-apex-black mb-2 line-clamp-2">
              {oopsie.title}
            </h3>
            <p className="text-apex-darkgray/70 text-sm mb-4 line-clamp-3">
              {oopsie.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-apex-darkgray/60 mb-4">
              <span>{formatDistanceToNow(new Date(oopsie.created_at))} ago</span>
              <span>Viral Score: {oopsie.viral_score}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(oopsie.id)}
                  className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-red transition-colors"
                  disabled={likedOopsies[oopsie.id]}
                >
                  <Heart 
                    size={18} 
                    className={likedOopsies[oopsie.id] ? "fill-apex-red text-apex-red" : ""} 
                  />
                  <span>{likedOopsies[oopsie.id] ? oopsie.likes + 1 : oopsie.likes}</span>
                </button>
                
                <button className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors">
                  <MessageCircle size={18} />
                  <span>{oopsie.comments}</span>
                </button>
              </div>
              
              <EnhancedShareButton oopsie={oopsie} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OopsieGallery;
