import React, { useContext, useState, useEffect } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState("1");
  const [showingProducts, setShowingProducts] = useState(4);
  const productsPerPage = 4;

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleExploreMore = () => {
    setShowingProducts(showingProducts + productsPerPage);
  };

  const filteredProducts = all_product.filter(
    (item) => item.category === props.category
  );

  useEffect(() => {
    setShowingProducts(4);
  }, [props.category]);

  const sortProducts = () => {
    let productsToShow = filteredProducts.slice(0, showingProducts);

    switch (sortBy) {
      case "2":
        return productsToShow.sort((a, b) => a.new_price - b.new_price);
      case "3":
        return productsToShow.sort((a, b) => b.new_price - a.new_price);
      case "4":
        return productsToShow.sort((a, b) => b.date - a.date);
      default:
        return productsToShow;
    }
  };

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{showingProducts}</span> out of{" "}
          {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="1">Sort by</option>
            <option value="2">Price: Low to High</option>
            <option value="3">Price: High to Low</option>
            <option value="4">Newest</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortProducts().map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      {showingProducts < filteredProducts.length ? (
        <button className="shopcategory-loadmore" onClick={handleExploreMore}>
          Explore More
        </button>
      ) : (
        <div style={{ padding: "60px 0px" }}></div>
      )}
    </div>
  );
};

export default ShopCategory;
