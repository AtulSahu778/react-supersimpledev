import React from 'react'
import './PageNotFound.css';
import { useNavigate } from 'react-router';

function PageNotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-heading">Page Not Found</h2>
        <p className="error-text">
          Oops! It looks like the product or page you are looking for doesn't exist or has been moved.
        </p>
        
        <button 
          className="home-button"
          onClick={() => navigate('/')}
          aria-label="Go back to home page">
          Go Back Home
        </button>
      </div>
    </div>
  )
}

export default PageNotFound