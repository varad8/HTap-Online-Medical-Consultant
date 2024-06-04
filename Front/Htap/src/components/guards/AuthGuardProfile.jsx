import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import ProfileModal from "../../components/modals/ProfileModal";

const AuthGuardProfile = ({ children, endpoint }) => {
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [showModalProfile, setShowModalProfile] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (token && user) {
      const roleEndpoint = user.role === "doctor" ? "doctor" : "users";
      fetchProfile(token, endpoint, roleEndpoint);
    }
  }, [token, endpoint, user]);

  const fetchProfile = async (token, endpoint, roleEndpoint) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `${endpoint}/${roleEndpoint}/profile`;
      const response = await axios.get(url, config);
      const profile = response.data;
      // If the profile fetch is successful, you can set state or do other things here if needed
      console.log(profile);
    } catch (error) {
      const errorMsg = error.response?.data?.error;
      if (
        errorMsg === "Patient profile not found" ||
        errorMsg === "doctor profile not found"
      ) {
        // Show profile modal directly when user is not found
        setIsProfileComplete(false);
        setShowModalProfile(true);
      }
      //  else {
      //   toast.error(errorMsg || "Error fetching profile", {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      // }
    }
  };

  if (token && !isProfileComplete) {
    return <ProfileModal showModalProfile={setShowModalProfile} />;
  }

  return <>{children}</>;
};

export default AuthGuardProfile;
