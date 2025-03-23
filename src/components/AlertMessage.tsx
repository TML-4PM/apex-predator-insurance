
import React from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import RetryButton from './RetryButton';

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
  const alertStyles = {
    error: "destructive",
    success: "bg-green-50 border-green-200",
    info: "bg-blue-50 border-blue-200"
  };
  
  const textStyles = {
    error: "text-destructive-foreground",
    success: "text-green-800",
    info: "text-blue-800"
  };
  
  const IconComponent = variant === "error" ? AlertTriangle : CheckCircle;
  const iconColor = variant === "error" ? "text-destructive-foreground" : 
                   variant === "success" ? "text-green-600" : "text-blue-600";
  
  return (
    <Alert className={`mb-4 ${alertStyles[variant]}`}>
      <AlertDescription className="flex items-center">
        <IconComponent className={`h-4 w-4 mr-2 ${iconColor}`} />
        <span className={textStyles[variant]}>{message}</span>
        {showRetry && onRetry && (
          <RetryButton 
            onClick={onRetry}
            isLoading={isRetrying}
            variant="outline"
            size="sm"
            className="ml-auto"
          />
        )}
      </AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
