import React, { useState,useRef,useContext } from 'react';
import "./styles.css"
import { UilSearch } from '@iconscout/react-unicons';
import {AuthContext} from '../../context/AuthContext';
import Profile from '../../img/profileImg.jpg';
import { CgProfile } from "react-icons/cg";
import { FaDog,FaTree } from "react-icons/fa";
import { IoIosBowtie } from "react-icons/io";
import {Link} from 'react-router-dom';

import {
  RiHomeHeartLine,
  RiNotificationLine,
  RiCalendarEventFill,
  RiMessage2Line,
  RiShoppingBagLine,
} from "react-icons/ri";

function NavBar() {
  const {user} = useContext(AuthContext)
  return (
    <div className="NavBar">
      <div className="NavBar-left">
        <span className="logo">🐾 Buddy</span>
        <div className="Search">
          <div className='s-icon'>
            <UilSearch />
          </div>
          <input type='text' placeholder='#Explorer' />
        </div>
      </div>
      <div className="NavBar-center">
        <span className='nb-span'>
          <Link style={{textDecoration: 'none', color:'black'}} to={`/`}>
            <RiHomeHeartLine style={{ fontSize: '27px'}} />
          </Link>
        </span>
        <span className='nb-span'>
          <RiCalendarEventFill style={{ fontSize: '27px'}} />
        </span>
        <span className='nb-span'>
          <FaDog style={{ fontSize: '27px'}} />
        </span>
        <span className='nb-span'>
          <RiShoppingBagLine style={{ fontSize: '27px'}} />
        </span>
      </div>
      <div className="NavBar-right">
        <div className='nb-prof'>
          <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture?user.profilePicture:Profile} alt="" className="NavBarImg" />
          </Link>
            <span>{user.firstname}</span>
        </div>
        <div className='NavBarIcons'>
          <div className="NavBarIconItem">
            <CgProfile style={{ fontSize: '25px' }} />
            <span className="NavBarIconBadge">1</span>
          </div>
          <div className="NavBarIconItem">
            <Link style={{textDecoration: 'none', color:'black'}} to={`/messages`}>
              <RiMessage2Line style={{ fontSize: '25px' }} />
            </Link>
            <span className="NavBarIconBadge">2</span>
          </div>
          <div className="NavBarIconItem">
            <RiNotificationLine style={{ fontSize: '25px' }} />
            <span className="NavBarIconBadge">1</span>
          </div>
        </div>
      </div>
    </div >
  )
}

export default NavBar;