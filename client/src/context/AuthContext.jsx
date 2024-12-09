/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getAuthHeaders } from "./../utils/utils";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API;
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // sync user data with local storage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleApiError = (error) => {
    if (error.response?.data?.status === 500 && error.response?.data?.message === "jwt expired") {
      Cookies.remove("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
    return {
      success: false,
      error: error.response?.data?.message || "Operation failed",
    };
  };

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

        localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      return { success: true };
    } catch (error) {
      return handleApiError(error);
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
      return handleApiError(error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: getAuthHeaders(),
      });
      return response.data.user;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const updateUserData = async (userId, data) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, data, {
        headers: getAuthHeaders(),
      });
      return response.data.user;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: getAuthHeaders(),
      });
      return response.data.user;
    } catch (error) {
      return handleApiError(error);
    }
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
