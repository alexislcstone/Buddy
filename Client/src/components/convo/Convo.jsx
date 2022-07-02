import React, { useState, useRef,useEffect,useContext } from 'react';
import './styles.css';
import axios from 'axios';
import Profil from '../../img/profileImg.jpg';

export default function Convo({convo,currUser,setCurrChat}) {
  const [user,setUser]=useState(null)
  useEffect(()=>{
    const friendId = convo.members.filter(m=>m!==currUser._id)

    const getUser = async ()=>{
      try{
        const res = await axios(`/user/?userId=${friendId}`)
        setUser(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  },[currUser,convo])
  return (
    <>
    <div onClick={()=>setCurrChat(convo)}className='Convo-Parent'>
      <div className='Convo'>
        <img className = 'convo-img' src={user?.profilePicture?user.profilePicture:Profil} alt=''/>
        <span className='convo-name'>{user?.firstname} {user?.lastname}</span>
      </div>
    </div>
    </>
  );
}