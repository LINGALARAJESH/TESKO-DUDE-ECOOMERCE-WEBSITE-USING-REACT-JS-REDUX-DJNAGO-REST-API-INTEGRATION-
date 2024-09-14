import React from 'react';
import { useState} from 'react';
import { useSelector } from "react-redux";
import "./Payment.css";
import RazorayPay from "../../Components/RazorayPay/RazorayPay"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";





const Payment = () => {

  const [colldata, setColldata] = useState(true);

  const shippingdata = useSelector((state) => state.shippingdata);
  const { Shippingdata } = shippingdata;

  const orderitemdata = useSelector((state) => state.orderitemdata);
  const { OrderItemdata} = orderitemdata;

  const totalCartPrice = OrderItemdata.reduce((acc, item) => acc + item.qty * parseFloat(item.price), 0).toFixed(2);
  
  
  return (
    <>
      <section id="cart" className="section-p1">
        <h3>₹-Conform Payment & Place Order </h3>
        <table style={{ width: "100%" }}>
        

          <thead>
        
            <tr>
              <td>ORDER ID</td>
              <td>IMAGES</td>
              <td>PRODUCT NAME</td>
              <td>PRICE</td>
              <td>QUANTITY</td>
              <td>SIZE</td>
              <td>SUBTOTAL</td>
            </tr>
          </thead>
          <tbody>
            {OrderItemdata.map((item) => (
              <tr key={item._id}>
                <td>{item.order}</td>
                <td>
                  <img src={`http://127.0.0.1:8000/${item.image}`} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.size}</td>
                <td><b>₹ </b>{(parseFloat(item.price) * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="cart-add" className="section-p1">
        <div id="subtotal">
          <h3>Shipping Address</h3>
          {Shippingdata &&Shippingdata.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <td>Mobile Number</td>
                  <td>+91-{Shippingdata[0].mobile}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{Shippingdata[0].address}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{Shippingdata[0].city}</td>
                </tr>
                <tr>
                  <td>Postal Pincode</td>
                  <td>{Shippingdata[0].postalCode}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{Shippingdata[0].country}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <>
            <p>Loading shipping data...</p>
          
            </>  
          )}
        </div>

        <div id="subtotal2">
          <h3>Cart Totals</h3>
          <table>
            <tbody>
              <tr>
                <td>Cart subtotals</td>
                <td>₹{totalCartPrice}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>Free</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>₹{totalCartPrice}</strong></td>
              </tr> 
            </tbody>
          </table>
          <table>
          <h3>Payment Method</h3>
            <tbody>
              <tr>
                <td><input onChange={() => setColldata(true)} style={{display:"inline",width:"50px",alignSelf:"center"}}  type="checkbox" /> <b>ROZAROPAY</b></td>
                <td><input onChange={() => setColldata(false) } style={{display:"inline",width:"50px",alignSelf:"center"}} type="checkbox" /> <b>PAYPAL</b></td>
              </tr>
              <tr>
              {colldata ? (
            <td colSpan="2">
              <RazorayPay />
            </td>
          ) : (
            <td colSpan="2">
              <PayPalScriptProvider options={{ 'client-id': 'AStB8bAEocAqPjPqxp8DyC00ZVTOpUXFf1D2jXORkSlh1QYE2RjQUEYS_f-KrYEmuNRmbVroG4XJRGPj' }}>
                <PayPalButtons />
              </PayPalScriptProvider>
            </td>
          )}
              </tr>
            </tbody>
          </table>
         
         
          
        </div>
      </section>
    </>
  );
};

export default Payment;
