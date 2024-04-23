
import React, { useState } from 'react';
import '../styles/Event.css'; 

const Modal = ({ isOpen, onClose, onSubmit, event }) => {
  const [comment, setComment] = useState('');


  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(comment);
    setComment('');
    onClose();
  };

  return (
        <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
    
          <div className="previous-comments">
            <h3>Previous Comments:</h3>
            {event.comments.length > 0 ? (
              <ul>
                {event.comments.map((prevComment, index) => (
                  <li key={index}>{prevComment}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet</p>
            )}
          </div>
          <div className="new-comment">
            <h2>Add a Comment</h2>
            <input
              type="text"
              placeholder="Type your comment here..."
              value={comment}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>


  );
};

export default Modal;
