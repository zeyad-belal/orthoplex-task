/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getAuthHeaders } from "./../utils/utils";

const API_URL = import.meta.env.VITE_APP_API;
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sync user data with local storage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
        rememberMe,
      });
      const { user, token } = response.data;

      if (token) {
        Cookies.set("token", token, { secure: true, sameSite: "strict" });
      }

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, userData);
      const { newUser, token } = response.data;

      if (token) {
        Cookies.set("token", token, { secure: true, sameSite: "strict" });
      }
      localStorage.setItem("user", JSON.stringify(newUser));

      setUser(newUser);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed",
      };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const getUserData = async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data.user;
  };

  const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  };

  const updateUserData = async (userId, data) => {
    const response = await axios.put(`${API_URL}/users/${userId}`, data, {
      headers: getAuthHeaders(),
    });
    return response.data.user;
  };

  const getCurrentUser = async () => {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: getAuthHeaders(),
    });
    return response.data.user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        getUserData,
        getAllUsers,
        updateUserData,
        getCurrentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
