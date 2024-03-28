import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserProfile() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const locationApi = `${import.meta.env.VITE_CITY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [p_email, setPEmail] = useState(null);
  const [p_firstname, setPfirstName] = useState(null);
  const [p_lastname, setPLastName] = useState(null);
  const [p_contact, setPcontact] = useState(null);
  const [p_add, setPAddress] = useState(null);
  const [p_username, setPUsername] = useState(null);
  const [p_location, setPLocation] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

    fetchProfile(token, endpoint);
    fetchData();
  }, []);

  //Fetch Profile
  const fetchProfile = async (token, endpoint) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${endpoint}/users/profile`, config);
      setUserData(response.data);
      setPEmail(response.data.p_email || "");
      setPfirstName(response.data.p_firstname || "");
      setPLastName(response.data.p_lastname || "");
      setPcontact(response.data.p_contact || "");
      setPAddress(response.data.p_add || "");
      setPUsername(response.data.p_username || "");
      setPLocation({
        city: response.data.p_location?.city || "",
        state: response.data.p_location?.state || "",
      });
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

      console.log(p_location);
      // Create formData object
      const formData = new FormData();
      formData.append("firstname", p_firstname);
      formData.append("lastname", p_lastname);
      formData.append("address", p_add);
      formData.append("city", p_location.city);
      formData.append("state", p_location.state);
      formData.append("email", p_email);
      formData.append("contact", p_contact);
      formData.append("username", session?.username);
      formData.append("file", selectedFile);
      const response = await axios.put(
        `${endpoint}/users/profile/update`,
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
      formData.append("firstname", p_firstname);
      formData.append("lastname", p_lastname);
      formData.append("address", p_add);
      formData.append("city", p_location.city);
      formData.append("state", p_location.state);
      formData.append("email", p_email);
      formData.append("contact", p_contact);
      formData.append("username", session?.username);
      formData.append("file", selectedFile);

      const response = await axios.post(
        `${endpoint}/users/profile/create`,
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

  const headingText = userData ? "My Profile" : "Create Profile";

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
      <div className="mb-5">
        <h2 className="font-inter font-medium text-xl border-b border-gray-300 mb-2 px-2 py-2">
          {headingText}
        </h2>

        {/* Profile */}
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 ">
          <div className=" flex flex-col gap-9">
            <div className="rounded-sm border  bg-white shadow-md ">
              <div className="border-b  py-4 px-6 ">
                <h3 className="font-medium text-black">Personal Information</h3>
              </div>
              <div className="flex flex-col gap-5 p-6">
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
                      `${endpoint}/users/profile/${userData?.p_profile_pic}`
                    }
                    className="rounded-full w-20 h-20 border"
                    alt="Profile"
                    onClick={handleImageClick}
                  />
                </div>
                <div className="mt-5 grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      className="floating-input peer"
                      name="p_firstname"
                      id="p_firstname"
                      disabled={!editMode}
                      value={p_firstname}
                      onChange={(e) => setPfirstName(e.target.value)}
                    />
                    <label
                      htmlFor="p_firstname"
                      className="peer-focus:font-medium font-inter absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-violet-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      className="floating-input peer"
                      placeholder=""
                      name="p_lastname"
                      id="p_lastname"
                      disabled={!editMode}
                      value={p_lastname}
                      onChange={(e) => setPLastName(e.target.value)}
                    />
                    <label
                      htmlFor="p_lastname"
                      className="peer-focus:font-medium font-inter absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-violet-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="mt-5 grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="email"
                      className="floating-input peer"
                      name="p_email"
                      id="p_email"
                      disabled={!editMode}
                      value={p_email}
                      onChange={(e) => setPEmail(e.target.value)}
                    />
                    <label
                      htmlFor="p_email"
                      className="peer-focus:font-medium font-inter absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-violet-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="tel"
                      className="floating-input peer"
                      placeholder=" "
                      disabled={!editMode}
                      value={p_contact}
                      onChange={(e) => setPcontact(e.target.value)}
                    />
                    <label
                      htmlFor="p_contact"
                      className="peer-focus:font-medium font-inter absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-violet-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Mobile No
                    </label>
                  </div>
                </div>

                <div className="mt-5 grid gap-2 grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <textarea
                      type="text"
                      className="floating-input peer"
                      disabled={!editMode}
                      value={p_add}
                      onChange={(e) => setPAddress(e.target.value)}
                    ></textarea>
                    <label
                      htmlFor="address"
                      className="peer-focus:font-medium font-inter absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-violet-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Address
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label class="mb-3 block font-medium text-sm text-black font-inter">
                    Location
                  </label>
                  <select
                    className="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                    disabled={!editMode}
                    value={`${p_location.city}, ${p_location.state}`}
                    onChange={(e) => {
                      const selectedLocation = e.target.value;
                      const [city, state] = selectedLocation.split(", ");
                      setPLocation({ city, state });
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

                {/* Actions Button */}

                <div className="flex gap-3 justify-between items-center mt-3 mb-5">
                  <button
                    onClick={handleEditClick}
                    className="bg-white shadow rounded-lg border px-6 py-2 font-inter font-medium hover:bg-violet-500 hover:text-white border-gray-300"
                  >
                    Edit
                  </button>

                  {!userData ? (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
