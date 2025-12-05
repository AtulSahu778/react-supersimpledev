import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './TrackingPage.css'
import { Link } from 'react-router'
import axios from 'axios';
import { useParams } from 'react-router';
import dayjs from 'dayjs';

function TrackOrders() {

  const { orderId } = useParams();
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setTrackingOrder(response.data);
      console.log(response);
    }
    
    getTrackingData();
  }, [orderId]);

  if(!trackingOrder){
    return null;
  }

  return (
    <>
    <Header></Header>

    <title>Tracking</title>

    <div className="tracking-page">
       {trackingOrder.products.map((orderProduct, index) => (
          <div
            key={orderProduct.id || `${trackingOrder.id}-product-${index}`}
            className="order-tracking"
          >
            <div className="delivery-date">
              {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
            </div>

            <div className="product-info">
              {orderProduct.name}
            </div>

            <div className="product-info">
              Quantity: {orderProduct.quantity}
            </div>

            <img
              className="product-image"
              src={orderProduct.product.image}
            />

            <div className="progress-labels-container">
              <div className="progress-label">Preparing</div>
              <div className="progress-label current-status">Shipped</div>
              <div className="progress-label">Delivered</div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TrackOrders;