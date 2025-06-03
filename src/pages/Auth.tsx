
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-apex-red"></div>
        </div>
      </Layout>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-apex-lightgray/20 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-apex-red mb-4" />
            <h1 className="text-2xl font-bold text-apex-black">
              Apex Predator Insurance
            </h1>
            <p className="text-apex-darkgray/70 mt-2">
              Protect yourself from nature's deadliest creatures
            </p>
          </div>

          {isLogin ? <LoginForm /> : <SignUpForm />}

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-apex-red hover:text-apex-red/80"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
