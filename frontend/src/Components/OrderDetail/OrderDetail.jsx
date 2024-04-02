import React from "react";
import "./OrderDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
const OrderDetail = () => {
  const { orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="orderdetail">
      <div className="orderdetail-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
      <hr />
      {orders.map((order) => {
        if (order._id === orderId) {
          return (
            <div>
              {order.products.map((item) => {
                return (
                  <div key={item._id}>
                    <div className="orderdetail-format orderdetail-format-main">
                      <img
                        className="orderdetail-product-icon"
                        src={item.image}
                        alt=""
                      />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <button className="orderdetail-quantity">
                        {item.quantity}
                      </button>
                      <p>{item.price * item.quantity}</p>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <div className="orderdetail-down">
                <div className="orderdetail-total">
                  <h1>Cart Total</h1>
                  <div>
                    <div className="orderdetail-total-item">
                      <p>Subtotal</p>
                      <p>${order.total}</p>
                    </div>
                    <hr />
                    <div className="orderdetail-total-item">
                      <p>Shipping Free</p>
                      <p>Free</p>
                    </div>
                    <hr />
                    <div className="orderdetail-total-item">
                      <p>Total</p>
                      <p>${order.total}</p>
                    </div>
                  </div>
                </div>
                <div className="orderdetail-promocode">
                  <p>If you have promo code, Enter it here</p>
                  <div className="orderdetail-promobox">
                    <input type="text" placeholder="Promo Code" />
                    <button>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default OrderDetail;
