import React, { useState, useEffect, createContext } from "react";

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
  const [cartItems, setCartItems] = useState(getDefaultCart()); // destructuring the state into cartItems and setCartItems
  //   console.log(cartItems);
  useEffect(() => {
    fetch("http://localhost:4000/get_products") // fetching the products from the server
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
      });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/get_cart", {
        // fetching the cart data from the server
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
        // fetching the user data from the server
        method: "GET",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.userData);
          setUser(data.userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);
  const handleAddToCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 })); // updating the state of cartItems (view)
    // console.log(cartItems);
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
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 })); // updating the state of cartItems (view)
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
        .then((data) => 
        console.log(data)
        );
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
    all_product,
    user,
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
