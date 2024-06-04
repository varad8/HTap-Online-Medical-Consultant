import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";

function DoctorReport() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [weeklyData, setWeeklyData] = useState([]);
  const [filteredWeeklyData, setFilteredWeeklyData] = useState([]);
  const [scheduleDateFilter, setScheduleDateFilter] = useState("");
  const [visitingStatusFilter, setVisitingStatusFilter] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("");
  const [reports, setReports] = useState("Weekly");

  useEffect(() => {
    switch (reports) {
      case "Monthly":
        fetchReportMonthly(session?.id);
        break;
      case "Yearly":
        fetchReportYearly(session?.id);
        break;
      default:
        fetchReportWeekly(session?.id);
        break;
    }
  }, [location, reports]);

  const handleReportType = (reportType) => {
    setReports(reportType);
  };

  const fetchReportWeekly = async (myParam) => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/reports/weekly/${myParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extracting date part only from the timestamp
      const formattedData = response?.data?.data.map((week) => ({
        ...week,
        bookings: week.bookings.map((booking) => ({
          ...booking,
          scheduletime: new Date(booking.scheduletime).toLocaleDateString(
            "en-GB"
          ), // Change the date format as needed
        })),
      }));

      setWeeklyData(formattedData);
      setFilteredWeeklyData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReportMonthly = async (myParam) => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/reports/monthly/${myParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extracting date part only from the timestamp
      const formattedData = response?.data?.data.map((week) => ({
        ...week,
        bookings: week.bookings.map((booking) => ({
          ...booking,
          scheduletime: new Date(booking.scheduletime).toLocaleDateString(
            "en-GB"
          ), // Change the date format as needed
        })),
      }));

      setWeeklyData(formattedData);
      setFilteredWeeklyData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReportYearly = async (myParam) => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/reports/yearly/${myParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extracting date part only from the timestamp
      const formattedData = response?.data?.data.map((week) => ({
        ...week,
        bookings: week.bookings.map((booking) => ({
          ...booking,
          scheduletime: new Date(booking.scheduletime).toLocaleDateString(
            "en-GB"
          ), // Change the date format as needed
        })),
      }));

      setWeeklyData(formattedData);
      setFilteredWeeklyData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = (
    dateFilter,
    visitingStatusFilter,
    bookingStatusFilter
  ) => {
    let filteredData = [...weeklyData];

    // Filter by Schedule Date
    if (dateFilter) {
      filteredData = filteredData.map((week) => ({
        ...week,
        bookings: week.bookings.filter(
          (booking) =>
            booking.scheduletime ===
            new Date(dateFilter).toLocaleDateString("en-GB")
        ),
      }));
    }

    // Filter by Visiting Status
    if (visitingStatusFilter) {
      filteredData = filteredData.map((week) => ({
        ...week,
        bookings: week.bookings.filter(
          (booking) => booking.visiting_status === visitingStatusFilter
        ),
      }));
    }

    // Filter by Booking Status
    if (bookingStatusFilter) {
      filteredData = filteredData.map((week) => ({
        ...week,
        bookings: week.bookings.filter(
          (booking) => booking.booking_status === bookingStatusFilter
        ),
      }));
    }

    setFilteredWeeklyData(filteredData);
  };

  const handleScheduleDateChange = (e) => {
    const value = e.target.value;
    setScheduleDateFilter(value);
    filterData(value, visitingStatusFilter, bookingStatusFilter);
  };

  const handleVisitingStatusChange = (e) => {
    const value = e.target.value;
    setVisitingStatusFilter(value);
    filterData(scheduleDateFilter, value, bookingStatusFilter);
  };

  const handleBookingStatusChange = (e) => {
    const value = e.target.value;
    setBookingStatusFilter(value);
    filterData(scheduleDateFilter, visitingStatusFilter, value);
  };

  const clearFilters = () => {
    setFilteredWeeklyData(weeklyData);
    setScheduleDateFilter("");
    setVisitingStatusFilter("");
    setBookingStatusFilter("");
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <ToastContainer />

        <div className="overflow-x-auto">
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

          <div className="flex flex-wrap flex-col">
            {/* Filter options */}
            <div className="flex justify-between gap-3 items-center mb-3 mt-3">
              {/* Filter By ScheduleTime */}
              <div className="flex gap-2 items-start flex-col">
                <p>Schedule Date</p>
                <input
                  className="border border-black outline-none focus:outline-none rounded px-3 py-1"
                  type="date"
                  placeholder="Select Date"
                  value={scheduleDateFilter}
                  onChange={handleScheduleDateChange}
                />
              </div>

              {/* Filter By Visiting Status */}
              <div className="flex gap-2 items-start flex-col">
                <p>Visiting Status</p>
                <select
                  className="border border-black outline-none focus:outline-none rounded px-3 py-1"
                  value={visitingStatusFilter}
                  onChange={handleVisitingStatusChange}
                >
                  <option value="" disabled>
                    Select Visiting Status
                  </option>
                  <option value="Visited">Visited</option>
                  <option value="Not Visited">Not Visited</option>
                </select>
              </div>

              {/* Filter By Booking Status */}
              <div className="flex gap-2 items-start flex-col">
                <p>Booking Status</p>
                <select
                  className="border border-black outline-none focus:outline-none rounded px-3 py-1"
                  value={bookingStatusFilter}
                  onChange={handleBookingStatusChange}
                >
                  <option value="" disabled>
                    Select Booking Status
                  </option>
                  <option value="Booked">Booked</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-2 items-start flex-col">
                <p>Clear</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="bg-red-500 rounded-md px-3 py-2 text-white"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3  border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Problem
                    </th>
                    <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule Time
                    </th>
                    <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visiting Status
                    </th>
                    <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Status
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWeeklyData?.map((week) =>
                    week.bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.patient.p_firstname}{" "}
                          {booking.patient.p_lastname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.patient_problem}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.scheduletime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.visiting_status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.booking_status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorReport;
