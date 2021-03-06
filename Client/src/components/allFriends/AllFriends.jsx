import './styles.css';
import { Friends } from '../../Data/FriendsData.js'
import {useEffect,useContext,userState,useState} from 'react'
import axios from 'axios'
import Profil from '../../img/profileImg.jpg';
import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function AllFriends({user}){
  const routePath = useLocation()
  const[friends, setFriends] = useState([])
  useEffect(()=>{
    const getFriends = async()=>{
      try{
        const friendList = await axios.get(`/user/friends/${user._id}`)
        setFriends(friendList.data);
      }catch(err){
        console.log(err)
      }
    }
    getFriends();
  },[user._id,routePath])
  return(
    <div className='AllFriends'>
      <h4>All Friends</h4>
        <div className='friendsList-a'>
        {friends.map((friend, id) => {
          return (
          <Link to={`/profile/${friend.username}`} onClick={() => {window.focus(); window.scrollTo(0, 0)}} style={{textDecoration: 'none', color:'black'}}>
            <div className='friends-a'>
              <div>
                <div className='rb-imgContainer'>
                  <img src={friend.profilePicture?friend.profilePicture:Profil} alt="" className='friendImg-a' />
                  <span className="rb-online"></span>
                </div>
                <div className='namea'>
                  <span>{friend.firstname} {friend.lastname}</span>
                  {/* <span>@{friend.username}</span> */}
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