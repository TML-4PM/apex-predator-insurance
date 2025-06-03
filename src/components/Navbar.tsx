import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, Settings, User, Shield } from 'lucide-react';
import NotificationBell from '@/components/NotificationBell';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();
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
            <div className="hidden md:ml-6 md:flex space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Home
              </Link>
              <Link to="/plans" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Plans
              </Link>
              <Link to="/gallery" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Gallery
              </Link>
              <Link to="/store" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Store
              </Link>
              <Link to="/social" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Community
              </Link>
            </div>
          </div>

          {/* Right side - Auth and notifications */}
          <div className="flex items-center space-x-4">
            <NotificationBell />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || ""} alt={user.username || "User Avatar"} />
                      <AvatarFallback>{user.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.full_name || user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Portal</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/auth" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                  Sign in
                </Link>
                <Link to="/auth" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-apex-red hover:bg-apex-red/80">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apex-red"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isMobileMenuOpen ? 'block' : 'none'} md:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/" onClick={closeMobileMenu} className="bg-apex-red/10 text-apex-red block pl-3 pr-4 py-2 border-l-4 border-apex-red text-base font-medium">
            Home
          </Link>
          <Link to="/plans" onClick={closeMobileMenu} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
            Plans
          </Link>
          <Link to="/gallery" onClick={closeMobileMenu} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
            Gallery
          </Link>
          <Link to="/store" onClick={closeMobileMenu} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
            Store
          </Link>
          <Link to="/social" onClick={closeMobileMenu} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
            Community
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="shrink-0">
              {user ? (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar_url || ""} alt={user.username || "User Avatar"} />
                  <AvatarFallback>{user.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              ) : (
                <svg className="h-10 w-10 rounded-full bg-gray-300 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M18.675 13.325a.75.75 0 010 1.06l-3 3a.75.75 0 01-1.06-1.06l2.22-2.22H3.75a.75.75 0 010-1.5h12.08l-2.22-2.22a.75.75 0 011.06-1.06l3 3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            {user ? (
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.full_name || user.username}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
            ) : (
              <div className="ml-3">
                <Link to="/auth" onClick={closeMobileMenu} className="text-base font-medium text-gray-800">
                  Sign in
                </Link>
              </div>
            )}
          </div>
          <div className="mt-3 space-y-1">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  onClick={closeMobileMenu}
                  className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    closeMobileMenu();
                  }}
                  className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 w-full text-left"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={closeMobileMenu}
                className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
