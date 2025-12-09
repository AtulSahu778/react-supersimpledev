import React, { useEffect, useState } from 'react'
import './HomePage.css';
import Header from '../../components/Header';
import axios from 'axios';
import ProductsGrid from './ProductsGrid';
import { useSearchParams } from 'react-router';

function HomePage({cart , loadCart}) {

  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');


  useEffect(() => {
    
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data);
    }
    getHomeData();
  }, [search]);

//   window.axios = axios;
//   const resetEverything = async () => {
//     const response = await axios.post('/api/reset');
//    
//   }
  
//  resetEverything(); This shows how to reset the backend to default values.

  return (
    <>
    <title>UrbanCart - Ecommerce App</title> 

    <Header cart={cart} isHomePage={true}/>

    <div className="home-page">
      <ProductsGrid products={products} loadCart={loadCart}/>
    </div>
    </>
  )
}

export default HomePage