import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Order List</h1>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <Link
              to={`/order_detail/${order._id}`}
              style={{ textDecoration: "none" }}
            >
              <p>Order ID: {order._id}</p>
              <p>Total: {order.total}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
