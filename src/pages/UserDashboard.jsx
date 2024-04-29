import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'; 
import UserDashboardCss from '../styles/UserDashboard.module.css';
import  '../styles/CalendarOverride.css';
import { BiNews } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import Event from '../components/Event';
import Calendar from 'react-calendar';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = () => {
  const [date, setDate] = useState(new Date());
  // eslint-disable-next-line 
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getEvents, selectedInterests ,setSelectedInterests} = useAuth(); 

 useEffect(() => {
  const storedInterests = localStorage.getItem('selectedInterests');
  if (storedInterests) {
    setSelectedInterests(JSON.parse(storedInterests));
  }
}, [setSelectedInterests]);


  const fetchEvents = useCallback(async () => {
    try {
      const events = await getEvents();
      console.log('Events:', events);
      setTotalPages(events.totalPages);
      setEvents(prevEvents => [...prevEvents, ...events]);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [getEvents]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (page < totalPages) {
        setPage(prevPage => prevPage + 1);
      }
    }
  }, [page, totalPages]);

  useEffect(() => {
    const fetchDataAndScrollHandler = async () => {
      await fetchEvents();
      window.addEventListener('scroll', handleScroll);
    };

    fetchDataAndScrollHandler();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchEvents, handleScroll]);
  
  return (
    <>
      <div className={UserDashboardCss.container}> 
        <div className={UserDashboardCss.leftSidebar}> 
          <div className={UserDashboardCss.impLinks}>
            <Link to="#"><BiNews  />Latest Events</Link>
            <Link to="#"><MdPeopleAlt />Friends</Link>
            <Link to="#"><IoIosPeople />Groups</Link>
          </div>
          <div className={UserDashboardCss.shortcutLinks}> 
            <p>Your Interests</p>
            {selectedInterests.map((interest, index) => (
              <Link key={index} to="#">
                <img src={interest.image} alt={interest.name} />
                {interest.name}
              </Link>
            ))}
          </div>
        </div>
        <div className={UserDashboardCss.mainContent}>
          <Event />
          <button type="button" className={UserDashboardCss.loadMoreBtn} onClick={handleScroll}>
            Load More
          </button>
        </div>
        <div className={UserDashboardCss.rightSidebar}>
          <div className={UserDashboardCss.sidebarTitle}>
            <h4>Today</h4>
          </div>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;