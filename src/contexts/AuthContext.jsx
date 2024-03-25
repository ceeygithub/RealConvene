
import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

// eslint-disable-next-line no-unused-vars
const [error, setError] = useState("");
// eslint-disable-next-line no-unused-vars
const [role, setRole] = useState('');
  const [user, setUser] = useState();


useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        console.log("User logged in:", user);
        const userRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setRole(userData.role); 
        } else {
         
          console.error("User document does not exist");
          setError("User document does not exist");
     
        }
      } else {
        setUser(null);
        setRole(''); 
        console.log("User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    setError(""); // Clear any previous error messages

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      
      // Add user data to Firestore
      const userRef = await addDoc(collection(db, 'users'), {
        userId: userCredential.user.uid,
        email: email,
        password: password,
        role:'regular',
      });

      console.log("Document written with ID:", userRef.id);

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use. Please try another email.");
      } else {
        setError(error.message);
      }
    }
  };

 const login = async (email, password) => {
  setError(""); // Clear any previous error messages

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const userRef = doc(db, 'users', userCredential.user.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      setRole(userData.role);
      console.log('User logged in successfully:', userData);
      return { userCredential, role: userData.role }; // Return user credential and role
    } else {
      console.error("User document does not exist");
      setError("User document does not exist");
      return null;
    }
  } catch (error) {
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      setError("Invalid email or password.");
    } else {
      setError(error.message);
    }
    return null;
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
    return user && user.email === 'admin@gmail.com'
  
  };



  const isRegularUser = () => {
    return user && !isAdmin();
  };

  const isAuthenticated = () => {
    return !!user;
  };

  // event creation
  const createEventsCollection = async () => {
  try {
    // Create the "events" collection
    await collection('events').addDoc({
       title: '',
            date: '',
            location: '',
            image: null,
    });

    console.log('Events collection created successfully!');
  } catch (error) {
    console.error('Error creating events collection:', error);
  }
};

  const value = {
    user,
    login,
    signup,
    logout,
    resetPassword,
    isAdmin,
    isRegularUser,
    isAuthenticated,
    createEventsCollection,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
