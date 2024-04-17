import React from "react";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrum from "../Components/BreadCrums/BreadCrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import Description from "../Components/Description/Description";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((item) => item.id === Number(productId));

  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/product/${product.id}/reviews`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data.reviews);
      setTotalReviews(data.reviews.length);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [product]);
  return (
    <div>
      <BreadCrum product={product} />
      <ProductDisplay
        product={product}
        reviews={reviews}
        totalReviews={totalReviews}
      />
      <Description
        product={product}
        reviews={reviews}
        totalReviews={totalReviews}
        fetchReviews={fetchReviews}
      />
      <RelatedProducts />
    </div>
  );
};

export default Product;
