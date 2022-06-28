import './Home.css';
import React, { useContext } from 'react';
import NavBar from '../../components/navBar/NavBar.jsx'
import FollowersCard from '../../components/followersCard/FollowersCard.jsx'
import Feed from '../../components/feed/Feed.jsx'
import LeftSide from '../../components/leftSide/LeftSide.jsx'
import RightBar from '../../components/rightBar/RightBar.jsx'
import {AuthContext} from '../../context/AuthContext';

function Home() {
  const {user,isFetching} = useContext(AuthContext);
  return (
    <>
      <NavBar />
      <div className="Home">
        <div className='home-r'/>
        <LeftSide />
        <div className='home-r'/>
        <div className="home-feed">
          <div className="home-center">
            <Feed />
          </div>
        </div>
        <div className='home-l'/>
        <RightBar/>
        <div className='home-l'/>
      </div>
    </>
  );
}

export default Home;