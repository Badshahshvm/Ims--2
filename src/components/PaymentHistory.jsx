import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const PaymentHistory = () => {
  const [paymentlist, setPaymentList] = useState([]);

  const getPaymentHistory = () => {
    axios
      .get("https://studenthub-cynb.onrender.com/api/v1/fees/payment-history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPaymentList(res.data.history);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch payment history. Please try again.");
      });
  };

  useEffect(() => {
    getPaymentHistory();
  }, []);

  return (
    <div className="payment-history-wrapper">
      <table>
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Amount</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {paymentlist.map((data) => (
            <tr key={data._id}>
              <td>{new Date(data.createdAt).toLocaleString()}</td>
              <td>{data.amount}</td>
              <td>{data.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
