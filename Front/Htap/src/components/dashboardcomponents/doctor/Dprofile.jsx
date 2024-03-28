import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dprofile() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const locationApi = `${import.meta.env.VITE_CITY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [doctorData, setDoctorData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [d_username, setDUsername] = useState(null);
  const [d_firstname, setDFirstName] = useState(null);
  const [d_lastname, setDLastname] = useState(null);
  const [d_contact, setDcontact] = useState(null);
  const [d_email, setDEmail] = useState(null);
  const [d_address, setDAddress] = useState(null);
  const [d_exp, setDExp] = useState(null);
  const [d_location, setDLocation] = useState([]);
  const [occupation, setOccupation] = useState();
  const [account_status, setAccountStatus] = useState();
  const [specailistdata, setSpecialistData] = useState();
  const [servicehours, setSetviceHours] = useState({
    monday: "09:00 - 22:00",
    tuesday: "09:00 - 22:00",
    wednesday: "09:00 - 22:00",
    thursday: "09:00 - 22:00",
    friday: "09:00 - 22:00",
    saturday: "09:00 - 22:00",
    sunday: "09:00 - 22:00",
  });
  const [selectedSpecialist, setSelectedSpecialist] = useState("");

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
        const response = await axios.get(`${endpoint}/doctor/specailist/all`);
        setSpecialistData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfile(token, endpoint);
    fetchSpecialistCategory();
    fetchData();
  }, []);

  //Fetch doctor profile

  const fetchProfile = async (token, endpoint) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${endpoint}/doctor/profile`, config);
      setDoctorData(response.data);
      setDEmail(response.data.d_email || "");
      setDFirstName(response.data.d_firstname || "");
      setDLastname(response.data.d_lastname || "");
      setDcontact(response.data.d_contact || "");
      setDAddress(response.data.d_address || "");
      setDUsername(response.data.d_username || "");
      setOccupation(response.data.occupation || "");
      setSetviceHours(response.data.servicehours || "");
      setSelectedSpecialist(response.data.occupation || "");
      setDExp(response.data.d_exp || "");
      setAccountStatus(response.data.account_status || "");
      setDLocation({
        city: response.data.d_location?.city || "",
        state: response.data.d_location?.state || "",
      });

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

  const handleInputChange = (day, value) => {
    // Update the servicehours state with the new time immediately
    setSetviceHours((prevServiceHours) => {
      const updatedHours = { ...prevServiceHours, [day]: value };
      console.log("Updated service hours:", updatedHours);
      return updatedHours;
    });
  };

  const headingText = doctorData ? "My Profile" : "Create Profile";

  const handleEditClick = () => {
    setEditMode(true);
  };

  //update profile
  const handleProfileUpdate = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      // Create formData object
      const formData = new FormData();
      formData.append("firstname", d_firstname);
      formData.append("lastname", d_lastname);
      formData.append("address", d_address);
      formData.append("city", d_location.city);
      formData.append("state", d_location.state);
      formData.append("email", d_email);
      formData.append("contact", d_contact);
      formData.append("username", session?.username);
      formData.append("occupation", occupation);
      formData.append("servicehours", JSON.stringify(servicehours));
      formData.append("exp", d_exp);
      formData.append("file", selectedFile);
      const response = await axios.put(
        `${endpoint}/doctor/profile/update`,
        formData,
        config
      );
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
      await fetchProfile(token, endpoint);
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

  // Function to handle profile creation
  const handleProfileCreate = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      // Create formData object
      const formData = new FormData();
      formData.append("firstname", d_firstname);
      formData.append("lastname", d_lastname);
      formData.append("address", d_address);
      formData.append("city", d_location.city);
      formData.append("state", d_location.state);
      formData.append("email", d_email);
      formData.append("contact", d_contact);
      formData.append("username", session?.username);
      formData.append("occupation", selectedSpecialist);
      formData.append("servicehours", JSON.stringify(servicehours));
      formData.append("exp", d_exp);
      formData.append("file", selectedFile);
      const response = await axios.post(
        `${endpoint}/doctor/profile/create`,
        formData,
        config
      );
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
      await fetchProfile(token, endpoint);
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
    setSelectedSpecialist(e.target.value);
  };

  return (
    <>
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
        <div className="mb-5">
          <div className="flex justify-between border-b border-gray-300 mb-2 px-2 py-2">
            <h2 className="font-inter  font-medium text-xl ">
              <span>{headingText}</span>
            </h2>
            <span
              className={`text-white inline-block px-2 py-1 font-inter text-[13px] rounded-md ${
                account_status === "NOT APPROVED"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {account_status}
            </span>
          </div>

          <div class="grid grid-cols-1 gap-9 sm:grid-cols-2 overflow-hidden">
            <div class=" flex flex-col gap-9 mb-3 overflow-hidden">
              <div class="rounded-sm border  bg-white shadow-sm ">
                <div class="border-b  py-4 px-6 dark:dark">
                  <h3 class="font-medium text-black font-inter">
                    Personal Information
                  </h3>
                </div>
                <form>
                  <div className="mt-5 flex items-center justify-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                    <img
                      src={
                        profileImage ||
                        `${endpoint}/doctor/profile/${doctorData?.d_profile_pic}`
                      }
                      className="rounded-full w-20 h-20 border"
                      alt="Profile"
                      onClick={handleImageClick}
                    />
                  </div>

                  <div class="flex flex-col gap-5 p-6">
                    <div class="mt-5 grid md:grid-cols-2 md:gap-6">
                      <div>
                        <label class="mb-3 block font-medium text-sm text-black font-inter">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          disabled={!editMode}
                          value={d_firstname}
                          onChange={(e) => setDFirstName(e.target.value)}
                          class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        />
                      </div>

                      <div>
                        <label class="mb-3 block font-medium text-sm text-black font-inter">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          disabled={!editMode}
                          value={d_lastname}
                          onChange={(e) => setDLastname(e.target.value)}
                          class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        />
                      </div>
                    </div>

                    <div class="mt-5 grid md:grid-cols-2 md:gap-6">
                      <div>
                        <label class="mb-3 block font-medium text-sm text-black font-inter">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          disabled={!editMode}
                          value={d_email}
                          onChange={(e) => setDEmail(e.target.value)}
                          class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        />
                      </div>

                      <div>
                        <label class="mb-3 block font-medium text-sm text-black font-inter">
                          Mobile No
                        </label>
                        <input
                          type="text"
                          name="mobile"
                          id="mobile"
                          disabled={!editMode}
                          value={d_contact}
                          onChange={(e) => setDcontact(e.target.value)}
                          class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        />
                      </div>

                      <div>
                        <label class="mb-3 block font-medium text-sm text-black font-inter">
                          Experience
                        </label>
                        <input
                          type="number"
                          name="exp"
                          id="exp"
                          disabled={!editMode}
                          value={d_exp}
                          onChange={(e) => setDExp(e.target.value)}
                          class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        />
                      </div>

                      <div>
                        <label class="mb-3 block font-medium text-sm text-black font-inter">
                          Specialist In
                        </label>
                        <select
                          value={selectedSpecialist}
                          onChange={handleChange}
                          className="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        >
                          <option value="" disabled>
                            Select Specialist
                          </option>
                          {specailistdata?.map((specialist) => (
                            <option
                              key={specialist._id}
                              value={specialist.name}
                              className="text-base"
                            >
                              {specialist.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label class="mb-3 block font-medium text-sm text-black font-inter">
                          Address
                        </label>
                        <textarea
                          type="text"
                          name="address"
                          id="address"
                          disabled={!editMode}
                          value={d_address}
                          onChange={(e) => setDAddress(e.target.value)}
                          class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        ></textarea>
                      </div>

                      <div className="flex flex-col">
                        <label class="mb-3 block font-medium text-sm text-black font-inter">
                          Location
                        </label>
                        <select
                          className="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                          disabled={!editMode}
                          value={`${d_location.city}, ${d_location.state}`}
                          onChange={(e) => {
                            const selectedLocation = e.target.value;
                            const [city, state] = selectedLocation.split(", ");
                            setDLocation({ city, state });
                          }}
                        >
                          <option value="" disabled selected>
                            Choose location
                          </option>
                          {locationData?.map((location) => (
                            <option
                              key={location.id}
                              value={`${location.name}, ${location.state}`}
                            >
                              {`${location.name}, ${location.state}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class=" flex flex-col gap-9 mb-3 overflow-hidden">
              <div class="rounded-sm border  bg-white shadow-sm ">
                <div class="border-b  py-4 px-6 dark:dark">
                  <h3 class="font-medium text-black font-inter">
                    Service hours
                  </h3>
                </div>

                {Object.entries(servicehours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex p-6 gap-3 justify-between items-center"
                  >
                    <div className="flex flex-col gap-3 items-center">
                      <label htmlFor={`${day}-opening`}>
                        {day} Opening Time
                      </label>
                      <input
                        class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        type="time"
                        id={`${day}-opening`}
                        value={servicehours[day].split(" - ")[0]}
                        onChange={(e) =>
                          handleInputChange(
                            day,
                            `${e.target.value} - ${
                              servicehours[day].split(" - ")[1]
                            }`
                          )
                        }
                      />
                    </div>

                    <div className="flex flex-col items-center gap-3">
                      <label htmlFor={`${day}-closing`}>
                        {day} Closing Time
                      </label>
                      <input
                        class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        type="time"
                        id={`${day}-closing`}
                        value={servicehours[day].split(" - ")[1]}
                        onChange={(e) =>
                          handleInputChange(
                            day,
                            `${servicehours[day].split(" - ")[0]} - ${
                              e.target.value
                            }`
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <p className="font-inter text-gray-500 text-sm p-5">
                  <span className="text-red-500">*</span> Please ! when you
                  first create profile then update time because by default time
                  set is 09:00 AM - 10:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Actions Button */}

          <div className="flex gap-6 justify-center items-center mt-5">
            <button
              onClick={handleEditClick}
              className="bg-white shadow rounded-lg border px-6 py-2 font-inter font-medium hover:bg-violet-500 hover:text-white border-gray-300"
            >
              Edit
            </button>

            {!doctorData ? (
              <button
                onClick={handleProfileCreate}
                className="bg-white shadow rounded-lg border px-6 py-2 font-inter font-medium hover:bg-violet-500 hover:text-white border-gray-300"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleProfileUpdate}
                className="bg-white shadow rounded-lg border px-6 py-2 font-inter font-medium hover:bg-violet-500 hover:text-white border-gray-300"
              >
                Update
              </button>
            )}
          </div>

          <br />
        </div>
      </div>
    </>
  );
}

export default Dprofile;
