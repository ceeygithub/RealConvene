import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/PasswordReset';
import DisplayPicture from './pages/DisplayPicture';


function App() {
  // const [selectedInterests, setSelectedInterests] = useState([]);
  return (
  
      < BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/displaypicture" element={<DisplayPicture />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
        {/* <Route path="/profile" element={<Profile setSelectedInterests={setSelectedInterests} />} />
        <Route path="/userDashboard" element={<UserDashboard selectedInterests={selectedInterests} />} /> */}
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;

