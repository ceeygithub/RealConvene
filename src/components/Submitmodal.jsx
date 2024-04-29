
// import React, { useState } from 'react';
// import '../styles/Event.css'; 
// import { useAuth } from '../contexts/AuthContext';

// const Modal = ({ isOpen, onClose, event }) => {
//   const [comment, setComment] = useState('');
//     const {  handleComment } = useAuth();


//   const handleChange = (event) => {
//     setComment(event.target.value);
//   };
//  const handleSubmit = () => {
//     handleComment(event.id, comment); 
//     setComment('');
//     onClose();
//   };



//   return (
//         <div className={`modal ${isOpen ? 'show' : ''}`}>
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
    
//           <div className="previous-comments">
//             <h3>Previous Comments:</h3>
//             {event.comments.length > 0 ? (
//               <ul>
//                 {event.comments.map((prevComment, index) => (
//                   <li key={index}>{prevComment}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No comments yet</p>
//             )}
//           </div>
//           <div className="new-comment">
//             <h2>Add a Comment</h2>
//             <input
//               type="text"
//               placeholder="Type your comment here..."
//               value={comment}
//               onChange={handleChange}
//             />
//             <button onClick={handleSubmit}>Submit</button>
//           </div>
//         </div>
//       </div>


//   );
// };

// export default Modal;
import React, { useState } from 'react';
import '../styles/Event.css'; 
import { useAuth } from '../contexts/AuthContext';

const Modal = ({ isOpen, onClose, event }) => {
  const [comment, setComment] = useState('');
  const { handleComment } = useAuth();

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() !== '') { // Check if the comment is not empty
      handleComment(event.id, comment); // Call handleComment with the eventId and comment
      onClose(); // Close the modal
    } else {
      // Optionally, you can provide feedback to the user if they try to submit an empty comment
      console.log('Please enter a comment');
    }
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

