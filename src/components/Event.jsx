
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import '../styles/Event.css';
import Modal from './Submitmodal';

const Event = () => {
  const { getEvents, handleUpvote, handleComment } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        // Ensure that comments property is always present in each event object
        const eventsWithComments = eventsData.map(event => ({ ...event, comments: event.comments || [] }));
        setEvents(eventsWithComments);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [getEvents]);

  const handleOpenModal = (eventId) => {
    setSelectedEventId(eventId);
  };

  const handleCloseModal = () => {
    setSelectedEventId('');
  };

  return (
    <div className="event-container">
      {events.map((event) => (
        <div className="event-card" key={event.id}>
          <div className="event-card-image" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
          <div className="event-card-details">
            <div className="event-card-date">{event.date}</div>
            <h3 className="event-card-title">{event.title}</h3>
            <p className="event-card-location">{event.location}</p>
            <div className="event-card-icons">
              <div className="icon-with-count" onClick={() => handleUpvote(event.id)}>
                <BiUpvote />
                <span className="count">{event.upvotes}</span>
              </div>
              <div className="icon-with-count" onClick={() => handleOpenModal(event.id)}>
                <FaRegCommentAlt />
                <span className="count">{event.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedEventId && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={(comment) => handleComment(selectedEventId, comment)}
          event={events.find(event => event.id === selectedEventId)} // Pass the selected event object to the modal
        />
      )}
    </div>
  );
};

export default Event;
