
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminProvider } from "@/hooks/useAdminAuth";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import CertificatePage from "./pages/CertificatePage";
import CertificateVerify from "./pages/CertificateVerify";
import TestimonialsPage from "./pages/TestimonialsPage";
import Auth from "./pages/Auth";
import DonationPage from "./pages/DonationPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import ContentHub from "./pages/ContentHub";
import PlatformAudit from "./pages/PlatformAudit";
import ChatPage from "./pages/ChatPage";
import Wholesale from "./pages/Wholesale";
import PartnerPortal from "./pages/PartnerPortal";

// Lazy loaded components using the new code splitting utilities
import { LazyPages } from "./utils/codeSplitting";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import PerformanceOptimizer from "./components/performance/PerformanceOptimizer";
import InstallPrompt from "./components/pwa/InstallPrompt";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AdminProvider>
            <Toaster />
            <Sonner />
            <InstallPrompt onDismiss={() => {}} />
            <PerformanceOptimizer>
              <BrowserRouter>
                <Layout>
                  <Suspense fallback={<div className="flex justify-center items-center min-h-[400px]">Loading...</div>}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/gallery" element={<LazyPages.Gallery />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/disclaimer" element={<Disclaimer />} />
                      <Route path="/articles" element={<Articles />} />
                      <Route path="/articles/:slug" element={<ArticleDetail />} />
                      <Route path="/certificate/:animalName" element={<CertificatePage />} />
                      <Route path="/verify/:certificateId" element={<CertificateVerify />} />
                      <Route path="/testimonials" element={<TestimonialsPage />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/donate" element={<DonationPage />} />
                      <Route path="/payment/success" element={<PaymentSuccess />} />
                      <Route path="/payment/failure" element={<PaymentFailure />} />
                      <Route path="/content" element={<ContentHub />} />
                      <Route path="/audit" element={<PlatformAudit />} />
                      <Route path="/store" element={<LazyPages.Store />} />
                      <Route path="/products" element={<LazyPages.Plans />} />
                      <Route path="/plans" element={<LazyPages.Plans />} />
                      <Route path="/checkout" element={<LazyPages.Checkout />} />
                      <Route path="/social" element={<LazyPages.SocialHub />} />
                      <Route path="/chat" element={<ChatPage />} />
                      <Route path="/wholesale" element={<Wholesale />} />
                      <Route path="/partner" element={
                        <ProtectedRoute>
                          <PartnerPortal />
                        </ProtectedRoute>
                      } />
                      
                      {/* Protected Routes */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <LazyPages.Dashboard />
                        </ProtectedRoute>
                      } />
                      
                      {/* Admin Routes */}
                      <Route path="/admin" element={
                        <AdminRoute>
                          <LazyPages.AdminPortal />
                        </AdminRoute>
                      } />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </BrowserRouter>
            </PerformanceOptimizer>
          </AdminProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
