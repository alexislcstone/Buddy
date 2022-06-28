import React, { useState, useEffect } from 'react';
import './styles.css';
import { UilSetting } from '@iconscout/react-unicons';
import FollowersCard from '../followersCard/FollowersCard.jsx'
import { CgProfile } from "react-icons/cg";
import {Link} from 'react-router-dom';

import {
  RiHomeHeartLine,
  RiNotificationLine,
  RiSettings2Line,
  RiBookmark3Line,
  RiMessage2Line,
  RiHashtag,
  RiLogoutBoxRLine
} from "react-icons/ri";

function LeftSide() {
  return (
    <div className="LeftSide">
      <div className="LeftSide-container">
      <>
      <div className='navIcons'>
          <Link style={{textDecoration: 'none', color:'black'}} to={`/`}>
        <span className='ls-span'>
            <RiHomeHeartLine style={{ fontSize: '30px', marginRight: '10px' }} />
          Home
        </span>
          </Link>
        <span className='ls-span'>
          <RiHashtag style={{ fontSize: '30px', marginRight: '10px' }} />
          Explore
        </span>
        <span className='ls-span'>
          <CgProfile style={{ fontSize: '30px', marginRight: '10px' }} />
          Profile
        </span>
        <span className='ls-span'>
          <RiNotificationLine style={{ fontSize: '30px', marginRight: '10px' }} />
          Notifications
        </span>
        <span className='ls-span'>
          <RiMessage2Line style={{ fontSize: '30px', marginRight: '10px' }} />
          Messages
        </span>
        <span className='ls-span'>
          <RiBookmark3Line style={{ fontSize: '30px', marginRight: '10px' }} />
          Saved
        </span>
        <span className='ls-span'>
          <RiSettings2Line style={{ fontSize: '30px', marginRight: '10px' }} />
          Settings
        </span>
      </div>
      <button className='button t-button'>New Post</button>
      {/* <span className='nr-span' style={{ fontSize: '16px', color: 'grey' }}>
        <RiLogoutBoxRLine style={{ fontSize: '20px', marginRight: '10px' }} />
        Log Out
      </span> */}
      {/* <FollowersCard/> */}
      </>
      <br/>
      {/* <FollowersCard/> */}
      </div>
    </div >
  );
}

export default LeftSide;