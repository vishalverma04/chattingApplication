import React, { createContext, useState, useContext } from 'react';
import Loader from '../components/Loader.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const API_URL =  'http://localhost:4000';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const [loggedInUser,setLoggedInUser]=useState({})
  const navigate=useNavigate()

  const login = async (email, password) => {
    try {
      const {data} = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password
      });
      console.log("Login response:", data);
      if (data.success==true) {
        setAuth(data.jwttoken); // Save the token in state
        setIsLoggedIn(true)
        localStorage.setItem('authToken', data.jwttoken);
        localStorage.setItem('user',JSON.stringify(data.user))
        setLoggedInUser(data.user)
        localStorage.setItem("userId",data.user.userId)
        return data;
      } else {
        setIsLoggedIn(false)
        return data;
      }
    } catch (error) {
      setIsLoggedIn(false)
      toast.error(error.response?.data?.message || "Something went wrong.");
      return error.response?.data || { success: false, message: 'Login failed' };
    }
  };

  const checkIsLoggedIn = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return false;
      }
      const { data } = await axios.get(`${API_URL}/api/users/isLoggedIn`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.success == true) {
        setIsLoggedIn(true)
        setLoggedInUser(data.user)
        localStorage.setItem('userId', data.user.userId);
        setLoggedInUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      
        
        return true;
      } else {
        localStorage.removeItem('authToken');
        setLoggedInUser({})
        localStorage.removeItem('userId')
        setIsLoggedIn(false)
        console.error('Login failed:', data.message);
        return false;
      }
    } catch (error) {
      setIsLoggedIn(false)
      console.error('An error occurred:', error);
      return false;
    }
  }

  const register = async (formData) => {
    setIsLoading(true);
    setAuth(null);
    try {
      const { data } = await axios.post(`${API_URL}/api/users/register`, formData);
      if (data.success === true) {
        toast.success('Registration successfully');
        setAuth(data.jwttoken);
        localStorage.setItem('authToken', data.jwttoken);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
        return data;
        
      } else {
        toast.error(data.message || 'Registration failed. Please try again.');
        return data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.');
      throw error;
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIsLoggedIn();
    setIsLoading(false);
  }, []);

  const logout = () => {
    setAuth(null);
    setIsLoggedIn(false)
    setLoggedInUser({})
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId')
    toast.success("Logged out successfully")
    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout,isLoggedIn ,loggedInUser,register}}>
     {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
