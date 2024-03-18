
import React from 'react';
import UserDashboardCss from '../styles/UserDashboard.module.css';
import { BiNews } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { PiTelevisionSimpleBold } from "react-icons/pi";

const UserDashboard = () => {
  return (
    <>
      <div className={UserDashboardCss.container}> 
        <div className={UserDashboardCss.leftSidebar}> 
          <div className={UserDashboardCss.impLinks}>
            <a href="#"><BiNews  />Latest Events</a>
            <a href="#"><MdPeopleAlt />Friends</a>
            <a href="#"><IoIosPeople />Groups</a>
            <a href="#"><FaCartShopping />Market Place</a>
            <a href="#"><PiTelevisionSimpleBold />Watch</a>
            <a href="#">See More</a>
          </div>
          <div className={UserDashboardCss.shortcutLinks}> 
            <p>Your Shortcuts</p>
            <a href="#"><img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/shortcut-1.png?raw=true" alt="short-cut-1" />Web Developers</a>
            <a href="#"><img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/shortcut-2.png?raw=true" alt="short-cut-2" />Android Developers</a>
            <a href="#"><img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/shortcut-3.png?raw=true" alt="short-cut-3" />Web Design</a>
            <a href="#"><img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/shortcut-4.png?raw=true" alt="short-cut-4" />HTML And CSS</a>
          </div>
        </div>
               <div className={UserDashboardCss.mainContent}>


            <div className={UserDashboardCss.postContainer}>
                <div className={UserDashboardCss.postRow}>
                    <div className={UserDashboardCss.userProfile}>  
                        <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/profile-pic.png?raw=true"
                            alt="" />
                        <div>
                            <p>John singh</p>
                            <span>
                                November 12, 02:00A.M
                            </span>
                        </div>
                    </div>
                    <a href="#"> <i class="fas fa-ellipsis-v"></i></a>
                </div>

                <p className={UserDashboardCss.postText}>Happy Birthday  Ella <br /><a href="#">#birthday-special</a></p>
                <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-1.jpg?raw=true" alt=""
                 className={UserDashboardCss.postImg}/>

                <div className={UserDashboardCss.postRow}>
                    <div className={UserDashboardCss.activityIcons}>
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/like.png?raw=true"
                                alt="" />897K
                        </div>
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/comments.png?raw=true"
                                alt="" />458K
                        </div>
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/share.png?raw=true"
                                alt="" />243k
                        </div>
                    </div>
                    <div className={UserDashboardCss.postProfileIcon}>
                        <img src="./Socialbook_img/profile-pic.png" alt="" /><i class="fas fa-caret-down"></i>
                    </div>
                </div>
            </div>
            <div className={UserDashboardCss.postContainer}>
                <div className={UserDashboardCss.postRow}>
                    <div className={UserDashboardCss.userProfile}>
                        <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/profile-pic.png?raw=true"
                            alt="" />
                        <div>
                            <p>John singh</p>
                            <span>
                                November 12, 02:00A.M
                            </span>
                        </div>
                    </div>
                    <a href="#"> <i class="fas fa-ellipsis-v"></i></a>
                </div>

                <p className={UserDashboardCss.postText}>Happy Birthday Ella <br/><a href="#">#birthday-special</a></p>
                <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-1.jpg?raw=true" alt=""
                    className={UserDashboardCss.postImg}/>

                <div className={UserDashboardCss.postRow}>
                    <div className={UserDashboardCss.activityIcons}>
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/like.png?raw=true"
                                alt=""/>897K
                        </div>
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/comments.png?raw=true"
                                alt=""/>458K
                        </div>
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/share.png?raw=true"
                                alt=""/>243k
                        </div>
                    </div>
                    <div className={UserDashboardCss.postProfileIcon}> 
                        <img src="./Socialbook_img/profile-pic.png" alt="" /><i class="fas fa-caret-down"></i>
                    </div>
                </div>
            </div>
            <div className={UserDashboardCss.postContainer}> 
                <div className={UserDashboardCss.postRow}>
                    <div className={UserDashboardCss.userProfile}>
                        <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/profile-pic.png?raw=true"
                            alt=""/>
                        <div>
                            <p>John singh</p>
                            <span>
                                November 12, 02:00A.M
                            </span>
                        </div>
                    </div>
                    <a href="#"> <i class="fas fa-ellipsis-v"></i></a>
                </div>

                <p className={UserDashboardCss.postText}>Happy Birthday Ella <br/><a href="#">#birthday-special</a></p>
                <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-1.jpg?raw=true" alt=""
                   className={UserDashboardCss.postImg}/>

                <div className={UserDashboardCss.postRow}>
                    <div className={UserDashboardCss.activityIcons}> 
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/like.png?raw=true"
                                alt=""/>897K
                        </div>
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/comments.png?raw=true"
                                alt=""/>458K
                        </div>
                        <div>
                            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/share.png?raw=true"
                                alt=""/>243k
                        </div>
                    </div>
                    <div className={UserDashboardCss.postProfileIcon}>
                        <img src="./Socialbook_img/profile-pic.png" alt=""/><i class="fas fa-caret-down"></i>
                    </div>
                </div>
            </div>

            <button type="button" className={UserDashboardCss.loadMoreBtn}>Load More</button>
        </div>
          <div className={UserDashboardCss.rightSidebar}>
            <div className={UserDashboardCss.sidebarTitle}>
                <h4>
                    Events
                </h4>
                <a href="#">
                    See All
                </a>
            </div>
            <div className={UserDashboardCss.event}> 
                <div className={UserDashboardCss.leftEvent}>
                    <h3>18</h3>
                    <span>March</span>
                </div>
                <div className={UserDashboardCss.rightEvent}>
                    <h4>Social Media</h4>
                    <p><i class="fas fa-map-marker-alt"></i> Willson Teck Park</p>
                    <a href="#">More Info</a>
                </div>
            </div>
            <div className={UserDashboardCss.event}>
                <div className={UserDashboardCss.leftEvent}>
                    <h3>22</h3>
                    <span>March</span>
                </div>
                <div className={UserDashboardCss.rightEvent}>
                    <h4>Mobile Marketimg</h4>
                    <p><i class="fas fa-map-marker-alt"></i> Willson Teck Park</p>
                    <a href="#">More Info</a>
                </div>
            </div>
            <div className={UserDashboardCss.sidebarTitle}>
                <h4>
                    Advertisement
                </h4>
                <a href="#">
                    Close
                </a>
            </div>
            <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/advertisement.png?raw=true"
                alt="advt" className={UserDashboardCss.sidebarAds} />
            <div className={UserDashboardCss.sidebarTitle}>
                <h4>
                    Conversation
                </h4>
                <a href="#">
                    Hide Chat
                </a>
            </div>
            <div className={UserDashboardCss.onlineList}>
                <div className={UserDashboardCss.online}>
                    <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-2.png?raw=true"
                        alt="" />
                </div>
                <p>Roy Clark</p>
            </div>
            <div className={UserDashboardCss.onlineList}> 
                <div   className={UserDashboardCss.online}> 

                    <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-3.png?raw=true"
                        alt="" />
                </div>
                <p>Sieena Watson</p>
            </div>
            <div className={UserDashboardCss.onlineList}>
                <div className={UserDashboardCss.online}>
                    <img src="https://github.com/sanketbodke/sbook/blob/main/Socialbook_img/member-4.png?raw=true"
                        alt="" />
                </div>
                <p>Ben Taylor</p>
            </div>
        </div>
      </div>

      
    </>
  );
};

export default UserDashboard;
