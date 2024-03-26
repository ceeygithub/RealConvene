
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
 import '../styles/Event.css'; 

const Event = () => {
  const { getEvents } = useAuth();
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

  return (
    <div className="container">
      {events.map((event) => (
        <div className="card-media" key={event.id}>
          {/* media container */}
          <div className="card-media-object-container">
            <div className="card-media-object" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
          </div>
          {/* body container */}
          <div className="card-media-body">
            <div className="card-media-body-top">
              <span className="subtle">{event.date}</span>
            </div>
            <span className="card-media-body-heading">{event.title}</span>
            <div className="card-media-body-supporting-bottom">
              <span className="card-media-body-supporting-bottom-text subtle">{event.location}</span>
              <span className="card-media-body-supporting-bottom-text subtle u-float-right">{event.price}</span>
              {/* Upvote and comment icons */}
              <div className="card-media-body-supporting-bottom-icons">
                <span className="icon-with-count">
                  <BiUpvote />
                  <span className="count">{event.upvotes}</span>
                </span>
                <span className="icon-with-count">
                  <FaRegCommentAlt />
                  <span className="count">{event.comments}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Event;
