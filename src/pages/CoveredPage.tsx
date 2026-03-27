import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import { CheckCircle, Download, Share2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CoveredPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-gradient-to-br from-slate-900 to-apex-black">
        <div className="max-w-lg w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">You're covered!</h1>
          <p className="text-white/70 mb-2 text-lg">
            Your novelty certificate is on its way to your inbox.
          </p>
          <p className="text-white/50 text-sm mb-8">
            Check your email — it usually arrives within a few minutes.
          </p>

          {/* Novelty disclaimer on success page */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8 text-left">
            <div className="flex items-start gap-2">
              <ShieldCheck size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <p className="text-amber-300 text-xs leading-relaxed">
                <strong className="text-amber-200">Reminder:</strong> This is a novelty certificate only.
                Not real insurance. No actual coverage is provided. For entertainment and gifting purposes only.
              </p>
            </div>
          </div>

          {sessionId && (
            <p className="text-white/30 text-xs mb-6 font-mono">
              Order ref: {sessionId.slice(-12)}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-apex-red hover:bg-apex-red/90">
              <Link to="/plans">
                Get another certificate
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link to="/">
                Back to home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoveredPage;
