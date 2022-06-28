import React from 'react';
import './styles.css';
import Cover from '../../img/cover.jpg';
import { PostsData } from '../../Data/PostsData.js'
import Profil from '../../img/profileImg.jpg';

function ProfCard({user}) {
  const ProfilePage = true;
  return (
    <div className="ProfCard">
      <div className='ProfileImages'>
        <img src={user.coverPicture?user.coverPicture:Cover} alt="" />
        <img src={user.profilePicture?user.profilePicture:Profil} alt="" />
      </div>
      <div className='ProfilName'>
        <span>{user.firstname} {user.lastname}</span>
        <span>@{user.username}</span>
        <span>{user.description}</span>
      </div>
      {ProfilePage ? '' : <span>{user.firstname}'s Profile</span>}
    </div>
  );
}

export default ProfCard;