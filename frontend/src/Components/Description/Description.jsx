import React, { useState } from "react";
import "./Description.css";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
import ReviewsBox from "../ReviewsBox/ReviewsBox";

const Description = (props) => {
  const { product, reviews, totalReviews, fetchReviews } = props;
  const [selectedTab, setSelectedTab] = useState("description");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="description">
      <div className="description-navigator">
        <div
          className={`description-nav-box ${
            selectedTab === "description" ? "" : "fade"
          }`}
          onClick={() => handleTabClick("description")}
        >
          Description
        </div>
        <div
          className={`description-nav-box ${
            selectedTab === "reviews" ? "" : "fade"
          }`}
          onClick={() => handleTabClick("reviews")}
        >
          Reviews ({totalReviews})
        </div>
      </div>
      <div
        className="description-box"
        style={{ display: selectedTab === "description" ? "block" : "none" }}
      >
        <DescriptionBox description={product.description} />
      </div>
      <div
        className="reviews-box"
        style={{ display: selectedTab === "reviews" ? "block" : "none" }}
      >
        <ReviewsBox
          product={product}
          reviews={reviews}
          fetchReviews={fetchReviews}
        />
      </div>
    </div>
  );
};

export default Description;
