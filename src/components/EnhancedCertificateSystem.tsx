
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Zap, Star, Gift, Download, Share2 } from 'lucide-react';
import ViralCertificate from './ViralCertificate';
import { deadlyAnimals } from '@/data/deadlyAnimals';

interface CertificateRarity {
  level: string;
  name: string;
  icon: string;
  color: string;
  price: number;
  features: string[];
  probability: number;
}

const rarityLevels: CertificateRarity[] = [
  {
    level: 'common',
    name: 'Standard',
    icon: '📜',
    color: 'bg-gray-100 text-gray-800',
    price: 9.99,
    features: ['Basic certificate', 'PDF download', 'Social sharing'],
    probability: 70
  },
  {
    level: 'uncommon',
    name: 'Enhanced',
    icon: '🌟',
    color: 'bg-green-100 text-green-800',
    price: 14.99,
    features: ['Animated elements', 'QR code verification', 'Custom backgrounds'],
    probability: 20
  },
  {
    level: 'rare',
    name: 'Premium',
    icon: '💎',
    color: 'bg-blue-100 text-blue-800',
    price: 24.99,
    features: ['Video certificate', 'NFT option', 'Personalized facts'],
    probability: 7
  },
  {
    level: 'legendary',
    name: 'Elite',
    icon: '👑',
    color: 'bg-purple-100 text-purple-800',
    price: 49.99,
    features: ['3D animation', 'Blockchain verified', 'Exclusive design'],
    probability: 2.5
  },
  {
    level: 'mythic',
    name: 'Apex',
    icon: '🔥',
    color: 'bg-red-100 text-red-800',
    price: 99.99,
    features: ['Ultra rare', 'Custom video message', 'Limited edition'],
    probability: 0.5
  }
];

const EnhancedCertificateSystem = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(deadlyAnimals[0]);
  const [selectedRarity, setSelectedRarity] = useState(rarityLevels[0]);
  const [previewMode, setPreviewMode] = useState('certificate');

  const handleRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * deadlyAnimals.length);
    setSelectedAnimal(deadlyAnimals[randomIndex]);
  };

  const handleRandomRarity = () => {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const rarity of rarityLevels) {
      cumulative += rarity.probability;
      if (random <= cumulative) {
        setSelectedRarity(rarity);
        break;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-apex-black">Enhanced Certificate System</h2>
        <p className="text-lg text-apex-darkgray/70">
          Individual certificates with rarity levels, personalization, and NFT options
        </p>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="rarity">Rarity System</TabsTrigger>
          <TabsTrigger value="nft">NFT Options</TabsTrigger>
          <TabsTrigger value="collection">My Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Animal Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Select Your Predator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {deadlyAnimals.slice(0, 8).map(animal => (
                    <Button
                      key={animal.id}
                      variant={selectedAnimal.id === animal.id ? "default" : "outline"}
                      onClick={() => setSelectedAnimal(animal)}
                      className="h-16 flex flex-col gap-1"
                    >
                      <span className="text-xl">{animal.icon}</span>
                      <span className="text-xs">{animal.name.split(' ')[0]}</span>
                    </Button>
                  ))}
                </div>
                
                <Button onClick={handleRandomAnimal} variant="outline" className="w-full">
                  🎲 Random Animal
                </Button>

                <div className="space-y-2">
                  <h4 className="font-semibold">Selected: {selectedAnimal.name}</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge className={selectedAnimal.rarity === 'mythic' ? 'bg-red-500' : 
                                    selectedAnimal.rarity === 'legendary' ? 'bg-purple-500' : 
                                    selectedAnimal.rarity === 'rare' ? 'bg-blue-500' : 'bg-green-500'}>
                      {selectedAnimal.rarity}
                    </Badge>
                    <Badge variant="outline">
                      Danger: {selectedAnimal.dangerLevel}/5
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedAnimal.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Rarity Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Certificate Rarity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rarityLevels.map(rarity => (
                  <div
                    key={rarity.level}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedRarity.level === rarity.level 
                        ? 'border-apex-red bg-apex-red/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRarity(rarity)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{rarity.icon}</span>
                        <span className="font-semibold">{rarity.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-apex-red">${rarity.price}</div>
                        <div className="text-xs text-muted-foreground">{rarity.probability}% chance</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {rarity.features.join(' • ')}
                    </div>
                  </div>
                ))}
                
                <Button onClick={handleRandomRarity} variant="outline" className="w-full">
                  🎰 Lucky Draw
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ViralCertificate
                  insuranceType={selectedAnimal.name}
                  name="Your Name Here"
                  country={selectedAnimal.locations[0]}
                  isPreview={true}
                  showSocialElements={selectedRarity.level !== 'common'}
                />
                
                <div className="mt-4 space-y-2">
                  <Button className="w-full bg-apex-red hover:bg-apex-red/90">
                    <Gift className="h-4 w-4 mr-2" />
                    Purchase ${selectedRarity.price}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rarity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rarityLevels.map(rarity => (
              <Card key={rarity.level} className="relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold ${rarity.color}`}>
                  {rarity.probability}%
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{rarity.icon}</span>
                    {rarity.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-apex-red">${rarity.price}</div>
                    <ul className="space-y-1">
                      {rarity.features.map(feature => (
                        <li key={feature} className="text-sm flex items-center gap-2">
                          <span className="w-1 h-1 bg-apex-red rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nft" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-2xl font-bold mb-4">NFT Certificates Coming Soon</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Transform your certificate into a unique blockchain asset with verifiable rarity traits
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">⛓️</div>
                  <h4 className="font-semibold">Blockchain Verified</h4>
                  <p className="text-sm text-muted-foreground">Immutable proof of survival</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🎨</div>
                  <h4 className="font-semibold">Unique Traits</h4>
                  <p className="text-sm text-muted-foreground">Animal, location, rarity combos</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-semibold">Tradeable</h4>
                  <p className="text-sm text-muted-foreground">Marketplace for collectors</p>
                </div>
              </div>
              
              <Button size="lg" variant="outline">
                Join NFT Waitlist
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collection" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Your Certificate Collection</h3>
              <p className="text-muted-foreground mb-4">
                Purchase certificates to start building your survival collection
              </p>
              <Button>Get Your First Certificate</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedCertificateSystem;
