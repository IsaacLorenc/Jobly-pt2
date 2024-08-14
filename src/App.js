import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import JoblyApi from './api';
import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './UserContext';
import NavBar from './NavBar';
import HomePage from './HomePage';
import LoginForm from './Forms/LoginForm';
import SignupForm from './Forms/SignupForm';
import CompaniesList from './CompaniesList';
import CompanyDetail from './CompanyDetail';
import JobsList from './JobsList';
import ProfilePage from './Forms/ProfilePage';
import ProtectedRoute from './ProtectedRoute'; // Custom component for route protection

function App() {
  const [token, setToken] = useLocalStorage('token', null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (token) {
      JoblyApi.token = token;
      JoblyApi.getCurrentUser()
        .then(user => setCurrentUser(user))
        .catch(err => console.error(err));
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  const login = async (data) => {
    try {
      const res = await JoblyApi.login(data);
      setToken(res.token);
      setCurrentUser(res.user);
    } catch (err) {
      console.error(err);
    }
  };

  const signup = async (data) => {
    try {
      const res = await JoblyApi.signup(data);
      setToken(res.token);
      setCurrentUser(res.user);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, logout, setCurrentUser }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={currentUser ? <Navigate to="/" /> : <LoginForm login={login} />} 
          />
          <Route 
            path="/signup" 
            element={currentUser ? <Navigate to="/" /> : <SignupForm signup={signup} />} 
          />
          <Route 
            path="/companies" 
            element={
              <ProtectedRoute currentUser={currentUser}>
                <CompaniesList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/companies/:handle" 
            element={
              <ProtectedRoute currentUser={currentUser}>
                <CompanyDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute currentUser={currentUser}>
                <JobsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute currentUser={currentUser}>
                <ProfileForm />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;