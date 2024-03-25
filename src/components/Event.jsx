import React from 'react';
import '../styles/Event.css'; 
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";

const Event = () => {
  // Dummy data for number of upvotes and comments
  const upvotes = 10;
  const comments = 5;

  return (
    <div className="container">
      <div className="card-media">
        {/* media container */}
        <div className="card-media-object-container">
          <div className="card-media-object" style={{ backgroundImage: "url(https://s16.postimg.cc/x8m99xtgl/tyco_f.jpg)" }}></div>
 
        </div>
        {/* body container */}
        <div className="card-media-body">
          <div className="card-media-body-top">
            <span className="subtle">Mon, APR 09, 7:00 PM</span>
          </div>
          <span className="card-media-body-heading">DAY // NIGHT - Tycho (Live) w/ Gold Panda, Com Truise + More at 1015 Folsom</span>
          <div className="card-media-body-supporting-bottom">
            <span className="card-media-body-supporting-bottom-text subtle">1015 Folsom, San Francisco, CA</span>
            <span className="card-media-body-supporting-bottom-text subtle u-float-right">$25 &ndash; $80</span>
          
            <div className="card-media-body-supporting-bottom-icons">
              <span className="icon-with-count" onClick={() => {/* Handle upvote click */}}>
                <BiUpvote />
                <span className="count">{upvotes}</span>
              </span>
              <span className="icon-with-count" onClick={() => {/* Handle comment click */}}>
                <FaRegCommentAlt />
                <span className="count">{comments}</span>
              </span>
            </div>
          </div>
      
        </div>
      </div>
    </div>
  )
}

export default Event;
