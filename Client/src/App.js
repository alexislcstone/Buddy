import "./App.css"
import React, { useState, useEffect, useContext, createContext } from 'react'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Messages from './pages/messages/Messages'

import Login from './pages/login/Login.jsx'
import {BrowserRouter as Router, Routes, Route, Link,Navigate} from 'react-router-dom';
import {AuthContext} from './context/AuthContext.js';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <div className="App">
      <div className='blur1' style={{ top: '-10%', right: '0' }}></div>
      <div className='blur2' style={{ top: '46%', left: '-8rem' }}></div>
      <Router >
        <Routes>
          <Route exact path='/' element={user?<Home/>:<Navigate to='/auth'/>}/>
          <Route path='/profile/:username' element={user?<Profile/>:<Navigate to='/auth'/>}/>
          <Route path='/messages' element={user?<Messages/>:<Navigate to='/auth'/>}/>
          <Route path='/auth' element={user?<Navigate to='/'/>:<Login/>}/>
        </Routes>
      </Router>
      {/* <Home /> */}
      {/* <Profile /> */}
      {/* <Login /> */}
    </div>
  )
}

export default App;