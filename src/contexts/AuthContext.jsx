
import React, { useContext, useState, useEffect } from 'react';
import { auth, db,storage } from '../Firebase'; 
import {  onAuthStateChanged,updateProfile } from 'firebase/auth';
import { doc, getDoc,getDocs, collection, addDoc,  updateDoc } from 'firebase/firestore';
import {  ref, uploadBytes, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import { increment} from 'firebase/firestore';


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);
   const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedInterests, setSelectedInterests] = useState([]);


    
const interests = [
    {
        name: 'Art & Culture',
        image: 'https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Career & Business',
        image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Community & Environment',
        image: 'https://images.pexels.com/photos/3387159/pexels-photo-3387159.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Science & Education',
        image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600',
    },

    {
        name: 'Games',
        image: 'https://images.pexels.com/photos/1543766/pexels-photo-1543766.jpeg?auto=compress&cs=tinysrgb&w=400',
    },

    {
        name: 'Health & Wellbeing',
        image: 'https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

    {
        name: 'Hobbies & Passion',
        image: 'https://images.pexels.com/photos/10030340/pexels-photo-10030340.jpeg?auto=compress&cs=tinysrgb&w=600',
    },

    {
        name: 'Identity & Language',
        image: 'https://images.pexels.com/photos/4440715/pexels-photo-4440715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

    {
        name: 'Movements & Politics',
        image: 'https://images.pexels.com/photos/4664301/pexels-photo-4664301.jpeg?auto=compress&cs=tinysrgb&w=600',
    },

    {
        name: 'Music & Dancing',
        image: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        name: 'Sports & Fitness',
        image: 'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        name: 'Technology',
        image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
];


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
           setUser(user);
       
      console.log("User logged in:", user);
   
    } else {
      setUser(null);
      console.log("User logged out");
    }

  });

  return () => unsubscribe();
}, []);



const updateUserProfile = async (profileData, image) => {
    try {
      if (!image) {
        console.error('Image is not selected.');
        return;
      }

      // Update user profile data
      await updateProfile(user, profileData);

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `userImages/${user.uid}/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      // Observe state changes, errors, and completion of the upload.
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Get the upload progress
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress );
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );

      // Wait for the upload task to complete
      await uploadTask;

      // Upload completed successfully, get the download URL of the image
      const downloadURL = await getDownloadURL(storageRef);

      // Update user's profile data with the image URL
      await updateProfile(user, { ...profileData, photoURL: downloadURL });

      // Update user state
      setUser(auth.currentUser);
      console.log('User profile and display picture updated successfully:', auth.currentUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
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
      imageUrl: imageUrl || '', 
        comments: [],
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


   const handleUpvote = async (eventId) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, { upvotes: increment(1) });
      console.log('Upvoted successfully');
      
      // Update the events state with the latest data after upvoting
      const updatedEvents = events.map(event => {
        if (event.id === eventId) {
          return { ...event, upvotes: event.upvotes + 1 };
        }
        return event;
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error updating upvotes:', error);
    }
  };

  const handleComment = async (eventId, comment) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      const eventDoc = await getDoc(eventRef);
      
      if (eventDoc.exists()) {
        const updatedComments = [...eventDoc.data().comments, comment];
        await updateDoc(eventRef, { comments: updatedComments });
        console.log('Comment added successfully');
        
        // Update the events state with the latest data after adding a comment
        const updatedEvents = events.map(event => {
          if (event.id === eventId) {
            return { ...event, comments: updatedComments };
          }
          return event;
        });
        setEvents(updatedEvents);
      } else {
        console.error('Event document does not exist');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  const value = {
    user,
    logout,
    resetPassword,
    isAdmin,
    isRegularUser,
    isAuthenticated,
    createEventsCollection,
getEvents ,
updateUserProfile ,
handleComment,
handleUpvote,
uploadProgress,
 setUploadProgress,
 selectedInterests,
  setSelectedInterests,
   interests,

  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
