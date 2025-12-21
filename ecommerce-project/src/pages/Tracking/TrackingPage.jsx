import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './TrackingPage.css'
import { Link } from 'react-router'
import axios from 'axios';
import { useParams } from 'react-router';
import dayjs from 'dayjs';

function TrackOrders({ cart }) {

  const { orderId } = useParams();
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setTrackingOrder(response.data);
      
    }
    
    getTrackingData();
  }, [orderId]);

  if(!trackingOrder){
    return null;
  }



  return (
    <>
    <Header isHomePage={true} isTrackingPage={true} cart={cart}/>

    <title>Tracking</title>

    <div className="tracking-page">
       {trackingOrder.products.map((orderProduct, index) => {

        const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - trackingOrder.orderTimeMs;

        const timePassedMs = dayjs().valueOf() - trackingOrder.orderTimeMs;

        let deliveryPercent = 0;

        if(totalDeliveryTimeMs > 0){
          deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
        }

        deliveryPercent = Math.max(0, Math.min(deliveryPercent, 100));

        const isPreparing = deliveryPercent < 33;
        const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
        const isDelivered = deliveryPercent === 100;

        const deliveryPrefix = deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on';

       return(
        <div
            key={orderProduct.id || `${trackingOrder.id}-product-${index}`}
            className="order-tracking"
          >
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>

            <div className="delivery-date">
              {deliveryPrefix} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
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
              alt={orderProduct.name}
            />

             <div className="progress-labels-container">
          <div
            className={`progress-label ${
              isPreparing ? 'current-status' : ''
            }`}
          >
            Preparing
          </div>
          <div
            className={`progress-label ${
              isShipped ? 'current-status' : ''
            }`}
          >
            Shipped
          </div>
          <div
            className={`progress-label ${
              isDelivered ? 'current-status' : ''
            }`}
          >
            Delivered
          </div>
              </div>


            <div className="progress-bar-container">
              <div 
              className="progress-bar"
              style={{
                  width: `${deliveryPercent}%`,
                  transition: "width 0.4s ease-in-out",
              }}
              ></div>
            </div>
          </div>
       );      
    })}
      </div>
    </>
  );
}

export default TrackOrders;