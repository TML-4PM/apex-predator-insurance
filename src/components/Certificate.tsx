import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

type CertificateProps = {
  insuranceType?: string;
  name?: string;
  country?: string;
  date?: string;
  uniqueId?: string;
};

const Certificate: React.FC<CertificateProps> = ({ 
  insuranceType = "Shark Insurance", 
  name = "John Adventurer",
  country = "Australia",
  date = new Date().toISOString().split('T')[0],
  uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase()
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && !animationComplete) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setAnimationComplete(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, animationComplete]);
  
  const getInsuranceInfo = (type: string) => {
    const info = {
      Shark: {
        icon: "🦈",
        text: "in Australian waters",
        color: "from-blue-500/20 to-cyan-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232E86AB' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-blue-500/5 to-cyan-500/10"
      },
      Crocodile: {
        icon: "🐊",
        text: "in tropical rivers",
        color: "from-green-500/20 to-emerald-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-green-500/5 to-emerald-500/10"
      },
      Lion: {
        icon: "🦁",
        text: "on African safaris",
        color: "from-yellow-500/20 to-amber-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D97706' fill-opacity='0.08' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-yellow-500/5 to-amber-500/10"
      },
      Bear: {
        icon: "🐻",
        text: "in national parks",
        color: "from-amber-500/20 to-orange-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C2410C' fill-opacity='0.07'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6h-2c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-amber-500/5 to-orange-500/10"
      },
      Scorpion: {
        icon: "🦂",
        text: "in desert regions",
        color: "from-orange-500/20 to-red-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23B91C1C' fill-opacity='0.06'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-orange-500/5 to-red-500/10"
      },
      Spider: {
        icon: "🕷️",
        text: "in tropical regions",
        color: "from-purple-500/20 to-violet-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237E22CE' fill-opacity='0.07' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-purple-500/5 to-violet-500/10"
      },
      Snake: {
        icon: "🐍",
        text: "in wilderness areas",
        color: "from-emerald-500/20 to-teal-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%230F766E' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-emerald-500/5 to-teal-500/10"
      },
      Elephant: {
        icon: "🐘",
        text: "in wildlife reserves",
        color: "from-gray-500/20 to-slate-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23475569' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-gray-500/5 to-slate-500/10"
      },
      Jellyfish: {
        icon: "🪼",
        text: "in coastal waters",
        color: "from-pink-500/20 to-fuchsia-500/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23DB2777' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-pink-500/5 to-fuchsia-500/10"
      },
      "Apex Predator": {
        icon: "🏆",
        text: "anywhere danger lurks",
        color: "from-apex-red/20 to-apex-yellow/20",
        pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E94444' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        gradientOverlay: "bg-gradient-to-br from-apex-red/5 to-apex-yellow/10"
      }
    };
    
    for (const [key, value] of Object.entries(info)) {
      if (type.includes(key)) {
        return value;
      }
    }
    
    const firstChar = type.charAt(0).toUpperCase();
    const charCode = firstChar.charCodeAt(0);
    const keys = Object.keys(info);
    const randomIndex = charCode % keys.length;
    const randomKey = keys[randomIndex] as keyof typeof info;
    
    const result = {...info[randomKey]};
    if (type.includes('Snake')) result.icon = '🐍';
    else if (type.includes('Spider')) result.icon = '🕷️';
    else if (type.includes('Bear')) result.icon = '🐻';
    
    return result;
  };
  
  const info = getInsuranceInfo(insuranceType);
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  const expiryDateFormatted = expiryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className={`relative transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <motion.div 
        className="preserve-3d hover:rotate-y-10 transition-all duration-500"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div 
          className={`max-w-2xl mx-auto bg-white rounded-xl overflow-hidden shadow-glass backface-hidden ${info.color}`}
          style={{ 
            backgroundImage: info.pattern,
            backgroundSize: "auto",
            backgroundRepeat: "repeat",
          }}
        >
          <div className={`relative ${info.gradientOverlay} backdrop-blur-[1px]`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl opacity-10">
                {info.icon}
              </div>
            </div>
            
            <div className="relative z-10 p-8 md:p-10">
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
                <div className="text-6xl my-6 animate-pulse">{info.icon}</div>
                <div className="text-lg text-apex-black/80">
                  This certifies that
                </div>
                <div className="text-3xl font-bold text-apex-black my-3">{name}</div>
                <div className="text-lg text-apex-black/80 max-w-md mx-auto">
                  is now covered for unfortunate {insuranceType.toLowerCase().replace(' insurance', '')} encounters {info.text}.
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
                <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-sm text-apex-black/60">POLICY LOCATION</div>
                  <div className="text-base font-medium flex items-center">
                    <span className="mr-1">📍</span> {country}
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-sm text-apex-black/60">POLICY ID</div>
                  <div className="text-base font-medium flex items-center">
                    <span className="mr-1">🔢</span> {uniqueId}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-6">
                <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-sm text-apex-black/60">ISSUE DATE</div>
                  <div className="text-base font-medium">{today}</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg text-right">
                  <div className="text-sm text-apex-black/60">VALID UNTIL</div>
                  <div className="text-base font-medium">{expiryDateFormatted}</div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-apex-black/10 text-center">
                <p className="text-sm text-apex-black/60">
                  Coverage up to $50,000 for accidental death by {insuranceType.toLowerCase().replace(' insurance', '')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Certificate;
