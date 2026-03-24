import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Instagram, Mail, Facebook, Linkedin, Youtube } from 'lucide-react';
import BrandCarousel from './BrandCarousel';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-apex-black to-slate-800 text-white relative overflow-hidden">
      <BrandCarousel />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-apex-red flex items-center justify-center">
                <span className="text-white font-bold text-lg">AP</span>
              </div>
              <span className="font-bold tracking-tight text-white">
                Apex Predator Insurance
              </span>
            </Link>

            <p className="text-white/60 mb-4 max-w-md">
              The only insurance that pays out when you don't need it. Because it doesn't pay out at all. It's not real insurance — it's just fun!
            </p>

            {/* Prominent novelty disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-6 max-w-md">
              <div className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-amber-300 text-xs leading-relaxed">
                  <strong className="text-amber-200">Novelty product only.</strong> This is not real insurance, financial advice, or regulated cover of any kind. All certificates are novelty items sold for entertainment and gifting purposes only. No actual insurance coverage is provided.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="mailto:contact@tech4humanity.com.au" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Mail size={18} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/plans" className="text-white/60 hover:text-white transition-colors duration-300">Cover Options</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link to="/gallery" className="text-white/60 hover:text-white transition-colors duration-300">Adventure Gallery</Link></li>
              <li><Link to="/testimonials" className="text-white/60 hover:text-white transition-colors duration-300">Customer Stories</Link></li>
              <li><Link to="/disclaimer" className="text-white/60 hover:text-white transition-colors duration-300 font-medium text-amber-400/70 hover:text-amber-400">Legal Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <p className="text-white/60 mb-2">Questions about our novelty certificates?</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-apex-red hover:text-apex-red/80 transition-colors">
                <Mail size={16} />
                <a href="mailto:contact@tech4humanity.com.au" className="hover:underline text-sm">
                  contact@tech4humanity.com.au
                </a>
              </div>
            </div>
            <Link to="/contact" className="text-apex-red hover:text-apex-red/80 transition-colors text-sm font-medium">
              Full Contact Information →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          {/* Legal disclaimer bar */}
          <p className="text-white/30 text-xs text-center mb-4 max-w-3xl mx-auto leading-relaxed">
            Apex Predator Insurance is a novelty entertainment product operated by Tech 4 Humanity Pty Ltd (ABN 61 605 746 618).
            All products are novelty certificates only. No insurance coverage, financial protection, or regulated benefit of any kind is provided.
            This is not a financial product. Not regulated by ASIC or APRA. For entertainment and gifting only.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Apex Predator Insurance. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-white/40">
              <Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors duration-300">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
