// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Home = () => {
//   // Declare state variables for the data
//   const navigate = useNavigate();
//   const [homeData, setHomeData] = useState({
//     courses: 0,
//     students: 0,
//     totalTransactions: 0,
//   });
//   const [student, setStudents] = useState([]);
//   const[paymentlist,setPaymentList]=useState([])

//   // Fetch home details on component mount
//   useEffect(() => {
//     getHomeDetails();
//   }, []);

//   // Function to get home details from API
//   const getHomeDetails = () => {
//     axios
//       .get("https://studenthub-cynb.onrender.com/api/v1/course/home", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {

//         setHomeData({
//           courses: res.data.totalCourse,
//           students: res.data.totalStudent,
//           totalTransactions: res.data.totalFeeta,
//         });
//         setStudents(res.data.students);
//         setPaymentList(res.data.fees);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   return (
//     <div className="home-wrapper">
//       <div className="home-count-box-wrapper">
//         <div className="box1 box">
//           <h2>{homeData.courses}</h2>
//           <p>Courses</p>
//         </div>
//         <div className="box2 box">
//           <h2>{homeData.students}</h2>
//           <p>Students</p>
//         </div>
//         <div className="box3 box">
//           <h2>Rs: {homeData.totalTransactions}</h2>
//           <p>Total Transactions</p>
//         </div>
//       </div>
//       <div className="list-container">
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>Profile </th>
//                 <th>Student Name </th>
//                 <th>Student email </th>

//               </tr>
//             </thead>
//             <tbody>
//               {student.map((data, i) => {
//                 return (
//                   <tr
//                     key={data._id}
//                     className="student-row"
//                     onClick={() => {
//                       navigate(`/dashboard/student-details/${student[i]._id}`);
//                     }}
//                   >
//                     <td>
//                       <img
//                         src={data.imageUrl}
//                         alt=""
//                         className="student-profile-pic"
//                       />
//                     </td>
//                     <td>
//                       {" "}
//                       <p>{data.fullName}</p>
//                     </td>
//                     <td>
//                       {" "}
//                       <p>{data.email}</p>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>Date and Time</th>
//                 <th>Amount</th>
//                 <th>Remark</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paymentlist.map((data) => (
//                 <tr key={data._id}>
//                   <td>{new Date(data.createdAt).toLocaleString()}</td>
//                   <td>{data.amount}</td>
//                   <td>{data.remark}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState({
    courses: 0,
    students: 0,
    totalTransactions: 0,
  });
  const [students, setStudents] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeDetails();
  }, []);

  const getHomeDetails = () => {
    axios
      .get("https://studenthub-cynb.onrender.com/api/v1/course/home", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setHomeData({
          courses: res.data.totalCourse || 0,
          students: res.data.totalStudent || 0,
          totalTransactions: res.data.totalFeeta || 0,
        });
        setStudents(res.data.students || []);
        setPaymentList(res.data.fees || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false)); // Set loading to false after API call
  };

  return (
    <div className="home-wrapper">
      {loading ? (
        <p>Loading...</p> // Show a loading message while data is being fetched
      ) : (
        <>
          <div className="home-count-box-wrapper">
            <div className="box1 box">
              <h2>{homeData.courses}</h2>
              <p>Courses</p>
            </div>
            <div className="box2 box">
              <h2>{homeData.students}</h2>
              <p>Students</p>
            </div>
            <div className="box3 box">
              <h2>Rs: {homeData.totalTransactions}</h2>
              <p>Total Transactions</p>
            </div>
          </div>

          <div className="list-container">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Student Name</th>
                    <th>Student Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((data) => (
                      <tr
                        key={data._id}
                        className="student-row"
                        onClick={() =>
                          navigate(`/dashboard/student-details/${data._id}`)
                        }
                      >
                        <td>
                          <img
                            src={data.imageUrl || "default-image.png"} // Fallback for missing images
                            alt="Profile"
                            className="student-profile-pic"
                          />
                        </td>
                        <td>{data.fullName || "N/A"}</td>
                        <td>{data.email || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No students available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date and Time</th>
                    <th>Amount</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentList.length > 0 ? (
                    paymentList.map((data) => (
                      <tr key={data._id}>
                        <td>
                          {new Date(data.createdAt).toLocaleString() || "N/A"}
                        </td>
                        <td>{data.amount || 0}</td>
                        <td>{data.remark || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No payment transactions available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
