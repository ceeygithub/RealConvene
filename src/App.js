import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Navbar from './components/Navigation';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/PasswordReset';
// import {  useAuth } from "./contexts/AuthContext"; 

// const ProtectedRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated() ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/signin" replace />
//   );
// };
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated()) {
//     return <Navigate to="/signin" />;
//   }

//   return children;
// };


function App() {
  return (
  
      < BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          {/* <ProtectedRoute path="/userDashboard" element={<UserDashboard />} />
          <ProtectedRoute path="/adminDashboard" element={<AdminDashboard />} /> */}
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;

