
import React from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle, CheckCircle, Info, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface AlertMessageProps {
  variant: "error" | "success" | "info";
  message: string;
  showRetry?: boolean;
  onRetry?: () => void;
  isRetrying?: boolean;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  variant,
  message,
  showRetry = false,
  onRetry,
  isRetrying = false
}) => {
  // Modern styling with improved contrast for accessibility
  const alertStyles = {
    error: "bg-destructive/15 border-destructive/30 text-destructive",
    success: "bg-green-50 border-green-200",
    info: "bg-blue-50 border-blue-200"
  };
  
  const textStyles = {
    error: "text-destructive font-medium",
    success: "text-green-800",
    info: "text-blue-800"
  };
  
  const getIcon = () => {
    switch (variant) {
      case "error": 
        return <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />;
      case "success": 
        return <CheckCircle className="h-4 w-4 mr-2 text-green-600" />;
      case "info":
        return <Info className="h-4 w-4 mr-2 text-blue-600" />;
    }
  };
  
  return (
    <Alert className={`mb-4 ${alertStyles[variant]}`}>
      <AlertDescription className="flex items-center">
        {getIcon()}
        <span className={textStyles[variant]}>{message}</span>
        {showRetry && onRetry && (
          <Button
            onClick={onRetry}
            variant={variant === "error" ? "outline" : "secondary"}
            size="sm"
            className="ml-auto"
            disabled={isRetrying}
          >
            {isRetrying ? (
              <>
                <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="h-3 w-3 mr-2" />
                Retry
              </>
            )}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
