import { useEffect } from "react";
import "./App.css";
import Authentication from "./pages/authentication/Authentication";

import HomePage from "./pages/homepage/HomePage";
import Navbar from "./pages/navbar/Navbar";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import {
  isLoggedIn,
  isTokenExpired,
  removeToken,
} from "./pages/authentication/components/TokenHandler";
import Products from "./pages/products/Products";
import ProductPage from "./pages/products/components/ProductPage";
import DarkModeToggle from "./pages/shared/DarkModeToggle";
import Cart from "./pages/cart/Cart";

function App() {
  useEffect(() => {
    // Get the expiration time from the JWT token in local storage

    const token = localStorage.getItem("token");
    if (token == null) {
      return;
    }
    const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode the token
    const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds

    const currentTime = new Date().getTime(); // Get the current time in milliseconds

    // Calculate the time difference between expiration time and current time
    const timeDifference = expirationTime - currentTime;

    // Set a timeout to delete the token when it expires
    const timeoutId = setTimeout(() => {
      // Remove the token from local storage
      localStorage.removeItem("token");
      window.location.href = '/';
    }, timeDifference);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <>
      <Navbar />
      {/* <DarkModeToggle/> */}
      <Routes>
       
       
        <Route element={<HomePage />} path="/" />
        <Route element={<Authentication />} path="/authentication" />
        <Route element={<Products/>} path="/products" />
        <Route element = {<ProductPage/>} path="/products/product"  />
        <Route element = {<Cart/>} path="/cart" /> 
        
      </Routes>
    </>
  );
}

export default App;
