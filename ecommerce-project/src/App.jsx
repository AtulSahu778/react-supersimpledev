import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from 'react-router'
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrdersPage from './pages/Orders/OrdersPage';
import TrackOrders from './pages/Tracking/TrackingPage';
import PageNotFound from './pages/404Error/PageNotFound';
import { useEffect,useState } from 'react';
import axios from 'axios';


function App() {
  const [cart, setCart] = useState([]);
  
  const loadCart = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    }

  useEffect(() => {
    loadCart();
  }, [])

  return (
    <Routes>
      <Route 
      index 
      element={<HomePage cart={cart} loadCart={loadCart} />} />
      
      <Route 
      path='/checkout' 
      element={<CheckoutPage cart={cart} loadCart={loadCart} />} />

      <Route 
      path='/orders' 
      element={<OrdersPage cart={cart} />} />

      <Route 
        path='/tracking/:orderId' 
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
