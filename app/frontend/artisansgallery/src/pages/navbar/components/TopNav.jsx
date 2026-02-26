import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

import {
  isArtisan,
  isLoggedIn,
  is_artisan,
  removeToken,
} from "../../authentication/components/TokenHandler";

const TopNav = () => {
  const navigate = useNavigate();

  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [userdropdownVisible, setuserdropdownVisible] = useState(false);
  const [menuVisible, setmenuVisible] = useState(true);
  const handleDropdown = () => {
    setdropdownVisible(!dropdownVisible);
  };
  const handleUserDropdown = () => {
    setuserdropdownVisible(!userdropdownVisible);
  };
  const handleMenu = () => {
    setmenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    removeToken();
    // navigate("/authentication");
    window.location.href = "/authentication";
  };
  return (
    <>
      <nav className="navbar">
        <div className="left-navbar">
          <div className="menu-icon" onClick={handleMenu}>
            <HiMenu />
          </div>
        {isLoggedIn() ? (
      <>   {is_artisan() && (<div className="navbar-logo">ARTISANS GALLERY <sup>SELLER</sup></div>)}
          {!is_artisan() && (<div className="navbar-logo">ARTISANS GALLERY <sup>BUYER</sup></div>)}
      </> 

        ) : (<div className="navbar-logo">ARTISANS GALLERY</div>)}
          
        </div>
        <div className={`middle-navbar  ${menuVisible ? "condition" : ""} `}>
          <ul className="navbar-items">
            <a className="navbar-item" onClick={() => navigate("/")}>
              HOME
            </a>
            <li className="navbar-item">ABOUT</li>
            {is_artisan() ? (
              <></>
            ) : (<>
              <li className="navbar-item" onClick={() => navigate("/products")}>
                PRODUCTS
              </li>
               <li className="navbar-item" onClick={handleDropdown}>
               CATEGORIES <RiArrowDownSLine />{" "}
             </li></>
            )}

           
            {dropdownVisible && (
              <ul>
                <li>C1</li>
                <li>C2</li>
                <li>C2</li>
                <li>C4</li>
              </ul>
            )}
            <li className="navbar-item">BLOG</li>
            <li className="navbar-item">CONTACT</li>
          </ul>
        </div>
        <div className="right-navbar">
          {isLoggedIn() ? (
            <>
              <div className="logout-button"></div>
              <div className="profile-icon" onClick={handleUserDropdown}>
                <img
                  src="http://192.168.0.209:8000/media/artisans/images/products/4.jpeg"
                  alt=""
                  className="dp"
                />
                <div className="arrow-icon">
                  <IoMdArrowDropdown size={20} />
                  {userdropdownVisible && (
                    <div className="profile-icon-dropdown">
                      <ul style={{ listStyle: "none" }}>
                        <li>MY PROFILE</li>
                        <li>MY PRODUCTS</li>
                        <li onClick={handleLogout}>LOGOUT</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {!is_artisan() && (
                <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="cart-icon">
                  <MdShoppingCart size={30} />  <span className="cart-item-count">10+</span>
                </div></Link>
              )}
            </>
          ) : (
            <button
              className="button"
              onClick={() => navigate("/authentication")}
            >
              LOGIN/SIGNUP
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default TopNav;
