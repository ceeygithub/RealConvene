

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AvatarCss from '../styles/DropdownAvatar.module.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuth } from '../contexts/AuthContext';

// const DropdownAvatar = ({ onCloseDropdown }) => {
//   const navigate = useNavigate();
//   const { logout, isAdmin, user } = useAuth(); // Access the user object from the AuthContext
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userAvatar, setUserAvatar] = useState(null); // State to store the user's avatar URL
// // useEffect(() => {
// //   // Log the user's avatar URL
// //   console.log('User Avatar URL:', userAvatar);

// //   // Fetch the user's avatar URL from the user object
// //   if (user && user.photoURL) {
// //     setUserAvatar(user.photoURL);
// //   }
// // }, [user]);
// useEffect(() => {
//   // Fetch the user's avatar URL from the user object
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   if (user && user.photoURL) {
//     setUserAvatar(user.photoURL);
//   }
// }, [user]); // No longer includes userAvatar in the dependency array



//   const handleAvatarClick = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//     onCloseDropdown();
//   };

//   const handleLogoutClick = async () => {
//     try {
//       await logout();
//       navigate('/');
//     } catch (error) {
//       console.error('Error during logout:', error.message);
//     }
//     closeDropdown();
//   };

//   return (
//     <div className={AvatarCss.avatarContainer} onClick={handleAvatarClick}>
//       <div className={AvatarCss.avatarContainer}>
//         {userAvatar ? (
//           <img src={userAvatar} alt="Avatar" className={AvatarCss.avatarImg} />
//         ) : (
//           <img src='https://static.statusqueen.com/dpimages/thumbnail/No_Dp_-1507.jpg' alt="Default Avatar" className={AvatarCss.avatarImg} />
//         )}
//         <MdKeyboardArrowDown />
//       </div>

//       {isDropdownOpen && (
//         <div className={AvatarCss.dropdownContent}>
//           <Link to="/userDashboard" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
//             Profile
//           </Link>
//           <Link to="/" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
//             Home
//           </Link>
//           {/* Render Interests link only for regular users */}
//           {!isAdmin() && (
//             <Link to="/profile" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
//               Interests
//             </Link>
//           )}
//           {/* Render Create Meetup link only for admin users */}
//           {isAdmin() && (
//             <Link to="/create-meetup" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
//               Create Meetup
//             </Link>
//           )}

//           <Link to="/notifications" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
//             Notifications
//           </Link>
//           <Link to="/faq" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
//             Close
//           </Link>
//           <button onClick={handleLogoutClick}>Logout</button>
//         </div>
//       )}
//     </div>
//   );
// };

// DropdownAvatar.propTypes = {
//   onCloseDropdown: PropTypes.func.isRequired,
// };

const DropdownAvatar = ({ onCloseDropdown }) => {
  const navigate = useNavigate();
  const { logout, isAdmin, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    if (user && user.photoURL) {
      setUserAvatar(user.photoURL);
    }
  }, [user]);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    onCloseDropdown();
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
    closeDropdown();
  };

  return (
    <div key={user ? user.uid : 'no-user'} className={AvatarCss.avatarContainer} onClick={handleAvatarClick}>
      <div className={AvatarCss.avatarContainer}>
        {userAvatar ? (
          <img src={userAvatar} alt="Avatar" className={AvatarCss.avatarImg} />
        ) : (
          <img src='https://static.statusqueen.com/dpimages/thumbnail/No_Dp_-1507.jpg' alt="Default Avatar" className={AvatarCss.avatarImg} />
        )}
        <MdKeyboardArrowDown />
      </div>

          {isDropdownOpen && (
        <div className={AvatarCss.dropdownContent}>
          <Link to="/userDashboard" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
            Profile
          </Link>
          <Link to="/" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
            Home
          </Link>
          {/* Render Interests link only for regular users */}
          {!isAdmin() && (
            <Link to="/profile" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
              Interests
            </Link>
          )}
          {/* Render Create Meetup link only for admin users */}
          {isAdmin() && (
            <Link to="/create-meetup" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
              Create Meetup
            </Link>
          )}

          <Link to="/notifications" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
            Notifications
          </Link>
          <Link to="/faq" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
            Close
          </Link>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      )}
    </div>
  );
};
DropdownAvatar.propTypes = {
  onCloseDropdown: PropTypes.func.isRequired,
};
export default DropdownAvatar;

