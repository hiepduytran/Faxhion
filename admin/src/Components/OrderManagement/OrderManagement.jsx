import React, { useEffect, useState } from "react";
import "./OrderManagement.css";
import cross_icon from "../../assets/cross_icon.png";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});
  const [edit, setEdit] = useState(null);

  const fetchAllOrders = async () => {
    await fetch("http://localhost:4000/get_orders_admin")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      });
  };

  const updateOrderStatus = async (orderId, status) => {
    await fetch("http://localhost:4000/update_order_status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        status: status,
      }),
    });
    await fetchAllOrders();
    alert("Status updated successfully");
    setEdit(null);
  };

  const removeOrder = async (orderId) => {
    await fetch("http://localhost:4000/delete_order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
    });
    setOrders(
      orders.filter((order) => {
        return order._id !== orderId;
      })
    );
    await fetchAllOrders();
    alert("Order removed successfully");
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const onStatusChange = (value, orderId) => {
    setUpdatedStatus({ orderId, status: value });
  };

  const handleUpdateStatus = async () => {
    if (updatedStatus.orderId && updatedStatus.status) {
      await updateOrderStatus(updatedStatus.orderId, updatedStatus.status);
      setUpdatedStatus({});
    }
  };
  const handleEdit = (orderId) => {
    setEdit(orderId);
  };
  return (
    <div className="order-management">
      <h1>Order Management</h1>
      <div className="ordermanagement-format-main">
        <p>ID</p>
        <p>Username</p>
        <p>Product</p>
        <p>Total Price</p>
        <p>Address</p>
        <p>Phone Number</p>
        <p>Status</p>
        <p>Remove</p>
      </div>
      <div className="ordermanagement-allproducts">
        <hr />
        {[...orders].reverse().map((order, index) => {
          return (
            <div key={index}>
              <div className="ordermanagement-format-main ordermanagement-format">
                <p>{order._id}</p>
                <p>{order.user.username}</p>
                <ul>
                  {order.products.map((product, index) => {
                    return <li key={index}>{product.name}</li>;
                  })}
                </ul>
                <p>{order.total}</p>
                <p>{order.address}</p>
                <p>{order.phoneNumber}</p>
                <p>
                  <select
                    name="status"
                    id="status"
                    onChange={(e) => onStatusChange(e.target.value, order._id)}
                    disabled={edit !== order._id}
                  >
                    <option
                      value="pending"
                      selected={order.status === "pending"}
                    >
                      Pending
                    </option>
                    <option
                      value="processing"
                      selected={order.status === "processing"}
                    >
                      Processing
                    </option>
                    <option
                      value="completed"
                      selected={order.status === "completed"}
                    >
                      Completed
                    </option>
                  </select>
                  <button onClick={() => handleEdit(order._id)}>Edit</button>
                  <button onClick={handleUpdateStatus}>Update</button>
                </p>
                <img
                  className="ordermanagement-remove-icon"
                  src={cross_icon}
                  onClick={() => removeOrder(order._id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderManagement;
