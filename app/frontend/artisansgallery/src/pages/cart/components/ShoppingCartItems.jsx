import React from 'react'
import backendUrl from "../../../config";
import { RxCross2 } from "react-icons/rx";
const ShoppingCartItems = ({item}) => {
  return (
    <>
        <div className='cart-item'>
            <div style={{display:'flex',gap:'20px'}}>
                <div>
        <img src={ backendUrl + item.product_image} alt="nothing" /></div>
        <div style={{width:'120px'}}>
              <p> <b> {item.product_name}</b></p></div></div>
              <div style={{width:'120px'}}>
              <p>Quantity: {item.quantity}</p></div>
             
              <div style={{width:'160px'}}>
        <p>Price: <del>{item.product_price}</del> {item.product_discounted_price}</p></div>
        <div style={{cursor:'pointer'}} > <RxCross2  /></div>
       
            </div>
    </>
  )
}

export default ShoppingCartItems
