
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavCSS from '../styles/Navigation.module.css';
import logoImg from '../assets/Group 1.png';
import DropdownAvatar from './DropdownAvatar';
import SearchBar from './SearchBar';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoIosMenu } from "react-icons/io";
import { FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext'; 

const Navigation = () => {
  const { isAuthenticated, isAdmin, isRegularUser } = useAuth(); 
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Search');
  };

  return (
    <nav className={NavCSS.navbar}>
      <div className={`${NavCSS.navbarContainer} ${isAdmin() ? NavCSS.leftAlign : ''}`}>
        <div className={`nav-title ${isAdmin() ? NavCSS.adminLogo : ''}`}>
          <img src={logoImg} alt="" className={NavCSS.logoImg} />
        </div>
        <div className={NavCSS.mobileMenuIcon} onClick={() => setShowMenu(!showMenu)}>
          <IoIosMenu />
        </div>
        <div className={`${NavCSS.navbarLinks} ${showMenu ? NavCSS.showMenu : ''}`}>
          {isAuthenticated() && (
            <>
              {isAdmin() && (
                <div className={`${NavCSS.navbarLink} ${NavCSS.adminMessage}`}>Welcome Admin</div>
              )}
              {isRegularUser() && (
                <>
                  <SearchBar onChange={handleSearch} />
                  <Link to="/explore" className={NavCSS.navbarLink}>
                    <FiMessageSquare />
                    Messages
                  </Link>
                  <Link to="/notifications" className={NavCSS.navbarLink}>
                    <IoMdNotificationsOutline />
                    Notifications
                  </Link>
                </>
              )}
              <DropdownAvatar onCloseDropdown={() => {}} />
            </>
          )}
          {!isAuthenticated() && (
            <div className={NavCSS.authLinks}>
              <Link to="/signup" className={`${NavCSS.navbarLink} ${NavCSS.signup}`}>
                Sign Up
              </Link>
              <Link to="/signin" className={`${NavCSS.navbarLink} ${NavCSS.signin}`}>
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
