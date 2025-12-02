import React from 'react'
import './PageNotFound.css';
import { Link } from 'react-router';

function PageNotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-heading">Page Not Found</h2>
        <p className="error-text">
          Oops! It looks like the product or page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <button className="home-button">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound