
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, ShoppingCart } from 'lucide-react';
import Certificate from './Certificate';

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
      <Card className="p-6 bg-slate-900 border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2 text-center">
          Preview Your Certificate
        </h3>
        <p className="text-center text-slate-400 text-sm mb-5">
          See exactly how it looks before you buy. Watermark removed on purchase.
        </p>

        <div className="space-y-3">
          <Input
            placeholder="Enter your name"
            value={previewName}
            onChange={(e) => setPreviewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePreview()}
            className="text-center bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
          />
          <Button
            onClick={handlePreview}
            disabled={!previewName.trim()}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview Certificate
          </Button>
        </div>
      </Card>

      {showPreview && (
        <div className="space-y-5">
          {/* Certificate with isPreview — diagonal watermark handled inside component */}
          <Certificate
            insuranceType={selectedPlan?.name || 'Great White Shark'}
            name={previewName}
            country="Your Destination"
            uniqueId="PREVIEW"
            isPreview={true}
          />

          <div className="text-center space-y-3">
            <p className="text-slate-500 text-sm">
              Watermark removed instantly after purchase.
            </p>
            <Button
              onClick={onPurchase}
              className="bg-apex-red hover:bg-apex-red/90 text-white px-8 py-3 text-base font-semibold"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Purchase — US$9.99
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatePreview;
