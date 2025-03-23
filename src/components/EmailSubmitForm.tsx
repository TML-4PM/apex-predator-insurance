
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';

interface EmailSubmitFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  placeholder?: string;
}

const EmailSubmitForm: React.FC<EmailSubmitFormProps> = ({
  email,
  setEmail,
  onSubmit,
  isLoading,
  placeholder = "Enter your email"
}) => {
  // Simple validation as user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  // Basic email validation using regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={handleEmailChange}
        className={`flex-grow ${!isValidEmail(email) && email ? 'border-orange-300' : ''}`}
        disabled={isLoading}
        required
        aria-label="Email address"
        autoComplete="email"
      />
      <Button 
        type="submit" 
        className="bg-apex-red hover:bg-apex-red/90 transition-colors"
        disabled={isLoading || (email.length > 0 && !isValidEmail(email))}
        aria-label={isLoading ? "Sending..." : "Get Samples"}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Get Samples"
        )}
      </Button>
    </form>
  );
};

export default EmailSubmitForm;
