import React, { useState, useEffect, createContext } from "react";
import Loading from "../Components/Loading/Loading";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:4000/get_products")
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
        setLoading(false);
      });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/get_cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCartItems(data);
        });

      fetch("http://localhost:4000/get_user_data", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleAddToCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/add_to_cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: itemID }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
        });
    }
  };

  const handleRemoveFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/remove_from_cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: itemID }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
        });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    user,
    all_product,
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
