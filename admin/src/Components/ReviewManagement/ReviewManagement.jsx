import { useEffect, useState } from "react";
import "./ReviewManagement.css";
import cross_icon from "../../assets/cross_icon.png";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});
  const [edit, setEdit] = useState(null);

  const fetchAllReviews = async () => {
    await fetch("http://localhost:4000/get_reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
      });
  };

  const updateReviewStatus = async (reviewId, approved) => {
    await fetch("http://localhost:4000/approve_review", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: reviewId,
        approved: approved,
      }),
    });
    await fetchAllReviews();
    alert("Status updated successfully");
    setEdit(null);
  };

  const removeReview = async (reviewId) => {
    await fetch("http://localhost:4000/delete_review", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: reviewId,
      }),
    });
    setReviews(
      reviews.filter((review) => {
        return review._id !== reviewId;
      })
    ); // return all reviews except the one that was deleted
    await fetchAllReviews();
    alert("Review removed successfully");
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const onStatusChange = (value, reviewId) => {
    setUpdatedStatus({ reviewId, approved: value });
  };

  const handleUpdateStatus = async () => {
    if (updatedStatus.reviewId && updatedStatus.approved) {
      await updateReviewStatus(updatedStatus.reviewId, updatedStatus.approved);
      setUpdatedStatus({});
    }
  };
  const handleEdit = (reviewId) => {
    setEdit(reviewId);
  };
  return (
    <div className="review-management">
      <h1>Review Management</h1>
      <div className="reviewmanagement-format-main">
        <p>ID</p>
        <p>Username</p>
        <p>ProductID</p>
        <p>Rating</p>
        <p>Comment</p>
        <p>Status</p>
        <p>Remove</p>
      </div>
      <div className="reviewmanagement-allproducts">
        <hr />
        {[...reviews].reverse().map((review, index) => {
          return (
            <div key={index}>
              <div className="reviewmanagement-format-main reviewmanagement-format">
                <p>{review._id}</p>
                <p>{review.user.username}</p>
                {/* <ul>
                  {review.products.map((product, index) => {
                    return <li key={index}>{product.name}</li>;
                  })}
                </ul> */}
                <p>{review.productId}</p>
                <p>{review.rating}</p>
                <p>{review.comment}</p>
                <p>
                  <select
                    name="status"
                    id="status"
                    onChange={(e) => onStatusChange(e.target.value, review._id)}
                    disabled={edit !== review._id}
                  >
                    <option value="true" selected={review.approved === true}>
                      Approved
                    </option>
                    <option value="false" selected={review.approved === false}>
                      Disapproved
                    </option>
                  </select>
                  <button onClick={() => handleEdit(review._id)}>Edit</button>
                  <button onClick={handleUpdateStatus}>Update</button>
                </p>
                <img
                  className="reviewmanagement-remove-icon"
                  src={cross_icon}
                  onClick={() => removeReview(review._id)}
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

export default ReviewManagement;
