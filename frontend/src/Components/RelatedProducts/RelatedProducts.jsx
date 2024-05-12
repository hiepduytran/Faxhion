import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
const RelatedProducts = () => {
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/popular_in_women")
      .then((res) => res.json())
      .then((data) => setRelatedProduct(data));
  }, []);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProduct.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
