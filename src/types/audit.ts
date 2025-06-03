
export interface AuditData {
  timestamp: string;
  routes: {
    total: number;
    working: number;
    failed: number;
  };
  images: {
    total: number;
    working: number;
    failed: number;
    fallback: number;
  };
  performance: {
    avgLoadTime: number;
    score: number;
    fcp: number;
    lcp: number;
    cls: number;
  };
  routeDetails: RouteDetail[];
  issues: AuditIssue[];
}

export interface RouteDetail {
  path: string;
  name: string;
  status: 'success' | 'warning' | 'error';
  loadTime: number;
  message: string;
}

export interface AuditIssue {
  severity: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  recommendation?: string;
}
