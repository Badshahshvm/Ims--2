import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import download from "../assets/logo.png";
import "react-toastify/dist/ReactToastify.css";
import { ImSpinner3 } from "react-icons/im";
import "./style.css";
import SideNav from "./SideNav";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://studenthub-cynb.onrender.com/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("imageUrl");
      localStorage.removeItem("firstName");
      localStorage.removeItem("imageId");
      localStorage.removeItem("email");

      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-container">
        <SideNav />
        <div className="main-container">
          <div className="top-bar">
            <div className="logo-container">
              <img
                src={localStorage.getItem("imageUrl")}
                alt="Logo"
                className="profile-logo"
              />
            </div>
            <div className="profile-container">
              <h2 className="profile-name">
                {localStorage.getItem("firstName")}
              </h2>
              <button
                className="logo-button"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? <ImSpinner3 className="spinner-icon" /> : "Logout"}
              </button>
            </div>
          </div>
          <div className="outlet-area">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
