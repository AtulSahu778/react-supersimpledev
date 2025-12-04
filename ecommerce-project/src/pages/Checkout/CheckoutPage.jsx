import React, { useEffect, useState } from 'react'
import './CheckoutPage.css';
import { Link } from 'react-router';
import CheckoutHeader from './CheckoutHeader';
import { FormatMoney } from '../../utlis/FomatMoney';
import axios from 'axios/unsafe/axios.js';
import OrdersSummary from './OrdersSummary';
import PaymentsSummary from './PaymentsSummary';



function CheckoutPage({cart}) {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  
  useEffect( () => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    .then((response) => {
      setDeliveryOptions(response.data);
    });
    
    axios.get('api/payment-summary')
     .then((response) => {
      setPaymentSummary(response.data);
     });
  },[]);

  return (
    <>

    <title>Checkout</title>

    
    <CheckoutHeader></CheckoutHeader>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <OrdersSummary deliveryOptions={deliveryOptions} cart={cart}/>

        <PaymentsSummary paymentSummary={paymentSummary}/>
      </div>
    </div>
    </>
  )
}

export default CheckoutPage;