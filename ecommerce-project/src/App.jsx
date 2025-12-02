import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from 'react-router'
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrdersPage from './pages/Orders/OrdersPage';
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
    </Routes>
    
  )
}

export default App
