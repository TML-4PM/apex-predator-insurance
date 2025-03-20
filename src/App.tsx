
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import Gallery from "./pages/Gallery";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import CertificatePage from "./pages/CertificatePage";

const queryClient = new QueryClient();

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
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
