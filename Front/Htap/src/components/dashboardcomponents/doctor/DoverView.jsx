import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar, Line, Doughnut, PolarArea, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function DoverView() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [bookingChart, setBookingChart] = useState([]);
  const [prescriptionChart, setPrescriptionChart] = useState([]);
  const [paymentChart, setPaymentChart] = useState([]);

  useEffect(() => {
    fetchBookingChart();
    fetchPrescriptionChart();
    fetchPaymentChart();
  }, [session.id, token, endpoint]);

  const fetchBookingChart = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/booking/chart/${session.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingChart(response.data);
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const fetchPrescriptionChart = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/prescription/chart/${session.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setPrescriptionChart(response.data);
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const fetchPaymentChart = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/payment/chart/${session.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPaymentChart(response.data);
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // Function to generate random RGB color values
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},0.3)`;
  };

  // Prepare chart data
  const chartData = {
    labels: bookingChart.map((item) => item.label),
    datasets: [
      {
        label: "Booking Data",
        backgroundColor: generateRandomColor(),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: bookingChart.map((item) => item.data),
      },
    ],
  };

  const chartPresData = {
    labels: prescriptionChart.map((item) => item.label),
    datasets: [
      {
        label: "Prescription Data",
        backgroundColor: generateRandomColor(),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: bookingChart.map((item) => item.data),
      },
    ],
  };

  const chartPayData = {
    labels: paymentChart.map(
      (item) => `${item.label} - Total Amount: ${item.totalAmount}`
    ),
    datasets: [
      {
        label: "Payment Data",
        backgroundColor: generateRandomColor(),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: bookingChart.map((item) => item.data),
      },
    ],
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 font-inter">OverView</h2>

        <h3 className="text-gray-500 font-inter text-[20px] mt-3 mb-3">
          Bookings
        </h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Line
              data={chartData}
              options={{
                title: {
                  display: true,
                  text: "Booking Chart",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <Bar
              data={chartData}
              options={{
                title: {
                  display: true,
                  text: "Booking Chart",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </div>

        <h3 className="text-gray-500 font-inter text-[20px] mt-3 mb-3">
          Prescriptions
        </h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Doughnut
              data={chartPresData}
              options={{
                title: {
                  display: true,
                  text: "Prescription Issued Chart",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <Bar
              data={chartPresData}
              options={{
                title: {
                  display: true,
                  text: "Prescription Issued Chart",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </div>

        <h3 className="text-gray-500 font-inter text-[20px] mt-3 mb-3">
          Payments
        </h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Line
              data={chartPayData}
              options={{
                title: {
                  display: true,
                  text: "Prescription Issued Chart",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <Bar
              data={chartPayData}
              options={{
                title: {
                  display: true,
                  text: "Prescription Issued Chart",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DoverView;
