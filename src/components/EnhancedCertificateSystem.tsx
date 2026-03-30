
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Share2, ShoppingCart, Zap } from 'lucide-react';
import Certificate from './Certificate';
import { deadlyAnimals } from '@/data/deadlyAnimals';
import { useNavigate } from 'react-router-dom';

const EnhancedCertificateSystem = () => {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState(deadlyAnimals[0]);
  const [previewName, setPreviewName] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * deadlyAnimals.length);
    setSelectedAnimal(deadlyAnimals[randomIndex]);
    setShowPreview(false);
  };

  const handlePreview = () => {
    if (previewName.trim()) setShowPreview(true);
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-apex-black mb-2">Build Your Certificate</h2>
        <p className="text-gray-600">Pick a predator, enter your name, preview free — purchase for US$9.99.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left — selector */}
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-apex-red" />
                Select Your Predator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {deadlyAnimals.slice(0, 20).map(animal => (
                  <button
                    key={animal.id}
                    onClick={() => { setSelectedAnimal(animal); setShowPreview(false); }}
                    className={`text-left p-2.5 rounded-lg border text-sm transition-all ${
                      selectedAnimal.id === animal.id
                        ? 'bg-apex-red text-white border-apex-red font-semibold'
                        : 'bg-white border-gray-200 hover:border-apex-red hover:text-apex-red'
                    }`}
                  >
                    <span className="mr-1.5">{animal.icon}</span>
                    {animal.name}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRandomAnimal}
                className="w-full border-dashed"
              >
                🎲 Random Predator
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Name on the Certificate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Enter your name"
                value={previewName}
                onChange={e => setPreviewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePreview()}
                className="text-center"
              />
              <Button
                onClick={handlePreview}
                disabled={!previewName.trim()}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white"
              >
                Preview Certificate →
              </Button>
            </CardContent>
          </Card>

          {/* Pricing — single tier */}
          <Card className="border-apex-red/20 bg-apex-red/5">
            <CardContent className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-apex-black">Single Certificate</div>
                  <div className="text-sm text-gray-600">Any predator · Instant download · Shareable</div>
                </div>
                <div className="text-2xl font-black text-apex-red">US$9.99</div>
              </div>
              <Button
                onClick={() => navigate('/plans')}
                className="w-full mt-4 bg-apex-red hover:bg-apex-red/90 text-white"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Get Your Certificate
              </Button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Want more? <a href="/plans" className="underline">See bundles from US$39.99</a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right — live preview */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {showPreview ? '👀 Preview (watermark removed on purchase)' : '👇 Preview will appear here'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="space-y-4">
                  <Certificate
                    insuranceType={selectedAnimal.name}
                    name={previewName}
                    country={selectedAnimal.locations?.[0] || 'Worldwide'}
                    isPreview={true}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" disabled>
                      <Download className="h-3 w-3 mr-1" />
                      Download (after purchase)
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" disabled>
                      <Share2 className="h-3 w-3 mr-1" />
                      Share (after purchase)
                    </Button>
                  </div>
                  <Button
                    onClick={() => navigate(`/plans`)}
                    className="w-full bg-apex-red hover:bg-apex-red/90 text-white font-semibold"
                  >
                    Purchase & Remove Watermark — US$9.99
                  </Button>
                </div>
              ) : (
                <div className="min-h-64 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                  Select a predator, enter your name, and hit Preview.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCertificateSystem;
