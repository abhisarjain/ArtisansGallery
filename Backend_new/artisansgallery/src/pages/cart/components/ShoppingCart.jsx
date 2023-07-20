import React, { useState, useEffect } from "react";
import axios from "axios";
import backendUrl from "../../../config";
import { getToken } from "../../authentication/components/TokenHandler";
import ShoppingCartItems from "./ShoppingCartItems";
import CartSummary from "./CartSummary";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total_price,settotal_price] = useState(0);
  const [items_count,setitems_count] = useState(0);
  const token = getToken();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${backendUrl}/mycart/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.mycart.myproducts);
        settotal_price(response.data.mycart.total_price);
        setitems_count(response.data.mycart.item_count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartItems();
  }, []);

 
  return (
    <>
      <div className="shopping-cart">
        <div className="shopping-cart-lists">
            <h2>SHOPPING CART</h2>
          {cartItems.map((item) => (
            <ShoppingCartItems key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-summary">
        <h2>SUMMARY</h2>
        <CartSummary items_count={items_count} total_price={total_price} />
        </div>
        
      </div>
    </>
  );
};

export default ShoppingCart ;
