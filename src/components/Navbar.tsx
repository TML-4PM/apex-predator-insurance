
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Shield, Camera } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-apex-red rounded-lg p-2">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-apex-black">Apex Predator</h1>
              <p className="text-sm text-apex-darkgray -mt-1">Insurance</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${isActive('/') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
            >
              Home
            </Link>
            <Link 
              to="/product" 
              className={`font-medium transition-colors ${isActive('/product') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
            >
              Product
            </Link>
            <Link 
              to="/plans" 
              className={`font-medium transition-colors ${isActive('/plans') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
            >
              Plans
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${isActive('/about') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
            >
              About
            </Link>
            <Link 
              to="/gallery" 
              className={`font-medium transition-colors ${isActive('/gallery') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
            >
              Gallery
            </Link>
            <Link 
              to="/oopsies" 
              className={`font-medium transition-colors flex items-center gap-2 ${isActive('/oopsies') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
            >
              Oopsies
              <Badge variant="secondary" className="bg-apex-red/10 text-apex-red text-xs">
                New
              </Badge>
            </Link>
            <Link 
              to="/articles" 
              className={`font-medium transition-colors ${isActive('/articles') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
            >
              Articles
            </Link>
            
            <Link to="/submit">
              <Button 
                size="sm" 
                className="bg-apex-red hover:bg-apex-red/90"
              >
                <Camera size={16} className="mr-2" />
                Share Oopsie
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-apex-darkgray hover:text-apex-red transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium transition-colors ${isActive('/') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/product" 
                className={`font-medium transition-colors ${isActive('/product') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
                onClick={() => setIsOpen(false)}
              >
                Product
              </Link>
              <Link 
                to="/plans" 
                className={`font-medium transition-colors ${isActive('/plans') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
                onClick={() => setIsOpen(false)}
              >
                Plans
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors ${isActive('/about') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/gallery" 
                className={`font-medium transition-colors ${isActive('/gallery') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/oopsies" 
                className={`font-medium transition-colors flex items-center gap-2 ${isActive('/oopsies') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
                onClick={() => setIsOpen(false)}
              >
                Oopsies
                <Badge variant="secondary" className="bg-apex-red/10 text-apex-red text-xs">
                  New
                </Badge>
              </Link>
              <Link 
                to="/articles" 
                className={`font-medium transition-colors ${isActive('/articles') ? 'text-apex-red' : 'text-apex-darkgray hover:text-apex-red'}`}
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
              
              <Link to="/submit" onClick={() => setIsOpen(false)}>
                <Button 
                  size="sm" 
                  className="bg-apex-red hover:bg-apex-red/90 w-full justify-center"
                >
                  <Camera size={16} className="mr-2" />
                  Share Oopsie
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
