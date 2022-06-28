import React, { useState, useRef,useContext } from 'react';
import './styles.css';
import ProfileImage from '../../img/profileImg.jpg';
import { UilTimes } from '@iconscout/react-unicons';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import {
  RiImageFill,
  RiVideoAddLine,
  RiEmotionHappyLine,
  RiCalendar2Line
} from "react-icons/ri";

function CreatePost({ setRerender }) {
  const [isLoading, setIsLoading] = useState(false)
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const descriptionRef = useRef()
  const reset = () => {
    setImage(null);
    descriptionRef.current.value = null
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img)
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (descriptionRef.current.value.length !== 0) {
      const newPost = {
        userId: user._id,
        description: descriptionRef.current.value
      }
      setIsLoading(true)

      if (image) {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", 'ynislmn9')
        let data = await axios.post("https://api.cloudinary.com/v1_1/djtk4ap6i/image/upload", formData)
        newPost.image = data.data.secure_url
        console.log(newPost)
      }
      await axios.post('/post',newPost)
      window.location.reload()
      reset()
      setIsLoading(false)
    }
  }
  return (
    <div className="CreatePost">
      <img src={user.profilePicture?user.profilePicture:ProfileImage} alt='' />
      <div >
        <textarea
          ref={descriptionRef}
          type='text'
          placeholder="What's Happening"
          required
        />
        <div className='hl' />
        <div className='postOptions'>
          <div style={{ color: 'var(--photo)' }} className='option' onClick={() => imageRef.current.click()}>
            <RiImageFill style={{ fontSize: '30px', marginRight: '5px' }} />
            Photo
          </div>
          <div style={{ color: 'var(--video)' }} className='option'>
            <RiVideoAddLine style={{ fontSize: '30px', marginRight: '5px' }} />
            Video
          </div>
          <div style={{ color: 'var(--location)' }} className='option'>
            <RiEmotionHappyLine style={{ fontSize: '30px', marginRight: '5px' }} />
            Emotion
          </div>
          <div style={{ color: 'var(--shedule)' }} className='option'>
            <RiCalendar2Line style={{ fontSize: '30px', marginRight: '5px' }} />
            Schedule
          </div>
          <button onClick={handleSubmit} className='button ps-button' disabled={isLoading}>
            {isLoading ? "Posting" : "Share"}
          </button>
          <div style={{ display: 'none' }}>
            <input
              type='file'
              name='myImage'
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className='PreviewImg'>
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt='' />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;