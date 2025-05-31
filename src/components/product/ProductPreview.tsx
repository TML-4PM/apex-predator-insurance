
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Share2, Zap } from 'lucide-react';
import DynamicRiskCard from '@/components/DynamicRiskCard';
import RewardedAdDiscount from '@/components/RewardedAdDiscount';

const ProductPreview = () => {
  const [selectedAnimal, setSelectedAnimal] = useState('Shark');
  const [showRiskCard, setShowRiskCard] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(29);

  const animals = [
    { name: 'Shark', icon: '🦈', risk: 85, price: 29 },
    { name: 'Crocodile', icon: '🐊', risk: 78, price: 27 },
    { name: 'Lion', icon: '🦁', risk: 92, price: 32 },
    { name: 'Bear', icon: '🐻', risk: 88, price: 30 },
    { name: 'Snake', icon: '🐍', risk: 75, price: 25 },
    { name: 'Tiger', icon: '🐅', risk: 95, price: 35 }
  ];

  const selectedAnimalData = animals.find(a => a.name === selectedAnimal) || animals[0];

  const handleDiscountApplied = (discountPercentage: number) => {
    setDiscountApplied(true);
    setFinalPrice(selectedAnimalData.price * (1 - discountPercentage / 100));
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-apex-black mb-4">
          Choose Your Adventure & Get Your Risk Card
        </h2>
        <p className="text-apex-darkgray/70 max-w-2xl mx-auto">
          Select your predator encounter type and generate a personalized risk assessment card 
          perfect for sharing on social media.
        </p>
      </div>

      {/* Animal Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {animals.map((animal) => (
          <Card 
            key={animal.name}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedAnimal === animal.name 
                ? 'ring-2 ring-apex-red bg-apex-red/5' 
                : ''
            }`}
            onClick={() => setSelectedAnimal(animal.name)}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{animal.icon}</div>
              <div className="font-semibold text-sm">{animal.name}</div>
              <Badge 
                className={`mt-2 ${
                  animal.risk >= 90 ? 'bg-red-500' :
                  animal.risk >= 80 ? 'bg-orange-500' :
                  'bg-yellow-500'
                } text-white`}
              >
                {animal.risk}% Risk
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Rewarded Ad Discount */}
      <div className="mb-8">
        <RewardedAdDiscount 
          originalPrice={selectedAnimalData.price}
          onDiscountApplied={handleDiscountApplied}
        />
      </div>

      {/* Preview Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 mb-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-apex-black mb-2">
            {selectedAnimal} Insurance Preview
          </h3>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-apex-red text-white">
              Risk Level: {selectedAnimalData.risk}%
            </Badge>
            <Badge className={`text-white ${discountApplied ? 'bg-green-600' : 'bg-blue-600'}`}>
              Price: ${finalPrice.toFixed(2)}
              {discountApplied && (
                <span className="ml-1 line-through text-gray-300">
                  ${selectedAnimalData.price}
                </span>
              )}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1">
            <div className="text-6xl text-center mb-4">
              {selectedAnimalData.icon}
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-apex-black mb-2">
                {selectedAnimal} Encounter Coverage
              </h4>
              <p className="text-apex-darkgray/70 mb-4">
                Up to $50,000 coverage for {selectedAnimal.toLowerCase()} encounters worldwide.
                Instant digital certificate with premium design.
              </p>
              
              <Button 
                onClick={() => setShowRiskCard(true)}
                className="bg-apex-red hover:bg-apex-red/90 text-white"
              >
                <Zap className="mr-2 h-4 w-4" />
                Generate Risk Card
              </Button>
            </div>
          </div>

          {showRiskCard && (
            <div className="flex-1">
              <DynamicRiskCard
                animal={selectedAnimal}
                riskScore={selectedAnimalData.risk}
                quoteCost={`$${finalPrice.toFixed(2)}`}
                onCardGenerated={(url) => {
                  console.log('Risk card generated:', url);
                }}
              />
            </div>
          )}
        </div>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <Button 
          size="lg"
          className="bg-apex-red hover:bg-apex-red/90 text-white px-8 py-4 text-lg"
        >
          Get Your Certificate - ${finalPrice.toFixed(2)}
        </Button>
        <p className="text-sm text-apex-darkgray/70 mt-2">
          Instant download • Share on social media • Premium quality
        </p>
      </div>
    </section>
  );
};

export default ProductPreview;
