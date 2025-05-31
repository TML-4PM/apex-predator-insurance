
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Download, Printer } from 'lucide-react';
import Certificate from '@/components/Certificate';

interface ProductPreviewProps {
  selectedPredator: string;
}

const ProductPreview = ({ selectedPredator }: ProductPreviewProps) => {
  const [viewMode, setViewMode] = useState<'digital' | 'physical'>('digital');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Preview Display */}
      <div className="order-2 lg:order-1">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'digital' | 'physical')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="digital" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Digital PDF
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Physical Print
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="digital">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold mb-4">Premium Digital Design</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• High-resolution PDF (300 dpi), art-print quality</li>
                <li>• Portrait orientation, 8×10 in (fits standard frames)</li>
                <li>• Full-colour illustration of your chosen predator</li>
                <li>• Personalisation with your name and unique "Policy No."</li>
                <li>• Date of issue for authenticity</li>
              </ul>
              
              <div className="bg-white/50 rounded-lg p-4">
                <Certificate 
                  insuranceType={`${selectedPredator} Insurance`}
                  name="Your Name Here"
                  country="Your Destination"
                  uniqueId="PREVIEW"
                />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="physical">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="text-xl font-bold mb-4">Optional Physical Print</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Thick matte cardstock (200 gsm)</li>
                <li>• Protective clear sleeve for posting</li>
                <li>• Ready to frame, display or gift</li>
                <li>• Professional printing quality</li>
                <li>• Tracked shipping included</li>
              </ul>
              
              <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500 py-8">
                  <Printer className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Professional Print Preview</p>
                  <p className="text-sm">Your certificate printed on premium cardstock</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Description */}
      <div className="order-1 lg:order-2">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-apex-black mb-6">
            Professional Quality That Impresses
          </h3>
          
          <div className="space-y-4 text-gray-600">
            <p>
              Our certificates aren't just novelty items—they're designed with the same attention to detail as professional documents.
            </p>
            
            <p>
              Each certificate features stunning wildlife illustrations, premium typography, and personalized details that make it uniquely yours.
            </p>
            
            <p className="font-semibold text-apex-red">
              Perfect for framing, gifting, or starting conversations about your adventurous spirit.
            </p>
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button variant="outline" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />
              Preview More
            </Button>
            <Button className="flex-1 bg-apex-red hover:bg-apex-red/90">
              Get Yours Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
