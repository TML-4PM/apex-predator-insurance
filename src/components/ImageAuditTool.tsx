
import React from 'react';
import { useImageAudit } from '@/hooks/useImageAudit';
import AuditHeader from './audit/AuditHeader';
import AuditResultsGrid from './audit/AuditResultsGrid';

const ImageAuditTool = () => {
  const { results, isRunning, summary, runAudit, updateResult } = useImageAudit();

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <AuditHeader
        isRunning={isRunning}
        summary={summary}
        onRunAudit={runAudit}
      />
      <AuditResultsGrid
        results={results}
        onUpdateResult={updateResult}
      />
    </div>
  );
};

export default ImageAuditTool;
