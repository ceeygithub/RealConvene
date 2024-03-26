

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { db } from '../Firebase';
// import DisplayPictureCSS from '../styles/DisplayPicture.module.css';




// const DisplayPicture = () => {
//   const [image, setImage] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [profileData, setProfileData] = useState({}); // State to store profile data
//   const navigate = useNavigate();
//   const { user, updateUserProfile } = useAuth();

//   useEffect(() => {
//     // Fetch profile data when the component mounts
//     const fetchProfileData = async () => {
//       try {
//         const userDocRef = db.collection('users').doc(user.uid);
//         const docSnapshot = await userDocRef.get();
//         if (docSnapshot.exists()) {
//           setProfileData(docSnapshot.data());
//         } else {
//           console.error('User document does not exist');
//         }
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };
    
//     fetchProfileData(); // Call the fetchProfileData function here

//   }, [user]); // Include 'user' in the dependency array

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       // Call updateUserProfile and wait for it to complete
//       await updateUserProfile(profileData, image, setUploadProgress);
      
//       // After updateUserProfile completes, navigate to the profile page
//       navigate('/profile');
//     } catch (error) {
//       console.error('Error handling upload:', error);
//       // Handle error as needed
//     }
//   };

//   return (
//     <div className={DisplayPictureCSS.container}>
//       <h4>Upload your display image</h4>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <button onClick={handleUpload} className={DisplayPictureCSS.uploadButton}>
//         Upload
//       </button>
//       {uploadProgress > 0 && <progress value={uploadProgress} max="100" className={DisplayPictureCSS.progressBar} />}
//     {Object.keys(profileData).length > 0 && (
//   <div>
//     <p>User ID: {profileData.userId}</p>
//     <p>Email: {profileData.email}</p>
//     {/* Add other profile data fields here */}
//   </div>
// )}

//     </div>
//   );
// };

// export default DisplayPicture;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DisplayPictureCSS from '../styles/DisplayPicture.module.css';

const DisplayPicture = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        setProfileData(await updateUserProfile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData(); // Call the fetchProfileData function here
  }, [user, updateUserProfile]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


const handleUpload = async () => {
  try {
    if (!image) {
      console.error('Image is not selected.');
      return;
    }

    // Call updateUserProfile and wait for it to complete
    await updateUserProfile(profileData, image, setUploadProgress);
    
    // After updateUserProfile completes, navigate to the profile page
    navigate('/profile');
  } catch (error) {
    console.error('Error handling upload:', error);
    // Handle error as needed
  }
};


  return (
    <div className={DisplayPictureCSS.container}>
      <h4>Upload your display image</h4>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} className={DisplayPictureCSS.uploadButton}>
        Upload
      </button>
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" className={DisplayPictureCSS.progressBar} />}
      {profileData.photoURL && (
        <div>
          <img src={profileData.photoURL} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default DisplayPicture;

