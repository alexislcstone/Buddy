import './styles.css';
import birthday from '../../img/birthday.png'
import ad from '../../img/ad.png'
import OnlineFriends from '../onlineFriends/OnlineFriends.jsx'
import {AuthContext} from '../../context/AuthContext';
import {useEffect,useContext,useState} from 'react'
import axios from 'axios'

function RightBar() {
  const {user} = useContext(AuthContext);

  return (
    <div className="RightBar">
      <div className = "rightbarWrapper">
        <div className = "birthdayContainer">
          <img className = "birthdayImg" src={birthday} alt=''/>
          <span className="birthdayText"><b>Peppercorn S</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
        <div className = "rb-Ad">
          <div style={{color:'grey',fontWeight:'bold',marginBottom:'5px'}}>Sponsored</div>
          <img className = "rb-AdImg" src={ad} alt=''/>
        </div>
        <OnlineFriends user={user}/>
      </div>
    </div>
  );
}

export default RightBar;