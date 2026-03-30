
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
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 * zone.id }}
      whileHover={{ scale: 1.2 }}
      className="absolute cursor-pointer z-10 flex flex-col items-center"
      style={{ 
        left: `${zone.coordinates.x}%`, 
        top: `${zone.coordinates.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onClick}
      onMouseEnter={() => onHover(zone.id)}
      onMouseLeave={() => onHover(null)}
      aria-label={`Danger zone: ${zone.name}`}
    >
      {/* Outer glow */}
      <div 
        className="absolute -inset-3 rounded-full animate-pulse blur-md opacity-60"
        style={{ 
          animationDelay: `${zone.id * 0.2}s`,
          backgroundColor: zone.color
        }}
      ></div>
      
      {/* Main marker */}
      <div 
        className={`relative p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 border-2`}
        style={{
          backgroundColor: isActive ? 'white' : 'rgba(0,0,0,0.7)',
          borderColor: zone.color,
          boxShadow: `0 0 12px ${zone.color}80`
        }}
      >
        <AlertTriangle 
          className="h-6 w-6 transition-all duration-300"
          style={{ color: isActive ? zone.color : isHovered ? 'white' : zone.color }}
        />
      </div>
      
      {/* Permanent label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 * zone.id + 0.3 }}
        className="mt-1 text-xs font-semibold text-white whitespace-nowrap bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full border pointer-events-none"
        style={{ borderColor: `${zone.color}50` }}
      >
        {zone.name}
      </motion.div>
      
      {/* Ping effect */}
      <div 
        className="absolute -inset-1 rounded-full animate-ping opacity-20"
        style={{ 
          animationDuration: '3s',
          animationDelay: `${zone.id * 0.2}s`,
          backgroundColor: zone.color
        }}
      ></div>
    </motion.button>
  );
};

export default ZoneMarker;
