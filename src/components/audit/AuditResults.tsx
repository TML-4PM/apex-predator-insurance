
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, XCircle, Clock, Image, Globe } from 'lucide-react';
import { AuditData } from '@/types/audit';

interface AuditResultsProps {
  auditData: AuditData;
}

const AuditResults = ({ auditData }: AuditResultsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Route Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Route Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditData.routeDetails.map((route) => (
              <div key={route.path} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {route.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : route.status === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <div className="font-medium">{route.name}</div>
                    <div className="text-sm text-gray-500">{route.path}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{route.loadTime}ms</div>
                  <div className="text-xs text-gray-500">{route.status}</div>
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
            <Clock className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Load Time</span>
              <span className="font-semibold">{auditData.performance.avgLoadTime}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">First Contentful Paint</span>
              <span className="font-semibold">{auditData.performance.fcp}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Largest Contentful Paint</span>
              <span className="font-semibold">{auditData.performance.lcp}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cumulative Layout Shift</span>
              <span className="font-semibold">{auditData.performance.cls}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${auditData.performance.score}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-600">
              Performance Score: {auditData.performance.score}/100
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Audit Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Image Audit Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{auditData.images.working}</div>
                <div className="text-sm text-gray-500">Working</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{auditData.images.fallback}</div>
                <div className="text-sm text-gray-500">Fallback</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{auditData.images.failed}</div>
                <div className="text-sm text-gray-500">Failed</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(auditData.images.working / auditData.images.total) * 100}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-600">
              {Math.round((auditData.images.working / auditData.images.total) * 100)}% images loading successfully
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
          <div className="space-y-3">
            {auditData.issues.map((issue, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {issue.severity === 'error' ? (
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                ) : issue.severity === 'warning' ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-medium">{issue.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{issue.description}</div>
                  {issue.recommendation && (
                    <div className="text-sm text-blue-600 mt-2">
                      <strong>Recommendation:</strong> {issue.recommendation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditResults;
