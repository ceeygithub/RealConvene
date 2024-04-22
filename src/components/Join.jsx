import React from 'react';
import joinSectionCss from '../styles/Join.module.css';
import { useNavigate } from 'react-router-dom';

const JoinSection = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/signup');
  };

  return (
    <section className={joinSectionCss.container}>
      <div className={joinSectionCss.left}>
        <h2>Join Meetup</h2>
        <p className={joinSectionCss.joinp} >Here at Convene, individuals come together to connect with like-minded individuals, discover new interests, receive support, embrace new challenges, and pursue shared passions. Joining our community is free, and we invite you to embark on a journey of collaboration and personal growth with us.</p>
        <button className={joinSectionCss.joinBtn} onClick={handleJoin}>Join</button>
      </div>
      <img src="https://images.pexels.com/photos/8553864/pexels-photo-8553864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Upvoting hands" />
    </section>
  );
};

export default JoinSection;
