import React, { useEffect, useState } from 'react'
import './CheckoutPage.css';
import { Link } from 'react-router';
import CheckoutHeader from './CheckoutHeader';
import { FormatMoney } from '../../utlis/FomatMoney';
import axios from 'axios/unsafe/axios.js';
import OrdersSummary from './OrdersSummary';
import PaymentsSummary from './PaymentsSummary';



function CheckoutPage({cart , loadCart}) {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  
  useEffect( () => {
    
    const fetchCheckoutData = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }

    fetchCheckoutData();
  },[]);
  
  useEffect( () => {
    
    const fetchPaymentData = async () => {
      let response = await axios.get('api/payment-summary')
      setPaymentSummary(response.data);
    }

    fetchPaymentData();
  },[cart]);

  return (
    <>

    <title>Checkout</title>

    
    <CheckoutHeader></CheckoutHeader>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <OrdersSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart}/>

        <PaymentsSummary paymentSummary={paymentSummary}/>
      </div>
    </div>
    </>
  )
}

export default CheckoutPage;