
import React, { useContext, useState, useEffect } from 'react';
import { auth, db,storage } from '../Firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';


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

// events
const createEventsCollection = async (values) => {
  try {
    // Upload the image file to the "eventsImage" folder in Firebase Storage
    const imageRef = ref(storage, `eventsImage/${values.image.name}`);
    await uploadBytes(imageRef, values.image);

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(imageRef);

    // Provide the path to the "events" collection
    const eventsCollectionRef = collection(db, 'events');
    
    // Add a document to the "events" collection with the provided values
    await addDoc(eventsCollectionRef, {
      title: values.title || '',
      date: values.date || '',
      location: values.location || '',
      imageUrl: imageUrl || '', // Store the URL of the uploaded image
    });

    console.log('Event added to the "events" collection:', values);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error; // Re-throw the error to handle it in the calling function if necessary
  }
};
const getEvents = async () => {
    try {
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const events = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
   

      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
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
getEvents 
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
