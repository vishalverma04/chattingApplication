import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user= JSON.parse(localStorage.getItem('user'));

  return (
   <>
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ChatHub
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors">
                  Home
                </Link>
              
                  <Link to={isLoggedIn ? "/chat" : "/login"} className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    Chat
                  </Link>
              
                <Link to={isLoggedIn ? "/video-call" : "/login"} className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Video Call
                </Link>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  About
                </Link>
                {isLoggedIn ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                       {user ?'Welcome '+ user.fullName : 'Profile'}
                    </Link>
                  </div>
                ) : (
                  <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Login/Register
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <a href="#" className="text-blue-600 block px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Chat
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Video Call
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                About
              </a>
              <a href="#" className="bg-blue-600 text-white block px-3 py-2 text-base font-medium rounded-lg mx-3 mt-2">
                Login/Register
              </a>
            </div>
          </div>
        )}
      </nav>
   </>
  )
}

export default Navbar
