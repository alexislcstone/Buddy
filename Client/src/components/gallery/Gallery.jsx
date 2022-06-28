import './styles.css';
import { Friends } from '../../Data/FriendsData.js'
import {useEffect,useContext,userState,useState} from 'react'
import axios from 'axios'
import Profil from '../../img/profileImg.jpg';
import { MdPhotoCamera } from "react-icons/md";

export default function Gallery({user}){
  const[images, setImages] = useState([])
  useEffect(()=>{
    const getImages = async()=>{
      try{
        const imgList = await axios.get(`/post/profile/${user.username}/images`)
        setImages(imgList.data);
      }catch(err){
        console.log(err)
      }
    }
    getImages();
  },[user.username])
  return(
    <div className='Gallery'>
      <div className="galName"><MdPhotoCamera/> Photos</div>
        <div className='gallery-a'>
        {images.map((img, id) => {
          return (
            <div className='gallery-a'>
              <div>
                <div className='rb-imgContainer'>
                  <img src={img?img:Profil} alt="" className='galleryimg' />
                </div>
              </div>
            </div>
        )
        })}
        </div>
    </div>
  )
}