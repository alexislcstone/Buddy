import React, { useState, useRef, useEffect, useContext } from 'react';
import './styles.css';
import SinglePost from '../singlePost/SinglePost'
function PostFeed({ posts }) {

  return (
    <div className="PostFeed">
      {
        posts.map((post, i) => {
          return (
            <SinglePost key={i} post={post} />
          )
        })
      }
    </div>
  );
}

export default PostFeed;