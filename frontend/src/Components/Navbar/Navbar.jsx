import React from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { user, getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();
  const menuRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setMenu("shop");
    } else if (path === "/men") {
      setMenu("men");
    } else if (path === "/women") {
      setMenu("women");
    } else if (path === "/kids") {
      setMenu("kids");
    }
  }, [location.pathname]);
  const dropdownToggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  return (
    <div className="navbar">
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>Faxhion</p>
        </div>
      </Link>
      <img
        className="nav-dropdown"
        onClick={dropdownToggle}
        src={nav_dropdown}
        alt=""
      />
      <ul className="nav-menu" ref={menuRef}>
        <li>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : ""}
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/men">
            Men
          </Link>{" "}
          {menu === "men" ? <hr /> : ""}
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/women">
            Women
          </Link>{" "}
          {menu === "women" ? <hr /> : ""}
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>{" "}
          {menu === "kids" ? <hr /> : ""}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
        <div
          className="user-infor"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          {Object.keys(user).length !== 0 && (
            <img src={user.avatar_url} alt="" />
          )}
          {isDropdownOpen && (
            <div className="dropdown-modal">
              <div className="modal-content">
                <ul>
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/update_information"
                  >
                    <li>Update Information</li>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/order_detail">
                    <li>Order List</li>
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
