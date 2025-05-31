
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Camera, TrendingUp } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: "/plans", label: "Insurance Plans", icon: Shield },
    { to: "/oopsies", label: "Oopsies", icon: TrendingUp },
    { to: "/submit", label: "Submit", icon: Camera },
    { to: "/gallery", label: "Gallery" },
    { to: "/articles", label: "Articles" },
    { to: "/#contact", label: "Contact", isAnchor: true },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (item: any) => {
    setIsOpen(false);
    if (item.isAnchor && location.pathname === '/') {
      const sectionId = item.to.split('#')[1];
      scrollToSection(sectionId);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-apex-black/5' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield 
                size={32} 
                className={`transition-colors duration-300 ${
                  isScrolled ? 'text-apex-red' : 'text-white group-hover:text-apex-lightgray'
                }`} 
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight transition-colors duration-300 ${
                isScrolled ? 'text-apex-black' : 'text-white'
              }`}>
                Apex Predator
              </span>
              <span className={`text-sm leading-tight transition-colors duration-300 ${
                isScrolled ? 'text-apex-darkgray/70' : 'text-white/80'
              }`}>
                Insurance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-2 font-medium transition-colors duration-300 hover:text-apex-red ${
                    isScrolled ? 'text-apex-darkgray' : 'text-white'
                  } ${location.pathname === item.to ? 'text-apex-red' : ''}`}
                >
                  {IconComponent && <IconComponent size={16} />}
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-apex-black hover:text-apex-red' : 'text-white hover:text-apex-lightgray'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-apex-black/10 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center gap-3 text-apex-darkgray hover:text-apex-red transition-colors py-2 ${
                      location.pathname === item.to ? 'text-apex-red font-medium' : ''
                    }`}
                  >
                    {IconComponent && <IconComponent size={18} />}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
