
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AvatarCss from '../styles/DropdownAvatar.module.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuth } from '../contexts/AuthContext'; 


const DropdownAvatar = ({ onCloseDropdown }) => {
    const {  logout } = useAuth(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    onCloseDropdown();
  };

  const handleLogoutClick = () => {
 logout(); 
      console.log('Logout');

    closeDropdown();
  };
  return (
    
<div className={AvatarCss.avatarContainer }onClick={handleAvatarClick}>
      <img src='https://images.pexels.com/photos/4754648/pexels-photo-4754648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="Avatar" className='avatarImg'  style={{width: '1.5rem', borderRadius:'100%'}}/>
      <MdKeyboardArrowDown />
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
          <Link to="/notifications" className={AvatarCss.dropdownLink}onClick={closeDropdown}>
            Notifications
          </Link>
          <Link to="/faq" className={AvatarCss.dropdownLink} onClick={closeDropdown}>
            close
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
