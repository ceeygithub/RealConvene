import React, { useContext, useState } from "react";
import { auth } from "../Firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(auth,email, password).then((userCredential=>{
console.log(userCredential)
      }));
    } catch (error) {
      console.log(error)
    }
  };

  const login = async (email, password) => {
    try {
    await auth.signInWithEmailAndPassword(auth,email, password).then((userCredential=>{
console.log(userCredential)
      }));
    } catch (error) {
      console.log(error)
    }
  };


   const logout = async () => {
    try {
      // Clear user from local storage
      localStorage.removeItem("currentUser");

      // Sign out from Firebase
      await auth.signOut();

      // Clear current user state
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };


  const resetPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  };

  const updateEmail = async (email) => {
    try {
      await currentUser.updateEmail(email);
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async (password) => {
    try {
      await currentUser.updatePassword(password);
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = () => {
    return currentUser && currentUser.email === 'admin@example.com'; 
  };

  const isRegularUser = () => {
    return currentUser && !isAdmin();
  };

  const isAuthenticated = () => {
    return !!currentUser; // Returns true if currentUser exists, otherwise false
  };

  auth.onAuthStateChanged(user => {
    setCurrentUser(user);
  });

  const value = {
    currentUser,
 login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    isAdmin,
    isRegularUser,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
