
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, Download, Share2 } from 'lucide-react';
import Certificate from './Certificate';
import ShareAdventure from './ShareAdventure';

interface CertificatePreviewProps {
  selectedPlan?: any;
  onPurchase: () => void;
}

const CertificatePreview = ({ selectedPlan, onPurchase }: CertificatePreviewProps) => {
  const [previewName, setPreviewName] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    if (previewName.trim()) {
      setShowPreview(true);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-xl font-bold text-apex-black mb-4 text-center">
          👀 Preview Your Certificate
        </h3>
        <p className="text-center text-apex-darkgray/70 mb-4">
          See how your certificate will look before you buy!
        </p>
        
        <div className="space-y-4">
          <Input
            placeholder="Enter your name"
            value={previewName}
            onChange={(e) => setPreviewName(e.target.value)}
            className="text-center text-lg"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handlePreview}
              disabled={!previewName.trim()}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview Certificate
            </Button>
          </div>
        </div>
      </Card>

      {showPreview && (
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-xl z-10 flex items-center justify-center">
              <div className="text-white text-2xl font-bold bg-apex-red px-6 py-3 rounded-full shadow-lg">
                PREVIEW - BUY TO REMOVE WATERMARK
              </div>
            </div>
            <Certificate 
              insuranceType={selectedPlan?.name || "Shark Insurance"}
              name={previewName}
              country="Your Destination"
              uniqueId="PREVIEW"
            />
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-apex-darkgray/70">
              Love your certificate? Get the full version and start sharing your adventure!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={onPurchase}
                className="bg-apex-red hover:bg-apex-red/90 text-white px-8 py-3"
                size="lg"
              >
                Buy Now & Get Full Certificate
              </Button>
              
              <ShareAdventure 
                predatorType={selectedPlan?.name?.replace(' Insurance', '') || 'Shark'}
                compact={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatePreview;
