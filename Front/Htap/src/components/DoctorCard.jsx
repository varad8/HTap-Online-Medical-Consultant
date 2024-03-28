import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorCard() {
  const session = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfileData] = useState(null);
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchAllDoctor = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          `${endpoint}/users/doctor/all`,
          config
        );
        setDoctorData(response.data);
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

    fetchAllDoctor();
  }, [session]);

  return (
    <>
      <ToastContainer />
      <div className="bg-violet-50 p-3 container mx-auto rounded-lg mt-3 mb-3">
        <h3 className="text-violet-800 text-3xl  mt-3 mb-3 text-center font-inter">
          Experienced Doctor's
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {doctorData?.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg  shadow-md flex flex-col items-center"
            >
              <img
                src={`${endpoint}/users/profile/${doctor.d_profile_pic}`}
                alt={doctor.d_username}
                className="w-full object-cover h-full rounded-t-lg"
              />
              <div className="p-4  w-full text-center">
                <h4 className="text-violet-800 text-lg font-semibold mb-2">
                  {doctor.d_firstname} {doctor.d_lastname}
                </h4>
                <p className="text-gray-600 text-sm font-inter">
                  {doctor.occupation}
                </p>
                <p className="text-gray-600 text-sm font-inter">
                  {doctor.d_exp} years of experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DoctorCard;
