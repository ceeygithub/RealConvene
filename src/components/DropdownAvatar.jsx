import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AvatarCss from '../styles/DropdownAvatar.module.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuth } from '../contexts/AuthContext';

const DropdownAvatar = ({ onCloseDropdown }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className={AvatarCss.avatarContainer} onClick={handleAvatarClick}>
      <div className={AvatarCss.avatarContainer}>
   <img src='https://images.pexels.com/photos/4754648/pexels-photo-4754648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="Avatar" className={AvatarCss.avatarImg}   />
         <MdKeyboardArrowDown />
      </div>
   

      {isDropdownOpen && (
        <div className={AvatarCss.dropdownContent}>
          <Link to="/userDashboard" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
            Profile
          </Link>
          <Link to="/profile" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
            Interests
          </Link>
          {/* Add more dropdown items as needed */}
          <Link to="/" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
            Home
          </Link>
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
