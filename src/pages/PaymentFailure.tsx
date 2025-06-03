
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function PaymentFailure() {
  const navigate = useNavigate();

  const tryAgain = () => {
    navigate('/checkout');
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
                <CardTitle className="text-2xl text-red-600">
                  Payment Failed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600">
                  We're sorry, but your payment could not be processed. This could be due to:
                </p>

                <div className="bg-red-50 rounded-lg p-4 text-left">
                  <ul className="space-y-1 text-sm text-red-700">
                    <li>• Insufficient funds</li>
                    <li>• Card declined by bank</li>
                    <li>• Incorrect card information</li>
                    <li>• Network connectivity issues</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={tryAgain}
                    className="bg-apex-red hover:bg-apex-red/90"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button 
                    onClick={goHome}
                    variant="outline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    If you continue to experience issues, please contact our support team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
