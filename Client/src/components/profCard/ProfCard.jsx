import React, { useContext,useState,useEffect } from 'react';
import './styles.css';
import Cover from '../../img/cover.jpg';
import { PostsData } from '../../Data/PostsData.js'
import Profil from '../../img/profileImg.jpg';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';

function ProfCard({user,followed,setFollowed}) {
  const {user:currUser,dispatch} = useContext(AuthContext);
  console.log('current',currUser.following,user._id)
  console.log(followed)
  const handleClick = async()=>{
    try{
      if(followed){
        await axios.put(`/user/${user?._id}/unfollow`,{userId:currUser._id})
        dispatch({type:"UNFOLLOW", payload:user._id})
        setFollowed(false)
      }else{
        console.log(user._id,currUser._id)
        await axios.put(`/user/${user?._id}/follow`,{userId:currUser._id})
        dispatch({type:"FOLLOW", payload:user._id})
        setFollowed(true)
      }
    }catch(err){
      console.log(err)
    }
  }
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
      {
        user._id===currUser._id?
        null
          :
        (
          <>
            <button onClick={handleClick} className='button pc-button'>
              {
              (user?.following?.includes(currUser._id)?
              (followed ? "Unfollow":"Follow Back")
              :(followed ? "Unfollow":"Follow"))
              }
            </button>
            <br/>
          </>
        )
      }
    </div>
  );
}

export default ProfCard;