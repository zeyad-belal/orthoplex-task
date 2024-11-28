import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Home, Info, LogOut } from "lucide-react";

export default function Navbar() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  function handleLogout() {
    logout();
    navigate("/login");
  }


  return (
    <nav className="bg-white shadow-custom">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary-600">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive("/dashboard")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
              <Link
                to="/about"
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive("/about")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <Info className="h-5 w-5 mr-2" />
                About
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
