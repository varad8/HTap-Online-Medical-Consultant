import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDatabase() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [doctorsData, setDoctorsData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [filteredDoctorsData, setFilteredDoctorsData] = useState([]);
  const [databaseOption, setSelectedDatabaseOption] = useState("Doctor");
  const [filteredPatientData, setFilteredPatientData] = useState([]);
  const [filters, setFilters] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    createdAt: "",
    occupation: "",
    account_status: "",
  });

  const [patientFilters, setPatientFilters] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    createdAt: "",
    // Add more filters as needed
  });

  const applyPatientFilters = (data, filters) => {
    let filteredData = data.filter((patient) => {
      return (
        patient.p_firstname
          .toLowerCase()
          .includes(filters.firstname.toLowerCase()) &&
        patient.p_lastname
          .toLowerCase()
          .includes(filters.lastname.toLowerCase()) &&
        patient.p_email.toLowerCase().includes(filters.email.toLowerCase()) &&
        // Add more filtering conditions here
        patient.p_location.city
          .toLowerCase()
          .includes(filters.location.toLowerCase()) &&
        patient.createdAt.includes(filters.createdAt)
      );
    });
    setFilteredPatientData(filteredData);
  };

  const handlePatientFilterChange = (e) => {
    const { name, value } = e.target;
    setPatientFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    applyPatientFilters(patientData, { ...patientFilters, [name]: value });
  };

  useEffect(() => {
    fetchDoctorsData();
    fetchPatientData();
  }, [session.id, token, endpoint]);

  const fetchDoctorsData = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/data/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctorsData(response.data);
      applyFilters(response.data, filters);
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

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/data/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatientData(response.data);
      applyPatientFilters(response.data, patientFilters);
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

  const applyFilters = (data, filters) => {
    let filteredData = data.filter((doctor) => {
      return (
        doctor.d_firstname
          .toLowerCase()
          .includes(filters.firstname.toLowerCase()) &&
        doctor.d_lastname
          .toLowerCase()
          .includes(filters.lastname.toLowerCase()) &&
        doctor.d_email.toLowerCase().includes(filters.email.toLowerCase()) &&
        doctor.d_location.city
          .toLowerCase()
          .includes(filters.location.toLowerCase()) &&
        doctor.createdAt.includes(filters.createdAt) &&
        doctor.occupation
          .toLowerCase()
          .includes(filters.occupation.toLowerCase()) &&
        doctor.account_status
          .toLowerCase()
          .includes(filters.account_status.toLowerCase())
      );
    });
    setFilteredDoctorsData(filteredData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    applyFilters(doctorsData, { ...filters, [name]: value });
  };

  const toggleApprovedStatus = async (id) => {
    try {
      const response = await axios.put(
        `${endpoint}/admin/doctor/update/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

      fetchDoctorsData();
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
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4 font-inter">Database</h2>
          <div className="filters">
            <select
              name="databaseOption"
              value={databaseOption}
              onChange={(e) => {
                setSelectedDatabaseOption(e.target.value);
                setFilters({ ...filters, databaseOption: e.target.value });
                fetchDoctorsData();
              }}
              className="px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
            >
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
          </div>
        </div>

        {databaseOption === "Doctor" && (
          <>
            <div className="grid lg:grid-cols-4 xl:grid-cols-4 grid-cols-2 gap-2 mb-4">
              <input
                type="text"
                name="firstname"
                value={filters.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="lastname"
                value={filters.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="email"
                value={filters.email}
                onChange={handleChange}
                placeholder="Email"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                placeholder="Location"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="createdAt"
                value={filters.createdAt}
                onChange={handleChange}
                placeholder="Created At"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="occupation"
                value={filters.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="account_status"
                value={filters.account_status}
                onChange={handleChange}
                placeholder="Account Status"
                className="shadow appearance-none border rounded py-
                2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full ">
                <thead>
                  <tr className="bg-violet-600 text-white text-nowrap">
                    <th className="px-4 py-2">Profile Pic</th>
                    <th className="px-4 py-2">First Name</th>
                    <th className="px-4 py-2">Last Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Created At</th>
                    <th className="px-4 py-2">Specialist In</th>
                    <th className="px-4 py-2">Service Hours</th>
                    <th className="px-4 py-2">Account Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctorsData.map((doctor) => (
                    <tr key={doctor._id} className="text-nowrap">
                      <td className="border px-4 py-2">
                        <img
                          src={`${endpoint}/doctor/profile/${doctor.d_profile_pic}`}
                          alt="profile"
                          className="w-24 h-24 rounded-lg object-cover object-center"
                        />
                      </td>
                      <td className="border px-4 py-2">{doctor.d_firstname}</td>
                      <td className="border px-4 py-2">{doctor.d_lastname}</td>
                      <td className="border px-4 py-2">{doctor.d_email}</td>
                      <td className="border px-4 py-2">
                        {doctor.d_location.city}, {doctor.d_location.state}
                      </td>
                      <td className="border px-4 py-2">{doctor.createdAt}</td>
                      <td className="border px-4 py-2">{doctor.occupation}</td>
                      <td className="border px-4 py-2">
                        <ul>
                          {Object.entries(doctor.servicehours).map(
                            ([day, hours]) => (
                              <li key={day} className="leading-loose">
                                <strong className="capitalize">{day}: </strong>
                                {hours}
                              </li>
                            )
                          )}
                        </ul>
                      </td>
                      <td className="border px-4 py-2">
                        {doctor.account_status}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => toggleApprovedStatus(doctor._id)}
                          className={`bg-${
                            doctor.account_status === "APPROVED"
                              ? "red"
                              : "green"
                          }-500 text-[14px] hover:bg-${
                            doctor.account_status === "APPROVED"
                              ? "red"
                              : "green"
                          }-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
                        >
                          {doctor.account_status === "APPROVED"
                            ? "NOT APPROVE"
                            : "APPROVE"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {databaseOption === "Patient" && (
          <>
            <div className="grid lg:grid-cols-4 xl:grid-cols-4 grid-cols-2 gap-2 mb-4">
              <input
                type="text"
                name="firstname"
                value={patientFilters.firstname}
                onChange={handlePatientFilterChange}
                placeholder="First Name"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="lastname"
                value={patientFilters.lastname}
                onChange={handlePatientFilterChange}
                placeholder="Last Name"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="email"
                value={patientFilters.email}
                onChange={handlePatientFilterChange}
                placeholder="Email"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="location"
                value={patientFilters.location}
                onChange={handlePatientFilterChange}
                placeholder="Location"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="createdAt"
                value={patientFilters.createdAt}
                onChange={handlePatientFilterChange}
                placeholder="Created At"
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {/* Add more filter inputs here */}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full ">
                <thead>
                  <tr className="bg-violet-600 text-white text-nowrap">
                    <th className="px-4 py-2">Profile Pic</th>
                    <th className="px-4 py-2">First Name</th>
                    <th className="px-4 py-2">Last Name</th>{" "}
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatientData.map((patient) => (
                    <tr key={patient._id} className="text-nowrap">
                      <td className="border px-4 py-2">
                        <img
                          src={`${endpoint}/users/profile/${patient.p_profile_pic}`}
                          alt="profile"
                          className="w-24 h-24 rounded-lg object-cover object-center"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        {patient.p_firstname}
                      </td>
                      <td className="border px-4 py-2">{patient.p_lastname}</td>
                      <td className="border px-4 py-2">{patient.p_email}</td>
                      <td className="border px-4 py-2">
                        {patient.p_location.city}, {patient.p_location.state}
                      </td>
                      <td className="border px-4 py-2">{patient.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

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
    </>
  );
}

export default AdminDatabase;
