import React from 'react'
import MainCardWrapperGrey from '../shared/MainCardWrapperGrey'
import ShoppingCart from './components/ShoppingCart'

const Cart = () => {
  return (
    <>
      <MainCardWrapperGrey>
        <div className="cart">
       <ShoppingCart/>
       </div>
      </MainCardWrapperGrey>
    </>
  )
}

export default Cart
