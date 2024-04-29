

import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminDashboard.css';
import { IoCreateOutline } from "react-icons/io5";

import { MdDeleteOutline } from "react-icons/md";
import { useAuth } from '../contexts/AuthContext';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from 'yup';


const AdminDashboard = () => {
  const {createEventsCollection } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('admin');
   const { getEvents, deleteEvent } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  },  [getEvents]);

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        await deleteEvent(selectedEvent.id);
        // Remove the deleted event from the events state
        setEvents(events.filter(event => event.id !== selectedEvent.id));
        setSelectedEvent(null);
        console.log('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };


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
      accept="image/*"
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
   

     <div className="admin-dashboard-container">
      <h2>Delete Event</h2>
      <select
        className="select-event"
        value={selectedEvent ? selectedEvent.id : ''}
        onChange={(e) => setSelectedEvent(events.find(event => event.id === e.target.value))}
      >
        <option value="">Select an event to delete</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>{event.title}</option>
        ))}
      </select>
      <button
        className="delete-event-button"
        onClick={handleDeleteEvent}
        disabled={!selectedEvent}
      >
        Delete Event
      </button>
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
            <li className={selectedMenu === 'createMeetup' ? 'active' : ''}>
              <Link to="#" className='link' onClick={() => handleMenuClick('createMeetup')}>
                <IoCreateOutline />
                <span>Create meetup</span>
              </Link>
            </li>
   <li className={selectedMenu === 'deletemeetup' ? 'active' : ''}>
              <Link to="#" className='link' onClick={() => handleMenuClick('deletemeetup')}>
  <MdDeleteOutline />
                <span>Delete Event </span>
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


