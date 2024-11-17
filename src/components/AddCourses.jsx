import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
const AddCourses = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (location.state) {
      console.log(location.state.course);
      setCourseName(location.state.course.courseName);
      setDescription(location.state.course.description);
      setImageUrl(location.state.course.imageUrl);
      setEndDate(location.state.course.endDate);

      setPrice(location.state.course.price);
      setStartingDate(location.state.course.startingDate);
    } else {
      setCourseName("");
      setDescription("");
      setImageUrl("");
      setEndDate("");

      setPrice(0);
      setStartingDate("");
    }
  }, [location]);
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("description", description);
    formData.append("price", price);

    formData.append("endDate", endDate);
    formData.append("startingDate", startingDate);
    if (image) {
      formData.append("image", image);
    }

    if (location.state) {
      axios
        .put(
          "https://studenthub-cynb.onrender.com/api/v1/course/update/" +
            location.state.course._id,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          console.log();
          console.log(res.data);
          toast.success("Course Updated successfully!"); // Success message
          navigate("/dashboard/course-details/" + location.state.course._id);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Course Creation  failed. Please try again."); // Error message
          setLoading(false);
        });
    } else {
      axios
        .post(
          "https://studenthub-cynb.onrender.com/api/v1/course/create-course",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          console.log();
          console.log(res.data);
          toast.success("Course created successfully!"); // Success message
          navigate("/dashboard/course");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Course Creation  failed. Please try again."); // Error message
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <form action="" className="signup-form" onSubmit={submitHandler}>
        <h1>{location.state ? "Update Course" : "Add New Course"}</h1>
        <input
          type="text"
          value={courseName}
          placeholder="CourseName"
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <input
          value={description}
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          value={price}
          type="Number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          value={startingDate}
          type="date"
          placeholder="Starting Date (DD-MM-YY)"
          onChange={(e) => setStartingDate(e.target.value)}
          required
        />
        <input
          value={endDate}
          type="date"
          placeholder="End Date  (DD-MM-YY)"
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          required
        />
        <input
          required={!location.state}
          type="file"
          placeholder="image"
          onChange={fileHandler}
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

export default AddCourses;
