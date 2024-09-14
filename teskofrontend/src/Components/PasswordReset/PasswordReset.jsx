import React from 'react'
import { useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import Alert from 'react-bootstrap/Alert';
import { Link, useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios';

const PasswordReset = () => {
  const navigate=useNavigate()
  const location =useLocation()
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState('')
  const [show ,changeshow]=useState(' fa-solid fa-eye')
  const redirect = location.search ? location.search.split('=')[1] :'/login'
  const userRegister =useSelector(state=>state.userRegister)
  const {error,loading,userInfo}=userRegister 

  const uidb64= window.location.pathname
    && window.location.pathname.split("/")[4]
  const token = window.location.pathname
    && window.location.pathname.split("/")[5]



  useEffect(()=>{
     
    if(userInfo){
      navigate(redirect)
    }

},[userInfo,redirect,navigate])


const submitHandler= async (e)=>{
  e.preventDefault()
  if(password!==confirmPassword){
    setMessage('Password do not Match')
  }
  else{
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/users/set-new-password/${uidb64}/${token}}`,
        {
            uidb64:uidb64,
            token:token,
            password:password,
            conform:confirmPassword,
        },
            config
        )
        setMessage(data)
        setTimeout(()=>{
            navigate("/login")
        },3000
        )
      } catch (error) {
        console.log(error)
      }
      
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
        <h1>Reset Password</h1>
        </div>
        {error && <Alert className='errormsg' variant="danger">{error}</Alert>}
        {message && !error && <Alert className='errormsg' variant="danger">{message}</Alert>}
        {loading && <Loader/>}
 
      <form onSubmit={submitHandler}>
      <div className="loginsignup-fields">
        <div className="passcode allcode"> 
        <input id="pass1" style={{border:"none"}} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Create New Password' />
        <i onClick={showPassword} className={show}></i>
        </div> 
        <div className="passcode allcode"> 
        <input id="pass2" style={{border:"none"}} type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
        <i onClick={showPassword} className={show}></i>
        </div> 
        </div>
        <button type="submit" >RESET</button>
      </form>
     
    
     <div className="loginsignup-login">Already have an account? <span><Link style={{textDecoration:"none"}}to={redirect ? `/login?redirect=${redirect}`:"/login"}> <span>Login here</span></Link></span></div>
    </div>
    </div>
  </>
  );
}

export default PasswordReset