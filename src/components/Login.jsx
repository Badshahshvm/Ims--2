import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import "./style.css";
import axios from "axios";
import download from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("https://studenthub-cynb.onrender.com/api/v1/user/login", formData)
      .then((res) => {
        setLoading(false);
        console.log(res.data.user.firstName);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("imageUrl", res.data.user.imageUrl);
        localStorage.setItem("firstName", res.data.user.firstName);
        localStorage.setItem("imageId", res.data.user.imageId);
        localStorage.setItem("email", res.data.user.email);
        toast.success("User login successfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error("Login failed. Please try again.");
        setLoading(false); // Stop loading
        console.log(err);
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <img src={download} alt="Logo" className="signup-image" />
          <h1 className="signup-left-heading">Institute Management System</h1>
          <p className="signup-left-para">
            Manage Your All data in Easy way...
          </p>
        </div>
        <div className="signup-right">
          <hr />
          <form onSubmit={submitHandler} className="signup-form">
            <h1>Login with Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? <ImSpinner3 className="spinner-icon" /> : "Submit"}
            </button>
            <Link to="/signup" className="link">
              Create Your Account
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
