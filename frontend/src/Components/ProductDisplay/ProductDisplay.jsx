import React, { useContext } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";
import toast, { Toaster } from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const ProductDisplay = (props) => {
  const { product, reviews, totalReviews } = props;
  const { handleAddToCart } = useContext(ShopContext);
  const totalRating = reviews.reduce((acc, review) => {
    return Math.ceil((acc + review.rating) / totalReviews);
  }, 0);
  const addToCart = (productId) => {
    const authToken = localStorage.getItem("auth-token");
    if (!authToken) {
      toast.error("Please login to add items to your cart");
      return;
    }
    handleAddToCart(productId);
  };

  return (
    <div className="productdisplay">
      <Toaster />
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {[...Array(5)].map((_, i) => {
            const currentRating = i + 1;
            return (
              <label key={i}>
                <input type="radio" name="rating" value={currentRating} />
                <FaStar
                  className="star"
                  color={currentRating <= totalRating ? "#ffc107" : "#e4e5e9"}
                />
              </label>
            );
          })}
          <p>{totalReviews}</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category: </span>Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags: </span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
