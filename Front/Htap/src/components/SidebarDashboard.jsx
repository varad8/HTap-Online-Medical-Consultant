import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowLeft,
  faArrowLeftRotate,
  faArrowRight,
  faBars,
  faBookMedical,
  faBullhorn,
  faCheck,
  faCheckCircle,
  faDatabase,
  faHamburger,
  faHistory,
  faHome,
  faLayerGroup,
  faListUl,
  faMessage,
  faPieChart,
  faPrescription,
  faRupee,
  faSignOutAlt,
  faStar,
  faUserAstronaut,
  faUserCircle,
  faUsersBetweenLines,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SidebarDashboard() {
  const session = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfileData] = useState(null);
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileView, setIsMobileView] = useState(false);

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
  }, [session]);

  useEffect(() => {
    const handleResize = () => {
      // Check if viewport is mobile size
      setIsMobileView(window.innerWidth < 768);

      // Close sidebar on desktop resize
      if (window.innerWidth >= 1024 && !isMobileView) {
        setIsSidebarOpen(false);
      }
    };

    // Call handleResize once to set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return navigate("/login");
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
      {/* Sidebar Mobile  Mobile*/}
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-voilet rounded-lg sm:hidden hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
      </button>
      <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen && isMobileView ? "" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white shadow-lg border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {/* Profile */}
          <div className="border-b border-gray-200 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={`${endpoint}/users/profile/${profile?.profilePic}`}
                className="object-cover object-center w-14  h-14 rounded-full shadow border border-violet-100"
              />
              <div>
                <h4 className="font-inter font-medium text-voilet">
                  {profile?.name}
                </h4>
                <p className="text-[10px] font-inter text-violet-300">
                  {profile?.email}
                </p>
                <p className="text-[10px] font-inter text-violet-300">
                  {profile?.role}
                </p>
              </div>
            </div>
          </div>

          <ul className="space-y-2 mt-2">
            {/* Home */}
            <li>
              <Link
                to={`/`}
                className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                  location.pathname === "/" ? "bg-violet-100" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faHome}
                  className="w-6 h-6 text-violet-500"
                />
                <span className="ml-3">Home</span>
              </Link>
            </li>

            {/* OVerview */}
            <li>
              <Link
                to={`overview`}
                className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                  location.pathname === "/dashboard/overview"
                    ? "bg-violet-100"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faPieChart}
                  className="w-6 h-6 text-violet-500"
                />
                <span className="ml-3">Overview</span>
              </Link>
            </li>

            {/* Bookings */}
            <li>
              <Link
                to="bookings"
                className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                  location.pathname === "/dashboard/bookings"
                    ? "bg-violet-100"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faUsersBetweenLines}
                  className="w-6 h-6 text-violet-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Bookings</span>
              </Link>
            </li>

            {/* Prescriptions */}
            <li>
              <Link
                to="prescriptions"
                className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                  location.pathname === "/dashboard/prescriptions"
                    ? "bg-violet-100"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faPrescription}
                  className="w-6 h-6 text-violet-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Prescriptions
                </span>
              </Link>
            </li>

            {/* Payments */}
            <li>
              <Link
                to="payments"
                className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                  location.pathname === "/dashboard/payments"
                    ? "bg-violet-100"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faRupee}
                  className="w-6 h-6 text-violet-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Payments</span>
              </Link>
            </li>
          </ul>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {/* Messages */}
            {session.role != "admin" && (
              <li>
                <Link
                  to="messages"
                  className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                    location.pathname === "/dashboard/messages"
                      ? "bg-violet-100"
                      : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="w-6 h-6 text-violet-500"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">Message</span>
                </Link>
              </li>
            )}

            {/* Category */}
            {session.role === "admin" && (
              <li>
                <Link
                  to="category"
                  className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                    location.pathname === "/dashboard/category"
                      ? "bg-violet-100"
                      : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="w-6 h-6 text-violet-500"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Category
                  </span>
                </Link>
              </li>
            )}

            {/* Database */}
            {session.role === "admin" && (
              <li>
                <Link
                  to="database"
                  className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                    location.pathname === "/dashboard/database"
                      ? "bg-violet-100"
                      : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faDatabase}
                    className="w-6 h-6 text-violet-500"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">Data</span>
                </Link>
              </li>
            )}

            <li>
              <Link
                to="notification"
                className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                  location.pathname === "/dashboard/notification"
                    ? "bg-violet-100"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faBullhorn}
                  className="w-6 h-6 text-violet-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Notification
                </span>
              </Link>
            </li>
          </ul>

          {/* Profile */}
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <Link
                to="profile"
                className={`flex items-center p-2 text-base font-inter font-normal text-violet-900 rounded-lg dark:text-white group ${
                  location.pathname === "/dashboard/profile"
                    ? "bg-violet-100"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="w-6 h-6 text-violet-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>

            <li>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center p-2 text-base font-inter font-normal text-red-900 rounded-lg  group"
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="w-6 h-6 text-red-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Sign out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SidebarDashboard;
