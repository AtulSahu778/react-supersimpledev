import React, { useEffect, useState } from 'react'
import './HomePage.css';
import Header from '../../components/Header';
import axios from 'axios';
import { FormatMoney } from '../../utlis/FomatMoney';
import ProductsGrid from './ProductsGrid';


function HomePage({cart , loadCart}) {

  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
       setProducts(response.data);
    }
    getHomeData();
  }, []);

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