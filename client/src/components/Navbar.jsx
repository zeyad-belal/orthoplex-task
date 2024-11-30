import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Home, Info, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/dashboard', icon: Home, text: 'Home' },
    { path: '/about', icon: Info, text: 'About' }
  ];

  function handleLogout(){
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-custom">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary-600">Dashboard</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ path, icon: Icon, text }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-2 py-2 rounded-lg transition-colors ${
                    isActive(path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {text}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Logout */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? "Close menu" : "Menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen ? (
          <div className="md:hidden py-4 space-y-2" data-testid="mobile-menu">
            {navLinks.map(({ path, icon: Icon, text }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-2 py-2 rounded-lg transition-colors ${
                  isActive(path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {text}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center px-2 py-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
