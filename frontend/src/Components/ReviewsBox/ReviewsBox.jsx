import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewsBox.css";
import toast, { Toaster } from "react-hot-toast"; 

const ReviewsBox = (props) => {
  const { product, reviews, fetchReviews } = props;
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [orders, setOrders] = useState([]);

  const handleRatingChange = (currentRating) => {
    setRating(currentRating);
  };

  const handleHoverChange = (currentRating) => {
    setHover(currentRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/product/${product.id}/add_review`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: rating,
            comment: comment,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      toast.success("Review submitted successfully");
      fetchReviews();
      setRating(null);
      setComment("");
    } catch (error) {
      toast.error("Failed to submit review");
      console.error("Error submitting review:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/get_orders", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data.orders);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, []);

  const isProductInOrder = orders.some((order) => {
    return order.products.some((item) => item.productId === product.id);
  }); // some dựa vào kết quả trả về của hàm callback, nếu có ít nhất 1 phần tử thỏa mãn thì trả về true, ngược lại trả về false
  return (
    <div>
      {/* <Toaster /> */}
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <h3>{review.user.username}</h3>
            <p>{review.comment}</p>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {isProductInOrder && (
        <div className="my-review">
          {[...Array(5)].map((_, i) => {
            const currentRating = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => handleRatingChange(currentRating)}
                />
                <FaStar
                  className="star"
                  size={30}
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => handleHoverChange(currentRating)}
                  onMouseLeave={() => handleHoverChange(null)}
                />
              </label>
            );
          })}
          <textarea
            placeholder="Enter your comment here"
            value={comment}
            onChange={handleCommentChange}
          />
          <button className="submit-review" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsBox;
