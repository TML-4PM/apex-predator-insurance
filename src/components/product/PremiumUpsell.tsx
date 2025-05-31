
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, Gift, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumUpsell = () => {
  const [showJumpScare, setShowJumpScare] = useState(false);

  const handlePremiumClick = () => {
    // Jump scare animation trigger
    setShowJumpScare(true);
    setTimeout(() => setShowJumpScare(false), 2000);
    
    // Handle Stripe premium upsell logic here
    console.log('Premium upsell triggered');
  };

  return (
    <section className="mb-16 relative">
      {/* Jump Scare Modal */}
      <AnimatePresence>
        {showJumpScare && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="text-6xl mb-4"
              >
                👑
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">PREMIUM UNLOCKED!</h3>
              <p className="text-lg opacity-90">
                You're about to get the ULTIMATE certificate experience!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-8">
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-4">
          <Crown className="mr-2 h-4 w-4" />
          Limited Time Offer
        </Badge>
        <h2 className="text-3xl font-bold text-apex-black">
          Upgrade to <span className="text-purple-600">Premium</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Make your certificate absolutely legendary
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Standard Certificate */}
        <Card className="p-6 border-2 border-gray-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-gray-400" />
            Standard Certificate
          </h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              High-quality PDF design
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Personalized with your name
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Instant digital delivery
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Standard predator illustration
            </li>
          </ul>
          <div className="text-2xl font-bold text-apex-red mb-4">$9.99</div>
        </Card>

        {/* Premium Certificate */}
        <Card className="p-6 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Badge className="bg-purple-600 text-white">
              <Sparkles className="mr-1 h-3 w-3" />
              PREMIUM
            </Badge>
          </div>
          
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-600" />
            Premium Certificate
          </h3>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="font-medium">Everything in Standard</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="font-medium">Animated digital certificate</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="font-medium">Premium foil-effect design</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="font-medium">Social media templates included</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="font-medium">Exclusive merch discount (20% off)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-500 rounded-full bg-yellow-500"></span>
              <span className="font-medium text-purple-700">Limited edition certificate number</span>
            </li>
          </ul>
          
          <div className="mb-4">
            <div className="text-lg text-gray-500 line-through">$24.99</div>
            <div className="text-2xl font-bold text-purple-600">$14.99</div>
            <div className="text-sm text-purple-600 font-medium">Save $10 today!</div>
          </div>
          
          <Button 
            onClick={handlePremiumClick}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3"
          >
            <Gift className="mr-2 h-4 w-4" />
            Upgrade to Premium
          </Button>
        </Card>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          💎 Premium certificates make the perfect gift and include everything you need to share your adventure
        </p>
      </div>
    </section>
  );
};

export default PremiumUpsell;
