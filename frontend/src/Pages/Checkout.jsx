import React, { useState } from "react";
import "./CSS/Checkout.css";
import Paypal from "../Components/Paypal/Paypal";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const { user, getTotalCartAmount } = useContext(ShopContext);
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

    toast.success("The information was successfully updated!");

    const data = {
      phoneNumber: phoneNumber,
      address: address,
      // paymentMethod: paymentMethod,
    };

    fetch("http://localhost:4000/update_user_info", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
            type="text"
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
          ></input>
        </div>
        <div>
          <label htmlFor="totalAmount">Total Amount:</label>
          <input type="number" id="totalAmount" value={amount} />
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
            <Paypal amount={amount} />
          </>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Checkout;
