import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Fee = () => {
  const [phone, setPhone] = useState();
  const [courseId, setCourseId] = useState("");
  const [amount, setAmount] = useState("");
  const [fullname, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [courselist, setCourseList] = useState([]);
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();
  // Fetch courses
  const getCourse = () => {
    axios
      .get("https://studenthub-cynb.onrender.com/api/v1/course/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCourseList(res.data.courses);
      })
      .catch((err) => {
        toast.error("Something went wrong.");
        console.log(err);
      });
  };

  useEffect(() => {
    getCourse();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullname);

    formData.append("phone", phone);

    formData.append("amount", amount);
    formData.append("remark", remark);
    formData.append("courseId", courseId);
    axios
      .post(
        "https://studenthub-cynb.onrender.com/api/v1/fees/add-fees",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success("Payment is Done");
        navigate("/dashboard/payment-history");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Payment operation failed. Please try again.");
        console.log(err);
      });
  };
  return (
    <div>
      <form action="" className="signup-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="FullName"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        >
          <option value="">Select Course</option>
          {courselist.map((course) => (
            <option value={course._id} key={course._id}>
              {course.courseName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Remark"
          onChange={(e) => setRemark(e.target.value)}
          required
        />

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? <ImSpinner3 className="spinner-icon" /> : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default Fee;
