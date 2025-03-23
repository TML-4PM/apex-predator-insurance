
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';

interface EmailSubmitFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const EmailSubmitForm: React.FC<EmailSubmitFormProps> = ({
  email,
  setEmail,
  onSubmit,
  isLoading
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-grow"
        disabled={isLoading}
        required
      />
      <Button 
        type="submit" 
        className="bg-apex-red hover:bg-apex-red/90"
        disabled={isLoading}
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
