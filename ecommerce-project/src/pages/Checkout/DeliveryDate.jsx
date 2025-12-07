import React from 'react'
import dayjs from 'dayjs'

function DeliveryDate({selectedDeliveryOption}) {
  return (
    <div className="delivery-date">
        Delivery date: {dayjs().add(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}      
     </div>
  )
}

export default DeliveryDate