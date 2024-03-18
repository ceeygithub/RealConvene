import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/PasswordReset';
import {  useAuth } from "./contexts/AuthContext"; 

const ProtectedUserRoute = ({ element }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated() && !isAdmin()) {
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};

const ProtectedAdminRoute = ({ element }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated() && isAdmin()) {
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};

function App() {
  return (
  
      < BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        <Route path="/userDashboard" element={<ProtectedUserRoute element={<UserDashboard />} />} />
        <Route path="/adminDashboard" element={<ProtectedAdminRoute element={<AdminDashboard />} />} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;

