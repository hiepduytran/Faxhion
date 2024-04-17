import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import addProductIcon from "../../assets/Product_Cart.svg";
import listProductIcon from "../../assets/Product_list_icon.svg";
import orderManagementIcon from "../../assets/order_management_icon.png";
import reviewManagementIcon from "../../assets/review_management_icon.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/add_product"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={addProductIcon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/list_product"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={listProductIcon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to={"/order_management"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={orderManagementIcon} alt="" width="35px" />
          <p>Order Management</p>
        </div>
      </Link>
      <Link to={"/review_management"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={reviewManagementIcon} alt="" width="35px" />
          <p>Review Management</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
