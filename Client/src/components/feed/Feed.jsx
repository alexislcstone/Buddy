import React, { useState,useEffect,useContext } from 'react';
import './styles.css';
import CreatePost from '../createPost/CreatePost.jsx';
import PostFeed from '../postFeed/PostFeed.jsx';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';

function Feed({username}) {
  const {user} = useContext(AuthContext);
  const [posts, setPosts] = useState([])
  console.log(user)

  useEffect(()=>{
    const fetchPosts = async() =>{
      const res = username? await axios.get(`/post/profile/${username}`):await axios.get(`/post/timeline/${user._id}`);
      setPosts(
        res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      )
    }
    fetchPosts()
  },[username,user._id])
  return (
    <div className="Feed">
      {username===user.username?<CreatePost />:null}
      <PostFeed posts={posts}/>
    </div>
  );
}

export default Feed;