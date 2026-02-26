import React from 'react'

const ErrorMessage = ({message,correct,color}) => {
  return (
    <>
      <div className="error-message" style={{display:'flex',fontSize:'12px'}}>
        {correct ? (<p style={{color:'green'}}>{message}</p>) : (<p style={{color:'red'}}>{message}</p>)}
        
      </div>
    </>
  )
}

export default ErrorMessage
