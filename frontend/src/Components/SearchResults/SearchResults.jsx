import React from "react";
import "./SearchResults.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Item from "../Item/Item";
const SearchResults = () => {
  const location = useLocation();
  const all_product = location.state.products;
  const searchKeyWord = location.state.searchKeyWord;
  const [sortBy, setSortBy] = useState("1");
  const handleSortChange = (e) => {
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
    <div className="search-results">
      <div className="searchresults-header">
        <h1>Search Results</h1>
        <p>
          <span>Search keywords:</span> "{searchKeyWord}"
        </p>
      </div>
      <div className="searchresults-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="searchresults-sort">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="1">Sort by</option>
            <option value="2">Price: Low to High</option>
            <option value="3">Price: High to Low</option>
            <option value="4">Newest</option>
          </select>
        </div>
      </div>
      <div className="searchresults-products">
        {sortProducts().map((item, index) => {
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
      <div className="searchresults-loadmore">Explore More</div>
    </div>
  );
};

export default SearchResults;
