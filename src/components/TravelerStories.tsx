
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { travelerStories, TravelerStory } from '@/data/travelerStories';

const TravelerStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % travelerStories.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = (storyId: string) => {
    setLikedStories(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(storyId)) {
        newLiked.delete(storyId);
      } else {
        newLiked.add(storyId);
      }
      return newLiked;
    });
  };

  const story = travelerStories[currentStory];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-apex-black mb-2">
          🌟 Traveler Survival Stories
        </h3>
        <p className="text-apex-darkgray/70">
          Real adventures, real insurance, real peace of mind
        </p>
      </div>

      {/* Featured Story */}
      <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {story.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-apex-black">{story.name}</h4>
                  <span className="text-apex-darkgray/60">({story.age})</span>
                  <Badge className="bg-blue-500 text-white text-xs">{story.certificateType}</Badge>
                </div>
                
                <div className="flex items-center gap-3 mb-3 text-sm text-apex-darkgray/70">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{story.location} {story.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{story.timeAgo}</span>
                  </div>
                  <span className="text-2xl">{story.predator}</span>
                </div>
                
                <p className="text-apex-darkgray mb-4 leading-relaxed">
                  {story.story}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(story.id)}
                      className={`flex items-center gap-1 ${likedStories.has(story.id) ? 'text-red-500' : 'text-apex-darkgray/70'}`}
                    >
                      <Heart size={16} fill={likedStories.has(story.id) ? 'currentColor' : 'none'} />
                      <span>{story.likes + (likedStories.has(story.id) ? 1 : 0)}</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-apex-darkgray/70">
                      <MessageCircle size={16} />
                      <span>{story.comments}</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-apex-darkgray/70">
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    💰 $50K Covered
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Story Navigation */}
      <div className="flex justify-center gap-2">
        {travelerStories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStory(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentStory ? 'bg-blue-500 w-6' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-apex-black">2,847</div>
          <div className="text-sm text-apex-darkgray/70">Certificates Issued</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">89%</div>
          <div className="text-sm text-apex-darkgray/70">Survival Rate</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">4.9★</div>
          <div className="text-sm text-apex-darkgray/70">App Rating</div>
        </div>
      </div>
    </div>
  );
};

export default TravelerStories;
