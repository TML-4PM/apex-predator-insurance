
import React from 'react';
import { Skull, PawPrint, Fish, Bird, AlertTriangle } from 'lucide-react';

export const getThreatIcon = (threat: string) => {
  switch(threat.toLowerCase()) {
    case 'sharks':
      return <Skull className="h-5 w-5" />;
    case 'bears':
    case 'lions':
    case 'jaguars':
      return <PawPrint className="h-5 w-5" />;
    case 'crocodiles':
      return <Fish className="h-5 w-5" />;
    case 'komodo dragons':
      return <Bird className="h-5 w-5" />;
    default:
      return <AlertTriangle className="h-5 w-5" />;
  }
};
