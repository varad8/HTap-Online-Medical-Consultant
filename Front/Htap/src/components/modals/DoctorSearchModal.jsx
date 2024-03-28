import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorSearchModal({ doctorData, isOpen, handleClose, timeforbooked }) {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [userprofile, setProfile] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [problem, setProblem] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [date, setDate] = useState("");

  const endpoint = `${import.meta.env.VITE_KEY}`;

  useEffect(() => {
    //Fetch Profile
    const fetchProfile = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(`${endpoint}/users/profile`, config);
        setProfile(response?.data);
        console.log(response?.data);
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

    fetchProfile();
  }, []);

  function convertTo12HourFormatRange(timeString) {
    // Split the time range into start and end times
    const [startTime, endTime] = timeString.split(" - ");

    // Convert start and end times to 12-hour format
    const formattedStartTime = convertTo12HourFormat(startTime);
    const formattedEndTime = convertTo12HourFormat(endTime);

    // Return the formatted time range
    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  // Function to convert time to 12-hour format
  function convertTo12HourFormat(timeString) {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);

    // Determine AM or PM
    const meridiem = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Format minutes with leading zeros
    const paddedMinutes = minutes.toString().padStart(2, "0");

    // Return the formatted time
    return `${hours12}:${paddedMinutes} ${meridiem}`;
  }

  // Function to handle opening the booking modal
  const handleOpenBookingModal = () => {
    setShowBookingModal(true);
  };

  // Function to handle closing the booking modal
  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
  };

  //save booking
  const handleSaveBooking = async (doctor) => {
    setSelectedDoctor(doctor);
    setDate(timeforbooked);
    handleOpenBookingModal();
  };

  const handleSubmitPatientInfo = async () => {
    try {
      const formattedDate = new Date(date).toLocaleDateString("en-GB");

      const data = {
        pid: userprofile?.pid,
        d_id: selectedDoctor?.d_id,
        patient_problem: problem,
        patient: userprofile?._id,
        doctor: selectedDoctor?._id,
        schedule_time: formattedDate,
        mobileno: mobileNo,
      };

      const response = await toast.promise(
        axios.post(`${endpoint}/users/booking/save`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          pending: "Booking saving...",
          success: "Booking saved successfully 🎉",
          error: "Booking Failed",
        }
      );

      if (response) {
        handleCloseBookingModal();
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

  const activateChat = async (doctorProfile) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const userId = `user${session.id}`;
      const docId = `doctor${doctorProfile.d_id}`;
      const patient = userprofile._id;
      const doctor = doctorProfile._id;
      const uid = session.id;
      const did = doctorProfile.d_id;

      // Request to create a new chat room
      const response = await axios.post(
        `${endpoint}/chatrooms`,
        { userId, docId, patient, doctor, uid, did },
        config
      );

      toast.success("Chat Room Activated", {
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

      console.log("Chat room created:", response?.data);
      navigate(`/dashboard/messages/${response.data.chatRoomId}`);
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

      {isOpen && (
        <div className="bg-voilet bg-opacity-20 flex items-center justify-center fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-md">
          {/* Doctor Details */}
          <div className="relative w-full max-w-7xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-xl border border-violet-300">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-medium font-inter text-black">
                  Doctor Details
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-violet-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="extralarge-modal"
                >
                  <svg
                    className="w-3 h-3 text-violet-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                    onClick={handleClose}
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                {doctorData.map((doctor) => (
                  <>
                    {/* Doctor Details */}
                    <div
                      key={doctor._id}
                      className="flex flex-wrap gap-6 items-center border-b border-gray-300 py-2 px-3"
                    >
                      <div>
                        <img
                          src={`${endpoint}/doctor/profile/${doctor?.d_profile_pic}`}
                          className="w-24 h-24 rounded-full border border-violet-400 shadow object-cover object-center"
                          alt="Doctor Image"
                        />
                      </div>

                      <div>
                        {/* Name */}
                        <h3 className="text-lg font-semibold text-violet-800 font-inter mb-2">
                          Dr. {doctor.d_firstname} {doctor.d_lastname}
                        </h3>
                        {/* Email */}
                        <p className="mb-2 font-inter text-base">
                          Email: {doctor.d_email}
                        </p>
                        {/* Contact */}
                        <p className="mb-2 font-inter text-base">
                          Contact: {doctor.d_contact}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Work & experience
                        </h3>

                        <p className="mb-2 text-base font-inter">
                          Specialist In: {doctor.occupation}
                        </p>

                        <p className="mb-2 text-base font-inter">
                          Experience: {doctor.d_exp} years
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Location & address
                        </h3>

                        <p className="mb-2 text-base font-inter">
                          Location: {doctor.d_location.city},
                          {doctor.d_location.state}
                        </p>

                        <p className="mb-2 text-base font-inter">
                          Address: {doctor.d_address}
                        </p>
                      </div>

                      {/* Service Hours */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Service Hours
                        </h3>
                        <ul className="ml-6 list-disc flex gap-2 flex-col">
                          {/* Iterate over service hours */}
                          {Object.entries(doctor.servicehours).map(
                            ([day, hours]) => (
                              <li key={day}>
                                {day}: {convertTo12HourFormatRange(hours)}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Action Call/Book/Chat */}
                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={() => {
                            activateChat(doctor);
                          }}
                          type="button"
                          className="bg-violet-500 text-white px-10 py-2 rounded-lg"
                        >
                          Chat
                        </button>

                        <button
                          type="button"
                          className="bg-blue-500 text-white px-10 py-2 rounded-lg"
                        >
                          Call
                        </button>

                        <button
                          onClick={() => handleSaveBooking(doctor)}
                          type="button"
                          className="bg-yellow-500 text-white px-10 py-2 rounded-lg"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>

              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                <p className="font-inter text-sm leading-normal">
                  <span className="text-red-500">* </span>Select doctor that you
                  want and click on book.
                </p>
              </div>
            </div>
          </div>

          {/* New Booking Modal */}
          {showBookingModal && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
              <div className="relative w-full max-w-3xl  bg-white rounded-lg shadow-xl border border-violet-300 mx-4 container">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-xl font-medium font-inter text-black">
                    Patient Information
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-violet-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={handleCloseBookingModal}
                  >
                    <svg
                      className="w-3 h-3 text-violet-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Modal body */}
                <div className="p-4 md:p-5 space-y-4">
                  <div className="flex flex-col space-y-4">
                    <input
                      type="text"
                      placeholder="Problem"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500"
                    />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Modal footer */}
                <div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                  <button
                    onClick={handleSubmitPatientInfo}
                    type="button"
                    className="bg-yellow-500 text-white px-10 py-2 rounded-lg"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DoctorSearchModal;
