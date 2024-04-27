
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DisplayPictureCSS from '../styles/DisplayPicture.module.css';

const DisplayPicture = () => {
  const [image, setImage] = useState(null);
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  const { user, updateUserProfile,uploadProgress, setUploadProgress } = useAuth();

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

  const handleSkip = () => {
    // Navigate to the profile page without uploading a display picture
    navigate('/profile');
  };

  return (
    <div className={DisplayPictureCSS.container}>
      <h4 className={DisplayPictureCSS.heading}>Upload your display image</h4>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} className={DisplayPictureCSS.uploadButton}>
        Upload
      </button>
      <button onClick={handleSkip} className={DisplayPictureCSS.skipButton}>
        Skip
      </button>
            <div className={DisplayPictureCSS.progressBarContainer}>
    <span className={DisplayPictureCSS.progressText}>{uploadProgress}%</span>
     <progress value={uploadProgress} max="100" className={DisplayPictureCSS.progressBar} />

            </div>
 
    </div>
  );
};

export default DisplayPicture;
