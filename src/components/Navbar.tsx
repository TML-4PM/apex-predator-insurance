
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import NotificationBell from '@/components/NotificationBell';
import DesktopNavigation from '@/components/navbar/DesktopNavigation';
import UserDropdown from '@/components/navbar/UserDropdown';
import AuthButtons from '@/components/navbar/AuthButtons';
import MobileMenuButton from '@/components/navbar/MobileMenuButton';
import MobileMenu from '@/components/navbar/MobileMenu';

const Navbar = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-apex-red">
                Apex Predator Insurance
              </Link>
            </div>
            <DesktopNavigation />
          </div>

          {/* Right side - Auth and notifications */}
          <div className="flex items-center space-x-4">
            <NotificationBell />
            
            {user ? (
              <UserDropdown />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile menu button */}
          <MobileMenuButton isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </nav>
  );
};

export default Navbar;
