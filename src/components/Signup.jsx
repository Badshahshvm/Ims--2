import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import axios from "axios";
import download from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);

    axios
      .post("https://studenthub-cynb.onrender.com/api/v1/user/signup", formData)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("User signed up successfully!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Signup failed. Please try again.");
        setLoading(false);
      });
  };

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
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
            <h1>Create Your Account</h1>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
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
            <input type="file" onChange={fileHandler} required />
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="your-pic" />
            )}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? <ImSpinner3 className="spinner-icon" /> : "Submit"}
            </button>
            <Link to="/login" className="link">
              Already Have an Account
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
