# React E-Commerce Application

A full-stack e-commerce application built with React and Express.js, featuring a complete shopping experience with product catalog, shopping cart, checkout, order management, and order tracking capabilities.

## Author

Atul Sahu

## Project Overview

This repository contains a comprehensive e-commerce solution consisting of multiple interconnected projects:

* **E-Commerce Frontend**: React-based single-page application with modern UI and routing
* **E-Commerce Backend**: RESTful API server built with Express.js and Sequelize ORM
* **Chatbot Project**: Interactive chatbot application built with React
* **React Basics**: Learning exercises and examples for React fundamentals

## Technology Stack

### Frontend
* React 19.1.0
* React Router 7.9.6
* Vite 6.3.5
* Axios 1.13.2
* Day.js 1.11.19
* Vitest 4.0.15 (Testing)

### Backend
* Node.js
* Express.js 4.21.2
* Sequelize ORM 6.6.5
* SQLite (via sql.js)
* CORS 2.8.5

## Features

### E-Commerce Application

**Product Management**
* Browse product catalog with grid layout
* View detailed product information
* Product search and filtering capabilities
* Responsive product display

**Shopping Cart**
* Add products to cart
* Update cart quantities
* Remove items from cart
* Real-time cart synchronization

**Checkout Process**
* Delivery options selection
* Delivery date calculation
* Payment summary with tax calculations
* Order placement

**Order Management**
* View order history
* Track order status
* Order details and summaries
* Order tracking with unique order IDs

**User Interface**
* Modern and responsive design
* 404 error page handling
* Header navigation component
* Mobile-friendly layout

### Backend API

**RESTful Endpoints**
* Product management (`/api/products`)
* Cart operations (`/api/cart-items`)
* Delivery options (`/api/delivery-options`)
* Order processing (`/api/orders`)
* Payment calculations (`/api/payment-summary`)
* Database reset (`/api/reset`)

**Database Features**
* SQLite database with Sequelize ORM
* Automatic schema synchronization
* Default data seeding
* Support for multiple database backends (MySQL, PostgreSQL)

## Project Structure

```
React-SuperSimpleDev/
├── ecommerce-project/          # Frontend React application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage/        # Product catalog
│   │   │   ├── Checkout/        # Checkout flow
│   │   │   ├── Orders/          # Order history
│   │   │   ├── Tracking/        # Order tracking
│   │   │   └── 404Error/        # Error page
│   │   └── utlis/               # Utility functions
│   └── public/                  # Static assets
│
├── ecommerce-backend/           # Backend API server
│   ├── models/                  # Sequelize models
│   ├── routes/                  # API route handlers
│   ├── defaultData/             # Seed data
│   └── server.js                # Express server
│
├── chatbot-project/             # Chatbot application
│   └── src/
│       └── components/          # Chat components
│
└── Basics-Exercise/             # React learning exercises
```

## Getting Started

### Prerequisites

* Node.js version 22 or higher
* npm or yarn package manager
* Git (for cloning the repository)

### Installation

1. Clone the repository or extract the project files to your local machine

2. Navigate to the backend directory:
   ```bash
   cd ecommerce-backend
   ```

3. Install backend dependencies:
   ```bash
   npm install
   ```

4. Navigate to the frontend directory:
   ```bash
   cd ../ecommerce-project
   ```

5. Install frontend dependencies:
   ```bash
   npm install
   ```

### Running the Application

**Start the Backend Server**

From the `ecommerce-backend` directory:
```bash
npm run dev
```

The backend server will start on port 3000 (or the port specified in the PORT environment variable).

**Start the Frontend Development Server**

From the `ecommerce-project` directory:
```bash
npm run dev
```

The frontend application will be available at the URL provided by Vite (typically `http://localhost:5173`).

**Production Build**

To build the frontend for production:
```bash
npm run build
```

The production build will be generated in the `dist` directory.

## API Documentation

### Products

* `GET /api/products` - Retrieve all products
* `GET /api/products/:id` - Get product by ID
* `GET /api/products?expand=...` - Get products with expanded relations

### Cart Items

* `GET /api/cart-items` - Get all cart items
* `GET /api/cart-items?expand=product` - Get cart items with product details
* `POST /api/cart-items` - Add item to cart
* `PUT /api/cart-items/:id` - Update cart item
* `DELETE /api/cart-items/:id` - Remove cart item

### Orders

* `GET /api/orders` - Get all orders
* `GET /api/orders/:id` - Get order by ID
* `POST /api/orders` - Create new order

### Delivery Options

* `GET /api/delivery-options` - Get available delivery options

### Payment Summary

* `GET /api/payment-summary` - Calculate payment summary with taxes

## Development

### Code Quality

The project uses ESLint for code quality and consistency. Run the linter with:
```bash
npm run lint
```

### Testing

The frontend includes Vitest for unit testing. Run tests with:
```bash
npm test
```

### Database

The backend uses SQLite by default, with support for MySQL and PostgreSQL through Sequelize. The database schema is automatically synchronized on server startup, and default data is seeded if the database is empty.

## Configuration

### Environment Variables

The backend server can be configured using environment variables:

* `PORT` - Server port (default: 3000)

### Database Configuration

Database configuration can be modified in the Sequelize model files located in `ecommerce-backend/models/`.

## Troubleshooting

If you encounter issues:

1. Ensure Node.js version 22 or higher is installed
2. Delete `node_modules` and reinstall dependencies
3. Check that the backend server is running before starting the frontend
4. Verify database file permissions (for SQLite)
5. Review server console logs for error messages

For additional troubleshooting steps, refer to `ecommerce-backend/troubleshooting.md`.

## License

This project is provided for educational and development purposes.

## Acknowledgments

Built as part of the React learning journey with SuperSimpleDev tutorials.

