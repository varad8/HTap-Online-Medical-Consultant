import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserBooking() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [bookingData, setBookingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    doctor: "",
    scheduletime: "",
    appointmentId: "",
    bookingStatus: "",
    visitingStatus: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  console.log(new Date());

  useEffect(() => {
    fetchBookingData();
  }, [session.id, token, endpoint]);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/users/booking/all/${session.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookingData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    const filtered = bookingData.filter((booking) => {
      const doctorMatch = booking?.doctor.d_firstname
        .toLowerCase()
        .includes(filterOptions.doctor.toLowerCase());
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
        doctorMatch &&
        scheduleTimeMatch &&
        appointmentIdMatch &&
        bookingStatusMatch &&
        visitingStatusMatch
      );
    });
    setFilteredData(filtered);
  }, [filterOptions, bookingData]);

  function isAfterSchedulingDate(schedulingDateString) {
    // Extract day, month, and year from scheduling date string
    const [schedulingDay, schedulingMonth, schedulingYear] =
      schedulingDateString.split("/");

    // Get current date components
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const currentYear = currentDate.getFullYear();

    // Convert scheduling date components to numbers
    const schedulingDayNumber = parseInt(schedulingDay, 10);
    const schedulingMonthNumber = parseInt(schedulingMonth, 10);
    const schedulingYearNumber = parseInt(schedulingYear, 10);

    // Compare scheduling date with current date
    if (schedulingYearNumber > currentYear) {
      return true; // Scheduling year is after current year
    } else if (schedulingYearNumber < currentYear) {
      return false; // Scheduling year is before current year
    } else {
      // Scheduling year is the same as current year, compare months
      if (schedulingMonthNumber > currentMonth) {
        return true; // Scheduling month is after current month
      } else if (schedulingMonthNumber < currentMonth) {
        return false; // Scheduling month is before current month
      } else {
        // Scheduling month is the same as current month, compare days
        return schedulingDayNumber > currentDay; // Scheduling day is after current day
      }
    }
  }

  const handleCancel = async (booking) => {
    try {
      const response = await axios.put(
        `${endpoint}/users/booking/cancel/${booking._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchBookingData();
        toast.success(response.data.message, {
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
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 font-inter">My Bookings</h2>
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
          placeholder="Filter by doctor..."
          className="border border-gray-300 rounded-md p-2 mr-2"
          value={filterOptions.doctor}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, doctor: e.target.value })
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
              <div className="mb-2 border-b border-gary-300 px-3 py-2">
                <p>
                  Schedule Time:
                  {booking.scheduletime}
                </p>
                <p>Appointment ID: {booking.appointment_id}</p>
                <p>Booking Status: {booking.booking_status}</p>
                <p>Visiting Status: {booking.visiting_status}</p>
                <p>
                  CreatedAt:{" "}
                  {new Date(booking.createdAt).toLocaleString("en-GB")}
                </p>
              </div>
              <div className="flex  gap-4 items-center">
                <img
                  src={`${endpoint}/users/profile/${booking.doctor?.d_profile_pic}`}
                  alt="doctor profile"
                  className="w-20 h-20 rounded-full border border-gray-300"
                />
                <div>
                  <p>
                    Doctor: {booking.doctor.d_firstname}
                    {booking.doctor.d_lastname}
                  </p>

                  <p>Email: {booking.doctor.d_email}</p>
                  <p>Contact: {booking.doctor.d_contact}</p>
                  <p>Specialist: {booking.doctor.occupation}</p>
                  <p>
                    Location: {booking.doctor.d_location.city},
                    {booking.doctor.d_location.state}
                  </p>
                  <p>Address: {booking.doctor.d_address}</p>
                </div>
              </div>
            </div>
            {/* Render the cancel button only if conditions are met */}

            {booking.booking_status !== "Cancelled" &&
              booking.visiting_status !== "Visited" &&
              isAfterSchedulingDate(booking.scheduletime) && (
                <button
                  className="bg-red-500 text-white rounded-md px-3 py-2 mx-3 my-3"
                  onClick={() => handleCancel(booking)}
                >
                  Cancel
                </button>
              )}
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default UserBooking;
