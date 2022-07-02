import { Modal, useMantineTheme } from '@mantine/core';
import './styles.css';
import {AuthContext} from '../../context/AuthContext';
import React, { useContext,useState,useEffect,useRef } from 'react';
import axios from 'axios';

function ProfileModal({ modalOpen, setModalOpen,user }) {
  const firstnamee=useRef();
  const lastnamee=useRef();
  const worksAte = useRef();
  const citye = useRef();
  const frome = useRef()
  const relationshipe = useRef()
  const profilePicturee = useRef()
  const coverPicturee = useRef()
  const description = useRef()

  const theme = useMantineTheme();
  const {user:currUser,dispatch} = useContext(AuthContext);
  const handleClick = async(e)=>{
    e.preventDefault()
    let obj = {
      _id:currUser._id,
      createdAt:currUser.createdAt,
      description:description.current?.value?description.current?.value:currUser.description,
      isAdmin:currUser.isAdmin,
      updatedAt:currUser.updatedAt,
      username:currUser.username,
      followers:currUser.followers,
      following:currUser.following,
      firstname:firstnamee.current?.value?firstnamee.current.value:null,
      lastname: lastnamee.current?.value?lastnamee.current.value:null,
      worksAt:worksAte.current?.value?worksAte.current.value:null,
      city:citye.current?.value?citye.current.value:null,
      from:frome.current?.value?frome.current.value:null,
      relationship:relationshipe.current?.value?relationshipe.current.value:null,
      profilePicture:profilePicturee.current?.value?profilePicturee.current.value:currUser.profilePicture,
      coverPicture:coverPicturee.current?.value?coverPicturee.current.value:currUser.coverPicture
    }
    console.log(obj)
    try{
      await axios.put(`/user/${user?._id}`,obj)
      dispatch({type:"UPDATE_USER", payload:obj})
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Modal
      radius='3%'
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='45%'
      opened={modalOpen}
      onClose={() => setModalOpen(false)
      }
    >
      <form className='formInfo' >
        <div className='formtitle'>Your info</div>
        <div className='formCont'>
          <div className='formLabel'>
            <label>First Name</label>
            <input
              className='infoInput'
              type='text'
              name="firstname"
              placeholder="First Name"
              defaultValue={user.firstname}
              ref={firstnamee}
            />
          </div>
          <div className='formLabel'>
            <label>Last Name</label>
            <input
              className='infoInput'
              type='text'
              name="lastname"
              placeholder="Last Name"
              defaultValue={user.lastname}
              ref={lastnamee}
            />
          </div>
        </div>
        <div className='formCont'>
          <div className='formLabel'>
            <label>Description</label>
            <input
              className='infoInput'
              type='text'
              name="description"
              placeholder="Description"
              defaultValue={user.description}
              ref={description}
            />
          </div>
        </div>
        <div className='formCont'>
          <div className='formLabel'>
            <label>Works At</label>
            <input
              className='infoInput'
              type='text'
              name="worksat"
              placeholder="Works at"
              defaultValue={user.worksAt}
              ref={worksAte}
            />
          </div>
        </div>
        <div className='formCont'>
          <div className='formLabel'>
            <label>Lives In</label>
            <input
              className='infoInput'
              type='text'
              name="city"
              placeholder="City"
              defaultValue={user.city}
              ref={citye}
            />
          </div>
          <div className='formLabel'>
            <label>From</label>
            <input
              className='infoInput'
              type='text'
              name="from"
              placeholder="From"
              defaultValue={user.from}
              ref={frome}
            />
          </div>
        </div>
        <div className='formCont'>
          <div className='formLabel'>
            <label>Relationship</label>
            <input
              className='infoInput'
              type='text'
              placeholder="Relationship Status"
              defaultValue={user.relationship}
              ref={relationshipe}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'2rem' }}>
          <span className='labb'>
            <input ref={profilePicturee} type="file" id='profileImg' accept="image/png, image/jpeg" hidden />
            <label for='profileImg'>Upload Image</label>
          </span>
          <span className='labb'>
            <input ref={coverPicturee} type="file" id='coverImg' accept="image/png, image/jpeg" hidden />
            <label className='imgLabel' for='coverImg'>Upload Cover</label>
          </span>
        </div>
        <button onClick={handleClick} className='button infoButton' type='submit'>Update</button>
      </form>
    </Modal >
  );
}

export default ProfileModal;