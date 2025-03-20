
import React, { useEffect, useRef, useState } from 'react';
import { Globe, Skull, Paw, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const dangerZones = [
  { 
    id: 1, 
    name: 'Great Barrier Reef', 
    coordinates: { x: 82, y: 58 }, 
    threat: 'Sharks',
    description: 'Home to various shark species including Great Whites and Tiger Sharks',
    color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 2, 
    name: 'Amazon Rainforest', 
    coordinates: { x: 30, y: 53 }, 
    threat: 'Jaguars',
    description: 'The jaguar is the largest cat in the Americas and an apex predator',
    color: '#F97316',
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 3, 
    name: 'Serengeti', 
    coordinates: { x: 55, y: 53 }, 
    threat: 'Lions',
    description: 'The lion population here is among the largest and most studied in Africa',
    color: '#D946EF',
    image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 4, 
    name: 'Kakadu National Park', 
    coordinates: { x: 85, y: 57 }, 
    threat: 'Crocodiles',
    description: 'Saltwater crocodiles here are among the largest and most aggressive in the world',
    color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1610052178570-97bc8e3a0a7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 5, 
    name: 'Yellowstone', 
    coordinates: { x: 18, y: 38 }, 
    threat: 'Bears',
    description: 'Both grizzly and black bears roam this vast wilderness',
    color: '#EA384C',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 6, 
    name: 'Borneo', 
    coordinates: { x: 77, y: 54 }, 
    threat: 'Komodo Dragons',
    description: 'These massive lizards have a venomous bite and can take down large prey',
    color: '#33C3F0',
    image: 'https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
];

const WorldMap = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleZoneClick = (zoneId: number) => {
    setActiveZone(activeZone === zoneId ? null : zoneId);
  };

  const getThreatIcon = (threat: string) => {
    switch(threat.toLowerCase()) {
      case 'sharks':
        return <Skull className="h-5 w-5" />;
      case 'bears':
      case 'lions':
      case 'jaguars':
        return <Paw className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#1A1F2C] to-[#221F26] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-no-repeat bg-cover opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1F2C]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-apex-black/50 backdrop-blur-sm border border-white/10"
          >
            <Globe className="h-5 w-5 text-apex-red" />
            <span className="text-white/90 font-medium">Interactive Danger Map</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
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
        
        <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto rounded-xl overflow-hidden shadow-elevation">
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
              <img 
                src="https://images.unsplash.com/photo-1589519160732-57fc6437cc72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="World Map"
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/70 to-[#1A1F2C]/40 backdrop-blur-xs"></div>
              
              {/* Animated connections between danger zones */}
              <svg className="absolute inset-0 w-full h-full z-0 opacity-60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EA384C" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                
                {dangerZones.map((zone, index) => {
                  const nextZone = dangerZones[(index + 1) % dangerZones.length];
                  return (
                    <motion.path
                      key={`line-${zone.id}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: index * 0.3 }}
                      d={`M${zone.coordinates.x} ${zone.coordinates.y} L${nextZone.coordinates.x} ${nextZone.coordinates.y}`}
                      stroke="url(#gradient)"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="5,5"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              
              {dangerZones.map((zone) => (
                <React.Fragment key={zone.id}>
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 * zone.id }}
                    whileHover={{ scale: 1.2 }}
                    className={`absolute cursor-pointer z-10`}
                    style={{ 
                      left: `${zone.coordinates.x}%`, 
                      top: `${zone.coordinates.y}%` 
                    }}
                    onClick={() => handleZoneClick(zone.id)}
                    onMouseEnter={() => setHoveredZone(zone.id)}
                    onMouseLeave={() => setHoveredZone(null)}
                    aria-label={`Danger zone: ${zone.name}`}
                  >
                    <div className={`relative p-1 rounded-full 
                      ${activeZone === zone.id ? 'bg-white' : 'bg-apex-black/60 hover:bg-apex-black/80'} 
                      backdrop-blur-sm transition-all duration-300 shadow-lg border border-white/20`}
                    >
                      <AlertTriangle 
                        className={`h-7 w-7 
                          ${activeZone === zone.id ? `text-[${zone.color}]` : hoveredZone === zone.id ? 'text-white' : 'text-apex-red'} 
                          transition-all duration-300`}
                      />
                      
                      {hoveredZone === zone.id && !activeZone && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-medium text-white whitespace-nowrap bg-apex-black/80 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none"
                        >
                          {zone.name}
                        </motion.div>
                      )}
                    </div>
                    
                    <div 
                      className={`absolute -inset-1 rounded-full animate-pulse ${activeZone === zone.id ? `bg-[${zone.color}]/20` : 'bg-apex-red/20'} blur-sm transition-all duration-300`} 
                      style={{ animationDelay: `${zone.id * 0.2}s` }}
                    ></div>
                  </motion.button>
                  
                  {activeZone === zone.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute z-20 bg-[#1A1F2C]/90 backdrop-blur-md px-5 py-4 rounded-xl shadow-xl border border-white/10 max-w-sm overflow-hidden"
                      style={{ 
                        left: `${zone.coordinates.x > 70 ? zone.coordinates.x - 30 : zone.coordinates.x + 5}%`, 
                        top: `${zone.coordinates.y > 70 ? zone.coordinates.y - 30 : zone.coordinates.y + 5}%` 
                      }}
                    >
                      <img
                        src={zone.image}
                        alt={zone.threat}
                        className="w-full h-32 object-cover rounded-lg mb-3 shadow-md"
                      />
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`flex items-center justify-center h-7 w-7 rounded-lg`} style={{ backgroundColor: zone.color }}>
                          {getThreatIcon(zone.threat)}
                        </div>
                        <h3 className="text-xl font-bold text-white">{zone.name}</h3>
                      </div>
                      
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-apex-black/50 rounded-full mb-3">
                        <AlertTriangle className="h-3.5 w-3.5 text-apex-red" />
                        <p className="text-sm font-semibold text-apex-red">Threat: {zone.threat}</p>
                      </div>
                      
                      <p className="text-white/80 text-sm">{zone.description}</p>
                      
                      <button 
                        onClick={() => setActiveZone(null)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white/60 hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
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
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-apex-black/30 backdrop-blur-sm rounded-lg border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-apex-red animate-pulse"></span>
            <p className="text-white/70 text-sm">
              <span className="font-medium text-white">6 predator zones</span> mapped for your adventurous spirit
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
