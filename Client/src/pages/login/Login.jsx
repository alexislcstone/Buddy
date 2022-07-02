import React, { useState,useRef,useContext } from 'react';
import './styles.css';
import {loginCall} from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import {CircularProgress} from '@mui/material';
import axios from 'axios';

function Auth() {
  const firstname=useRef();
  const lastname=useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef()
  const confirmPassword = useRef()
  const {user,isFetching, error, dispatch} = useContext(AuthContext);

  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const obj = {
      firstname: firstname.current?.value?firstname.current.value:null,
      lastname: lastname.current?.value?lastname.current.value:null,
      username: username.current?.value?username.current.value:null,
      password: password.current?.value?password.current.value:null,
      confirmPassword: confirmPassword.current?.value?confirmPassword.current.value:null
    }
    if(isSignUp){
      if(password.current.value !== confirmPassword.current.value){
        setConfirmPass(false)
      }else{
        const user = {
          firstname: firstname.current?.value?firstname.current.value:null,
          lastname: lastname.current?.value?lastname.current.value:null,
          email:email.current?.value?email.current.value:null,
          username: username.current?.value?username.current.value:null,
          password: password.current?.value?password.current.value:null,
        }
        try{
          await axios.post('/auth/register',user)
          console.log(user)
          setIsSignUp(false)
        }catch(err){
          console.log(err)
        }
      }
    }else{
      loginCall(obj,dispatch)
    }
    console.log({})
    console.log({user})
  }

  const reset = () => {
    setConfirmPass(true);
    // setData({
    //   firstname: "",
    //   lastname: "",
    //   username: "",
    //   password: "",
    //   confirmPassword: ""
    // })
  }
  return (
    <div className="Auth">
      <div className="AuthWrapper">
        <div className='auth-left'>
          {/* <img src={Logo} alt='' /> */}
          <div className='webName'>
            <span>🐾 Buddy</span>
            <div>Meet and plan events with furry friends!</div>
          </div>
        </div>
        <div className='auth-right'>
          <div className='a-right'>
            <form className='formInfo auth-form' onSubmit={handleSubmit}>
              <h2 style={{color:"linear-gradient(98.63deg, #db6c79 0%, #f78a93 100%)"}}>{isSignUp ? "Sign up" : "Log in"}</h2>
              {isSignUp && (<div>
                <input
                  type='text'
                  placeholder='First Name'
                  className='infoInput'
                  name='firstname'
                  // onChange={handleChange}
                  // defaultValue={data.firstname}
                  ref={firstname}
                />
                <input
                  type='text'
                  placeholder='Last Name'
                  className='infoInput'
                  name='lastname'
                  // onChange={handleChange}
                  // defaultValue={data.lastname}
                  ref={lastname}
                />
              </div>)}
              <div>
                  <input
                    type='text'
                    placeholder='Username'
                    className='infoInput'
                    name='username'
                    // onChange={handleChange}
                    // defaultValue={data.username}
                    ref={username}
                  />
                </div>
                {
                isSignUp &&
                (
                <div>
                  <input
                    type='email'
                    placeholder='Email'
                    className='infoInput'
                    name='email'
                    // onChange={handleChange}
                    // defaultValue={data.username}
                    ref={email}
                  />
                </div>
              )
              }
              <div>
                <input
                  type='password'
                  placeholder='Password'
                  className='infoInput'
                  name='password'
                  // onChange={handleChange}
                  // defaultValue={data.password}
                  ref={password}
                />
                {isSignUp && (<input
                  type='password'
                  placeholder='Confirm Password'
                  className='infoInput'
                  name='confirmPassword'
                  // onChange={handleChange}
                  // defaultValue={data.confirmPassword}
                  ref={confirmPassword}
                />)}
              </div>
              <span style={{ display: confirmPass ? "none" : "block", fontSize: '12px', color: 'red', alignSelf: 'flex-end' }}>*Passwords do not match</span>
              <button type='submit' className='button infoButton' disabled={isFetching} >
                {isFetching? "Loading...":isSignUp ? "Submit" : "Log In"}
              </button>
              {/* <div> */}
                <span onClick={() => {
                  setIsSignUp(prev => !prev)
                  reset()
                }} style={{ fontSize: '12px', cursor: "pointer" }}>{!isSignUp ? "Don't have an account? Sign up Here!" : "Already have an account? Login Here!"}</span>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;