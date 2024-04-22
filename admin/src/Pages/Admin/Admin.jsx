import "./Admin.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import OrderManagement from "../../Components/OrderManagement/OrderManagement";
import ReviewManagement from "../../Components/ReviewManagement/ReviewManagement";
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/list_product" element={<ListProduct />} />
        <Route path="/order_management" element={<OrderManagement />} />
        <Route path="/review_management" element={<ReviewManagement />} />
      </Routes>
    </div>
  );
};

export default Admin;
