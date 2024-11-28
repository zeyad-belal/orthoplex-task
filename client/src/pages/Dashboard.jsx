import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut } from 'lucide-react';
import { userApi } from '../utils/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getUserById(user._id);
        setUserData(response.data.user);
        setError(null);
      } catch {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-custom">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-primary-600">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-custom py-8">
        {error ? (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Profile Card */}
            <div className="card">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <p className="text-gray-600">Your personal details</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="mt-1 text-gray-900">{userData?.first_name} {userData?.last_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="mt-1 text-gray-900">{userData?.email}</p>
                </div>
              </div>
            </div>

            {/* Additional Dashboard Content */}
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <h2 className="text-xl font-semibold">Welcome Back!</h2>
              <p className="mt-2">You are successfully logged into your account.</p>
              <div className="mt-4 p-4 bg-white/10 rounded-lg">
                <p className="text-sm">Last login: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
