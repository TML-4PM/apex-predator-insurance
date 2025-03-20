
import React from 'react';
import { motion } from 'framer-motion';
import { DangerZone } from '@/models/DangerZone';

interface ZoneConnectionsProps {
  zones: DangerZone[];
}

const ZoneConnections: React.FC<ZoneConnectionsProps> = ({ zones }) => {
  return (
    <svg className="absolute inset-0 w-full h-full z-0 opacity-60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EA384C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {zones.map((zone, index) => {
        const nextZone = zones[(index + 1) % zones.length];
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
  );
};

export default ZoneConnections;
