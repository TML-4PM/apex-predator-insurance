
import React from 'react';
import { AuditData } from '@/types/audit';
import DetailedAuditResults from './DetailedAuditResults';

interface AuditResultsProps {
  auditData: AuditData;
}

const AuditResults = ({ auditData }: AuditResultsProps) => {
  return <DetailedAuditResults auditData={auditData} />;
};

export default AuditResults;
