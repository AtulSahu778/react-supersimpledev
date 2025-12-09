import  {React,  Fragment } from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router';
import OrdersHeader from './OrdersHeader';
import axios from 'axios';

function OrdersGrid({orders ,loadCart}) {



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
              <img src={orderProduct.product.image} />
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
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message"
                      onClick={addToCart}
                >Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
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