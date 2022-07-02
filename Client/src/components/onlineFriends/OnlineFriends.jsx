import './styles.css';
import { Friends } from '../../Data/FriendsData.js'
import {useEffect,useContext,userState,useState} from 'react'
import axios from 'axios'
import Profil from '../../img/profileImg.jpg';
import {Link} from 'react-router-dom';

export default function OnlineFriends({user}){
  const[friends, setFriends] = useState([])
  useEffect(()=>{
    const getFriends = async()=>{
      try{
        const friendList = await axios.get(`/user/friends/${user?._id}`)
        setFriends(friendList.data);
      }catch(err){
        console.log(err)
      }
    }
    getFriends();
  },[user._id])
  return(
    <div className='onlinefriends'>
      <h4>Online Friends</h4>
        <div className='friendsList'>
        {friends?.map((friend, id) => {
        return (
          <Link to={`/profile/${friend.username}`} style={{textDecoration: 'none', color:'black'}}>
            <div className='friends'>
              <div>
                <div className='rb-imgContainer'>
                  <img src={friend.profilePicture?friend.profilePicture:Profil} alt="" className='friendImg' />
                  <span className="rb-online"></span>
                </div>
                <div className='name'>
                  <span>{friend.firstname} {friend.lastname}</span>
                  <span>@{friend.username}</span>
                </div>
              </div>
            </div>
          </Link>
        )
        })}
        </div>
    </div>
  )
}