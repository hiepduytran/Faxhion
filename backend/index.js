const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json()); // for parsing application/json
app.use(cors()); // for enabling CORS

// Database Connection with MongoDB
mongoose.connect(
  "mongodb+srv://hiepdeptrai:hiep1234@cluster0.zdrft1o.mongodb.net/faxhion"
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Schema for Creating Users
const Users = mongoose.model("Users", {
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint for registering
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: "0865213404",
    address: "Ha Noi",
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecommerce");
  res.json({ success: true, token: token });
});

// Creating Endpoint for login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = user.password === req.body.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecommerce");
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false, errors: "Password does not match" });
    }
  } else {
    res.json({ success: false, errors: "User not found" });
  }
});

// Creating Endpoint for New Collection data
app.get("/new_collection", async (req, res) => {
  let products = await Product.find({}); // Getting all the products from the database
  let new_collection = products.slice(1).slice(-8); // Getting the last 8 products from the array
  res.json(new_collection);
});
// Creating EndPoint for popular in women section
app.get("/popular_in_women", async (req, res) => {
  let products = await Product.find({ category: "women" }); // Getting all the products from the database
  let popular_in_women = products.slice(0, 4);
  res.json(popular_in_women);
});

// Creating middleware to fetch user
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ success: false, errors: "Invalid Authentication" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecommerce");
      // console.log(data);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).json({ success: false, errors: "Token is not valid" });
    }
  }
};

// Creating Endpoint to get user data
app.get("/get_user_data", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await Users.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({ success: false, errors: "User not found" });
    }

    res.json({ success: true, userData: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, errors: "Internal server error" });
  }
});

// Creating Endpoint to update user information
app.post("/update_user_info", fetchUser, async (req, res) => {
  try {
    // Lấy thông tin người dùng từ yêu cầu
    // const { phoneNumber, address } = req.body;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    // console.log(phoneNumber, address);
    // Lấy ID của người dùng từ middleware fetchUser
    const userId = req.user.id;

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Cập nhật thông tin người dùng trong cơ sở dữ liệu
    await Users.findOneAndUpdate(
      { _id: userId },
      {
        phoneNumber: phoneNumber,
        address: address,
        cartData: cart,
      }
    );

    res.json({
      success: true,
      message: "User information updated successfully",
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ success: false, errors: "Internal server error" });
  }
});

// Creating Endpoint for adding products in cartData
app.post("/add_to_cart", fetchUser, async (req, res) => {
  // console.log(req.body, req.user);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemID] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.json({ success: true, message: "Added to cart" });
});
app.post("/remove_from_cart", fetchUser, async (req, res) => {
  // console.log(req.body, req.user);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemID] > 0) {
    userData.cartData[req.body.itemID] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.json({ success: true, message: "Removed from cart" });
});

// Creating Endpoint to get cartData
app.post("/get_cart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.post("/add_product", async (req, res) => {
  let products = await Product.find({}); // Getting all the products from the database
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0]; // Getting the last product from the array
    id = last_product.id + 1; // Incrementing the ID by 1
  } else {
    id = 1; // If there are no products in the database, then the ID will be 1
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name });
});

// Creating API for deleting a product
app.post("/delete_product", async (req, res) => {
  await Product.findOneAndDelete({
    id: req.body.id,
  });
  console.log("Deleted");
  res.json({ success: true, name: req.body.name });
}); // Deleting the product from the database

// Creating API for getting all the products
app.get("/get_products", async (req, res) => {
  let products = await Product.find({});
  res.json(products);
  // console.log("All products fetched");
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port", port);
  } else {
    console.log("Error running the server");
  }
});
