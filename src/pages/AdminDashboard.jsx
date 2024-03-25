

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminDashboard.css';
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineEventSeat } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth } from '../contexts/AuthContext';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from 'yup';


const AdminDashboard = () => {
  const {createEventsCollection } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('admin');

 

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
     setMenuOpen(false); 
  };

   const eventSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    date: Yup.string().required('Date is required'),
    location: Yup.string().required('Location is required'),
    image: Yup.mixed().required('Image is required'),
  });
  const renderContent = (setFieldValue) => {
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
          <div className="form-container">
             <Formik
              initialValues={{
              title: '',
                date: '',
                location: '',
                image: null, 
              }}
              validationSchema={eventSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await createEventsCollection(values); // Call the function to create event collection
                  console.log('Event added to database:', values);
                  // You can also handle success message or redirection here
                } catch (error) {
                  console.error('Error creating event:', error);
                  // Handle error or set formik error message accordingly
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Form fields */}
           
 <Field type="text" name="title" placeholder="Event Title" />
                  <ErrorMessage name="title" component="div" className="error-message" />

                  <Field type="text" name="date" placeholder="Event Date" />
                  <ErrorMessage name="date" component="div" className="error-message" />

                  <Field type="text" name="location" placeholder="Event Location" />
                  <ErrorMessage name="location" component="div" className="error-message" />

                  {/* Image upload field */}
                  <input
                    type="file"
                    name="image"
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage name="image" component="div" className="error-message" />


                  {/* Submit button */}
                  <button type="submit" disabled={isSubmitting}>
                    Create Event
                  </button>
                </Form>
              )}
            </Formik>
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


