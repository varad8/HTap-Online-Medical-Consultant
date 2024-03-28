import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../App.css";

const Register = () => {
  const [responseData, setResponseData] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("users");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const quotekey = `${import.meta.env.VITE_QUOTE_API}`;

  const navigate = useNavigate();

  const category = "medical";

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
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

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      let registerEndpoint = `${endpoint}`;
      if (role === "doctor") {
        registerEndpoint = `${endpoint}/doctor/register`;
      } else if (role === "user") {
        registerEndpoint = `${endpoint}/users/register`;
      }

      const response = await toast.promise(
        axios.post(registerEndpoint, {
          email,
          password,
          confirmpassword,
          role,
          username,
        }),
        {
          pending: "Registering in...",
          success: "Register successful 🎉",
          error: "Registration Failed",
        }
      );

      navigate("/login");
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
            <h2 className="text-2xl font-semibold mb-6 font-inter">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block font-inter text-gray-700 text-sm font-semibold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full font-inter px-4 py-2 border rounded-md focus:outline-none focus:border-violet-400"
                />
              </div>

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

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block font-inter text-gray-700 text-sm font-semibold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  name="password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Register as Doctor
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
                      value="user"
                      className="mr-2"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label
                      htmlFor="patient"
                      className="font-semibold font-inter"
                    >
                      Register as Patient
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 mt-6">
                <button
                  type="submit"
                  className="bg-voilet font-inter text-white py-2 px-10 rounded-md hover:bg-violet-500 focus:outline-none focus:bg-violet-600"
                >
                  Register
                </button>
              </div>

              <Link
                to={"/login"}
                className="text-violet-500 hover:underline flex items-center justify-center"
              >
                Already have account ? Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
