import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from 'react-router'
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrdersPage from './pages/Orders/OrdersPage';
import TrackOrders from './pages/Tracking/TrackingPage';
import PageNotFound from './pages/404Error/PageNotFound';
import { useEffect,useState } from 'react';
import axios from 'axios/unsafe/axios.js';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product")
    .then((response) => {
      setCart(response.data);
    });
  })

  return (
    <Routes>
      <Route 
      index 
      element={<HomePage cart={cart}/>} />
      
      <Route 
      path='/checkout' 
      element={<CheckoutPage cart={cart}/>} />

      <Route 
      path='/orders' 
      element={<OrdersPage />} />

      <Route 
        path='/tracking' 
        element={<TrackOrders />} 
      />
    
      <Route 
        path='*' 
        element={<PageNotFound />} 
      />
    </Routes>
    
  )
}

export default App
