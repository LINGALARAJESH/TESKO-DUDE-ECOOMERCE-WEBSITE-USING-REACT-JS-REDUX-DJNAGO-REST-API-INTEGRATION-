import React, { useEffect, useState } from 'react';
import "./Myorders.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader'
import Message from '../Alert/Alert';
import { Link } from 'react-router-dom';
const Myorders = () => {

  const userLogin =useSelector(state=>state.userLogin)
  const {userInfo}=userLogin


  const [myOrderInfo, setMyOrderInfo] = useState([]);
  
  const getOrdersData = async (userInfo) => {
    try {
    
      const { data } = await axios.get(`http://127.0.0.1:8000/api/users/allorders/${userInfo.id}/`);
      setMyOrderInfo(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      getOrdersData(userInfo);
    };
    const timer = setTimeout(fetchData,50);
    return () => clearTimeout(timer);
  }, [userInfo]);

  
  
  const safeParse = (str) => {
    try {
     
      return JSON.parse(str.replace(/'/g, '"'));
    } catch (error) {
     
      return [];
    }
  };
  return (
    <>
      {myOrderInfo.length === 0 ? (
        <>
       
        <div style={{marginTop:"20px"}}>
            
            </div>
        <Message variant="info">
          Your Cart is empty <Link to="/">Go Back...</Link>
        </Message> 
        <h3>₹-MY ORDERS </h3>
        <Loader/>
        <div style={{height:"100vh"}}></div>
       </>
    ):( 
      <div className="maincontainer1">
      <h3>₹-MY ORDERS </h3>
        {myOrderInfo.map((item) => {
          return (
            <div className="ordercontainer1" key={item._id}>
              <div className="orderinfo1">
              {myOrderInfo.findIndex((order) => order._id === item._id)+1}.
              <table>
              <tbody>
              <tr  >
              <td colspan="2"><h6><b>Order Details</b></h6></td>
                </tr>
                <tr>
                  <td><b>Order-id</b></td>
                  <td>{item._id}</td>
                </tr>
                <tr>
                  <td><b>Razorpay-Payment-id</b></td>
                  <td>{item.Razorpay_Payment_id}</td>
                </tr>
                <tr>
                  <td><b>Razorpay-order-id</b></td>
                  <td>{item.Razorpay_order_id}</td>
                </tr>
                <tr>
                  <td><b>Price</b></td>
                  <td> {item.totalPrice}</td>
                </tr>
                <tr>
                  <td><b>Payment-Method</b></td>
                  <td>{item.paymentMethod == null ? "Payment Pending" : "Razorpay"}</td>
                </tr>
                <tr>
                  <td><b>Created</b></td>
                  <td>{item.createdAt}</td>
                </tr>
              </tbody>
            </table>  
            <table>
         
         <tbody>
         <tr  >
         <td colspan="2"><h6><b>Shipping Details</b></h6></td>
           </tr>
           <tr>
             <td><b>Mobile</b></td>
             <td>{item.mobile}</td>
           </tr>
           <tr>
             <td><b>Address</b></td>
             <td>{item.address}</td>
           </tr>
           <tr>
             <td><b>Postal Pincode</b></td>
             <td>{item.postalCode}</td>
           </tr>
           <tr>
             <td><b>Country</b></td>
             <td>{item.country}</td>
           </tr>
           <tr>
             <td> {item.isPaid ? <button className='buutt' style={{backgroundColor:"green"}}>"Payment Success"</button> : <button style={{backgroundColor:"red"}} className='buutt'>Payment Transaction Failed</button>}</td>
             <td>{item.isDelivered ?  <button className='buutt' style={{backgroundColor:"green"}}>"Delivered Success"</button> : <button className='buutt'>"Delivered Pending"</button>}</td>
           </tr>
         </tbody>
       </table>
       
            
          
              </div>
              <div className="productcontainer1">
                {safeParse(item.cartItems).map((dataitem) => (
                  <div className="productdetail1" key={dataitem._id}>
                    <div className="productimage1">
                      <img src={`http://127.0.0.1:8000/${dataitem.image}`} alt="" />
                    </div>
                    <div className="productdata">
                      <ul>
                        <li><b>ProductID</b>: {dataitem.productid}</li>
                        <li><b>Name</b>: {dataitem.name}</li>
                        <li><b>Quantity</b>: {dataitem.qty}</li>
                        <li><b>Size</b>: {dataitem.size}</li>
                        <li><b>Price</b>: {dataitem.price}</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
     )} </>
  );
};

export default Myorders;
