import  {React,  Fragment } from 'react'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import OrdersHeader from './OrdersHeader';
import axios from 'axios';

function OrdersGrid({orders ,loadCart}) {

  const navigate = useNavigate();

  return (
    <div className="orders-grid">
        {orders.map((order , orderIndex) => {
          return (
            <div key={`${order.id}-${orderIndex}`} className="order-container">

          <OrdersHeader order={order}/>

          <div className="order-details-grid">
            {order.products.map((orderProduct) => {

               const addToCart = async () => {
                await axios.post('/api/cart-items' , {
                  productId: orderProduct.product.id,
                  quantity: 1
                })
                loadCart();
                
          }

              return (
                <Fragment key={orderProduct.product.id}>
                  <div className="product-image-container">
              <img src={orderProduct.product.image} alt={orderProduct.product.name} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary" onClick={addToCart} aria-label={`Add ${orderProduct.product.name} to cart`}>
                <img className="buy-again-icon" src="images/icons/buy-again.png" alt="" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <button 
                className="track-package-button button-secondary"
                onClick={() => navigate(`/tracking/${order.id}`)}
                aria-label="Track package">
                Track package
              </button>
            </div>
                   
                </Fragment>
              ) 
            })}
          </div>
        </div>
          ); 
        })}
      </div>
  )
}

export default OrdersGrid