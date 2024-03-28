import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminProfile() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [adminProfile, setAdminProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [a_firstname, setFirstName] = useState("");
  const [a_lastname, setLastName] = useState("");
  const [a_address, setAddress] = useState("");
  const [a_email, setEmail] = useState("");
  const [a_contact, setContact] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile(token, endpoint);
  }, []);

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

  //Fetch admin profile

  const fetchProfile = async (token, endpoint) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${endpoint}/admin/profile`, config);
      setAdminProfile(response.data);
      setFirstName(response.data.a_firstname);
      setLastName(response.data.a_lastname);
      setAddress(response.data.a_address);
      setEmail(response.data.a_email);
      setContact(response.data.a_address);
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

  const headingText = adminProfile ? "My Profile" : "Create Profile";

  const handleEditClick = () => {
    setEditMode(true);
  };

  //update profile
  const handleProfileUpdate = async () => {
    console.log(a_email);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      // Create formData object
      const formData = new FormData();
      formData.append("firstname", a_firstname);
      formData.append("lastname", a_lastname);
      formData.append("address", a_address);
      formData.append("email", a_email);
      formData.append("contact", a_contact);
      formData.append("username", session?.username);
      formData.append("file", selectedFile);
      const response = await axios.put(
        `${endpoint}/admin/profile/update`,
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
      formData.append("firstname", a_firstname);
      formData.append("lastname", a_lastname);
      formData.append("address", a_address);
      formData.append("email", a_email);
      formData.append("contact", a_contact);
      formData.append("username", session?.username);
      formData.append("file", selectedFile);

      const response = await axios.post(
        `${endpoint}/admin/profile/create`,
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
                        `${endpoint}/admin/profile/${adminProfile?.a_profile_pic}`
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
                          value={a_firstname}
                          onChange={(e) => setFirstName(e.target.value)}
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
                          value={a_lastname}
                          onChange={(e) => setLastName(e.target.value)}
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
                          value={a_email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          value={a_contact}
                          onChange={(e) => setContact(e.target.value)}
                          class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        />
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
                          value={a_address}
                          onChange={(e) => setAddress(e.target.value)}
                          class="w-full shadow-1 rounded-lg border-[1.5px]  bg-white py-3 px-5 font-medium outline-none transition focus:border-violet-600 active:border-violet-800 disabled:cursor-default"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
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

            {!adminProfile ? (
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

export default AdminProfile;
