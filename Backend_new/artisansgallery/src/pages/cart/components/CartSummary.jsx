import React from 'react'

const CartSummary = ({items_count,total_price}) => {
  return (
    <>
      <div className="summary">
        <div className="items-summary" style={{display:'flex'}}>
        <h4>ITEMS: {items_count}</h4>
<h4>₹{total_price}</h4>
        </div>

<button className='button'>CHECKOUT</button>
      </div>
    </>
  )
}

export default CartSummary
