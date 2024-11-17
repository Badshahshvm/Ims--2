import { useState } from "react";
import React from "react";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Course = () => {
  const navigate = useNavigate();
  const [courselist, setCourseList] = useState([]);
  const getCourse = () => {
    axios
      .get("https://studenthub-cynb.onrender.com/api/v1/course/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.courses);
        setCourseList(res.data.courses);
      })
      .catch((err) => {
        toast.err("something is wrong..");
        console.log(err);
      });
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div className="course-wrapper">
      {courselist.map((course) => {
        return (
          <div
            key={course._id}
            className="course-box"
            onClick={() => {
              navigate(`/dashboard/course-details/${course._id}`);
            }}
          >
            <img src={course.imageUrl} alt="" className="course-thumbnail" />
            <h2 className="course-title">{course.courseName}</h2>
            <p className="course-price">Rs.{course.price} only</p>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
