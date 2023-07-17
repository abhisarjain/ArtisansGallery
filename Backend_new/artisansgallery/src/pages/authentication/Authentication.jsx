import React,{useEffect, useState} from 'react'
import MainCardWrapperGrey from '../shared/MainCardWrapperGrey'
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { isLoggedIn,getToken } from './components/TokenHandler';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
const Authentication = () => {
    const navigate = useNavigate();

    const [signupActive,setSignupActive] = useState(true);
    const [loginActive,setLoginActive] = useState(false);
    const handleSignupActive = ()=>{
        setSignupActive(true);
        setLoginActive(false);
    }
    const handleLoginActive= ()=>{
        setSignupActive(false);
        setLoginActive(true);
    }

 
    useEffect(() => {
        
       
    
        if (isLoggedIn()) {
          navigate('/');
        }
      }, [navigate]);
  return (
    <>
      <MainCardWrapperGrey>
        <div className="authentication">
        <div className="loginorsignup">
            <div className="auth-choice">
                <div className={`choice-signup ${signupActive ? 'active' : ''} `} onClick={handleSignupActive} >
                    SIGNUP
                </div>
                <div className={`choice-login ${loginActive ? 'active' : ''} `} onClick={handleLoginActive}>
                    LOGIN
                </div>
            </div>
            <div className="get-auth-forms">
            {signupActive ? (<RegistrationForm/>) : (

            <LoginForm/>
           
            
            )}
        </div>
        </div>
        
        
        </div>
      </MainCardWrapperGrey>
    </>
  )
}

export default Authentication
