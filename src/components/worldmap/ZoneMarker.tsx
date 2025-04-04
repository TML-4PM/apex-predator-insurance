
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { DangerZone } from '@/models/DangerZone';

interface ZoneMarkerProps {
  zone: DangerZone;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (id: number | null) => void;
}

const ZoneMarker: React.FC<ZoneMarkerProps> = ({ 
  zone, 
  isActive, 
  isHovered, 
  onClick, 
  onHover 
}) => {
  // Use the zone's color directly
  const markerColor = isActive ? zone.color : isHovered ? 'white' : '#df4949';
  
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 * zone.id }}
      whileHover={{ scale: 1.2 }}
      className="absolute cursor-pointer z-10"
      style={{ 
        left: `${zone.coordinates.x}%`, 
        top: `${zone.coordinates.y}%` 
      }}
      onClick={onClick}
      onMouseEnter={() => onHover(zone.id)}
      onMouseLeave={() => onHover(null)}
      aria-label={`Danger zone: ${zone.name}`}
    >
      {/* Enhanced outer glow for better visibility */}
      <div 
        className="absolute -inset-3 rounded-full animate-pulse blur-md opacity-70"
        style={{ 
          animationDelay: `${zone.id * 0.2}s`,
          backgroundColor: isActive ? zone.color : 'rgba(223, 73, 73, 0.3)'
        }}
      ></div>
      
      {/* Main marker container with improved visibility */}
      <div className={`relative p-1.5 rounded-full 
        ${isActive ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]' : 'bg-apex-black/80 hover:bg-apex-black shadow-[0_0_10px_rgba(0,0,0,0.5)]'} 
        backdrop-blur-sm transition-all duration-300 border-2 ${isActive ? `border-${zone.color}` : 'border-white/30'}`}
      >
        <AlertTriangle 
          className="h-7 w-7 transition-all duration-300"
          style={{ color: markerColor }}
        />
        
        {/* Label that appears on hover */}
        {isHovered && !isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-medium text-white whitespace-nowrap bg-apex-black/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-xl border border-white/10 pointer-events-none"
          >
            {zone.name}
          </motion.div>
        )}
      </div>
      
      {/* Inner pulse effect */}
      <div 
        className="absolute -inset-1 rounded-full animate-ping opacity-30 duration-75"
        style={{ 
          animationDuration: '3s',
          animationDelay: `${zone.id * 0.2}s`,
          backgroundColor: isActive ? zone.color : 'rgba(223, 73, 73, 0.4)' 
        }}
      ></div>
    </motion.button>
  );
};

export default ZoneMarker;
