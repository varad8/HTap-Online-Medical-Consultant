import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar, Line, Doughnut, PolarArea, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function AdminOverview() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [bookingChart, setBookingChart] = useState([]);
  const [prescriptionChart, setPrescriptionChart] = useState([]);
  const [paymentChart, setPaymentChart] = useState([]);
  const [bookingStatusData, setBookingStatusData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthWiseData, setMonthWiseData] = useState([]);
  const [yearWiseData, setYearWiseData] = useState([]);
  const [reports, setReports] = useState("Weekly");
  const [weeklyDataDoctor, setWeeklyDataDoctor] = useState([]);
  const [monthlyDataDoctor, setMonthlyDataDoctor] = useState([]);
  const [yearlyDataDoctor, setYearlyDataDoctor] = useState([]);

  useEffect(() => {
    fetchBookingChart();
    fetchPrescriptionChart();
    fetchPaymentChart();
    fetchVisitingStatusChart();
    WeeklyData();
    MonthlyData();
    YearlyData();
    WeeklyDataAll();
    MonthlyDataAll();
    YearlyDataAll();
  }, [session.id, token, endpoint]);

  const fetchBookingChart = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/booking/chart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        `${endpoint}/admin/prescriptions/chart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      const response = await axios.get(`${endpoint}/admin/payment/chart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPaymentChart(response.data);
      console.log(response.data);
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

  const fetchVisitingStatusChart = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/admin/booking/visiting/chart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingStatusData(response?.data);
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
    const a = Math.random().toFixed(2); // Random alpha value between 0 and 1
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };
  // Prepare chart data
  // Prepare chart data
  const chartData = {
    labels: bookingChart.map((item) => item.label),
    datasets: bookingChart.map((doctorData, index) => ({
      label: `Booking Data - ${doctorData.doctor_name} (${doctorData.d_id})`,
      backgroundColor: generateRandomColor(),
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: [doctorData.data],
    })),
  };
  const chartPresData = {
    labels: prescriptionChart.map((item) => item.label),
    datasets: [
      {
        label: prescriptionChart.map((item) => item.d_id),
        backgroundColor: generateRandomColor(),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: bookingChart.map((item) => item.data),
      },
    ],
  };
  // Get unique labels using a Set
  const uniqueLabels = new Set(paymentChart.map((item) => item.label));

  const chartPayData = {
    labels: Array.from(uniqueLabels), // Convert Set back to an array
    datasets: paymentChart.map((item) => ({
      label: `Payment Data - ${item.d_firstname} ${item.d_lastname}`,
      backgroundColor: generateRandomColor(),
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: [item.totalAmount],
    })),
  };

  // Aggregate the data based on the month, year, doctor, and visiting status
  const aggregatedData = {};
  bookingStatusData?.forEach((item) => {
    const key = `${item.label}-${item.d_id}`;
    if (!aggregatedData[key]) {
      aggregatedData[key] = {
        label: item.label,
        d_firstname: item.d_firstname,
        d_lastname: item.d_lastname,
        d_id: item.d_id,
        visited: 0,
        notVisited: 0,
        cancelled: 0,
      };
    }
    switch (item.visiting_status) {
      case "Visited":
        aggregatedData[key].visited += item.data;
        break;
      case "Not Visited":
        aggregatedData[key].notVisited += item.data;
        break;
      case "Cancelled":
        aggregatedData[key].cancelled += item.data;
        break;
    }
  });

  // Prepare chart data
  const chartVisitingStatusData = {
    labels: Object.values(aggregatedData).map(
      (item) => `${item.label} - ${item.d_firstname} ${item.d_lastname}`
    ),
    datasets: [
      {
        label: "Visited",
        backgroundColor: generateRandomColor(),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: Object.values(aggregatedData).map((item) => item.visited),
      },
      {
        label: "Not Visited",
        backgroundColor: generateRandomColor(),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: Object.values(aggregatedData).map((item) => item.notVisited),
      },
      {
        label: "Cancelled",
        backgroundColor: generateRandomColor(),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: Object.values(aggregatedData).map((item) => item.cancelled),
      },
    ],
  };

  //Reports data

  const weeklyChartData = {
    labels: weeklyData?.map((item) => item.weekLabel),
    datasets: [
      {
        label: "Total Payments",
        data: weeklyData.map((item) => item.totalPayments),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const MonthlyData = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/reports/monthly`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMonthWiseData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const WeeklyData = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/reports/weekly`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWeeklyData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const YearlyData = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/reports/yearly`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setYearWiseData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const monthlyChartData = {
    labels: monthWiseData?.map((item) => item.monthLabel),
    datasets: [
      {
        label: "Total Payments",
        data: monthWiseData?.map((item) => item.totalPayments),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const yearlyChartData = {
    labels: yearWiseData?.map((item) => item.year),
    datasets: [
      {
        label: "Total Payments",
        data: yearWiseData?.map((item) => item.totalPayments),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleReportType = async (reportType) => {
    setReports(reportType);
    switch (reportType) {
      case "Monthly":
        await MonthlyData();
        await MonthlyDataAll();
        break;
      case "Weekly":
        await WeeklyData();
        await WeeklyDataAll();
        break;
      case "Yearly":
        await YearlyData();
        await YearlyDataAll();
        break;
      default:
        break;
    }
  };

  // Doctor Wise Fetch Weekly Data
  const MonthlyDataAll = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/admin/reports/monthly/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMonthlyDataDoctor(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const WeeklyDataAll = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/reports/weekly/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWeeklyDataDoctor(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const YearlyDataAll = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/reports/yearly/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setYearlyDataDoctor(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const yearlyChartDataAll = {
    labels: yearlyDataDoctor?.map(
      (doctorData) => `${doctorData.d_firstname} ${doctorData.d_lastname}`
    ),
    datasets: [
      {
        label: "Total Payments",
        data: yearlyDataDoctor.map((doctorData) => doctorData.totalPayments),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const monthlyChartDataAll = {
    labels: monthlyDataDoctor?.map(
      (doctorData) => `${doctorData.d_firstname} ${doctorData.d_lastname}`
    ),
    datasets: [
      {
        label: "Total Payments",
        data: monthlyDataDoctor.map((doctorData) => doctorData.totalPayments),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const weeklyChartDataAll = {
    labels: weeklyDataDoctor?.map(
      (doctorData) => `${doctorData.d_firstname} ${doctorData.d_lastname}`
    ),
    datasets: [
      {
        label: "Total Payments",
        data: weeklyDataDoctor.map((doctorData) => doctorData.totalPayments),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
            <Bar
              data={chartVisitingStatusData}
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

        <br />
        <hr />
        <br />

        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-bold dark:text-gray-300">Reports</h3>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                handleReportType("Weekly");
              }}
              className={`text-sm text-white px-3 py-2 rounded-md ${
                reports === "Weekly"
                  ? "bg-indigo-500 borde-2 border-indigo-600 shadow-xl"
                  : "bg-indigo-500"
              }`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => {
                handleReportType("Monthly");
              }}
              className={`text-sm text-white px-3 py-2 rounded-md ${
                reports === "Monthly"
                  ? "bg-green-500 borde-2 border-green-600 shadow-xl"
                  : "bg-green-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => {
                handleReportType("Yearly");
              }}
              type="button"
              className={`text-sm text-white px-3 py-2 rounded-md ${
                reports === "Yearly"
                  ? "bg-orange-500 borde-2 border-orange-600 shadow-xl"
                  : "bg-orange-500"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Weekly Data */}
        {reports === "Weekly" && (
          <>
            <h2 className="text-left text-xl font-medium mt-3 mb-3">
              Weekly Data
            </h2>
            {weeklyData.map((weekData) => (
              <div
                key={weekData.weekLabel}
                className="overflow-x-auto mt-3 mb-3"
              >
                <h3>{weekData.weekLabel}</h3>
                <p>Total Payments: {weekData.totalPayments}</p>
                <table className="table-auto border-collapse border border-gray-500">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Booking ID</th>
                      <th className="px-4 py-2">Patient Name</th>
                      <th className="px-4 py-2">Doctor Name</th>
                      <th className="px-4 py-2">Patient ID</th>
                      <th className="px-4 py-2">Doctor ID</th>
                      <th className="px-4 py-2">Appointment ID</th>
                      <th className="px-4 py-2">Patient Problem</th>
                      <th className="px-4 py-2">Visiting Status</th>
                      <th className="px-4 py-2">Booking Status</th>
                      <th className="px-4 py-2">Patient Mobile No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weekData.bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="border px-4 py-2">{booking._id}</td>
                        <td className="border px-4 py-2">
                          {booking.patient.p_firstname}{" "}
                          {booking.patient.p_lastname}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.doctor.d_firstname}{" "}
                          {booking.doctor.d_lastname}
                        </td>
                        <td className="border px-4 py-2">{booking.pid}</td>
                        <td className="border px-4 py-2">{booking.d_id}</td>
                        <td className="border px-4 py-2">
                          {booking.appointment_id}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.patient_problem}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.visiting_status}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.booking_status}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.patientMobileNo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <div className="grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5 mt-3 mb-3">
              <div className="bg-white shadow-md rounded-lg p-6">
                <Bar data={weeklyChartData} />
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <Bar data={weeklyChartDataAll} />
              </div>
            </div>

            <div className="overflow-x-auto mt-5">
              <h2 className="text-xl font-semibold mb-4">
                Weekly Data for Doctors
              </h2>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Doctor Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Payments
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Week
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {weeklyDataDoctor.map((doctorData) => (
                      <tr key={doctorData.d_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{`${doctorData.d_firstname} ${doctorData.d_lastname}`}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {doctorData.totalPayments}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {doctorData.weekLabel}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* MonthWise Data */}
        {reports === "Monthly" && (
          <>
            <h2 className="text-left text-xl font-medium mt-3 mb-3">
              Monthly Data
            </h2>
            {monthWiseData.map((monthwise) => (
              <div
                key={monthwise.monthLabel}
                className="overflow-x-auto mt-3 mb-3"
              >
                <h3>{monthwise.monthLabel}</h3>
                <p>Total Payments: {monthwise.totalPayments}</p>
                <table className="table-auto border-collapse border border-gray-500">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Booking ID</th>
                      <th className="px-4 py-2">Patient Name</th>
                      <th className="px-4 py-2">Doctor Name</th>
                      <th className="px-4 py-2">Patient ID</th>
                      <th className="px-4 py-2">Doctor ID</th>
                      <th className="px-4 py-2">Appointment ID</th>
                      <th className="px-4 py-2">Patient Problem</th>
                      <th className="px-4 py-2">Visiting Status</th>
                      <th className="px-4 py-2">Booking Status</th>
                      <th className="px-4 py-2">Patient Mobile No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthwise.bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="border px-4 py-2">{booking._id}</td>
                        <td className="border px-4 py-2">
                          {booking.patient.p_firstname}{" "}
                          {booking.patient.p_lastname}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.doctor.d_firstname}{" "}
                          {booking.doctor.d_lastname}
                        </td>
                        <td className="border px-4 py-2">{booking.pid}</td>
                        <td className="border px-4 py-2">{booking.d_id}</td>
                        <td className="border px-4 py-2">
                          {booking.appointment_id}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.patient_problem}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.visiting_status}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.booking_status}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.patientMobileNo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <div className="grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5 mt-3 mb-3">
              <div className="bg-white shadow-md rounded-lg p-6">
                <Bar data={monthlyChartData} />
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <Bar data={monthlyChartDataAll} />
              </div>
            </div>

            <div className="overflow-x-auto mt-5">
              <h2 className="text-xl font-semibold mb-4">
                Monthly Data for Doctors
              </h2>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Doctor Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Payments
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Month
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {monthlyDataDoctor.map((doctorData) => (
                      <tr key={doctorData.d_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{`${doctorData.d_firstname} ${doctorData.d_lastname}`}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {doctorData.totalPayments}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {doctorData.monthLabel}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Yearly Data */}
        {reports === "Yearly" && (
          <>
            <h2 className="text-left text-xl font-medium mt-3 mb-3">
              Yearly Data
            </h2>
            {yearWiseData.map((yearwise) => (
              <div key={yearwise.year} className="overflow-x-auto mt-3 mb-3">
                <h3>{yearwise.year}</h3>
                <p>Total Payments: {yearwise.totalPayments}</p>
                <table className="table-auto border-collapse border border-gray-500">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Booking ID</th>
                      <th className="px-4 py-2">Patient Name</th>
                      <th className="px-4 py-2">Doctor Name</th>
                      <th className="px-4 py-2">Patient ID</th>
                      <th className="px-4 py-2">Doctor ID</th>
                      <th className="px-4 py-2">Appointment ID</th>
                      <th className="px-4 py-2">Patient Problem</th>
                      <th className="px-4 py-2">Visiting Status</th>
                      <th className="px-4 py-2">Booking Status</th>
                      <th className="px-4 py-2">Patient Mobile No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearwise.bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="border px-4 py-2">{booking._id}</td>
                        <td className="border px-4 py-2">
                          {booking.patient.p_firstname}{" "}
                          {booking.patient.p_lastname}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.doctor.d_firstname}{" "}
                          {booking.doctor.d_lastname}
                        </td>
                        <td className="border px-4 py-2">{booking.pid}</td>
                        <td className="border px-4 py-2">{booking.d_id}</td>
                        <td className="border px-4 py-2">
                          {booking.appointment_id}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.patient_problem}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.visiting_status}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.booking_status}
                        </td>
                        <td className="border px-4 py-2">
                          {booking.patientMobileNo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <div className="grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5 mt-3 mb-5">
              <div className="bg-white shadow-md rounded-lg p-6">
                <Bar data={yearlyChartData} />
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <Bar data={yearlyChartDataAll} />
              </div>
            </div>

            <div className="overflow-x-auto mt-5">
              <h2 className="text-xl font-semibold mb-4">
                Yearly Data for Doctors
              </h2>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Doctor Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Payments
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {yearlyDataDoctor.map((doctorData) => (
                      <tr key={doctorData.d_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{`${doctorData.d_firstname} ${doctorData.d_lastname}`}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {doctorData.totalPayments}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {doctorData.year}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminOverview;
