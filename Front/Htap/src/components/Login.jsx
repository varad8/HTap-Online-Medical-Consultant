import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [responseData, setResponseData] = useState(null);
  const [email, setEmail] = useState("");
  const [femail, setFemail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("users");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const quotekey = `${import.meta.env.VITE_QUOTE_API}`;
  const navigate = useNavigate();
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const category = "medical";

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/quotes?category=${category}`,
          {
            headers: {
              "X-Api-Key": `${quotekey}`,
              "Content-Type": "application/json",
            },
          }
        );
        setResponseData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [category]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await toast.promise(
        axios.post(`${endpoint}/${role}/login`, {
          email,
          password,
        }),
        {
          pending: "Logging in...",
          success: "Login successful 🎉",
          error: "Login Failed",
        }
      );

      if (
        response &&
        response.data &&
        response.data.token &&
        response.data.user
      ) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await toast.promise(
        axios.post(`${endpoint}/admin/forgot-password`, {
          email: femail,
        }),
        {
          pending: `Sending Email ${femail}`,
          success: "Email sent successfully 🎉",
          error: "Email sent failed",
        }
      );
      closeForgotPasswordModal();
      setFemail("");
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

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-50 px-3 py-3">
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
      <div className="bg-white shadow-xl border rounded-lg">
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-1">
          {/* Backround image */}

          <div className="login-bg flex justify-center items-center relative">
            <img
              src="./src/assets/vectorbg.png"
              className="object-contain z-0 rounded-r-xl rounded-l-lg"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                height: "auto",
                width: "auto",
              }}
            />
            {responseData && responseData.length > 0 && (
              <div className="absolute bottom-2 text-center text-white font-inter">
                <p
                  className="font-inter"
                  style={{ textShadow: "2px 2px 2px black" }}
                >
                  {responseData[0].quote}
                </p>
                <p
                  className="font-inter"
                  style={{ textShadow: "2px 2px 2px black" }}
                >
                  - {responseData[0].author}
                </p>
              </div>
            )}
          </div>

          {/* Login Form */}
          <div className="px-4 py-4">
            <h2 className="text-2xl font-semibold mb-6 font-inter">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-inter text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full font-inter px-4 py-2 border rounded-md focus:outline-none focus:border-violet-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block font-inter text-gray-700 text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 font-inter py-2 border rounded-md focus:outline-none focus:border-violet-400"
                />
              </div>

              {/* Login As */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-violet-200 p-2 rounded-lg flex items-center justify-center">
                  <img
                    src="./src/assets/doctoricon.png"
                    alt="Doctor"
                    className="h-12 w-12"
                  />
                  <div className="ml-2">
                    <input
                      type="radio"
                      id="doctor"
                      name="role"
                      value="doctor"
                      className="mr-2"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label
                      htmlFor="doctor"
                      className="font-semibold font-inter"
                    >
                      Login as Doctor
                    </label>
                  </div>
                </div>
                <div className="bg-violet-200 p-2 rounded-lg flex items-center justify-center">
                  <img
                    src="./src/assets/adminicon.png"
                    alt="Admin"
                    className="h-12 w-12"
                  />
                  <div className="ml-2">
                    <input
                      type="radio"
                      id="admin"
                      name="role"
                      value="admin"
                      className="mr-2"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="admin" className="font-semibold font-inter">
                      Login as Admin
                    </label>
                  </div>
                </div>
                <div className="bg-violet-200 p-2 rounded-lg flex items-center justify-center">
                  <img
                    src="./src/assets/patienticon.png"
                    alt="Patient"
                    className="h-12 w-12"
                  />
                  <div className="ml-2">
                    <input
                      type="radio"
                      id="role"
                      name="role"
                      value="users"
                      className="mr-2"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label
                      htmlFor="patient"
                      className="font-semibold font-inter"
                    >
                      Login as Patient
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 mt-6">
                <button
                  type="submit"
                  className="bg-voilet font-inter text-white py-2 px-10 rounded-md hover:bg-violet-500 focus:outline-none focus:bg-violet-600"
                >
                  Login
                </button>
                <button
                  onClick={openForgotPasswordModal}
                  className="text-violet-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <Link
                to={"/register"}
                className="text-violet-500 hover:underline flex items-center justify-center"
              >
                Do you have account ? Register
              </Link>
            </form>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-xl mx-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
              <button
                className="bg-violet-100 text-lg text-black p-2 rounded-full"
                onClick={closeForgotPasswordModal}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={femail}
                  onChange={(e) => setFemail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-violet-500"
                />
              </div>
              <button
                type="submit"
                className="bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
