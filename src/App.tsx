
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import MobileOptimization from "@/components/MobileOptimization";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import Index from './pages/Index';
import DonationPage from './pages/DonationPage';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Gallery from './pages/Gallery';
import ProductPage from './pages/ProductPage';
import Plans from './pages/Plans';
import Articles from './pages/Articles';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary>
      <PerformanceMonitor>
        <MobileOptimization>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/donate" element={<DonationPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </MobileOptimization>
      </PerformanceMonitor>
    </ErrorBoundary>
  );
};

export default App;
