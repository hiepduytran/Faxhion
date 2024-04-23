import { useState } from "react";
import "./AddProduct.css";
import uploadArea from "../../assets/upload_area.svg";
import toast, { Toaster } from "react-hot-toast";
const AddProduct = () => {
  const defaultProductDetails = {
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
    description: "",
  };
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState(defaultProductDetails);
  const imgHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const addProduct = async () => {
    // console.log(productDetails);
    let resData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }).then((res) => res.json().then((data) => (resData = data)));

    if (resData.success) {
      product.image = resData.image_url;
      // console.log(product);
      await fetch("http://localhost:4000/add_product", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }).then((res) =>
        res.json().then((data) => {
          if (data.success) {
            toast.success("Product Added Successfully");
            setProductDetails(defaultProductDetails);
            setImage(false);
          } else {
            toast.error("Failed to Add Product");
          }
        })
      );
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Description</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
          id=""
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : uploadArea}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imgHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          addProduct();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
      <Toaster />
    </div>
  );
};

export default AddProduct;
