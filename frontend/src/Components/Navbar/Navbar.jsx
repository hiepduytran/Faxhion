import React from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { useForm } from "react-hook-form";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { user, getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();
  const menuRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [searchKeyWord, setSearchKeyWord] = useState("");
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
  const onSubmit = async (data) => {
    const newSearchKeyWord = data.search;
    setSearchKeyWord(newSearchKeyWord);
    await fetch("http://localhost:4000/search_products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: newSearchKeyWord,
      }),
    }).then((res) =>
      res.json().then((data) => {
        navigate("/search_results", {
          state: { products: data, searchKeyWord: newSearchKeyWord },
        });
      })
    );
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
        <li className="search-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("search", { required: true })}
              placeholder="Search product..."
            />
            <button type="submit">Search</button>
          </form>
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          ""
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
          {localStorage.getItem("auth-token") && (
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
                  <div
                    onClick={() => {
                      localStorage.removeItem("auth-token");
                      window.location.replace("/");
                    }}
                  >
                    <li>Logout</li>
                  </div>
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
