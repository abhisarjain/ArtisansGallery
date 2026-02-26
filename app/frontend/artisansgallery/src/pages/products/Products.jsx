
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from "./components/ProductCard";
import backendUrl from '../../config';
import MainCardWrapperGrey from '../shared/MainCardWrapperGrey';
import { is_artisan } from '../authentication/components/TokenHandler';
import { useNavigate } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([]);
const navigate = useNavigate();
    useEffect(() => {
      axios.get(`${backendUrl}/allproducts/`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }, []);
useEffect(()=>{
    if(is_artisan())
    {
        navigate('/');
    }
})
  return (
    <MainCardWrapperGrey>
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
       
      ))}
    </div></MainCardWrapperGrey>
  );
};

export default Products;
