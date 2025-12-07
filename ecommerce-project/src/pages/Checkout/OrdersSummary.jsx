import React from 'react'
import { FormatMoney } from '../../utlis/FomatMoney';
import CartItems from './CartItems';
import DeliveryDate from './DeliveryDate';


function OrdersSummary({deliveryOptions , cart, loadCart={loadCart}}) {
  return (
    <div className="order-summary">
          {deliveryOptions.length > 0 && cart.map((cartItem) => {

            const selectedDeliveryOption = deliveryOptions
              .find((deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              }); 

            return (
              <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate selectedDeliveryOption={selectedDeliveryOption}/>

            <CartItems deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart}/>
          </div>
            );
          })}
        </div>
  );
}

export default OrdersSummary