

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import UserDashboardCss from '../styles/UserDashboard.module.css';
import  '../styles/CalendarOverride.css';
import { BiNews } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import Event from '../components/Event';
import Calendar from 'react-calendar';


const UserDashboard = () => {
  const [date, setDate] = useState(new Date());
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
          <Event /> 
          <Event />
          <Event />
          <Event />
          <Event /> 
          <Event />
          <Event />
          <Event />
          <Event /> 
          <Event />
          <Event />
          <button type="button" className={UserDashboardCss.loadMoreBtn}>Load More</button>
        </div>
        <div className={UserDashboardCss.rightSidebar}>
          <div className={UserDashboardCss.sidebarTitle}>
            <h4 >
              Today
            </h4>
          </div>
         <Calendar onChange={setDate} value={date} />
           
      
          <div className={UserDashboardCss.sidebarTitle}>
            <h4>
              Advertisement
            </h4>
            <Link to="#">
              Close
            </Link>
          </div>
          <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/advertisement.png?raw=true" alt="advt" className={UserDashboardCss.sidebarAds} />
          <div className={UserDashboardCss.sidebarTitle}>
            <h4>
              Conversation
            </h4>
            <Link to="#">
              Hide Chat
            </Link>
          </div>
          <div className={UserDashboardCss.onlineList}>
            <div className={UserDashboardCss.online}>
              <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-2.png?raw=true" alt="" />
            </div>
            <p>Roy Clark</p>
          </div>
          <div className={UserDashboardCss.onlineList}> 
            <div className={UserDashboardCss.online}> 
              <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-3.png?raw=true" alt="" />
            </div>
            <p>Sieena Watson</p>
          </div>
          <div className={UserDashboardCss.onlineList}>
            <div className={UserDashboardCss.online}>
              <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-4.png?raw=true" alt="" />
            </div>
            <p>Ben Taylor</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
