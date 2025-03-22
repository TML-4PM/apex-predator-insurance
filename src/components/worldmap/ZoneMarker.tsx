
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
  // Use the zone's color directly instead of using a template literal which was causing the React.Fragment warning
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
      <div className={`relative p-1 rounded-full 
        ${isActive ? 'bg-white' : 'bg-apex-black/60 hover:bg-apex-black/80'} 
        backdrop-blur-sm transition-all duration-300 shadow-lg border border-white/20`}
      >
        <AlertTriangle 
          className="h-7 w-7 transition-all duration-300"
          style={{ color: markerColor }}
        />
        
        {isHovered && !isActive && (
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
        className="absolute -inset-1 rounded-full animate-pulse blur-sm transition-all duration-300"
        style={{ 
          animationDelay: `${zone.id * 0.2}s`,
          backgroundColor: isActive ? `${zone.color}20` : 'rgba(223, 73, 73, 0.2)' 
        }}
      ></div>
    </motion.button>
  );
};

export default ZoneMarker;
