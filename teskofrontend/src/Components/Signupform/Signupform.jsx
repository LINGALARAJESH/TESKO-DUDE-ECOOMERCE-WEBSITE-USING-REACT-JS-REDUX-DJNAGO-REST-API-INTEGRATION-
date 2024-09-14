import React from 'react'
import "./Signupform.css"
import { useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import Alert from 'react-bootstrap/Alert';
import {register} from "../../actions/useractions"
import { Link, useLocation,useNavigate } from 'react-router-dom'
import {validEmail,validPassword} from "../../Context/Regex"

const Signupform = () => {
  const navigate=useNavigate()
  const location =useLocation()
  const [Firstname,setFirstName]=useState('')
  const [Lastname,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState('')
  const [show ,changeshow]=useState(' fa-solid fa-eye')

  const dispatch=useDispatch()
  const redirect = location.search ? location.search.split('=')[1] :'/login'
  const userRegister =useSelector(state=>state.userRegister)
  const {error,loading,userInfo}=userRegister 

  useEffect(()=>{
     
    if(userInfo){
      navigate(redirect)
    }

},[userInfo,redirect,navigate])


const submitHandler=(e)=>{
  e.preventDefault()
  if(password!==confirmPassword){
    setMessage('Password do not Match')
  }
  else if(!validEmail.test(email)){
    setMessage('Invalid email address')
  }
  else if(!validPassword.test(password)){
  setMessage('Password criteria not match')
  }
  else{
    setTimeout(()=>{
      userInfo?navigate("/login"):setMessage("Activation mail is send to ur email account please activate")
      dispatch(register(Firstname,Lastname,email,password))
      },3000)
    
    
   
  }

}
const showPassword=()=>{
    var x =document.getElementById("pass1");
    var z =document.getElementById("pass2");
    if(x.type==="password" && z.type==="password"){
      x.type="text"
      z.type="text"
      changeshow('fa-solid fa-eye')
    }else{
      x.type="password"
      z.type="password"
      changeshow('fa-solid fa-eye-slash')
}
}

  return (
  <>
      <div className='loginsingnup'> 
    <div className="loginsignup-container">
        <div className='loginsignup-header'>
        <h1>Signup</h1>
        </div>
{error && <Alert className='errormsg' variant="danger">{error}</Alert>}
{message && !error && <Alert className='errormsg' variant="danger">{message}</Alert>}
      {loading && <Loader/>}
 
      <form onSubmit={submitHandler}>
      <div className="loginsignup-fields">
        <input type="text" value={Firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder='First Name'/>
        <input type="text" value={Lastname} onChange={(e)=>setLastName(e.target.value)} placeholder='Last Name'/>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email address'/>
        <div className="passcode allcode"> 
        <input id="pass1" style={{border:"none"}} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
        <i onClick={showPassword} className={show}></i>
        </div> 
        <div className="passcode allcode"> 
        <input id="pass2" style={{border:"none"}} type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
        <i onClick={showPassword} className={show}></i>
        </div> 
        </div>
        <button type="submit">SIGNUP</button>
      </form>
     
    
     <div className="loginsignup-login">Already have an account? <span><Link style={{textDecoration:"none"}}to={redirect ? `/login?redirect=${redirect}`:"/login"}> <span>Login here</span></Link></span></div>
     <div className="loginsignup-agree">
      <input type="checkbox" name="" id=""/>
      <p>By continuing ,i agree to the terms of use & privacy policy.</p>
     </div>
    </div>
    </div>
  </>
  );
}

export default Signupform