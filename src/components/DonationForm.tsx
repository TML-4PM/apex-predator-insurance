
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, CreditCard } from 'lucide-react';
import { useDonations } from '@/hooks/useDonations';

const predefinedAmounts = [5, 10, 25, 50, 100, 250, 500, 1000];

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const { submitDonation, submitting } = useDonations();

  const finalAmount = selectedAmount || parseFloat(customAmount) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (finalAmount <= 0) return;

    const success = await submitDonation({
      amount: finalAmount,
      donorName: isAnonymous ? 'Anonymous' : donorInfo.name,
      donorEmail: donorInfo.email,
      message: donorInfo.message,
      isAnonymous
    });

    if (success) {
      // Reset form
      setSelectedAmount(null);
      setCustomAmount('');
      setDonorInfo({ name: '', email: '', message: '' });
      setIsAnonymous(false);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center justify-center">
          <Heart className="text-apex-red" />
          Make a Donation
        </CardTitle>
        <p className="text-apex-darkgray/70 text-center">
          Support our mission to protect adventurers worldwide
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Selection */}
          <div>
            <Label className="text-base font-semibold mb-4 block">Choose Amount</Label>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => handleAmountSelect(amount)}
                  className={selectedAmount === amount ? "bg-apex-red hover:bg-apex-red/90" : ""}
                >
                  ${amount}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="custom-amount" className="whitespace-nowrap">Custom:</Label>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-apex-darkgray">$</span>
                <Input
                  id="custom-amount"
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="Enter amount"
                  className="pl-8"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="anonymous" className="text-sm">
                Donate anonymously
              </Label>
            </div>

            {!isAnonymous && (
              <>
                <div>
                  <Label htmlFor="donor-name">Full Name</Label>
                  <Input
                    id="donor-name"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    required
                    className="mt-1"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="donor-email">Email Address</Label>
              <Input
                id="donor-email"
                type="email"
                value={donorInfo.email}
                onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="donor-message">Message (Optional)</Label>
              <Textarea
                id="donor-message"
                value={donorInfo.message}
                onChange={(e) => setDonorInfo(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Leave a message of support..."
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          {/* Total */}
          {finalAmount > 0 && (
            <div className="bg-apex-lightgray/50 rounded-lg p-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Donation:</span>
                <span className="text-apex-red">${finalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting || finalAmount <= 0}
            className="w-full bg-apex-red hover:bg-apex-red/90 text-lg py-6"
          >
            <CreditCard className="mr-2" size={20} />
            {submitting ? 'Processing...' : `Donate $${finalAmount.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
