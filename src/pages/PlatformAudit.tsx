
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AuditDashboard from '@/components/audit/AuditDashboard';
import AuditResults from '@/components/audit/AuditResults';
import { usePlatformAudit } from '@/hooks/usePlatformAudit';

const PlatformAudit = () => {
  const {
    auditData,
    isRunning,
    runFullAudit,
    lastUpdated
  } = usePlatformAudit();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Audit</h1>
            <p className="text-gray-600">Comprehensive platform functionality assessment with actionable insights</p>
          </div>

          <AuditDashboard
            auditData={auditData}
            isRunning={isRunning}
            onRunAudit={runFullAudit}
            lastUpdated={lastUpdated}
          />

          {auditData && (
            <AuditResults auditData={auditData} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PlatformAudit;
