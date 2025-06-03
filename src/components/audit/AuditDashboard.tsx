
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { AuditData } from '@/types/audit';

interface AuditDashboardProps {
  auditData: AuditData | null;
  isRunning: boolean;
  onRunAudit: () => void;
  lastUpdated: string | null;
}

const AuditDashboard = ({ auditData, isRunning, onRunAudit, lastUpdated }: AuditDashboardProps) => {
  const getHealthScore = () => {
    if (!auditData) return 0;
    
    const routeScore = (auditData.routes.working / auditData.routes.total) * 40;
    const imageScore = (auditData.images.working / auditData.images.total) * 30;
    const performanceScore = auditData.performance.score * 0.3;
    
    return Math.round(routeScore + imageScore + performanceScore);
  };

  const getHealthStatus = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 75) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 60) return { label: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const score = getHealthScore();
  const status = getHealthStatus(score);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      {/* Main Health Score Card */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Overall Health Score</CardTitle>
            <Button
              onClick={onRunAudit}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                'Run New Test'
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-gray-900">
              {score}/100
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${status.color} ${status.bg}`}>
              {status.label}
            </div>
          </div>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <Clock size={14} />
              Last updated: {lastUpdated}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Test Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Test Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Performance Monitor</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Route Health</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Image Audit</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Platform Audit</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {auditData && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Routes Working</span>
                <span className="font-semibold text-green-600">
                  {auditData.routes.working}/{auditData.routes.total}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Images Working</span>
                <span className="font-semibold text-green-600">
                  {auditData.images.working}/{auditData.images.total}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Performance</span>
                <span className="font-semibold text-blue-600">
                  {auditData.performance.avgLoadTime}ms
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditDashboard;
