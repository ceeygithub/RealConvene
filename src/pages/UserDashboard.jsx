

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
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Define totalPages here
  const { getEvents } = useAuth(); 

  const fetchEvents = useCallback(async () => {
    try {
      // Fetch events data using getEvents function
      const events = await getEvents();
      console.log('Events:', events);
      // Assuming your API returns the total number of pages, set the totalPages state
      setTotalPages(events.totalPages);
      // Update events state with the fetched data
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
      // User has scrolled to the bottom
      if (page < totalPages) {
        // Fetch next page of events
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
            <Link to="#"><img src="https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />Health & Wellbeing</Link>
            <Link to="#"><img src="https://images.pexels.com/photos/4440715/pexels-photo-4440715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />Identity & Language</Link>
            <Link to="#"><img src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> Technology</Link>
            <Link to="#"><img src="https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />Career & Business</Link>
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
        
         
          {/* <div className={UserDashboardCss.sidebarTitle}>
            <h4>Conversation</h4>
            <Link to="#">Hide Chat</Link>
          </div> */}
          {/* <div className={UserDashboardCss.onlineList}>
            <div className={UserDashboardCss.online}>
              <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-2.png?raw=true" alt="" />
            </div>
            <p>Roy Clark</p>
          </div>   */}
          {/* <div className={UserDashboardCss.onlineList}>
            <div className={UserDashboardCss.online}>
              <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-4.png?raw=true" alt="" />
            </div>
            <p>Ben Taylor</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

