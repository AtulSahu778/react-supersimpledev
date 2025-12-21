import React from 'react'
import { FormatMoney } from '../../utlis/FomatMoney';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Product({ product, loadCart }) {

    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    
    const getWishlistFromStorage = () => {
      try {
        const wishlist = localStorage.getItem('wishlist');
        if (wishlist) {
          const wishlistArray = JSON.parse(wishlist);
          return wishlistArray.includes(product.id);
        }
      } catch (error) {
        console.error('Error reading wishlist from localStorage:', error);
      }
      return false;
    };
    
    const [isWishlisted, setIsWishlisted] = useState(getWishlistFromStorage);
    
    useEffect(() => {
      setIsWishlisted(getWishlistFromStorage());
    }, [product.id]);
    
    const toggleWishlist = () => {
      try {
        const wishlist = localStorage.getItem('wishlist');
        let wishlistArray = wishlist ? JSON.parse(wishlist) : [];
        
        if (isWishlisted) {
          wishlistArray = wishlistArray.filter(id => id !== product.id);
        } else {
          wishlistArray.push(product.id);
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlistArray));
        setIsWishlisted(!isWishlisted);
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    };
    
    const calculateOldPrice = (currentPrice) => {
      const discountPercent = 0.3 + Math.random() * 0.2;
      return Math.round(currentPrice / (1 - discountPercent));
    };
    
    const oldPriceCents = calculateOldPrice(product.priceCents);

  
    const addToCart = async () => {
        await axios.post('/api/cart-items' , {
        productId: product.id,
        quantity
        });
        setAdded(true);
        setTimeout(() => {
        setAdded(false)
      }, 2000);
        await loadCart();
    }

    const selectQuantity = (e) => {
        const quantitySelected = Number(e.target.value);
        setQuantity(quantitySelected);
    }

    return (
    <div className="product-container"
        data-testId='product-container'
    >
          <div className="product-image-container">
            <button 
              className="product-wishlist-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist();
              }}
              aria-label="Add to wishlist"
            >
              <svg 
                className={`wishlist-icon ${isWishlisted ? 'active' : ''}`}
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <img className="product-image"
              data-testId = "product-image"
              src={product.image} />
          </div>

          <div className="product-name limit-text-to-2-lines">
            {product.name}
          </div>

          <div className="product-rating-container">
            <img className="product-rating-stars"
              data-testId = "product-rating-stars-image"
              src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
            <div className="product-rating-count link-primary"
              
            >
              {product.rating.count}
            </div>
          </div>

          <div className="product-price-container">
            <span className="product-price-current">
              {FormatMoney(product.priceCents)}
            </span>
            <span className="product-price-old">
              {FormatMoney(oldPriceCents)}
            </span>
          </div>

          <div className="product-quantity-container">
            <select  
                value={quantity} 
                onChange={selectQuantity}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="product-spacer"></div>

          <div className="added-to-cart"
               style={{
                opacity: added ? 1 : 0
               }}
          >
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button className="add-to-cart-button button-primary"
            onClick={addToCart}
            data-testId="add-to-cart-button"
          >
            Add to Cart
          </button>
        </div>
  );
}

export default Product