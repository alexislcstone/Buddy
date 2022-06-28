import React, { useState, useRef,useEffect } from 'react';
import {useParams} from 'react-router'
import './Profile.css';
import NavBar from '../../components/navBar/NavBar.jsx'
import LeftSide from '../../components/leftSide/LeftSide.jsx'
import Feed from '../../components/feed/Feed.jsx'
import RightBar from '../../components/rightBar/RightBar.jsx'
import ProfCard from '../../components/profCard/ProfCard.jsx'
import Gallery from '../../components/gallery/Gallery.jsx'
import InfoCard from '../../components/infoCard/InfoCard.jsx'
import AllFriends from '../../components/allFriends/AllFriends.jsx'
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState([])
  const username = useParams().username
  useEffect(()=>{
    const fetchUsers = async() =>{
      const res = await axios.get( `/user/`,{params:{username:username}});
      setUser(res.data)
    }
    fetchUsers()
  },[username])
  return (
    <div>
      <NavBar />
      <div className="Profile">
        {/* left */}
        <div className='prof-r' />
        <div className='profLeft'>
          <LeftSide />
          <AllFriends user={user}/>
          {/* <Gallery user={user}/> */}
        </div>
        <div className='prof-r' />

        {/* center */}
        <div className='prof-center'>
          <div className='profTop'>
            <ProfCard user={user}/>
          </div>
          <div className='profBottom'>
            <Feed username={username}/>
          </div>
        </div>
        {/* right */}
        <div className='prof-l' />
          <div className='profRight'>
            <InfoCard user={user}/>
            {/* <AllFriends user={user}/> */}
            <Gallery user={user}/>
          </div>
        <div className='prof-l' />
      </div>
    </div>
  );
}
