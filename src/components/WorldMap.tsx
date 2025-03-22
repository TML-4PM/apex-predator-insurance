
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
      {/* Enhanced background with texture and gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C] to-[#221F26]"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-no-repeat bg-cover"></div>
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '30px 30px' 
        }}></div>
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
              {/* Improved map container with higher contrast and clearer visualization */}
              <div className="absolute inset-0 bg-[#0D1117]/80"></div>
              
              {/* Clearer world map background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-no-repeat bg-cover opacity-40 mix-blend-soft-light"></div>
              
              {/* Enhanced grid pattern */}
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
                backgroundSize: '20px 20px' 
              }}></div>
              
              {/* Map overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/40 to-[#1A1F2C]/20"></div>
              
              {/* Continents overlay silhouette */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589519160732-57fc6437cc72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-no-repeat bg-cover opacity-50 mix-blend-overlay"></div>
              
              {/* Add a subtle glow effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#33C3F0]/10 opacity-30"></div>
              </div>
              
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
