import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStreetView,
  faTeeth,
  faGlasses,
  faMapMarkerAlt,
  faCalendarAlt,
  faUserAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorSearchModal from "./modals/DoctorSearchModal";

function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const [searchDoctorData, setSearchDoctorData] = useState([]);
  const token = localStorage.getItem("token");
  const [locationData, setLocationData] = useState(null);
  const [specialistData, setSpecailistData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSpecailist, setSelectedSpecailist] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const locationApi = `${import.meta.env.VITE_CITY}`;
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(locationApi);
        setLocationData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSpecialistCategory = async () => {
      try {
        const response = await axios.get(`${endpoint}/users/specailist/all`);
        setSpecailistData(response.data);
        console.log(response.data);
        handleShowModal();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchSpecialistCategory();
  }, []);

  const searchDoctor = async () => {
    if (session?.role === "user") {
      const [city, state] = selectedLocation.split(",");
      try {
        const response = await axios.get(`${endpoint}/users/doctor/location`, {
          params: { city: city, state: state, occupation: selectedSpecailist },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length === 0) {
          toast.info("Doctor not found for that location and specialist", {
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

        setSearchDoctorData(response.data);
        setShowModal(true);
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
    } else {
      toast.info(
        "This feature is work only for patient not for you please contact us to admin",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      />{" "}
      {searchDoctorData.length > 0 && (
        <DoctorSearchModal
          doctorData={searchDoctorData}
          isOpen={showModal}
          handleClose={handleCloseModal}
          timeforbooked={selectedDate}
        />
      )}
      <div className="relative bg-white pb-10 lg:mb-10 xl:mb-10 mb-40">
        <div className="flex flex-col md:flex-row  justify-between mb-5">
          <div className="text-center md:text-left md:w-1/2 mx-10">
            <h1 className="lg:text-6xl xl:text-6xl text-4xl font-inter leading-normal">
              Find your doctor and make an appointment
            </h1>
            <p className="mt-2 text-gray-600 font-inter">
              Select preferred doctor and time slot to book appointment or
              consultation
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <img
              src="./src/assets/consultdoctor.jpg"
              alt="Hero"
              className="mx-auto md:mx-0 rounded-b-md"
            />
          </div>
        </div>

        {/* Doctor search container */}
        <div className="absolute w-full -bottom-1/4 lg:bottom-1 xl:bottom-1 xl:left-20 xl:w-1/2 lg:left-20 lg:w-1/2 shadow-lg border border-gray-100 rounded-md bg-white p-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-inter font-semibold">
              Book Appointment Now
            </h3>
            {/* Specialist labels */}
            <div className="w-full overflow-x-auto">
              <div className="flex items-center gap-6 py-2 px-3">
                {specialistData?.map((specailist) => (
                  <button
                    key={specailist._id}
                    className={`flex items-center gap-1 py-1 px-3 rounded-md overflow-hidden ${
                      selectedSpecailist === specailist.name
                        ? "bg-violet-500 text-white"
                        : "bg-gray-100 hover:bg-violet-300"
                    }`}
                    style={{ minWidth: "fit-content" }} // Ensure button expands to fit content
                    onClick={() => setSelectedSpecailist(specailist.name)}
                  >
                    <img
                      src={specailist.link}
                      alt="specialist-icon"
                      className="w-6 h-6"
                    />
                    <span className="font-inter text-sm">
                      {specailist.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 overflow-auto">
            {/* Location */}
            <div className="bg-white px-3 py-2 border rounded-md">
              <div className="flex h-12 gap-2 items-center">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-white rounded-full w-4 h-4 bg-voilet p-2"
                />
                <div className="flex flex-col w-52">
                  <label className="text-gray-600 text-sm font-inter">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="text-black font-inter outline-none"
                  >
                    <option value="" disabled selected>
                      Choose location
                    </option>
                    {locationData?.map((location) => (
                      <option
                        key={location.id}
                        value={`${location.name},${location.state}`}
                      >
                        {`${location.name}, ${location.state}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Date */}
            <div className="bg-white px-3 py-2 border rounded-md">
              <div className="flex h-12 gap-2 items-center">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-yellow-400 rounded-full w-4 h-4 bg-white border border-yellow-400 p-2"
                />
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm font-inter">
                    Appointment Date
                  </label>
                  <input
                    name="date"
                    value={selectedDate}
                    id="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    type="date"
                    className="text-black font-inter outline-none"
                  />
                </div>
              </div>
            </div>
            {/* Who */}
            <div className="bg-white px-3 py-2 border rounded-md">
              <div className="flex h-12 w-28 gap-2 items-center">
                <FontAwesomeIcon
                  icon={faUserAlt}
                  className="text-yellow-400 rounded-full w-4 h-4 bg-white border border-yellow-400 p-2"
                />
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm font-inter">
                    Who
                  </label>
                  <label className="text-black font-inter">1 Adult</label>
                </div>
              </div>
            </div>
            {/* Search Button */}
            <button
              type="button"
              onClick={() => searchDoctor()}
              className="bg-voilet px-5 py-2 border rounded-md"
            >
              <div className="flex h-12 gap-2 items-center">
                <FontAwesomeIcon icon={faSearch} className="text-white" />
                <div className="flex flex-col">
                  <label className="text-white text-sm font-inter">
                    Search
                  </label>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
