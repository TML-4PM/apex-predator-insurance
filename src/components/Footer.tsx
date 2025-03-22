import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShieldCheck, Github, Instagram, Mail, Facebook, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-apex-black text-white">
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
            
            <p className="text-white/60 mb-6 max-w-md">
              The only insurance that pays out when you don't need it. Because it doesn't pay out at all. It's not real insurance, it's just fun!
            </p>
            
            <div className="flex space-x-4">
              <a href="https://instagram.com/apexpredatorinsurance" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="https://facebook.com/apexpredatorinsurance" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="https://linkedin.com/company/apex-predator-insurance" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Linkedin size={18} className="text-white" />
              </a>
              <a href="https://youtube.com/c/apexpredatorinsurance" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Youtube size={18} className="text-white" />
              </a>
              <a href="https://github.com/apexpredatorinsurance" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Github size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/plans" className="text-white/60 hover:text-white transition-colors duration-300">Insurance Plans</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/60 hover:text-white transition-colors duration-300">Adventure Gallery</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-white/60 hover:text-white transition-colors duration-300">Legal Disclaimer</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <p className="text-white/60 mb-2">Have questions about our real insurance?</p>
            <div className="flex items-center gap-2 text-apex-red hover:text-apex-red/80 transition-colors">
              <Mail size={16} />
              <a href="mailto:info@apexpredatorinsurance.com" className="hover:underline">
                info@apexpredatorinsurance.com
              </a>
            </div>
            
            <div className="mt-6 flex items-center text-white/40 text-sm">
              <ShieldCheck size={14} className="mr-2" />
              <span>$50,000 accidental death benefit</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Apex Predator Insurance. All rights reserved.
          </p>
          
          <div className="flex gap-4 text-sm text-white/40">
            <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
