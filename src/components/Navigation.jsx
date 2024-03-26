

import React from 'react';
import { Link } from 'react-router-dom';
import NavCSS from '../styles/Navigation.module.css';
import logoImg from '../assets/Group 1.png';
import DropdownAvatar from './DropdownAvatar';
import SearchBar from './SearchBar';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext'; 

const Navigation = () => {
  const {  isAuthenticated } = useAuth(); 

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Search');
  };

  return (
    <nav className={NavCSS.navbar}>
      <div className={NavCSS.navbarContainer}>
        <Link to="/" className={NavCSS.navbarLogo}>
          <img src={logoImg} alt="" className={NavCSS.logoImg} />
        </Link>
        {isAuthenticated() && (
          <>
            <SearchBar onChange={handleSearch} />
            <div className={NavCSS.navbarLinks}>
              <Link to="/explore" className={NavCSS.navbarLink}>
                <FiMessageSquare />
                Messages
              </Link>
              <Link to="/notifications" className={NavCSS.navbarLink}>
                <IoMdNotificationsOutline />
                Notifications
              </Link>
                 
              <DropdownAvatar onCloseDropdown={() => {}} />
       
            </div>
          </>
        )}
        {!isAuthenticated() && (
          <div className={NavCSS.navbarLinks}>
            <Link to="/signup" className={`${NavCSS.navbarLink} ${NavCSS.signup}`}>
              Sign Up
            </Link>
            <Link to="/signin" className={`${NavCSS.navbarLink} ${NavCSS.signin}`}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

