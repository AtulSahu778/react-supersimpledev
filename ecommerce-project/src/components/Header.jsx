import React, { useState } from 'react'
import './HeaderCSS.css';
import { NavLink } from 'react-router';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router';


function Header({cart = [], isHomePage = false, isTrackingPage = false}) {

  let totalCartQuantity = 0;

  cart.forEach(CartItem => {
    totalCartQuantity += CartItem.quantity;
  });

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const navigate = useNavigate();

  const [search, setSearch] = useState(searchText || '');
 
  const searchBar = () => {
    if (search.trim()) {
      navigate(`/?search=${search}`);
    } else {
      navigate('/');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchBar();
    }
  }



  return (
   <>
   <div className={`header ${isHomePage ? 'header-homepage' : ''} ${isTrackingPage ? 'header-tracking' : ''}`}>
      <div className="left-section">
        <NavLink to ="/" className="header-link">
          <img className="logo"
            src="images/urbancart.png" />
          <img className="mobile-logo"
            src="images/mobile-logo.png" />
        </NavLink>
      </div>

      {!isTrackingPage && (
        <div className="middle-section">
          <input 
            className="search-bar" 
            type="text" 
            placeholder="Search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="search-button" onClick={searchBar}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>
      )}

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        {!isTrackingPage && (
          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalCartQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        )}
      </div>
    </div>
   </>
  )
}

export default Header