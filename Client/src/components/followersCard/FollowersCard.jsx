import React, { useContext,useEffect,useState } from 'react';
import './styles.css';
import { Followers } from '../../Data/FollowersData.js'
import axios from 'axios';
import Profil from '../../img/profileImg.jpg';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

function FollowersCard() {
  const {user:currUser,dispatch} = useContext(AuthContext);
  const[fol, setFol] = useState([])
  const[followed, setFollowed]= useState(null)
  useEffect(()=>{
    const getFriends = async()=>{
      try{
        const friendList = await axios.get(`/user/nonfriend/${currUser._id}`)
        setFol(friendList.data);
      }catch(err){
        console.log(err)
      }
    }
    getFriends();
  },[currUser._id])

  const handleClick = async(id)=>{
    try{
      if(followed){
        await axios.put(`/user/${id}/unfollow`,{userId:currUser._id})
        dispatch({type:"UNFOLLOW", payload:id})
        setFollowed(null)
      }else{
        console.log(id,currUser._id)
        await axios.put(`/user/${id}/follow`,{userId:currUser._id})
        dispatch({type:"FOLLOW", payload:id})
        window.location.reload()
        setFollowed(id)
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="FollowersCard">
      <h2>Have you meet these pups?</h2>
      {fol.map((recFollower, id) => {
        return (
            <div className='recFollower'>
              <div>
                <Link to={`/profile/${recFollower.username}`} style={{textDecoration: 'none', color:'black'}}>
                <img src={recFollower.profilePicture?recFollower.profilePicture:Profil} alt="" className='recFollowerImg' />
                </Link>
                <div className='name'>
                  <span>{recFollower.firstname} {recFollower.lastname}</span>
                  <span>@{recFollower.username}</span>
                </div>
              </div>
              <button onClick={()=>handleClick(recFollower._id)} className='button fc-button'>
                {(followed===recFollower._id ? "Unfollow":"Follow")}
              </button>
            </div>

        )
      })}
      <br/>
    </div>
  );
}

export default FollowersCard;