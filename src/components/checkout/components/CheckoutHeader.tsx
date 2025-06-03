
import React from "react";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CheckoutHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <Button
        variant="ghost"
        size="sm"
        className="text-white/70 hover:text-white"
        onClick={() => navigate('/plans')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Plans
      </Button>
    </div>
  );
};
