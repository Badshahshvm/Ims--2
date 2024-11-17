import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { TbSquareRoundedPercentage } from "react-icons/tb";

const StudentDetails = () => {
  const params = useParams();

  const [student, setStudent] = useState({});
  const [fee, setFee] = useState([]);
  const [course, setCourse] = useState({});
  const navigate = useNavigate();

  const getStudentDetails = () => {
    axios
      .get(
        "https://studenthub-cynb.onrender.com/api/v1/student/student-detail/" +
          params.id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        setFee(res.data.fee);
        setStudent(res.data.student);
        setCourse(res.data.course);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getStudentDetails();
    console.log(params.id);
  }, []);

  const deleteStudent = async () => {
    try {
      await axios
        .delete(
          `https://studenthub-cynb.onrender.com/api/v1/student//${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("Student deleted successfully!");
          navigate("/dashboard/course-details/" + course._id);
        });
    } catch (err) {
      toast.error("Failed to delete the Student. Please try again.");
      console.log(err);
    }
  };
  return (
    <div className="student-details-main-wrapper course-details-main-wrapper">
      <div className="student-detail-wrapper">
        <div className="student-details-header">
          <h1>Student Detail</h1>
          <div className="student-detail-btn-container">
            <button
              className="primary-btn"
              onClick={() => {
                navigate("/dashboard/update-student/" + student._id, {
                  state: { student },
                });
              }}
            >
              Edit
            </button>

            <button className="secondary-btn" onClick={deleteStudent}>
              Delete
            </button>
          </div>
        </div>

        <div className="student-details-box">
          <img
            src={student.imageUrl}
            alt="Student"
            className="student-profile-pic"
          />
          <div>
            <h2>{student.fullName}</h2>
            <p>Phone: {student.phone}</p>
            <p>Email: {student.email}</p>
            <p>Address: {student.address}</p>
            {course && (
              <h4
                onClick={() =>
                  navigate("/dashboard/course-details/" + course._id)
                }
                className="course-link"
              >
                Course Name: {course.courseName}
              </h4>
            )}
          </div>
        </div>
      </div>

      {fee && fee.length > 0 && (
        <>
          <h2 className="payment-history-title">Payment History</h2>
          <div className="fee-detail-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date and Time</th>
                  <th>Amount</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {fee.map((data) => (
                  <tr key={data._id}>
                    <td>{data.createdAt}</td>
                    <td>{data.amount}</td>
                    <td>{data.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDetails;
