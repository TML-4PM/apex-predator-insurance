
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4',
        isScrolled ? 'bg-apex-black/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-apex-red flex items-center justify-center">
            <span className="text-white font-bold text-lg">AP</span>
          </div>
          <span className={cn(
            "font-bold tracking-tight transition-all duration-300",
            isScrolled ? "text-white" : "text-apex-black"
          )}>
            Apex Predator Insurance
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative text-sm font-medium hover:text-apex-red transition-colors duration-300 py-2",
                isActive(item.path) 
                  ? isScrolled ? "text-apex-red" : "text-apex-red" 
                  : isScrolled ? "text-white" : "text-apex-black"
              )}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-apex-red rounded-full" />
              )}
            </Link>
          ))}
          
          <Link 
            to="/plans" 
            className="flex items-center gap-2 bg-apex-red text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 ml-4"
          >
            <ShoppingCart size={16} />
            <span>Shop Now</span>
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-apex-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className={isScrolled ? "text-white" : "text-apex-black"} />
          ) : (
            <Menu size={24} className={isScrolled ? "text-white" : "text-apex-black"} />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "py-3 px-4 text-apex-black hover:bg-apex-lightgray rounded-md transition-colors",
                  isActive(item.path) && "text-apex-red font-medium"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/plans" 
              className="flex items-center justify-center gap-2 bg-apex-red text-white mt-4 px-4 py-3 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingCart size={18} />
              <span>Shop Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
