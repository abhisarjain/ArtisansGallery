import React,{useState} from "react";
import backendUrl from "../../../config";
import {
  getToken,
  isLoggedIn,
} from "../../authentication/components/TokenHandler";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }) => {
    const [showAddedToCart, setShowAddedToCart] = useState(false);
    const [buttonWidth, setButtonWidth] = useState("");
  const navigate = useNavigate();
  const { id, product_image, name, price, stock, discounted_price } = product;
  const token = getToken();
  const handleAddToCart = async () => {
    if (isLoggedIn()) {
      try {
        const response = await axios.post(
          `${backendUrl}/addtocart/`,
          {
            product: id,
            quantity: 1,
            price: price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShowAddedToCart(true); 
        setButtonWidth("800px");
        setTimeout(() => {
          setShowAddedToCart(false);
          setButtonWidth(""); 
        }, 3000);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/authentication");
    }
  };

  const handleBuyNow = async () => {
    if (isLoggedIn()) {
      try {
        const response = await axios.post(
          `${backendUrl}/buynow/`,
          {
            product: id,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/authentication");
    }
  };
  const handleViewMore = () => {
    navigate(`/products/product?id=${id}`);
  };

  return (
    <div className="product-card">
      <div className="price-tag">
        <span className="price">
          {" "}
          <s>₹{price}</s> ₹{discounted_price}
        </span>
      </div>
      <img
        src={backendUrl + product_image}
        alt={name}
        className="product-image"
      />
      <h3 className="product-title">{name + stock}</h3>
      <button className="button button-buynow" onClick={handleViewMore}>
        VIEW MORE
      </button>
      <div className="product-buttons">
        <button className="button button-buynow" disabled={showAddedToCart} onClick={handleAddToCart} style={{ width: buttonWidth}}>
        {showAddedToCart ? <>  ADDED TO CART </> : "ADD TO CART"}
        </button>
        <button className="button button-buynow" onClick={handleBuyNow}>
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
