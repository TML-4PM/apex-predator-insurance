
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, XCircle, Database, Image, Activity } from 'lucide-react';
import { AuditData } from '@/types/audit';

interface DetailedAuditResultsProps {
  auditData: AuditData;
}

const DetailedAuditResults = ({ auditData }: DetailedAuditResultsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default: return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const imageSuccessRate = Math.round((auditData.images.working / auditData.images.total) * 100);
  const routeSuccessRate = Math.round((auditData.routes.working / auditData.routes.total) * 100);

  return (
    <div className="space-y-6">
      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4" />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {auditData.performance.score}/100
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Avg Load: {auditData.performance.avgLoadTime}ms
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Database className="h-4 w-4" />
              Route Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {routeSuccessRate}%
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {auditData.routes.working}/{auditData.routes.total} working
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Image className="h-4 w-4" />
              Image Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {imageSuccessRate}%
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {auditData.images.working}/{auditData.images.total} working
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Route Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Route Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {auditData.routeDetails.map((route) => (
              <div key={route.path} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(route.status)}
                  <div>
                    <div className="font-medium">{route.name}</div>
                    <div className="text-sm text-gray-500">{route.path}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{route.loadTime}ms</div>
                  <div className="text-xs text-gray-500 capitalize">{route.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{auditData.performance.avgLoadTime}ms</div>
              <div className="text-sm text-gray-500">Avg Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{auditData.performance.fcp}ms</div>
              <div className="text-sm text-gray-500">First Contentful Paint</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{auditData.performance.lcp}ms</div>
              <div className="text-sm text-gray-500">Largest Contentful Paint</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{auditData.performance.cls}</div>
              <div className="text-sm text-gray-500">Cumulative Layout Shift</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Performance Score</span>
              <span>{auditData.performance.score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  auditData.performance.score >= 90 ? 'bg-green-500' :
                  auditData.performance.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${auditData.performance.score}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Issues & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditData.issues.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p>No issues found! Your platform is running smoothly.</p>
              </div>
            ) : (
              auditData.issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{issue.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{issue.description}</div>
                    {issue.recommendation && (
                      <div className="text-sm text-blue-600 mt-2 p-2 bg-blue-50 rounded">
                        <strong>💡 Recommendation:</strong> {issue.recommendation}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedAuditResults;
