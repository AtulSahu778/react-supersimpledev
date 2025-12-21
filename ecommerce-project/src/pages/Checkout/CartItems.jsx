import React, { useState } from 'react'
import { FormatMoney } from '../../utlis/FomatMoney';
import DeliveryOptions from './DeliveryOptions';
import axios from 'axios';

function CartItems({deliveryOptions, cartItem, loadCart}) {

  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [updateQuantity, setUpdateQuantity] = useState(false);

  const updateStatus = async () => {
    if(updateQuantity){
      if(!quantity || Number(quantity) < 0) return;
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity)
    });
    loadCart();
    setUpdateQuantity(false);
    }
    else{
      setUpdateQuantity(true);
    }
  };

  const updateTheQuantity = (e) => {
    setQuantity(e.target.value);

  };


  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  
  const keyInputEvent = (e) => {
    const key = e.key;
    if(key === 'Enter'){
      updateStatus();
    }
    else if(key === 'Escape'){
      setQuantity(cartItem.quantity);
      setUpdateQuantity(false);
    }
  }

  return (
    <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image}
                alt={cartItem.product.name} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {FormatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: {updateQuantity
                  ? <input type="text" value={quantity} className="quantity-label-input" onKeyDown={keyInputEvent} onChange={updateTheQuantity}/>
                  : <span className="quantity-label">{cartItem.quantity}
                  </span>
                  }
                  </span>
                  <span className="update-quantity-link link-primary"
                        onClick={updateStatus}  
                  >
                    {updateQuantity ? "Save" : "Update"}
                  </span>
                  <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}
                  >
                    Delete
                  </span>
                </div>
              </div>

              <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
            </div>
  )
}

export default CartItems