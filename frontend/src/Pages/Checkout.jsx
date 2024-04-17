import React, { useState } from "react";
import "./CSS/Checkout.css";
import Paypal from "../Components/Paypal/Paypal";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const { user, all_product, cartItems, getTotalCartAmount } =
    useContext(ShopContext);
  const amount = getTotalCartAmount();

  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [address, setAddress] = useState(user.address);
  const [showPaypal, setShowPaypal] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePaymentSuccess = () => {
    // Gọi API đặt hàng khi thanh toán thành công
    toast.success("Order placed successfully!");
    const products = [];
    Object.keys(cartItems).forEach((productId) => {
      if (cartItems[productId] > 0) {
        const product = all_product.find(
          (item) => item.id === parseInt(productId)
        );
        if (product) {
          products.push({
            productId: product.id,
            name: product.name,
            image: product.image,
            quantity: cartItems[productId],
            price: product.new_price,
          });
        }
      }
    });
    const dataOrder = {
      products: products,
      total: amount,
      address: address,
      phoneNumber: Number(phoneNumber),
    };
    const dataUser = {};

    fetch("http://localhost:4000/place_order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });

    fetch("http://localhost:4000/update_user_data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error updating database:", error);
      });
  };

  const handleShowPaypal = () => {
    setShowPaypal(true);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            value={address}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div>
          <label htmlFor="totalAmount">Total Amount:</label>
          <input type="number" id="totalAmount" value={amount} readOnly />
        </div>
        <button
          className="checkout-button"
          type="submit"
          onClick={handleShowPaypal}
        >
          Place Order
        </button>
        {showPaypal ? (
          <>
            <Toaster />
            <Paypal
              amount={amount}
              handlePaymentSuccess={handlePaymentSuccess}
            />
          </>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Checkout;
