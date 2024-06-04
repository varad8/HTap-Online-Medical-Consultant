import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const session = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const [profile, setProfileData] = useState(null);

  useEffect(() => {
    //Fetch Profile
    const fetchProfile = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          `${endpoint}/users/profile/get/${session.id}`,
          config
        );
        setProfileData(response.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    fetchProfile();
  }, [session]);

  const toggleClose = () => {
    setIsSidebarOpen(false);
  };

  const toggleOpen = () => {
    setIsSidebarOpen(true);
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-xl mr-4 font-inter">HTap</div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex gap-10">
              <Link to={`/`} className="text-black  font-inter">
                Home
              </Link>
              <Link to={`/about`} className="text-black font-inter">
                About
              </Link>
              <Link to={`/contact`} className="text-black font-inter">
                Contact
              </Link>
              {!session && (
                <Link to={`/login`} className="text-black font-inter">
                  Login
                </Link>
              )}
            </div>

            <div className="flex items-center">
              {session && (
                <Link to={`/dashboard`}>
                  <div className="hidden md:block mr-4 ml-4">
                    <button className="text-white px-2 py-1 bg-voilet rounded-md">
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="w-6 h-6 text-white"
                          version="1.1"
                          fill="currentColor"
                        >
                          <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
                        </svg>
                        Dashboard
                      </div>
                    </button>
                  </div>
                </Link>
              )}
              {session && (
                <div className="mr-2">
                  <img
                    src={`${endpoint}/users/profile/${profile?.profilePic}`}
                    alt="Avatar"
                    className="rounded-full w-8 h-8"
                  />
                </div>
              )}

              <button className="md:hidden text-black" onClick={toggleOpen}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* sidebar mobile device only */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-violet-50 z-50 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button className="text-black" onClick={toggleClose}>
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" className="text-violet-500 hover:font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-violet-500 hover:font-bold">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-violet-500 hover:font-bold">
                Contact
              </Link>
            </li>
            <li>
              {!session && (
                <Link to={`/login`} className="text-violet-500 hover:font-bold">
                  Login
                </Link>
              )}
            </li>
            <li>
              {session && (
                <Link
                  to="/dashboard"
                  className="text-violet-500 hover:font-bold"
                >
                  Dashboard
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
