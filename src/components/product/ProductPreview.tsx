
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Package, Users, Crown } from 'lucide-react';
import DynamicRiskCard from '@/components/DynamicRiskCard';
import RewardedAdDiscount from '@/components/RewardedAdDiscount';
import { BUNDLE_PLANS, ULTIMATE_BUNDLE, getWholesalePlans } from '@/constants/pricing';

const ProductPreview = () => {
  const [selectedAnimal, setSelectedAnimal] = useState('Shark');
  const [showRiskCard, setShowRiskCard] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(9.99);

  const animals = [
    { name: 'Shark', icon: '🦈', risk: 85, price: 9.99, category: 'marine' },
    { name: 'Lion', icon: '🦁', risk: 92, price: 9.99, category: 'terrestrial' },
    { name: 'Bear', icon: '🐻', risk: 88, price: 9.99, category: 'terrestrial' },
    { name: 'Snake', icon: '🐍', risk: 75, price: 9.99, category: 'reptile' },
    { name: 'Eagle', icon: '🦅', risk: 65, price: 9.99, category: 'aerial' },
    { name: 'Spider', icon: '🕷️', risk: 70, price: 9.99, category: 'insect' }
  ];

  const selectedAnimalData = animals.find(a => a.name === selectedAnimal) || animals[0];
  const wholesalePlans = getWholesalePlans();

  const handleDiscountApplied = (discountPercentage: number) => {
    setDiscountApplied(true);
    setFinalPrice(9.99 * (1 - discountPercentage / 100));
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-apex-black mb-4">
          Complete Predator Insurance Collection
        </h2>
        <p className="text-apex-darkgray/70 max-w-2xl mx-auto">
          All 79 apex predators now standardized at $9.99 each, with category bundles and wholesale pricing available.
        </p>
      </div>

      {/* Individual Animal Selection */}
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
              <Badge className="mt-2 bg-green-600 text-white">
                $9.99 Each
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Bundle Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {BUNDLE_PLANS.map((bundle) => (
          <Card key={bundle.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-3">{bundle.icon}</div>
              <h3 className="font-bold text-lg mb-2">{bundle.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{bundle.description}</p>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-apex-red">${bundle.price}</div>
                <Badge className="bg-green-600 text-white">
                  {bundle.animalCount} Animals
                </Badge>
                {bundle.savings && (
                  <div className="text-sm text-green-600 font-medium">
                    Save ${bundle.savings.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}

        {/* Ultimate Bundle */}
        <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-gold">
          <div className="text-center">
            <Crown className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
            <h3 className="font-bold text-lg mb-2">{ULTIMATE_BUNDLE.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{ULTIMATE_BUNDLE.description}</p>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-apex-red">${ULTIMATE_BUNDLE.price}</div>
              <Badge className="bg-yellow-500 text-white">
                All {ULTIMATE_BUNDLE.animalCount} Animals
              </Badge>
              <div className="text-sm text-green-600 font-medium">
                Save ${ULTIMATE_BUNDLE.savings?.toFixed(2)}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Wholesale Pricing */}
      <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
        <div className="text-center mb-6">
          <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
          <h3 className="text-2xl font-bold mb-2">Wholesale Pricing Available</h3>
          <p className="text-gray-600">Volume discounts for businesses and resellers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wholesalePlans.map((plan) => (
            <div key={plan.id} className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl mb-2">{plan.icon}</div>
              <h4 className="font-semibold text-sm mb-1">{plan.name}</h4>
              <div className="text-lg font-bold text-blue-600">${plan.price}</div>
              <div className="text-xs text-gray-500">
                Min: {plan.minQuantity}+ certificates
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Rewarded Ad Discount */}
      <div className="mb-8">
        <RewardedAdDiscount 
          originalPrice={9.99}
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
                  $9.99
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
                Standardized $9.99 pricing for all 79 apex predators. 
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
      <div className="text-center space-y-4">
        <Button 
          size="lg"
          className="bg-apex-red hover:bg-apex-red/90 text-white px-8 py-4 text-lg mr-4"
        >
          Get Single Certificate - ${finalPrice.toFixed(2)}
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="border-apex-red text-apex-red hover:bg-apex-red/10 px-8 py-4 text-lg"
        >
          <Package className="mr-2 h-5 w-5" />
          View All Bundles
        </Button>
        <p className="text-sm text-apex-darkgray/70 mt-2">
          All 79 animals • Category bundles • Wholesale pricing • Instant download
        </p>
      </div>
    </section>
  );
};

export default ProductPreview;
