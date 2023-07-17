import React from 'react';
import backendUrl from '../../../config';
import { BsCartPlusFill } from "react-icons/bs";
import { getToken } from '../../authentication/components/TokenHandler';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
  const { id, product_image, name, price,stock } = product;
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };
  const handleAddToCart = async () => {
    // Handle add to cart functionality
    try{
        const response = await axios.post(`${backendUrl}/addtocart/`, {
            product: id ,
             quantity: 1,
             price: price
          },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
    }
    catch(error){
        console.log(error);
    }

    
  };

  const handleBuyNow = async () => {
    try{
        const response = await axios.post(`${backendUrl}/buynow/`, {
            product: id ,
             quantity: 1,
             
          },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
    }
    catch(error){
        console.log(error);
    }
  };
  const handleViewMore = () => {
    // Redirect to the product page
    navigate(`/products/product?id=${id}`);
  };

  return (
    <div className="product-card">
      <div className="price-tag"><span className="price">₹{price}</span></div>
      <img src={ backendUrl + product_image} alt={name} className="product-image" />
      <h3 className="product-title">{name  + stock}</h3>
      <button className='button button-buynow' onClick={handleViewMore} >VIEW MORE</button>
      <div className="product-buttons" >
        
        <button className='button button-buynow' onClick={handleAddToCart}>ADD TO CART</button>
        <button className='button button-buynow' onClick={handleBuyNow}>BUY NOW</button>
      </div>
     
    </div>
  );
};

export default ProductCard;
