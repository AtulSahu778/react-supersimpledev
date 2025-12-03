import React from 'react'
import './HeaderCSS.css';
import { NavLink } from 'react-router';


function Header({cart = []}) {

  let totalCartQuantity = 0;

  cart.forEach(CartItem => {
    totalCartQuantity += CartItem.quantity;
  });



  return (
   <>
   <div className="header">
      <div className="left-section">
        <NavLink to ="/" className="header-link">
          <img className="logo"
            src="images/urbancart.png" />
          <img className="mobile-logo"
            src="images/mobile-logo.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalCartQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
   </>
  )
}

export default Header