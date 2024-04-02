import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/OrderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/get_orders", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data.orders);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, []);

  return (
    <div className="order-list-container">
      {" "}
      {/* Thêm class cho container */}
      <h1 className="order-list-title">Order List</h1>{" "}
      {/* Thêm class cho tiêu đề */}
      <ul className="order-list">
        {orders.map((order, index) => (
          <li key={index} className="order-item">
            {" "}
            {/* Thêm class cho mỗi mục */}
            <Link
              to={`/order_detail/${order._id}`}
              className="order-link" // Thêm class cho link
            >
              <div className="order-info">
                {" "}
                {/* Thêm class cho thông tin đơn hàng */}
                <h2>Order ID: {order._id}</h2>{" "}
                {/* Thêm class cho tiêu đề đơn hàng */}
                <p className="order-details">Total: {order.total}</p>{" "}
                {/* Thêm class cho thông tin chi tiết đơn hàng */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
