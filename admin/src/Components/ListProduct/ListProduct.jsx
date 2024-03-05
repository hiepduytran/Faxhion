import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchAllProducts = async () => {
    await fetch("http://localhost:4000/get_products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };
  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/delete_product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    await fetchAllProducts();
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img
                  className="listproduct-product-icon"
                  src={product.image}
                  alt=""
                />
                <p>{product.name}</p>
                <p>{product.old_price}</p>
                <p>{product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                  className="listproduct-remove-icon"
                  src={cross_icon}
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

export default ListProduct;
