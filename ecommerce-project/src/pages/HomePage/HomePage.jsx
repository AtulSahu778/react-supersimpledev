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

  return (
    <>
    <title>UrbanCart - Ecommerce App</title> 

    <Header cart={cart} isHomePage={true}/>

    <div className="home-page">
      <section className="products-section">
        <ProductsGrid products={products} loadCart={loadCart}/>
      </section>
    </div>
    </>
  )
}

export default HomePage