import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to get the correct path for sub-items
  const getSubItemPath = (parent, item) => {
    const itemLower = item.toLowerCase();
    
    // Handle Bookings sub-items (adds -booking suffix)
    if (parent === 'Bookings') {
      return `/${itemLower}-booking`;
    }
    
    // Handle Romantic Honeymoon sub-items
    if (parent === 'Romantic Honeymoon') {
      return `/${itemLower}`; // domestic, international
    }
    
    // Handle Celebration Packages sub-items
    if (parent === 'Celebration Packages') {
      return `/${itemLower}`; // anniversary, birthday, festival
    }
    
    // For main navigation items without sub-items
    switch(item) {
      case 'Bachelor Holidays':
        return '/domestic'; // Redirecting to domestic as per common pattern
      case 'Family Holidays':
        return '/domestic'; // Redirecting to domestic as per common pattern
      case 'Contact Us':
        return '#'; // Using # as a fallback since /contact doesn't exist
      case 'Romantic Honeymoon':
      case 'Celebration Packages':
      case 'Bookings':
        return '#'; // Prevent redirection for these menu items
      default:
        return `/${itemLower}`;
    }
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
                  Travelog Holiday
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
            <button className="bg-blue-600 hover:from-blue-700 hover:to-cyan-600 text-white px-5 py-1.5 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 shadow-md ml-4">
              Login
            </button>
          </nav>

          <button
            className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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