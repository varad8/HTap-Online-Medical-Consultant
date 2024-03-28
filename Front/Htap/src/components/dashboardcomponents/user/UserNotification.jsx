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

function UserNotification() {
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

  const [isOpenUpdateModal, setIsOpentUpdateModal] = useState(false);
  const [selectedRatingData, setSelectedRatingData] = useState(null);
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotificationData();
  }, [session?.id, token, endpoint]);

  const fetchNotificationData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/users/notification/get/pid/${session.id}`,
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
        !item.doctor.d_firstname
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

  const closeRatingModal = () => {
    setIsOpentUpdateModal(false);
  };

  const handleStarClick = (starValue) => {
    // Toggle the rating between the current rating and zero if the same star is clicked again
    setRating((prevRating) => (prevRating === starValue ? 0 : starValue));
  };

  const updateRating = async () => {
    console.log(title, content, rating, selectedRatingData._id);
    try {
      const response = await axios.put(
        `${endpoint}/users/notification/update/${selectedRatingData?._id}`,
        {
          notification_title: title,
          feedback_message: content,
          ratings: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form fields and close modal on successful update
      fetchNotificationData();
      setIsOpentUpdateModal(false);
      setTitle("");
      setContent("");
      setRating(0);

      // Show success toast message
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
    } catch (error) {
      // Reset form fields and close modal on error
      setIsOpentUpdateModal(false);
      setTitle("");
      setContent("");
      setRating(0);

      // Show error toast message
      toast.error(error?.response?.data?.error || "An error occurred", {
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

  const deleteRating = async (id) => {
    try {
      // Ask for confirmation before deleting
      const confirmed = window.confirm(
        "Are you sure you want to delete this rating?"
      );
      if (!confirmed) return; // If not confirmed, exit the function

      const response = await axios.delete(
        `${endpoint}/users/notification/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotificationData();

      // Show success toast message
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
    } catch (error) {
      // Show error toast message
      toast.error(error?.response?.data?.error || "An error occurred", {
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
          <label>Doctor Name:</label>
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
            <p className="text-gray-600">
              Created At: {new Date(notification.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-600">
              Doctor Name: {notification.doctor.d_firstname}{" "}
              {notification.doctor.d_lastname}
            </p>
            <p className="text-gray-600">
              Doctor Contact: {notification.doctor.d_contact}
            </p>
            <p className="text-gray-600">
              Doctor Address: {notification.doctor.d_address}
            </p>
            <div className="flex items-center text-yellow-500 border-t mt-4 p-2 justify-between">
              <div> {renderStarRating(notification.ratings)}</div>
              <div>
                <button
                  onClick={() => openRatingModal(notification)}
                  type="button"
                  className="bg-blue-600 px-4 py-2 text-white rounded-lg"
                >
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => deleteRating(notification._id)}
                  className="bg-red-600 px-4 py-2 text-white rounded-lg"
                >
                  <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Update Modal */}
      {isOpenUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative bg-violet-50 border-2 border-violet-500 p-8 max-w-full rounded-lg shadow-sm">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src="/src/assets/doctorimage.png"
                alt="Halfway Image"
                className="w-48 h-48 z-10"
              />
            </div>

            <div className="relative mt-20">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={`text-${
                      star <= rating ? "yellow" : "gray"
                    }-500 cursor-pointer mr-2`}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
              <input
                type="text"
                placeholder="Title"
                className="border border-violet-300 rounded px-3 py-2 mb-4 w-full outline-violet-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Content"
                className="border border-violet-300 rounded px-3 py-2 mb-4 w-full resize-none outline-violet-400"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={updateRating}
                className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>

              <button
                type="button"
                onClick={closeRatingModal}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default UserNotification;
