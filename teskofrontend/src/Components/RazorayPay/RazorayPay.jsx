import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import useRazorpay from 'react-razorpay';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert} from 'react-bootstrap'

const RazorayPay = () => {
  const [error,setError]=useState('')
  setTimeout(() => {
    setError("")
  }, 20000);
  const userLogin =useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
 


  const orderdata = useSelector((state) => state.orderdata);
  const { Reducerdata: orderalldata } = orderdata;

  const orderitemdata = useSelector((state) => state.orderitemdata);
  const { OrderItemdata} = orderitemdata;
 

  const totalCartPrice = OrderItemdata.reduce((acc, item) => acc + item.qty * parseFloat(item.price), 0).toFixed(2);


  const [Razorpay] = useRazorpay() // Convert to paise

  const navigate = useNavigate();

  const OrderCompleted = async (
    amount_price,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userid,
    orderid
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/users/proceedcartorder/${orderid}/`,
        {
          paymentMethod: "RazorPay",
          taxPrice: 0,
          isPaid: true,
          paidAt: new Date().toISOString(), 
          Razorpay_order_id: razorpay_order_id,
          Razorpay_Payment_id: razorpay_payment_id,
          Razorpay_signature_id: razorpay_signature,
        },
        config
      );
  

      return data; 
    } catch (error) {
     
      if (error.response) {
       
        console.error(
          `Error ${error.response.status}: ${error.response.data.detail || error.response.data}`
        );
      } else if (error.request) {
        
        console.error("No response received from the server:", error.request);
      } else {
       
        console.error("Error setting up the request:", error.message);
      }
    }
  };
  const   OrderFailed = async (
    amount_price, 
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_Reason,
    userid,
    orderid
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/users/proceedcartorder/${orderid}/`,
        {
          paymentMethod: "RazorPay",
          taxPrice: 0,
          isPaid: false,
          paidAt: new Date().toISOString(), 
          Razorpay_order_id: razorpay_order_id,
          Razorpay_Payment_id: razorpay_payment_id,
          Razorpay_signature_id: razorpay_Reason,
        },
        config
      );

      return data; 
    } catch (error) {
     
      if (error.response) {
       
        console.error(
          `Error ${error.response.status}: ${error.response.data.detail || error.response.data}`
        );
      } else if (error.request) {
        
        console.error("No response received from the server:", error.request);
      } else {
       
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const razorpayPaymentComplete = async (amount_price,razorpay_payment_id,razorpay_order_id,razorpay_signature,userid,orderid) => {
    try{

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/rzporder/complete/',
        {
                "payment_id": razorpay_payment_id,
                "order_id": razorpay_order_id,
                "signature": razorpay_signature,
                "amount": amount_price,
        },
        config
      );
      console.log(response)
    }catch (error) {
      setError(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  }
  const razorpayPayment = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
    
      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/rzporder/create/',
        {
          amount: totalCartPrice*100,
          currency: 'INR',
        },
        config
      );
      const order_id = response.data.data.id;

      const amount_price=response.data.data.amount 

      const options = {
        "key": 'rzp_test_mTX9MQoshGNzyp', 
        "amount":amount_price,
        "currency": 'INR',
        "name": 'TESKO DUDE',
        "description": 'Test Transaction',
        "image": 'https://img.freepik.com/premium-vector/online-shopping-logo-design-vector-template_712837-74.jpg',
        "order_id": order_id, 
       "handler": function (response){
        razorpayPaymentComplete(amount_price,response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature,userInfo.id,orderalldata[orderalldata.length -1]._id)
        const data=OrderCompleted(amount_price,response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature,userInfo.id,orderalldata[orderalldata.length -1]._id)
        console.log(data)
        navigate("/myorders")
      },
        'prefill': {
          name: userInfo.username,
          email:userInfo.email,
          userID:userInfo.id,
        },
       "notes": {
          address: 'Tesko Dude Ecoomerce Shopping  Office',
        },
        "theme": {
          color: '#088178',
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on('payment.failed', function (response) {
        OrderFailed(amount_price,response.error.metadata.order_id,response.error.metadata.payment_id,response.error.reason,userInfo.id,orderalldata[orderalldata.length -1]._id)
        navigate("/myorders")
      });

      rzp1.open();
    } catch (error) {
          setError(`Error: ${error.response ? error.response.data.message : error.message} - Payment Limit is only 50,0000/- only`);
    }
  };
  
  return (
    <>
    <br/>
    {error&&<Alert severity="error">{error}</Alert>}
    
      <button onClick={razorpayPayment} className="normal" style={{backgroundColor:"#ffc439;"}}>
        Pay with Razorpay - ₹ {totalCartPrice}
      </button>
    </>
  );
};

export default RazorayPay;
