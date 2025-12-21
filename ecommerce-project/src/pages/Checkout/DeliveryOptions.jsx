import React from 'react'
import { FormatMoney } from '../../utlis/FomatMoney';
import dayjs from 'dayjs';
import axios from 'axios';


function DeliveryOptions({ cartItem , deliveryOptions, loadCart}) {


  return (
             <div className="delivery-options" >
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOptions.map((deliveryOption) => {

                  let priceString = `FREE Shipping`;
                  
                  if(deliveryOption.priceCents > 0){
                    priceString = `${FormatMoney(deliveryOption.priceCents)} - Shipping`
                  }

                   const updateDeliveryOption = async () => {
                        await axios.put(`/api/cart-items/${cartItem.productId}` , {
                            deliveryOptionId: deliveryOption.id
                        });
                        loadCart();
                    }

                  const deliveryDate = dayjs().add(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D');
                  const optionLabel = `${deliveryDate} - ${priceString}`;
                  
                  return (
                    <div key={deliveryOption.id}  className="delivery-option" onClick={updateDeliveryOption}>
                  <input 
                    type="radio" 
                    checked={deliveryOption.id === cartItem.deliveryOptionId}
                    onChange={()=>{}}
                    className="-input"
                    id={`delivery-option-${cartItem.productId}-${deliveryOption.id}`}
                    name={`delivery-option-${cartItem.productId}`}
                    aria-label={optionLabel} />
                  <label 
                    htmlFor={`delivery-option-${cartItem.productId}-${deliveryOption.id}`}
                    style={{ cursor: 'pointer', flex: 1 }}>
                    <div className="delivery-option-date">
                    {deliveryDate}
                    </div>
                    <div className="delivery-option-price">
                    {priceString}
                    </div>
                  </label>
                </div>
                  );
                })}
              </div>
  )
}

export default DeliveryOptions