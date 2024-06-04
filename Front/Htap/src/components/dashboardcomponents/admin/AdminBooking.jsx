import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminBooking() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [bookingData, setBookingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    patient: "",
    scheduletime: "",
    appointmentId: "",
    bookingStatus: "",
    visitingStatus: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${endpoint}/admin/bookings/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookingData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
  }, [session.id, token, endpoint]);

  useEffect(() => {
    const filtered = bookingData.filter((booking) => {
      const patientMatch = booking.patient.p_firstname
        .toLowerCase()
        .includes(filterOptions.patient.toLowerCase());
      const scheduleTimeMatch = booking.scheduletime
        .toLowerCase()
        .includes(filterOptions.scheduletime.toLowerCase());
      const appointmentIdMatch = booking.appointment_id
        .toLowerCase()
        .includes(filterOptions.appointmentId.toLowerCase());
      const bookingStatusMatch = booking.booking_status
        .toLowerCase()
        .includes(filterOptions.bookingStatus.toLowerCase());
      const visitingStatusMatch = booking.visiting_status
        .toLowerCase()
        .includes(filterOptions.visitingStatus.toLowerCase());

      return (
        patientMatch &&
        scheduleTimeMatch &&
        appointmentIdMatch &&
        bookingStatusMatch &&
        visitingStatusMatch
      );
    });
    setFilteredData(filtered);
  }, [filterOptions, bookingData]);

  return (
    <>
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
        <h2 className="text-2xl font-bold mb-4 font-inter">All Bookings</h2>
        <div className="mb-4 grid lg:grid-cols-4 xl:grid-cols-4 grid-cols-2 gap-3">
          {/* Input fields for filtering */}
          <input
            type="text"
            placeholder="Search by problem..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by patient..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.patient}
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, patient: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Filter by schedule time..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.scheduletime}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                scheduletime: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by appointment ID..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.appointmentId}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                appointmentId: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by booking status..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.bookingStatus}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                bookingStatus: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by visiting status..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.visitingStatus}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                visitingStatus: e.target.value,
              })
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-300 rounded-md shadow-md"
            >
              <h3 className="text-lg font-semibold  font-inter text-voilet border-b border-gray-300 px-3 py-2">
                APT. ID {booking.appointment_id}
              </h3>
              <div className="px-3 py-2">
                <div className="mb-2 border-b border-gary-300 px-3 py-2 text-sm">
                  <p className="font-inter text-sm">
                    PID: {booking.patient.pid}
                  </p>
                  <p className="font-inter text-sm">
                    Health Issue: {booking.patient_problem}
                  </p>
                  <p className="font-inter text-sm">
                    Schedule Time:
                    {booking.scheduletime}
                  </p>
                  <p className="font-inter text-sm">
                    Appointment ID: {booking.appointment_id}
                  </p>
                  <p className="font-inter text-sm">
                    Booking Status: {booking.booking_status}
                  </p>
                  <p className="font-inter text-sm">
                    Visiting Status: {booking.visiting_status}
                  </p>
                  <p className="font-inter text-sm">
                    CreatedAt:{" "}
                    {new Date(booking.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
                <div className="flex  gap-4 items-center">
                  <img
                    src={`${endpoint}/users/profile/${booking.patient?.p_profile_pic}`}
                    alt="profile"
                    className="w-20 h-20 rounded-full border border-gray-300"
                  />
                  <div className="text-sm">
                    <p className="font-inter text-sm">
                      Patient: {booking.patient.p_firstname}{" "}
                      {booking.patient.p_lastname}
                    </p>

                    <p className="font-inter text-sm">
                      Email: {booking.patient.p_email}
                    </p>
                    <p className="font-inter text-sm">
                      Contact: {booking.patient.p_contact}
                    </p>
                    <p className="font-inter text-sm">
                      Patient Mobile : {booking.patientMobileNo}
                    </p>
                    <p className="font-inter text-sm">
                      Location: {booking.patient.p_location.city},
                      {booking.patient.p_location.state}
                    </p>
                    <p className="font-inter text-sm">
                      Address: {booking.patient.p_address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4  items-center border-t mt-2">
                  <img
                    src={`${endpoint}/doctor/profile/${booking.doctor.d_profile_pic}`}
                    alt="image"
                    className="w-20 h-20 rounded-full border border-gray-300"
                  />

                  <div className="flex gap-2 flex-col text-sm">
                    <p>
                      Dr. {booking.doctor.d_firstname}{" "}
                      {booking.doctor.d_lastname}
                    </p>
                    <p>{booking.doctor.d_email}</p>
                    <p>{booking.doctor.d_contact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default AdminBooking;
