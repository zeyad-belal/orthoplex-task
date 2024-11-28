import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Users, Mail } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { user: signedUser, getAllUsers } = useAuth();

  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const data = await getAllUsers();
      setAllUsers(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch all users data");
    } finally {
      setLoading(false);
    }
  };

  // get all users data
  useEffect(() => {
    if (signedUser?._id) {
      fetchAllUsers();
    }
  }, [signedUser]);

  // handle refresh without remember me case
  useEffect(() => {
    if (!token || !signedUser) {
      navigate("/login");
    }
  }, [token, signedUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="container-custom py-8">
        {error ? (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
            role="alert"
          >
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Random Dashboard Content */}
              <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <h2 className="text-xl font-semibold">Welcome Back!</h2>
                <p className="mt-2">
                  You are successfully logged into your account.
                </p>
                <div className="mt-4 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm">
                    Last login: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* User Profile Card */}
              <div className="card">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Profile Information
                    </h2>
                    <p className="text-gray-600">Your personal details</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="mt-1 text-gray-900">
                      {signedUser?.firstName} {signedUser?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">{signedUser?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* All Users Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    All Users
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allUsers?.length ? (
                  allUsers?.map((user, i) => {
                    return (
                      <div
                        className="card hover:shadow-lg transition-shadow duration-200"
                        key={i}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary-100 p-3 rounded-full">
                            <User className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.firstName} {user.lastName}
                            </p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Mail className="h-4 w-4 mr-1" />
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>users werent fetched</div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
