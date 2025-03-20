
import React, { useState, useEffect } from 'react';

type CertificateProps = {
  insuranceType?: string;
  name?: string;
};

const Certificate: React.FC<CertificateProps> = ({ 
  insuranceType = "Shark Insurance", 
  name = "John Adventurer" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getInsuranceInfo = (type: string) => {
    const info = {
      Shark: {
        icon: "🦈",
        text: "in Australian waters",
        color: "from-blue-500/20 to-cyan-500/20"
      },
      Crocodile: {
        icon: "🐊",
        text: "in tropical rivers",
        color: "from-green-500/20 to-emerald-500/20"
      },
      Lion: {
        icon: "🦁",
        text: "on African safaris",
        color: "from-yellow-500/20 to-amber-500/20"
      },
      Bear: {
        icon: "🐻",
        text: "in national parks",
        color: "from-amber-500/20 to-orange-500/20"
      },
      Scorpion: {
        icon: "🦂",
        text: "in desert regions",
        color: "from-orange-500/20 to-red-500/20"
      },
      Kraken: {
        icon: "🦑",
        text: "in mythical deep seas",
        color: "from-indigo-500/20 to-purple-500/20"
      },
      "Apex Predator": {
        icon: "🏆",
        text: "anywhere danger lurks",
        color: "from-apex-red/20 to-apex-yellow/20"
      }
    };
    
    const key = Object.keys(info).find(k => type.includes(k)) || "Apex Predator";
    return info[key as keyof typeof info];
  };
  
  const info = getInsuranceInfo(insuranceType);
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className={`relative perspective transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="preserve-3d hover:rotate-y-10 transition-all duration-500">
        <div className={`max-w-2xl mx-auto bg-white rounded-xl overflow-hidden shadow-glass backface-hidden bg-gradient-to-br ${info.color}`}>
          <div className="p-8 md:p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-sm uppercase tracking-wider text-apex-black/60">Apex Predator Insurance</div>
                <div className="text-3xl font-bold text-apex-black">Wildlife Shield</div>
              </div>
              <div className="h-16 w-16 rounded-full bg-apex-red flex items-center justify-center">
                <span className="text-white font-bold text-xl">AP</span>
              </div>
            </div>
            
            <div className="text-center my-8">
              <div className="text-sm uppercase tracking-wider text-apex-black/60 mb-2">Certificate of</div>
              <div className="text-4xl font-bold text-apex-red mb-2">{insuranceType}</div>
              <div className="text-6xl my-6">{info.icon}</div>
              <div className="text-lg text-apex-black/80">
                This certifies that
              </div>
              <div className="text-3xl font-bold text-apex-black my-3">{name}</div>
              <div className="text-lg text-apex-black/80 max-w-md mx-auto">
                is now covered for unfortunate {insuranceType.toLowerCase().replace(' insurance', '')} encounters {info.text}.
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-10">
              <div>
                <div className="text-sm text-apex-black/60">ISSUE DATE</div>
                <div className="text-base font-medium">{today}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-apex-black/60">VALID UNTIL</div>
                <div className="text-base font-medium">FOREVER*</div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-apex-black/10 text-center">
              <p className="text-sm text-apex-black/60">
                *Not real insurance. This is a novelty certificate for entertainment purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
