import React from 'react'
import './CheckoutHeader.css';
import { Link } from 'react-router';

function CheckoutHeader({cart}) {
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/" aria-label="Home">
            <img className="logo" src="images/urbancart.png" alt="UrbanCart logo" />
            <img className="mobile-logo" src="images/urbancart.png" alt="UrbanCart logo" />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<a className="return-to-home-link"
            href="/"
            aria-label={`${cart.reduce((total, item) => total + item.quantity, 0)} items in cart, return to home`}>
            {cart.reduce((total, item) => total + item.quantity, 0)}</a>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" alt="Secure checkout" />
        </div>
      </div>
    </div>
  )
}

export default CheckoutHeader