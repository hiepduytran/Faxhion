import React, { useRef } from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import { Link } from "react-router-dom";
import "./CSS/Shop.css";

const Shop = () => {
  const newCollectionsRef = useRef(null);

  const scrollToNewCollections = () => {
    newCollectionsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* <Link to={"/order_detail"} className="order-list-button">
        Go To Order List
      </Link> */}

      <Hero scrollToNewCollections={scrollToNewCollections} />
      <Popular />
      <Offers />
      <NewCollections forwardRef={newCollectionsRef} />
      <NewsLetter />
    </div>
  );
};

export default Shop;
