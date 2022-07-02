import React, { useState, useRef,useEffect,useContext } from 'react';
import "./styles.css"
import { Friends } from '../../Data/FriendsData.js'

export default function MsgOnline() {
  return (
    <div className="MsgOnline">
      {
        Friends.map(friend=>{
          return(
            <div className="mo-friend">
              <div className="mo-imgContainer">
                <img src={friend.img} alt=""/>
                <div className='mo-badge'></div>
              <div className='mo-name'>{friend.name}</div>
              </div>
            </div>
          )
        })
      }

    </div>
  );
}
