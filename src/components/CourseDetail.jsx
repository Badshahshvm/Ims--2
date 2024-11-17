import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const [course, setCourse] = useState({});
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();
  // Delete Course Function
  const deleteCourse = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmed) return;

    try {
      await axios
        .delete(
          `https://studenthub-cynb.onrender.com/api/v1/course/delete/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("Course deleted successfully!");
          navigate("/dashboard/course");
        });
    } catch (err) {
      toast.error("Failed to delete the course. Please try again.");
      console.log(err);
    }
  };

  const getCourseDetails = () => {
    axios
      .get(
        "https://studenthub-cynb.onrender.com/api/v1/course/course-details/" +
          params.id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCourse(res.data.course);
        setStudent(res.data.student);
      })
      .catch((err) => {
        toast.err("something is wrong..");
        console.log(err);
      });
  };
  useEffect(() => {
    getCourseDetails();
    console.log(params.id);
  }, []);
  return (
    <div className="course-details-main-wrapper">
      {course && (
        <div>
          <div className="course-details-wrapper">
            <img src={course.imageUrl} alt="course-thumbnail" />
            <div className="course-details-text">
              <h1>{course.courseName}</h1>
              <p>Price:-{course.price}</p>
              <p>Starting Date :-{course.startingDate}</p>
              <p>End Date :- {course.endDate}</p>
            </div>
            <div className="course-description-box">
              <div className="course-btn">
                <button
                  className="primary-btn"
                  onClick={() => {
                    navigate("/dashboard/update-course/" + course._id, {
                      state: { course },
                    });
                  }}
                >
                  Edit
                </button>

                <button className="secondary-btn" onClick={deleteCourse}>
                  Delete
                </button>
              </div>
              <h3>Course Description</h3>
              <div className="course-description-container">
                <p>{course.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {student && student.length > 0 && (
        <div className="student-container">
          <table>
            <thead>
              <tr>
                <th>Profile </th>
                <th>Student Name </th>
                <th>Student email </th>
                <th>Student Phone </th>
                <th>Student Address </th>
              </tr>
            </thead>
            <tbody>
              {student.map((data, i) => {
                return (
                  <tr
                    key={data._id}
                    className="student-row"
                    onClick={() => {
                      navigate(`/dashboard/student-details/${student[i]._id}`);
                    }}
                  >
                    <td>
                      <img
                        src={data.imageUrl}
                        alt=""
                        className="student-profile-pic"
                      />
                    </td>
                    <td>
                      {" "}
                      <p>{data.fullName}</p>
                    </td>
                    <td>
                      {" "}
                      <p>{data.email}</p>
                    </td>
                    <td>
                      <p>{data.phone}</p>
                    </td>
                    <td>
                      {" "}
                      <p>{data.address}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
