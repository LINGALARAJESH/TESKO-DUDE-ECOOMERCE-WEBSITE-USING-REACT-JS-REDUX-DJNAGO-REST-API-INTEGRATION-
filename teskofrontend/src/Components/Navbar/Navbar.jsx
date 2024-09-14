import React from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"
import { useSelector,useDispatch} from 'react-redux'
import {logout} from "../../actions/useractions"
import  { useRef } from "react";
const Navbar = () => {
    const userLogin =useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const dispatch=useDispatch()

    const cart = useSelector((state) => state.cart);
    const {cartItems}=cart
    const lencart=cartItems.length

    const logoutHandler=()=>{
    
        dispatch(logout())
    }

    const menuRef= useRef()
    const crossRef= useRef()
    
    const openMenu=()=>{
        menuRef.current.style.left="50%";
    }
    const closeMenu=()=>{
      window.scrollTo(500, 0);
      menuRef.current.style.left="100%";
     
    }
    const cross = () => {
        crossRef.current.style.transform = "rotate(180deg)";
      };

  return (
   <div className="maincontainer" variant="dark">

        <div className="logo">
            <h2>TEESKO</h2>
            <h1>DUDE<i className="fa-solid fa-tag"></i></h1>
        </div>
        <ul ref={menuRef}>
             <i id="crossdue" ref={crossRef} onClick={() => {closeMenu();cross();}} style={{ fontSize: "25px" }} className="fa-solid fa-x" ></i>
            <div className="cartmad"> 
            <Link className="micon" style={{textDecoration:"none"}} to="/mycart">
            <i  className="fa-solid fa-bag-shopping"></i>
            </Link>
          
            <p className='count'>{userInfo?lencart:"0"}</p>
            </div>
            <li onClick={closeMenu}><div className="icon"><Link className="micon" style={{textDecoration:"none"}} to="/"><i className="fa-solid fa-house"></i>Home</Link></div></li>
            <li onClick={closeMenu}><div className="icon"><Link className="micon" style={{textDecoration:"none"}} to="/products"><i className="fa-solid fa-shirt"></i>Products</Link></div></li>
            {userInfo&& <li onClick={closeMenu}><div className="icon"><Link className="micon" style={{textDecoration:"none"}} to="/myorders"><i className="fa-solid fa-list"></i>Myorders</Link></div></li>}
            <li onClick={closeMenu}><div className="icon"><a className="micon" style={{textDecoration:"none"}} href="#aboutus"><i className="fa-solid fa-address-card"></i>About us</a></div></li>
            <li onClick={closeMenu}><div className="icon"><a className="micon" style={{textDecoration:"none"}} href="/Contact"><i className="fa-solid fa-phone"></i>Contact</a></div></li>
            {userInfo&& <li onClick={closeMenu}><div className="icon"><Link className="micon" style={{textDecoration:"none"}} to="/Cart"><i className="fa-solid fa-cart-shopping"></i>Mycart</Link></div></li>}
            
            <div className="buttondata">
            {userInfo?
            (<>
            <button   className="buttt" type="button" style={{display:"flex",flexDirection:"row",width:"auto",padding:"10px",alignItems:"center",fontSize:"20px"}}> <i className="fa-solid fa-user"></i><Link className='username'  style={{textDecoration:"none",fontSize:"15px"}} to="/User">{userInfo.name}</Link></button>
            <Link className="buttt" style={{ textDecoration: "none" }} to="/login">
 <br />
  <button
    className="buttt"
    onClick={() => {
      logoutHandler();
      closeMenu();
    }}
    type="button"
  >
    <i className="fa-solid fa-right-from-bracket"></i>Logout
  </button>
</Link>
            </>
            ):(  
            <>
            <button  onClick={closeMenu} type="button"><Link  className='normall' style={{textDecoration:"none"}} to="/login">Login</Link></button>
            <button onClick={closeMenu}  type="button"><Link   className='normall'   style={{textDecoration:"none"}} to="/signup">Signup</Link></button>
            </>
            )
            }

            {/* <img src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="" />
        
            <p className='para'>+</p> */}
        </div>
        </ul>
        <div className="authen">
            {userInfo?
            (<>
            <button type="button" style={{display:"flex",flexDirection:"row",width:"auto",padding:"10px",alignItems:"center"}}> <i className="fa-solid fa-user"></i><Link className='username'  style={{textDecoration:"none"}} to="/User">{userInfo.name}</Link></button>
            <Link style={{textDecoration:"none"}} to="/login"><button onClick={logoutHandler} type="buttton"><i className="fa-solid fa-right-from-bracket"></i>Logout</button></Link>
            </>
            ):(  
            <>
            <button  type="button"><Link  className='normall' style={{textDecoration:"none"}} to="/login">Login</Link></button>
            <button  type="button"><Link   className='normall'   style={{textDecoration:"none"}} to="/signup">Signup</Link></button>
            </>
            )
            }

            {/* <img src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="" />
        
            <p className='para'>+</p> */}
        </div>
        <div className="cart">
        <Link className="micon" style={{textDecoration:"none"}} to="/mycart">
        <i className="fa-solid fa-bag-shopping"></i>
        </Link>
        <p className='count'>{userInfo?lencart:"0"}</p>
        </div>
        <i onClick={openMenu} id="menubar" class="fa-solid fa-bars"></i>
   </div>
  )
}

export default Navbar