import React, { useState, useRef,useEffect,useContext } from 'react';
import './messages.css';
import NavBar from '../../components/navBar/NavBar.jsx'
import Convo from '../../components/convo/Convo.jsx'
import Msg from '../../components/msg/Msg.js'
import MsgOnline from '../../components/msgOnline/MsgOnline'
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import { io } from "socket.io-client";

export default function Messages() {
  const [txtInput,setTxtInput]=useState(null)
  const [convos,setConvos]=useState([])
  const [currChat,setCurrChat]=useState(null)
  const [msgs,setMsgs]=useState([])
  const [receivedMsg,setReceivedMsg]=useState(null)
  const socket = useRef()
  const {user} = useContext(AuthContext);


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setReceivedMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    receivedMsg &&
      currChat?.members.includes(receivedMsg.sender) &&
      setMsgs((prev) => [...prev, receivedMsg]);
  }, [receivedMsg, currChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", user?._id);
    console.log('hit')
    socket?.current?.on("getUsers", (users) => {
      console.log({users})
    });
  }, [user]);


  useEffect(()=>{
    const getConvos = async()=>{
      try{
        const res = await axios.get(`/convo/${user?._id}`)
        setConvos(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getConvos()
  },[user._id])

  useEffect(()=>{
    const getMsgs = async ()=>{
      try{
        const res = await axios.get(`/msg/${currChat?._id}`)
        setMsgs(res.data)
        setTxtInput(null)
      }catch(err){
        console.log(err)
      }
    }
    getMsgs()
  },[currChat])

  const handleSend = async(e) => {
    e.preventDefault()
    let obj = {
      sender:user._id,
      text:e.target[0].value,
      conversationId:currChat?._id
    }

    const receiverId = currChat.members.find(member=>member!==user?._id)

    socket.current.emit("sendMessage",{
      senderId:user._id,
      receiverId:receiverId,
      text:e.target[0].value
    })

    try{
      const res = await axios.post('msg/',obj)
      setMsgs(prev=>[...prev,res.data])
      setTxtInput('')
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
    <NavBar/>
    <div className='Messages'>
      <div className="chat-left">
        <div className='lc-wrapper'>
          <input placeholder="Search messages" className='lc-input'>
          </input>
          {
            convos.map(convo=>{
              return(
                <Convo setCurrChat={setCurrChat} convo={convo} currUser={user}/>
              )
            })
          }
        </div>
      </div>
      <div className="chat-center">
        <div className='cc-wrapper'>
          {
            currChat?
            (
              <>
                <div className='cc-top'>
                  <Msg msgs={msgs} user={user}/>
                </div>
                <div className='cc-bottom'>
                  <form onSubmit={handleSend}>
                    <textarea value={txtInput} onChange={(e)=>setTxtInput(e.target.value)} placeholder="Say Hello"></textarea>
                    <button type='submit' className=' button cc-submitBtn'>Send</button>
                  </form>
                </div>
              </>
            ):<span className='noConvo'>Open a conversation to start woofing!</span>
          }
        </div>
      </div>
      <div className="chat-right">
        <div className='rc-wrapper'>
          <MsgOnline/>
        </div>
      </div>
      {/* <div className="chat-r"/> */}
    </div>
    </>
  );
}