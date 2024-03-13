import React, { useState, useEffect } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
const NewCollections = ({ forwardRef }) => {
  const [new_collections, setNewCollections] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/new_collection")
      .then((res) => res.json())
      .then((data) => {
        setNewCollections(data);
      });
  }, []);
  return (
    <div className="new-collections" ref={forwardRef}>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, index) => {
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

export default NewCollections;
