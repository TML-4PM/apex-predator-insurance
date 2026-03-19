import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Novelty disclaimer — required on all purchase surfaces */}
      <div className="w-full bg-amber-50 border-b border-amber-200 py-2 px-4 text-center z-50">
        <p className="text-xs text-amber-800 flex items-center justify-center gap-1.5">
          <ShieldCheck size={12} className="shrink-0" />
          <span>
            <strong>Novelty product only.</strong> This is not real insurance, financial advice, or regulated cover.
            All certificates are novelty items for entertainment purposes.{' '}
            <a href="/disclaimer" className="underline hover:text-amber-900">Learn more</a>
          </span>
        </p>
      </div>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
