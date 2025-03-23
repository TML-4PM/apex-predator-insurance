
import React from 'react';
import { Button } from './ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

interface RetryButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  targetEmail?: string;
}

const RetryButton: React.FC<RetryButtonProps> = ({
  onClick,
  isLoading,
  disabled = false,
  size = "sm",
  variant = "secondary",
  className = "",
  targetEmail
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          {targetEmail ? `Sending samples to ${targetEmail}...` : "Sending..."}
        </>
      ) : (
        <>
          <RefreshCw className="mr-2 h-3 w-3" />
          {targetEmail ? `Try sending samples to ${targetEmail} again` : "Try again"}
        </>
      )}
    </Button>
  );
};

export default RetryButton;
