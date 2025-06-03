
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="pt-2 pb-3 space-y-1">
        <Link to="/" onClick={onClose} className="bg-apex-red/10 text-apex-red block pl-3 pr-4 py-2 border-l-4 border-apex-red text-base font-medium">
          Home
        </Link>
        <Link to="/plans" onClick={onClose} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
          Plans
        </Link>
        <Link to="/gallery" onClick={onClose} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
          Gallery
        </Link>
        <Link to="/store" onClick={onClose} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
          Store
        </Link>
        <Link to="/social" onClick={onClose} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
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
              <Link to="/auth" onClick={onClose} className="text-base font-medium text-gray-800">
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
                onClick={onClose}
                className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              >
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                >
                  Admin Portal
                </Link>
              )}
              <Link
                to="/settings"
                onClick={onClose}
                className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 w-full text-left"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={onClose}
              className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
