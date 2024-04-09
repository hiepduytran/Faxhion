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
      <h1 className="order-list-title">Order List</h1>
      <ul className="order-list">
        {orders.map((order, index) => (
          <li key={index} className="order-item">
            <Link to={`/order_detail/${order._id}`} className="order-link">
              <div className="order-info">
                <h2>Order ID: {order._id}</h2>
                <p className="order-details">
                  <span>Total: {order.total},</span>
                  <span> status: {order.status}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
