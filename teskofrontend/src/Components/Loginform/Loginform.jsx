import React from 'react'
import "./Loginform.css"
import { useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import {login} from "../../actions/useractions"
import { Link, useLocation,useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';




const Loginform = () => {
  const navigate=useNavigate()
  const location =useLocation()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [show ,changeshow]=useState(' fa-solid fa-eye')
  const [message,setMessage]=useState("")

  const dispatch=useDispatch()

  const redirect = location.search ? location.search.split('=')[1] :'/'
  const userLogin =useSelector(state=>state.userLogin) 
  const {error,loading,userInfo}=userLogin 
  const userRegister = useSelector((state) => state.userRegister);
  const { signinInfo } = userRegister;
 

    useEffect(()=>{
      if(userInfo){
       
        navigate('/')
      }
  },[userInfo,redirect,navigate])

  useEffect(()=>{
  },[signinInfo])
  useEffect(()=>{
  
    if(signinInfo){
     setMessage("Activation mail is send to ur email account please activate")
    }
  },[signinInfo]
  )

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(login(email,password))
  }

  const showPassword=()=>{
    var x =document.getElementById("pass");
    if(x.type==="password"){
      x.type="text"
      changeshow('fa-solid fa-eye')
    }else{
      x.type="password"
      changeshow('fa-solid fa-eye-slash')
}
}

  return (

    <div className='loginsingnup'> 
    <div className="loginsignup-container">
        <div className='loginsignup-header'>
        <h1>Login</h1>
        </div>
        {error && <Alert className='errormsg' variant="danger">{error}</Alert>}
        {message && !error && <Alert className='errormsg' variant="danger">{message}</Alert>}   
        {loading && <Loader/>}
      <form onSubmit={submitHandler}>
      <div className="loginsignup-fields">
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email address or user name'required/>
        <div className="passcode allcode"> 
        <input id="pass" style={{border:"none"}} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
        <i onClick={showPassword} className={show}></i>
        </div> 
      </div>
      <button type="submit" >LOGIN</button>
      </form>
      <div className="loginsignup-login">forget password? <Link style={{textDecoration:"none"}}to={"/reset"}> <span>click here?</span></Link></div>
      <div className="loginsignup-login">create an account? <Link style={{textDecoration:"none"}}to={redirect ? `/signup?redirect=${redirect}`:"/signup"}> <span>Signup here?</span></Link></div>

    </div>

    </div>
  )
}

export default Loginform