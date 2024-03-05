import React from "react";
import "./Admin.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/add_product" element={<AddProduct/>}/>
        <Route path="/list_product" element={<ListProduct/>}/>
      </Routes>
    </div>
  );
};

export default Admin;
