import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from 'react-router'
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrdersPage from './pages/Orders/OrdersPage';
import TrackOrders from './pages/Tracking/TrackingPage';
import PageNotFound from './pages/404Error/PageNotFound';

function App() {
  

  return (
    <Routes>
      <Route 
      index 
      element={<HomePage />} />
      
      <Route 
      path='/checkout' 
      element={<CheckoutPage />} />

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
