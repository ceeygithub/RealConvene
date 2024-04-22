

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import '../styles/Event.css'; 

const Event = () => {
  const { getEvents,currentUser } = useAuth();
  const [events, setEvents] = useState([]);

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
  }, [getEvents]);
   const handleUpvote = () => {
    // Implement logic to update upvote count in Firestore
    // Example: firestore.collection('events').doc(event.id).update({ upvotes: event.upvotes + 1 });
  };

  const handleComment = () => {
    // Implement logic to open a comment form or navigate to a comment page
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
              <div className="icon-with-count" onClick={handleUpvote}>
                <BiUpvote />
                <span className="count">{event.upvotes}</span>
              </div>
              <div className="icon-with-count"  onClick={handleComment}>
                <FaRegCommentAlt />
                <span className="count">{event.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Event;
