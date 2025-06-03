
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminProvider } from "@/hooks/useAdminAuth";
import PerformanceOptimizer from "@/components/performance/PerformanceOptimizer";
import MobileOptimizedLayout from "@/components/mobile/MobileOptimizedLayout";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import { useState } from "react";
import { LazyPages } from "@/utils/codeSplitting";

// Import remaining pages that don't need lazy loading
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PerformanceOptimizer>
          <MobileOptimizedLayout>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <AdminProvider>
                  <Routes>
                    {/* Non-lazy loaded pages */}
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    
                    {/* Lazy loaded pages */}
                    <Route path="/gallery" element={
                      <Suspense fallback={<div>Loading Gallery...</div>}>
                        <LazyPages.Gallery />
                      </Suspense>
                    } />
                    <Route path="/store" element={
                      <Suspense fallback={<div>Loading Store...</div>}>
                        <LazyPages.Store />
                      </Suspense>
                    } />
                    <Route path="/plans" element={
                      <Suspense fallback={<div>Loading Plans...</div>}>
                        <LazyPages.Plans />
                      </Suspense>
                    } />
                    <Route path="/social" element={
                      <Suspense fallback={<div>Loading Community...</div>}>
                        <LazyPages.SocialHub />
                      </Suspense>
                    } />
                    <Route path="/dashboard" element={
                      <Suspense fallback={<div>Loading Dashboard...</div>}>
                        <LazyPages.Dashboard />
                      </Suspense>
                    } />
                    <Route path="/admin" element={
                      <Suspense fallback={<div>Loading Admin...</div>}>
                        <LazyPages.AdminPortal />
                      </Suspense>
                    } />
                    <Route path="/checkout" element={
                      <Suspense fallback={<div>Loading Checkout...</div>}>
                        <LazyPages.Checkout />
                      </Suspense>
                    } />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AdminProvider>
              </AuthProvider>
            </BrowserRouter>
            
            {/* PWA Install Prompt */}
            {showInstallPrompt && (
              <InstallPrompt onDismiss={() => setShowInstallPrompt(false)} />
            )}
          </MobileOptimizedLayout>
        </PerformanceOptimizer>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
