import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dpayment() {
  const session = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const [paymentData, setPaymentData] = useState([]);
  const [filters, setFilters] = useState({
    patientName: "",
    doctorName: "",
    createdAt: "",
    appointmentId: "",
    presId: "",
    docId: "",
    pid: "",
    payStatus: "",
    bookingStatus: "",
    visitingStatus: "",
  });

  useEffect(() => {
    fetchPaymentData();
  }, [session.id, token, endpoint]);

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/payment/${session.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setPaymentData(response.data);
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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredPayments = paymentData.filter((payment) => {
    return (
      (payment?.patient?.p_firstname ?? "")
        .toLowerCase()
        .includes(filters.patientName.toLowerCase()) &&
      (payment.doctor?.d_firstname ?? "")
        .toLowerCase()
        .includes(filters.doctorName.toLowerCase()) &&
      (payment.appointment_id ?? "")
        .toLowerCase()
        .includes(filters.appointmentId.toLowerCase()) &&
      (payment.pres_id ?? "")
        .toLowerCase()
        .includes(filters.presId.toLowerCase()) &&
      (payment.d_id ?? "")
        .toLowerCase()
        .includes(filters.docId.toLowerCase()) &&
      (payment.pid ?? "").toLowerCase().includes(filters.pid.toLowerCase()) &&
      (payment.pay_status ?? "")
        .toLowerCase()
        .includes(filters.payStatus.toLowerCase()) &&
      (payment.booking?.booking_status ?? "")
        .toLowerCase()
        .includes(filters.bookingStatus.toLowerCase()) &&
      (payment.booking?.visiting_status ?? "")
        .toLowerCase()
        .includes(filters.visitingStatus.toLowerCase()) &&
      (payment.createdAt ?? "").includes(filters.createdAt)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 font-inter">My Bookings</h2>
      <div className="mb-4 grid lg:grid-cols-4 xl:grid-cols-4 grid-cols-2 gap-3">
        <input
          type="text"
          name="patientName"
          value={filters.patientName}
          onChange={handleChange}
          placeholder="Filter by Patient Name"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="doctorName"
          value={filters.doctorName}
          onChange={handleChange}
          placeholder="Filter by Doctor Name"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="createdAt"
          value={filters.createdAt}
          onChange={handleChange}
          placeholder="Filter by Created At"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="appointmentId"
          value={filters.appointmentId}
          onChange={handleChange}
          placeholder="Filter by Appointment ID"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="presId"
          value={filters.presId}
          onChange={handleChange}
          placeholder="Filter by Prescription ID"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="docId"
          value={filters.docId}
          onChange={handleChange}
          placeholder="Filter by Doctor ID"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="pid"
          value={filters.pid}
          onChange={handleChange}
          placeholder="Filter by Patient ID"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="payStatus"
          value={filters.payStatus}
          onChange={handleChange}
          placeholder="Filter by Payment Status"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="bookingStatus"
          value={filters.bookingStatus}
          onChange={handleChange}
          placeholder="Filter by Booking Status"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="text"
          name="visitingStatus"
          value={filters.visitingStatus}
          onChange={handleChange}
          placeholder="Filter by Visiting Status"
          className="px-3 py-2 border border-gray-300 rounded-lg mr-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPayments.map((payment) => (
          <div
            key={payment._id}
            className="max-w-md mx-4 my-4 border border-gray-300 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold  font-inter text-voilet border-b border-gray-300 px-3 py-2">
                Pay ID {payment.pay_id}
              </h3>

              <p className="text-gray-400 mt-2 mb-2">Payment Details</p>

              <p className="text-gray-700 text-base">
                Doctor: {payment.doctor.d_username}
                <br />
                Prescription ID: {payment.prescription.pres_id}
                <br />
                Appointment ID: {payment.appointment_id}
                <br />
                Pay Status: {payment.pay_status}
                <br />
                Booking Status: {payment.booking.booking_status}
                <br />
                Visiting Status: {payment.booking.visiting_status}
                <br />
                Payment Amount: {payment.pay_amount}
                <br />
                Created At: {payment.createdAt}
                <br />
              </p>

              {/* Patient */}

              <p className="text-gray-400 mt-2 mb-2">Patinet Details</p>
              <div className="flex gap-2 p-2 items-center">
                <img
                  src={`${endpoint}/users/profile/${payment.patient.p_profile_pic}`}
                  alt="patient image"
                  className="w-14 h-14 rounded-full border border-gray-200"
                />

                <div className="flex gap-2 flex-col">
                  <p>
                    {payment.patient.p_firstname} {payment.patient.p_lastname}
                  </p>
                  <p>{payment.patient.p_email}</p>
                  <p>{payment.patient.p_contact}</p>
                </div>
              </div>

              <p className="text-gray-400 mt-2 mb-2">Doctor Details</p>
              <div className="flex gap-2 p-2 items-center">
                <img
                  src={`${endpoint}/doctor/profile/${payment.doctor.d_profile_pic}`}
                  alt="patient image"
                  className="w-14 h-14 rounded-full border border-gray-200"
                />

                <div className="flex gap-2 flex-col">
                  <p>
                    {payment.doctor.d_firstname} {payment.doctor.d_lastname}
                  </p>
                  <p>{payment.doctor.d_email}</p>
                  <p>{payment.doctor.d_contact}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dpayment;
