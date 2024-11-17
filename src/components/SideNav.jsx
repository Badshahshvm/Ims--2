import React from "react";
import "./style.css";
import {
  MdContactPhone,
  MdHome,
  MdLibraryBooks,
  MdAddChart,
} from "react-icons/md";
import { FaMoneyCheck, FaHistory, FaPhoneAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoPersonAddSharp } from "react-icons/io5";
import download from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? "menu-active-link" : "menu-link";

  return (
    <div className="nav-container">
      <div className="brand-container">
        <img src={download} alt="" className="profile-logo" />
        <div>
          <h2 className="brand-name">Institute Management System</h2>
          <p className="brand-slogan">Manage Your App</p>
        </div>
      </div>
      <div className="menu-container">
        <Link className={isActive("/dashboard/home")} to="/dashboard/home">
          <MdHome size={20} className="icons" /> Home
        </Link>
        <Link className={isActive("/dashboard/course")} to="/dashboard/course">
          <MdLibraryBooks size={20} className="icons" /> All Course
        </Link>
        <Link
          className={isActive("/dashboard/add-course")}
          to="/dashboard/add-course"
        >
          <MdAddChart size={20} className="icons" /> Add Course
        </Link>
        <Link
          className={isActive("/dashboard/add-student")}
          to="/dashboard/add-student"
        >
          <IoPersonAddSharp size={20} className="icons" /> Add Student
        </Link>
        <Link
          className={isActive("/dashboard/all-students")}
          to="/dashboard/all-students"
        >
          <PiStudentFill size={20} className="icons" /> All Student
        </Link>
        <Link
          className={isActive("/dashboard/collect-fee")}
          to="/dashboard/collect-fee"
        >
          <FaMoneyCheck size={20} className="icons" /> Fees
        </Link>
        <Link
          className={isActive("/dashboard/payment-history")}
          to="/dashboard/payment-history"
        >
          <FaHistory size={20} className="icons" /> Payment History
        </Link>
      </div>

      <div className="contact-us">
        <p>
          <MdContactPhone size={20} className="icons" /> Contact Developer
        </p>
        <p>
          <FaPhoneAlt size={20} className="icons" /> 7667027466
        </p>
      </div>
    </div>
  );
};

export default SideNav;
