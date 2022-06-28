import React, { useState, useContext,useEffect } from 'react';
import { Profile } from '../../Data/ProfileData.js'
import './styles.css';
import axios from 'axios';
import Profil from '../../img/profileImg.jpg';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

import {
  RiHeart3Line,
  RiHeart3Fill,
  RiChat1Line,
  RiShareForwardLine,
  RiBookmarkLine,
  RiDeleteBin6Line,
  RiMore2Line
} from "react-icons/ri";

function SinglePost({ post, setRerender }) {
  const {user} = useContext(AuthContext);
  const [liked, setLiked] = useState(post.likes.includes(user._id))
  const [likes, setLikes] = useState(post.likes.length)
  const [usr, setUsr] = useState([])

  useEffect(()=>{
    const fetchUsers = async() =>{
      const res = await axios.get( `/user/`,{params:{userId:post.userId}});
      setUsr(res.data)
    }
    fetchUsers()
  },[post.userId])

  const handleLike = () => {
    try{
      axios.put(`/post/${post._id}/like`,{userId:user._id})
    }catch(err){
      console.log(err)
    }
    setLikes(liked?likes-1:likes+1)
    setLiked((prev) => !prev)
  }
  const handleDelete = () => {
    setRerender(prev => !prev)
  }
  return (
    <div className="SinglePost">
      <div className="postHeader">
        <div>
          <Link to={`/profile/${usr.username}`}>
            <img className = 'feedProfImg' src={usr.profilePicture?usr.profilePicture:Profil} alt='' />
          </Link>
          <div style={{display:'flex',flexDirection:'column',marginLeft: '10px'}}>
            <span>{usr.firstname} {usr.lastname}</span>
            <small> {format(post.createdAt)}</small>
          </div>
        </div>
        <RiMore2Line style={{ fontSize: '25px', cursor: "pointer"}}/>
      </div>
      {post.image ?<img src={post.image} alt='' />:null}
      <div className='postReactions'>
        <div>
          {liked ?
            <RiHeart3Fill style={{ fontSize: '30px', cursor: "pointer", color: '#ff4033' }} onClick={handleLike} />
            : <RiHeart3Line style={{ fontSize: '30px', cursor: "pointer" }} onClick={handleLike} />
          }
          <RiChat1Line style={{ fontSize: '30px', cursor: "pointer" }} />
          <RiShareForwardLine style={{ fontSize: '30px', cursor: "pointer" }} />
          <RiDeleteBin6Line
            onClick={handleDelete}
            style={{ fontSize: '25px', cursor: "pointer", color: 'grey' }}
          />
        </div>
        <RiBookmarkLine style={{ fontSize: '30px', cursor: "pointer" }} />
      </div>
      <span style={{ color: 'var(--gray)', fontSize: '15px',padding:'0px 10px' }}>{likes} likes</span>
      <div className='detail'>
        <span>{post.name}</span>
        <span>{post?.description}</span>
      </div>
      <div className='hl' />
      <div className='sp-comment'>
        <img src={user.profilePicture?user.profilePicture:Profil} alt=''/>
        <div>
          <input className='sp-commentInput' type='text' placeholder='Add a comment...'/>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;