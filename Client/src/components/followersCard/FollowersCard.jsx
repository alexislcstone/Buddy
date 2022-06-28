import React from 'react';
import './styles.css';
import { Followers } from '../../Data/FollowersData.js'

function FollowersCard() {
  return (
    <div className="FollowersCard">
      {Followers.map((follower, id) => {
        return (
          <div className='follower'>
            <div>
              <img src={follower.img} alt="" className='followerImg' />
              <div className='name'>
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className='button fc-button'>
              Follow
            </button>
          </div>
        )
      })}
    </div>
  );
}

export default FollowersCard;