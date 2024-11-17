import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const getCourseDetails = () => {
    axios
      .get(
        "https://studenthub-cynb.onrender.com/api/v1/student/all ",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setStudents(res.data.students);
      })
      .catch((err) => {
        toast.err("something is wrong..");
        console.log(err);
      });
  };
  useEffect(() => {
    getCourseDetails();
  }, []);
  return (
    <div>
      {students && students.length > 0 && (
        <div className="students-container">
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
              {students.map((data, i) => {
                return (
                  <tr
                    key={data._id}
                    className="student-row"
                    onClick={() => {
                      navigate(`/dashboard/student-details/${students[i]._id}`);
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

export default StudentList;
