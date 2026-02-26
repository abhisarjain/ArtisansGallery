import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import backendUrl from '../../../config';
import MainCardWrapperGrey from '../../shared/MainCardWrapperGrey';

const ProductPage = () => {
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get('id');
  const [product, setProduct] = useState(null);
  // Use the productId to fetch and display the product details
  
  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/product/${productId}/`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <MainCardWrapperGrey>
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {productId}</p>
      {product.name}
      {/* Render the product details */}
    </div></MainCardWrapperGrey>
  );
};

export default ProductPage;
