
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import Gallery from "./pages/Gallery";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import CertificatePage from "./pages/CertificatePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Oopsies from "./pages/Oopsies";
import Submit from "./pages/Submit";
import Wholesale from "./pages/Wholesale";
import PartnerPortal from "./pages/PartnerPortal";
import ContentHub from "./pages/ContentHub";
import Store from "./pages/Store";

// Create a shared QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/oopsies" element={<Oopsies />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/partner-portal" element={<PartnerPortal />} />
          <Route path="/content-hub" element={<ContentHub />} />
          <Route path="/store" element={<Store />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/blog" element={<Navigate to="/" state={{ scrollToSection: 'blog' }} />} />
          <Route path="/contact" element={<Navigate to="/" state={{ scrollToSection: 'contact' }} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
