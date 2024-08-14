import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import JoblyApi from './JoblyApi'; // Ensure JoblyApi is configured to handle token

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      JoblyApi.token = token; // Update JoblyApi with token
    } else {
      setCurrentUser(null);
      JoblyApi.token = null; // Clear token from JoblyApi
    }
  }, [token]);

  const login = async (loginData) => {
    const response = await JoblyApi.login(loginData);
    localStorage.setItem('token', response.token);
    setToken(response.token);
  };

  const signup = async (signupData) => {
    const response = await JoblyApi.signup(signupData);
    localStorage.setItem('token', response.token);
    setToken(response.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };