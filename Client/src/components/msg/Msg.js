import React, { useState, useRef,useEffect,useContext } from 'react';
import './styles.css';
import { Friends } from '../../Data/FriendsData.js'
import Profile from '../../img/profileImg.jpg';
import {format} from 'timeago.js'

export default function Msg({msgs,user}) {
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <>
    {
      msgs.map(message=>{
      return(
        <div ref = {scrollRef}>
        <div className={message.sender===user._id?"Msg own":'Msg'}>
          <div className='msg-top'>
            {message.sender===user._id?null:<img className='msg-img' src={Friends[0].img} alt =""/>}
            <p className='msg-txt'>
              {message.text}
            </p>
            {message.sender===user._id?<img className='msg-img' src={user?.profilePicture?user?.profilePicture:Profile} alt =""/>:null}
          </div>
          <div className='msg-bottom'>
            {format(message.createdAt)}
          </div>
        </div>
        </div>
        )
      })
    }
    </>
  );
}