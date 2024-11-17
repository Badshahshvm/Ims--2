import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

const AddStudent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courselist, setCourseList] = useState([]);
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

  // Load student data if editing
  useEffect(() => {
    if (location.state) {
      const { student } = location.state;
      setFullName(student.fullName);
      setEmail(student.email);
      setAddress(student.address);
      setCourseId(student.courseId);
      setPhone(student.phone);
      setImageUrl(student.imageUrl);
    }
  }, [location.state]);

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("image", image);
    formData.append("courseId", courseId);

    const apiUrl = location.state
      ? `https://studenthub-cynb.onrender.com/api/v1/student/${location.state.student._id}`
      : "https://studenthub-cynb.onrender.com/api/v1/student/add-student";

    const request = location.state
      ? axios.put(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      : axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

    request
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(
          location.state
            ? "Student Updated Successfully!"
            : "Student Added Successfully!"
        );
        navigate(
          location.state
            ? `/dashboard/student-details/${location.state.student._id}`
            : "/dashboard/all-students"
        );
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Student operation failed. Please try again.");
        console.log(err);
      });
  };

  return (
    <div>
      <form className="signup-form" onSubmit={submitHandler}>
        <h1>{location.state ? "Update Student Detail" : "Add New Student"}</h1>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          required
          value={fullName}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
          required
          value={phone}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          required
          value={address}
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
          type="file"
          onChange={fileHandler}
          required={!location.state} // Conditionally required for new students only
        />
        {imageUrl && <img src={imageUrl} alt="Preview" className="your-pic" />}
        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? (
            <ImSpinner3 className="spinner-icon" />
          ) : location.state ? (
            "Update"
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
