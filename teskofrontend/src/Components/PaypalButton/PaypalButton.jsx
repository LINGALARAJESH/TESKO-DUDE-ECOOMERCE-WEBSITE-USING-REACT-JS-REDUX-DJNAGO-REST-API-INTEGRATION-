import React, { useEffect, useState } from 'react';

const PayPalCheckout = () => {
  const [orderID, setOrderID] = useState(false);
  const [transactionID, setTransactionID] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Make sure the PayPal object is available before rendering the button
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: async (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: "10.00",  // Amount in USD
              },
            }],
          }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
          });
        },
        onApprove:async (data, actions) => {
          return actions.order.capture().then((details) => {
            const transaction = details.purchase_units[0].payments.captures[0];
            setTransactionID(transaction.id);  // Capture the transaction ID
            alert(`Transaction successful! Order ID: ${orderID}, Transaction ID: ${transaction.id}`);
          });
        },
        onError: (err) => {
          setErrorMessage("Something went wrong with the payment");
        }
      }).render('#paypal-button-container'); 
    }
  }, []);

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <div id="paypal-button-container"></div> 
      {orderID && <p>Order ID: {orderID}</p>}
      {transactionID && <p>Transaction ID: {transactionID}</p>}
    </div>
  );
};

export default PayPalCheckout;
