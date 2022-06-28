import React, { useState,useContext } from 'react';
import './styles.css';
import { UilPen } from '@iconscout/react-unicons';
import { Profile } from '../../Data/ProfileData.js'
import ProfileModal from '../profileModal/ProfileModal';
import {AuthContext} from '../../context/AuthContext';

function InfoCard({user}) {
  const [modalOpen, setModalOpen] = useState(false)
  const {user:currUser} = useContext(AuthContext);
  return (
    <div className="InfoCard">
      <div className='infoHead'>
        <div style={{fontSize:'18px', fontWeight:'bold'}}>Pup Info</div>
        <div>
          {
            currUser._id===user._id?
            <UilPen width='1.5rem' height='1.2rem' onClick={() => setModalOpen(true)} />
            :null
          }
        </div>
      </div>
      <div className='info'>
        <span>
          <b>Full Name: </b>
        </span>
        <span>{user.firstname} {user.lastname}</span>
      </div>
      <div className='info'>
        <span>
          <b>Relationship Status: </b>
        </span>
        <span>{user.relationship===1? "Single":user.relationship===2?"Married"?user.relationship===3:"Complicated":""}</span>
      </div>
      <div className='info'>
        <span>
          <b>City: </b>
        </span>
        <span>{user.city}</span>
      </div>
      <div className='info'>
        <span>
          <b>From: </b>
        </span>
        <span>{user.from}</span>
      </div>
      <div className='info'>
        <span>
          <b>Works at: </b>
        </span>
        <span>{user.worksAt}</span>
      </div>
        <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} user={user}/>
      <button className='button l-button'>Logout</button>
    </div>
  );
}

export default InfoCard;