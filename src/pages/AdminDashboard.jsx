

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminDashboard.css';
import { FaUsers } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineEventSeat } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
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
              onSubmit={async (values, { setSubmitting , resetForm }) => {
                try {
                  await createEventsCollection(values); // Call the function to create event collection
                  console.log('Event added to database:', values);
                  // You can also handle success message or redirection here
                   resetForm();
                      values.image = null;
                } catch (error) {
                  console.error('Error creating event:', error);
                  // Handle error or set formik error message accordingly
                }
                //  values.image = null;
                setSubmitting(false);
              }}
            >
              {({ isSubmitting , setFieldValue  }) => (

<Form className="event-form">
  {/* Form fields */}
  <div className="form-group">
    <Field type="text" name="title" placeholder="Event Title" className="form-control" />
    <ErrorMessage name="title" component="div" className="error-message" />
  </div>

  <div className="form-group">
    <Field type="text" name="date" placeholder="Event Date" className="form-control" />
    <ErrorMessage name="date" component="div" className="error-message" />
  </div>

  <div className="form-group">
    <Field type="text" name="location" placeholder="Event Location" className="form-control" />
    <ErrorMessage name="location" component="div" className="error-message" />
  </div>

  {/* Image upload field */}
  <div className="form-group">
    <input
      type="file"
      name="image"
      onChange={(event) => {
        setFieldValue("image", event.currentTarget.files[0]);
      }}
      className="file-input"
    />
    <ErrorMessage name="image" component="div" className="error-message" />
  </div>

  {/* Submit button */}
  <button type="submit" disabled={isSubmitting} className="submit-button">
    Create Event
  </button>
</Form>

              )}
            </Formik>
          </div>
        );
          case 'deletemeetup':
        return (
          <div>
            {/* UI for settings */}
        Delete meetup
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
            
   <li className={selectedMenu === 'deletemeetup' ? 'active' : ''}>
              <Link to="#" className='link' onClick={() => handleMenuClick('deletemeetup')}>
  <MdDeleteOutline />
                <span>Delete Event </span>
              </Link>
            </li>
            

     <li className={selectedMenu === 'settings' ? 'active' : ''}>
              <Link to="#" className='link' onClick={() => handleMenuClick('settings')}>
                <IoSettingsOutline />
                <span>Settings</span>
              </Link>
            </li>
 
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


