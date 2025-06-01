
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { deadlyAnimals } from '@/data/animalUtils';

interface AuditHeaderProps {
  isRunning: boolean;
  summary: {
    total: number;
    success: number;
    error: number;
    fallback: number;
  };
  onRunAudit: () => void;
}

const AuditHeader = ({ isRunning, summary, onRunAudit }: AuditHeaderProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Image Audit Tool</h2>
      <p className="text-gray-600 mb-4">
        Test all {deadlyAnimals.length} animal images to ensure proper display and identify issues.
      </p>
      
      <div className="flex items-center gap-4 mb-4">
        <Button 
          onClick={onRunAudit} 
          disabled={isRunning}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isRunning ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Audit...
            </>
          ) : (
            'Start Image Audit'
          )}
        </Button>
        
        {summary.total > 0 && (
          <div className="flex gap-4 text-sm">
            <span className="text-green-600">✓ {summary.success} Success</span>
            <span className="text-yellow-600">⚠ {summary.fallback} Fallback</span>
            <span className="text-red-600">✗ {summary.error} Error</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditHeader;
