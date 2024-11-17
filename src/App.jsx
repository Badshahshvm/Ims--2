import { useState } from "react";

import "./App.css";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Course from "./components/Course";
import AddCourses from "./components/AddCourses";
import AddStudent from "./components/AddStudent";
import Fee from "./components/Fee";
import PaymentHistory from "./components/PaymentHistory";
import StudentList from "./components/StudentList";
import CourseDetail from "./components/CourseDetail";
import StudentDetails from "./components/StudentDetails";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "login",
      Component: Login,
    },
    {
      path: "",
      Component: Signup,
    },
    {
      path: "signup",
      Component: Signup,
    },
    {
      path: "dashboard",
      Component: Dashboard,
      children: [
        {
          path: "",
          Component: Home,
        },
        {
          path: "home",
          Component: Home,
        },
        {
          path: "course",
          Component: Course,
        },
        {
          path: "add-course",
          Component: AddCourses,
        },
        {
          path: "update-course/:id",
          Component: AddCourses,
        },
        {
          path: "add-Student",
          Component: AddStudent,
        },
        {
          path: "collect-fee",
          Component: Fee,
        },
        {
          path: "payment-history",
          Component: PaymentHistory,
        },
        {
          path: "all-students",
          Component: StudentList,
        },
        {
          path: "course-details/:id",
          Component: CourseDetail,
        },
        {
          path: "student-details/:id",
          Component: StudentDetails,
        },
        {
          path:"update-student/:id",
          Component:AddStudent,
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={myRouter} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
