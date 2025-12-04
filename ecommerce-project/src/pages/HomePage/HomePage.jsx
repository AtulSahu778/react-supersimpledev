import React, { useEffect, useState } from 'react'
import './HomePage.css';
import Header from '../../components/Header';
import axios from 'axios/unsafe/axios.js';
import { FormatMoney } from '../../utlis/FomatMoney';
import ProductsGrid from './ProductsGrid';


function HomePage({cart}) {

  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    axios.get("/api/products")
      .then((response) => {
        setProducts(response.data);
    });
  }, [])

  return (
    <>
    <title>UrbanCart - Ecommerce App</title> 

    <Header cart={cart}/>

    <div className="home-page">
      <ProductsGrid products={products}/>
    </div>
    </>
  )
}

export default HomePage