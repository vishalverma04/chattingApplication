import axios from 'axios';
const API_URL = 'http://localhost:4000';

const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/users/login`, {
      email,
      password
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const checkIsLoggedIn = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }
    const { data } = await axios.get(`${API_URL}/api/v1/users/isLoggedIn`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }
    const { data } = await axios.post(`${API_URL}/api/v1/users/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (formData) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/users/register`, formData);
    console.log('Registration response:', data);
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  login,
  checkIsLoggedIn,
  logout,
  register
};
