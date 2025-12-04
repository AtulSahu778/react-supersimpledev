import React, { Fragment, useEffect, useState } from 'react'
import './OrdersPage.css';
import Header from '../../components/Header';
import axios from 'axios/unsafe/axios.js';
import OrdersGrid from './OrdersGrid';



function OrdersPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders?expand=products')
     .then((response) => {
      setOrders(response.data);
     })
  }, []);



  return (
    <>
    <Header />

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <OrdersGrid orders={orders}/>
    </div>
    </>
  )
}

export default OrdersPage