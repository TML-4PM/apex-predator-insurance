
import React from 'react';
import { motion } from 'framer-motion';
import { DangerZone } from '@/models/DangerZone';
import { getThreatIcon } from '@/utils/threatIcons';
import { AlertTriangle } from 'lucide-react';

interface ZoneDetailsProps {
  zone: DangerZone;
  onClose: () => void;
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ zone, onClose }) => {
  return (
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
        <div className="flex items-center justify-center h-7 w-7 rounded-lg" style={{ backgroundColor: zone.color }}>
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
        onClick={onClose}
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white/60 hover:text-white transition-colors"
      >
        Close
      </button>
    </motion.div>
  );
};

export default ZoneDetails;
