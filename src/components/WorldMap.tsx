
import React, { useEffect, useRef } from 'react';
import { ShieldAlert } from 'lucide-react';

const dangerZones = [
  { 
    id: 1, 
    name: 'Great Barrier Reef', 
    coordinates: { x: 82, y: 58 }, 
    threat: 'Sharks',
    description: 'Home to various shark species including Great Whites and Tiger Sharks'
  },
  { 
    id: 2, 
    name: 'Amazon Rainforest', 
    coordinates: { x: 30, y: 53 }, 
    threat: 'Jaguars',
    description: 'The jaguar is the largest cat in the Americas and an apex predator'
  },
  { 
    id: 3, 
    name: 'Serengeti', 
    coordinates: { x: 55, y: 53 }, 
    threat: 'Lions',
    description: 'The lion population here is among the largest and most studied in Africa'
  },
  { 
    id: 4, 
    name: 'Kakadu National Park', 
    coordinates: { x: 85, y: 57 }, 
    threat: 'Crocodiles',
    description: 'Saltwater crocodiles here are among the largest and most aggressive in the world'
  },
  { 
    id: 5, 
    name: 'Yellowstone', 
    coordinates: { x: 18, y: 38 }, 
    threat: 'Bears',
    description: 'Both grizzly and black bears roam this vast wilderness'
  },
  { 
    id: 6, 
    name: 'Borneo', 
    coordinates: { x: 77, y: 54 }, 
    threat: 'Komodo Dragons',
    description: 'These massive lizards have a venomous bite and can take down large prey'
  },
];

const WorldMap = () => {
  const [activeZone, setActiveZone] = React.useState<number | null>(null);
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);
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

  return (
    <section className="py-20 bg-[#1c1f2e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 grid-pattern"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-up">
            Global Danger Zones
          </h2>
          <p className="text-xl text-white/70 animate-fade-up animate-delay-100">
            Explore where our brave adventurers face off against apex predators. Click on the markers to learn more.
          </p>
        </div>
        
        <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto bg-[#2c314a] rounded-xl overflow-hidden shadow-xl">
          {!isMapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apex-red"></div>
            </div>
          ) : (
            <>
              <img 
                src="https://images.unsplash.com/photo-1589519160732-57fc6437cc72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="World Map"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-[#1c1f2e]/30"></div>
              
              {dangerZones.map((zone) => (
                <React.Fragment key={zone.id}>
                  <button
                    className={`absolute cursor-pointer transition-all duration-300 ${activeZone === zone.id ? 'scale-125 z-10' : ''}`}
                    style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                    onClick={() => handleZoneClick(zone.id)}
                    aria-label={`Danger zone: ${zone.name}`}
                  >
                    <ShieldAlert className="h-8 w-8 text-apex-red drop-shadow-glow animate-pulse" />
                  </button>
                  
                  {activeZone === zone.id && (
                    <div 
                      className="absolute z-20 bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-xl max-w-xs text-white text-sm animate-fade-up"
                      style={{ 
                        left: `${zone.coordinates.x > 70 ? zone.coordinates.x - 30 : zone.coordinates.x + 5}%`, 
                        top: `${zone.coordinates.y > 70 ? zone.coordinates.y - 20 : zone.coordinates.y + 5}%` 
                      }}
                    >
                      <h3 className="font-bold text-apex-red mb-1">{zone.name}</h3>
                      <p className="font-semibold mb-2">Threat: {zone.threat}</p>
                      <p className="text-white/80">{zone.description}</p>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
