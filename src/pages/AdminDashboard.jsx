

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminDashboard.css';
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineEventSeat } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


const AdminDashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('admin');

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'users':
        return (
          <div className="card">
            <div className="title">Users</div>
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'createMeetup':
        return (
          <div>
            {/* UI for creating meetup */}
            CREATE MEET UP
          </div>
        );
      case 'settings':
        return (
          <div>
            {/* UI for settings */}
            SETTINGS
          </div>
        );
   
      case 'event':
        return (
          <div>
            {/* UI for events */}
            EVENTS
         
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className={`left-menu ${isMenuOpen ? 'small-left-menu' : ''}`}>
        <div className="left-menu">
          <div className='adminTitle'>
   <RiAdminFill />
          <h4>ADMIN</h4>
          </div>
           <hr />
          <ul>
            {/* <li className={`active ${selectedMenu === 'admin' ? 'active' : ''}`}>
              <Link to="#" className='link' onClick={() => handleMenuClick('admin')}>
                <RiAdminFill />
                <span className='admin-title'>ADMIN</span>
              </Link>
            </li> */}
            <li className={selectedMenu === 'users' ? 'active' : ''}>
              <Link to="#" className='link' onClick={() => handleMenuClick('users')}>
                <FaUsers />
                <span>Users</span>
              </Link>
            </li>
            <li className={selectedMenu === 'createMeetup' ? 'active' : ''}>
              <Link to="#" className='link' onClick={() => handleMenuClick('createMeetup')}>
                <IoCreateOutline />
                <span>Create meetup</span>
              </Link>
            </li>
                    <li className={selectedMenu === 'event' ? 'active' : ''}>
              <Link to="#" className='link' onClick={() => handleMenuClick('event')}>
               <MdOutlineEventSeat />
                <span>Events</span>
              </Link>
            </li>

     <li className={selectedMenu === 'settings' ? 'active' : ''}>
              <Link to="#" className='link' onClick={() => handleMenuClick('settings')}>
                <IoSettingsOutline />
                <span>Settings</span>
              </Link>
            </li>
            {/* Add menu items for settings, report, and events */}
          </ul>
        </div>
      </div>

      <div className="page-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
