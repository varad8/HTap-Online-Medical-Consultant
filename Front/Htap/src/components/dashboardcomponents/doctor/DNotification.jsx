import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faRecycle,
  faStar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function DNotification() {
  const session = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const [notificationdata, setNotificationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    doctorName: "",
    rating: "",
  });

  useEffect(() => {
    fetchNotificationData();
  }, [session?.id, token, endpoint]);

  const fetchNotificationData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/notification/get/did/${session.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotificationData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.error, {
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    let filteredResults = notificationdata.filter((item) => {
      let valid = true;
      if (
        filters.date &&
        new Date(item.createdAt).toISOString().slice(0, 10) !== filters.date
      )
        valid = false;
      if (
        filters.doctorName &&
        !item.patient.p_firstname
          .toLowerCase()
          .includes(filters.doctorName.toLowerCase())
      )
        valid = false;
      if (filters.rating && item.ratings !== parseInt(filters.rating))
        valid = false;
      return valid;
    });
    setFilteredData(filteredResults);
  }, [notificationdata, filters]);

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />
        );
      } else {
        stars.push(
          <FontAwesomeIcon icon={faStar} key={i} className="text-gray-500" />
        );
      }
    }
    return stars;
  };

  const openRatingModal = async (ratingdata) => {
    console.log(ratingdata);
    try {
      const response = await axios.get(
        `${endpoint}/users/notification/${ratingdata?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle(response?.data?.notification_title);
      setContent(response?.data?.feedback_message);
      setRating(response?.data?.rating);
      setSelectedRatingData(response.data);
      setIsOpentUpdateModal(true);
    } catch (error) {
      toast.error(error?.response?.data?.error, {
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
    <div className="container mx-auto p-8">
      <div className="grid xl:grid-cols-4 lg:grid-cols-4 grid-cols-2 gap-4 mb-5">
        {/* Filter Controls */}

        <div className="flex gap-2 flex-col">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="outline-violet-600 border border-violet-400 px-3 py-2 rounded-md shadow"
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label>Patient Name:</label>
          <input
            type="text"
            name="doctorName"
            value={filters.doctorName}
            onChange={handleFilterChange}
            className="outline-violet-600 border border-violet-400 px-3 py-2 rounded-md shadow"
          />
        </div>

        <div className="flex gap-2 flex-col">
          <label>Rating:</label>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="outline-violet-600 border border-violet-400 px-3 py-2 rounded-md shadow"
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* End Filter Controls */}
      </div>

      {/* Notification Grid */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-4">
        {filteredData.map((notification) => (
          <div
            key={notification._id}
            className="bg-white shadow-md border border-gray-200 p-4 rounded-md"
          >
            <h2 className="text-lg font-semibold">
              {notification.notification_title}
            </h2>
            <p className="text-gray-600 mb-2">
              {notification.feedback_message}
            </p>

            <hr />
            <div className="px-2 py-2">
              <p className="text-gray-600">
                Patient Name: {notification.patient.p_firstname}{" "}
                {notification.patient.p_lastname}
              </p>
              <p className="text-gray-600">
                Contact: {notification.patient.p_contact}
              </p>
              <p className="text-gray-600">
                Address: {notification.patient.p_add}
              </p>
            </div>
            <div className="flex items-center text-yellow-500 border-t mt-4 p-2 justify-between">
              <div> {renderStarRating(notification.ratings)}</div>
              <p className="text-gray-600 text-sm">
                Created At: {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default DNotification;
