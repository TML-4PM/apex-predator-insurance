
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Badge } from '@/components/ui/badge';
import { QrCode, Share2, Download } from 'lucide-react';

type ViralCertificateProps = {
  insuranceType?: string;
  name?: string;
  country?: string;
  date?: string;
  uniqueId?: string;
  multipleItems?: Array<{ id: string; name: string; icon: string }>;
  isPreview?: boolean;
  showSocialElements?: boolean;
};

const ViralCertificate: React.FC<ViralCertificateProps> = ({ 
  insuranceType = "Shark Certificate", 
  name = "Adventure Seeker",
  country = "Bali",
  date = new Date().toISOString().split('T')[0],
  uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase(),
  multipleItems,
  isPreview = false,
  showSocialElements = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (!isPreview && showSocialElements) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isPreview, showSocialElements]);

  const getPredatorInfo = (type: string) => {
    const predatorData = {
      Shark: { icon: "🦈", color: "from-blue-500 to-cyan-500", emoji: "🌊" },
      Crocodile: { icon: "🐊", color: "from-green-500 to-emerald-500", emoji: "🏞️" },
      Lion: { icon: "🦁", color: "from-yellow-500 to-amber-500", emoji: "🌍" },
      Bear: { icon: "🐻", color: "from-amber-600 to-orange-600", emoji: "🏔️" },
    };
    
    for (const [key, value] of Object.entries(predatorData)) {
      if (type.includes(key)) return value;
    }
    return predatorData.Shark;
  };

  const info = getPredatorInfo(insuranceType);
  const isMultiple = multipleItems && multipleItems.length > 1;

  return (
    <motion.div 
      className={`relative transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-lg mx-auto">
        {/* Certificate Card */}
        <div className={`relative bg-gradient-to-br ${info.color} p-1 rounded-2xl shadow-2xl`}>
          <div className="bg-white rounded-xl p-6 relative overflow-hidden">
            
            {/* Preview Watermark */}
            {isPreview && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px] rounded-xl z-30 flex items-center justify-center">
                <div className="bg-apex-red text-white px-4 py-2 rounded-full font-bold text-sm transform rotate-12">
                  PREVIEW
                </div>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-6">
              <Badge className="bg-apex-red text-white mb-3">ADVENTURE INSURANCE</Badge>
              <h2 className="text-2xl font-bold text-apex-black">Wildlife Shield</h2>
              <p className="text-sm text-apex-darkgray/70">Certificate of Coverage</p>
            </div>

            {/* Main Content */}
            <div className="text-center space-y-4">
              <div className="text-5xl mb-4">
                {isMultiple 
                  ? multipleItems.slice(0, 3).map(item => item.icon).join(' ')
                  : info.icon
                }
              </div>
              
              <div>
                <p className="text-sm text-apex-darkgray/70 mb-1">This certifies that</p>
                <h3 className="text-xl font-bold text-apex-black">{name}</h3>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-apex-darkgray/70 mb-1">is covered for</p>
                <p className="font-semibold text-apex-black">
                  {isMultiple ? `${multipleItems.length} Predator Encounters` : insuranceType}
                </p>
                <p className="text-xs text-apex-darkgray/60">in {country} {info.emoji}</p>
              </div>

              <div className="flex justify-between text-center">
                <div>
                  <p className="text-xs text-apex-darkgray/70">Coverage</p>
                  <p className="font-bold text-apex-red">$50,000</p>
                </div>
                <div>
                  <p className="text-xs text-apex-darkgray/70">Valid Until</p>
                  <p className="font-semibold text-apex-black text-xs">
                    {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <p className="text-apex-darkgray/70">Certificate ID</p>
                  <p className="font-mono text-apex-black">{uniqueId}</p>
                </div>
                {showSocialElements && (
                  <div className="flex items-center gap-2">
                    <QrCode size={24} className="text-apex-darkgray/70" />
                    <div className="text-right">
                      <p className="text-apex-darkgray/70">Scan to verify</p>
                      <p className="text-apex-red font-semibold">#AdventureInsured</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Badges */}
            {showSocialElements && !isPreview && (
              <div className="absolute top-4 right-4 space-y-2">
                <Badge className="bg-pink-500 text-white text-xs">📸 Share Ready</Badge>
                <Badge className="bg-purple-500 text-white text-xs">🔥 Trending</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action for Preview */}
        {isPreview && (
          <div className="mt-4 text-center">
            <p className="text-sm text-apex-darkgray/70 mb-2">
              Ready to make your friends jealous?
            </p>
            <div className="flex gap-2 justify-center">
              <Badge className="bg-green-500 text-white">✓ Instant Download</Badge>
              <Badge className="bg-blue-500 text-white">✓ Share Everywhere</Badge>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ViralCertificate;
