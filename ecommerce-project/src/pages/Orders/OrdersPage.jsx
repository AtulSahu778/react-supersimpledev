import React, { Fragment, useEffect, useState } from 'react'
import './OrdersPage.css';
import Header from '../../components/Header';
import axios from 'axios/unsafe/axios.js';
import OrdersGrid from './OrdersGrid';



function OrdersPage({cart}) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }
    
    fetchOrdersData();
  }, []);



  return (
    <>
    <Header cart={cart} isHomePage={true} />

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <OrdersGrid orders={orders}/>
    </div>
    </>
  )
}

export default OrdersPage