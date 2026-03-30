
import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { dangerZones } from '@/data/dangerZones';
import ZoneConnections from './worldmap/ZoneConnections';
import ZoneMarker from './worldmap/ZoneMarker';
import ZoneDetails from './worldmap/ZoneDetails';

const WorldMap = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleZoneClick = (zoneId: number) => {
    setActiveZone(activeZone === zoneId ? null : zoneId);
  };

  const activeZoneData = activeZone ? dangerZones.find(zone => zone.id === activeZone) : null;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C] to-[#221F26]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1F2C]/80"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-apex-black/70 backdrop-blur-sm border border-white/10 shadow-lg"
          >
            <Globe className="h-5 w-5 text-apex-red" />
            <span className="text-white/90 font-medium">Interactive Danger Map</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            Global Apex Predator Zones
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70"
          >
            Explore where our brave adventurers face off against the world's deadliest predators.
            <span className="block mt-2 text-apex-red font-medium">Click on the markers to learn more.</span>
          </motion.p>
        </div>
        
        <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/20">
          {!isMapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1A1F2C]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apex-red"></div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
              {/* Dark base */}
              <div className="absolute inset-0 bg-[#0D1117]"></div>
              
              {/* SVG World Map */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="1000" height="500" fill="url(#grid)" />
                
                {/* Simplified continent outlines */}
                {/* North America */}
                <path d="M120,60 L180,55 L220,70 L250,90 L260,120 L270,150 L250,170 L230,190 L210,200 L200,220 L180,230 L170,210 L160,200 L140,190 L130,170 L120,150 L110,130 L105,100 L110,80 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                {/* Central America */}
                <path d="M180,230 L190,240 L195,260 L200,270 L210,280 L205,290 L195,285 L185,270 L175,250 L170,240 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                {/* South America */}
                <path d="M210,290 L230,280 L260,290 L280,310 L290,340 L300,370 L290,400 L270,430 L250,450 L240,440 L230,410 L220,380 L210,350 L200,320 L205,300 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                {/* Europe */}
                <path d="M450,60 L480,55 L510,60 L530,70 L540,90 L530,110 L520,120 L500,130 L480,135 L460,130 L445,120 L440,100 L445,80 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                {/* Africa */}
                <path d="M450,160 L480,150 L520,155 L550,170 L570,200 L580,240 L575,280 L560,320 L540,360 L520,380 L500,390 L480,380 L460,350 L445,310 L440,270 L435,230 L440,190 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                {/* Asia */}
                <path d="M540,50 L600,45 L660,50 L720,60 L780,70 L820,90 L840,110 L830,140 L800,160 L760,170 L720,175 L680,180 L640,175 L600,165 L570,150 L550,130 L540,100 L535,75 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                {/* India */}
                <path d="M640,175 L660,190 L670,220 L665,260 L650,280 L635,270 L625,240 L620,210 L625,190 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                {/* Southeast Asia */}
                <path d="M720,175 L750,190 L770,210 L780,240 L775,260 L760,250 L740,230 L730,210 L720,195 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                {/* Australia */}
                <path d="M760,320 L810,310 L860,320 L890,340 L900,370 L890,400 L860,420 L820,425 L780,410 L760,390 L750,360 L755,340 Z" 
                  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                
                {/* Equator line */}
                <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="10,10"/>
              </svg>
              
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/30 to-[#1A1F2C]/10 pointer-events-none"></div>
              
              <ZoneConnections zones={dangerZones} />
              
              {dangerZones.map((zone) => (
                <React.Fragment key={zone.id}>
                  <ZoneMarker 
                    zone={zone}
                    isActive={activeZone === zone.id}
                    isHovered={hoveredZone === zone.id}
                    onClick={() => handleZoneClick(zone.id)}
                    onHover={setHoveredZone}
                  />
                  
                  {activeZone === zone.id && activeZoneData && (
                    <ZoneDetails 
                      zone={activeZoneData} 
                      onClose={() => setActiveZone(null)} 
                    />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </div>
        
        <div className="max-w-3xl mx-auto text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-apex-black/50 backdrop-blur-sm rounded-lg border border-white/10 shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-apex-red animate-pulse"></span>
            <p className="text-white/70 text-sm">
              <span className="font-medium text-white">{dangerZones.length} predator zones</span> mapped for your adventurous spirit
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
