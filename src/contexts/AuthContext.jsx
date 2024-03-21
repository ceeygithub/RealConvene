

import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase'; 

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      setCurrentUser(userAuth);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

 
 const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email, password); // 
      const user = userCredential.user;

      // Create user profile document in Firestore
      const userRef = db.doc('users', user.uid); // Corrected path to doc
      await db.setDoc(userRef, { email }); // You can store additional user data here

      console.log('User signed up successfully!');
      return user;
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };
  
  
  // const login = async (email, password) => {
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password); 
  //   } catch (error) {
  //     throw error;
  //   }
  // };
// 

const login = async (email, password) => {
  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve user data from Firestore
    const userRef = db.doc(db, 'users', user.uid);
    const userSnapshot = await db.getDoc(userRef);
    const userData = userSnapshot.data();

    console.log('User logged in successfully:', userData);
    
    return user;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
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

  const isAdmin = () => {
    return currentUser && currentUser.email === 'admin@gmail.com';
  };

  const isRegularUser = () => {
    return currentUser && !isAdmin();
  };

  const isAuthenticated = () => {
    return !!currentUser;
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    isAdmin,
    isRegularUser,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
