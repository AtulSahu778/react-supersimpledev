import React from 'react'
import { FormatMoney } from '../../utlis/FomatMoney';
import dayjs from 'dayjs';

function CartItems({deliveryOptions, cartItem}) {
  return (
    <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {FormatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOptions.map((deliveryOption) => {

                  let priceString = `FREE Shipping`;
                  
                  if(deliveryOption.priceCents > 0){
                    priceString = `${FormatMoney(deliveryOption.priceCents)} - Shipping`
                  }

                  return (
                    <div key={deliveryOption.id}  className="delivery-option">
                  <input type="radio" 
                  checked={deliveryOption.id === cartItem.deliveryOptionId}
                    className="delivery-option-input"
                    name={`delivery-option-${cartItem.productId}`} />
                  <div>
                    <div className="delivery-option-date">
                    {dayjs().add(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>
                    <div className="delivery-option-price">
                    {priceString}
                    </div>
                  </div>
                </div>
                  );
                })}
              </div>
            </div>
  )
}

export default CartItems