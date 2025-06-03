
import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AdminContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  checkAdminStatus: () => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Check if user has admin role (you can customize this logic)
    const adminEmails = ['admin@wildlifeshield.com', 'support@wildlifeshield.com'];
    const isUserAdmin = adminEmails.includes(user.email || '');
    
    setIsAdmin(isUserAdmin);
    return isUserAdmin;
  };

  useEffect(() => {
    const getInitialState = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        await checkAdminStatus();
      }
      
      setLoading(false);
    };

    getInitialState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkAdminStatus();
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    isAdmin,
    loading,
    checkAdminStatus,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminProvider');
  }
  return context;
}
