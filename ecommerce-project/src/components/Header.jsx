import React, { useState, useEffect } from 'react'
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
 
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        navigate(`/?search=${search}`);
      } else if (searchText) {
        navigate('/');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

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
        <NavLink to ="/" className="header-link" aria-label="Home">
          <img className="logo"
            src="images/urbancart.png" 
            alt="UrbanCart logo" />
          <img className="mobile-logo"
            src="images/urbancart.png" 
            alt="UrbanCart logo" />
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

          <button className="search-button" onClick={searchBar} aria-label="Search">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      )}

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <img className="orders-icon" src="images/icons/orders.png" alt="Orders" />
          <span className="orders-text">Orders</span>
        </NavLink>

        {!isTrackingPage && (
          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart" />
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