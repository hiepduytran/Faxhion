import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
// import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState("1");
  const handleSortChange = (e) => {
    // console.log(e.target.value);
    setSortBy(e.target.value);
  };
  const sortProducts = () => {
    switch (sortBy) {
      case "2":
        return all_product.slice().sort((a, b) => a.new_price - b.new_price);
      case "3":
        return all_product.slice().sort((a, b) => b.new_price - a.new_price);
      case "4":
        return all_product.slice().sort((a, b) => b.date - a.date);
      default:
        return all_product;
    }
  };

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          {/* Sort by <img src={dropdown_icon} alt="" /> */}
          <select value={sortBy} onChange={handleSortChange}>
            <option value="1">Sort by</option>
            <option value="2">Price: Low to High</option>
            <option value="3">Price: High to Low</option>
            <option value="4">Newest</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortProducts().map((item, index) => {
          if (props.category === item.category) {
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
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
