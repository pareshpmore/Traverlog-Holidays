import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Menu, X, User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useAuth();
  const isAdmin = userRole === 'admin';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Helper function to get the correct path for sub-items
const getSubItemPath = (parent, item) => {
  const itemLower = item.toLowerCase().replace(" ", "-");

  if (parent === "Romantic Honeymoon") {
    return `/romantic-honeymoon/${itemLower}`;
  }

  if (parent === "Celebration Packages") {
    return `/celebration-packages/${itemLower}`;
  }

  if (parent === "Bachelor Holidays") {
    return `/bachelor-holidays`;
  }

  if (parent === "Family Holidays") {
    return `/family-holidays`;
  }

  if (parent === "Bookings") {
    return `/${itemLower}-booking`;
  }

  return "#";
};


  const navItems = [
    {
      title: 'Romantic Honeymoon',
      subItems: ['Domestic', 'International'],
    },
    {
      title: 'Celebration Packages',
      subItems: ['Anniversary', 'Birthday', 'Festival'],
    },
    { title: 'Bachelor Holidays' },
    { title: 'Family Holidays' },
    {
      title: 'Bookings',
      subItems: ['Hotel', 'Flight', 'Cab'],
    },
    { title: 'Contact Us' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-blue-600 bg-clip-text text-transparent">
                  Travelong Holiday
                </h1>
                <p className="text-[10px] text-gray-500 font-medium">Create Memories</p>
              </div>
            </Link>
            <Link 
              to="/" 
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={index} className="group relative">
                {(item.title === 'Romantic Honeymoon' || item.title === 'Celebration Packages' || item.title === 'Bookings') ? (
                  <div 
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.title}
                    {item.subItems && (
                      <svg
                        className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={getSubItemPath(item.title, item.title)}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
                  >
                    {item.title}
                    {item.subItems && (
                      <svg
                        className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>
                )}
                {item.subItems && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={getSubItemPath(item.title, subItem)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4">
              {currentUser ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="hidden md:inline">
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium truncate">{currentUser.displayName || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            {navItems.map((item, index) => (
              <div key={index} className="mb-2">
                {(item.title === 'Romantic Honeymoon' || item.title === 'Celebration Packages' || item.title === 'Bookings') ? (
                  <div 
                    className="flex items-center justify-between w-full text-gray-700 py-3 px-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.subItems && (
                      <span className="text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={getSubItemPath(item.title, item.title)}
                    className="flex items-center justify-between w-full text-gray-700 py-3 px-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.subItems && (
                      <span className="text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    )}
                  </Link>
                )}
                {item.subItems && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={getSubItemPath(item.title, subItem)}
                        className="block py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-lg mt-4 hover:from-blue-700 hover:to-cyan-600 font-semibold transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;