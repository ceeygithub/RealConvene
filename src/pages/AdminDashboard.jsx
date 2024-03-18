import React from 'react'
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { currentUser, isAdmin } = useAuth();

  // Check if the user is an admin
  if (isAdmin()) {
    return (
      <div>
        <h1>Welcome, Admin!</h1>
        {/* Admin dashboard content */}
      </div>
    );
  } else {
    return <div>Access Denied</div>;
  }
}

export default AdminDashboard;
