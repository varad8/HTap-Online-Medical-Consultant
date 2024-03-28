import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dprescription() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [prescriptionModal, setPrescriptionModal] = useState(false);
  const [selectedPrescription, setSelectPrescription] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    patientFirstName: "",
    patientLastName: "",
    prescriptionid: "",
    appointmentId: "",
    createdAt: "",
  });

  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", instructions: "" },
  ]);
  const [amount, setAmount] = useState(null);
  const [expireat, setExpireAt] = useState(null);

  useEffect(() => {
    fetchPrescriptionData();
  }, [session, token, endpoint]);

  const fetchPrescriptionData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/prescriptions/${session.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPrescriptionData(response.data);
      setFilteredData(response.data);
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

  useEffect(() => {
    const filtered = prescriptionData.filter((prescription) => {
      const prescriptionIdMatch = prescription.pres_id
        .toLowerCase()
        .includes(filterOptions.prescriptionid.toLowerCase());
      const bookingIdMatch = prescription.appointment_id
        .toLowerCase()
        .includes(filterOptions.appointmentId.toLowerCase());
      const patientFirstNameMatch = prescription.patient.p_firstname
        .toLowerCase()
        .includes(filterOptions.patientFirstName.toLowerCase());
      const patientLastNameMatch = prescription.patient.p_lastname
        .toLowerCase()
        .includes(filterOptions.patientLastName.toLowerCase());
      const createdAtMatch = prescription.createdAt
        .toLowerCase()
        .includes(filterOptions.createdAt.toLowerCase());

      return (
        prescriptionIdMatch &&
        bookingIdMatch &&
        patientFirstNameMatch &&
        patientLastNameMatch &&
        createdAtMatch
      );
    });
    setFilteredData(filtered);
  }, [filterOptions, prescriptionData]);

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", instructions: "" },
    ]);
  };

  const removeMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedications = [...medications];
    updatedMedications[index][name] = value;
    setMedications(updatedMedications);
  };

  const handleClosePrescription = () => {
    setMedications([{ name: "", dosage: "", frequency: "", instructions: "" }]);
    setAmount("");
    setPrescriptionModal(false);
    setExpireAt(null);
  };

  const handleOpenPrescription = (prescription) => {
    setSelectPrescription(prescription);
    setMedications(prescription.medications);
    setAmount(prescription.amount);
    setExpireAt(formatDate(prescription.expiresAt));
    setPrescriptionModal(true);
  };

  const handleUpdatePrescription = async () => {
    try {
      // Convert the expiresAt date to ISO format
      const isoExpiresAt = new Date(expireat).toISOString();

      // Prepare the request body
      const requestBody = {
        medications,
        expiresAt: isoExpiresAt,
      };

      // Send the update request
      const response = await axios.put(
        `${endpoint}/doctor/prescription/update/${selectedPrescription._id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPrescriptionData();
      handleClosePrescription();

      // Check if the update was successful
      if (response.status === 200) {
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
      } else {
        toast.error("Failed to update prescription", {
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

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
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

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 font-inter">
          All Prescriptions
        </h2>
        <div className="mb-4 grid lg:grid-cols-4 xl:grid-cols-4 grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Filter by prescription ID..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.prescriptionid}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                prescriptionid: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by booking ID..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.appointmentId}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                appointmentId: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by patient first name..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.patientFirstName}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                patientFirstName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by patient last name..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.patientLastName}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                patientLastName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by createdAt..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.createdAt}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                createdAt: e.target.value,
              })
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!filteredData.length ? (
            <p>Not Found Data</p>
          ) : (
            filteredData.map((prescription) => (
              <div
                key={prescription._id}
                className="border border-gray-300 rounded-md shadow-md bg-white"
              >
                <h3 className="text-lg font-semibold  font-inter text-voilet border-b border-gray-300 px-3 py-2">
                  {prescription.pres_id}
                </h3>
                <div className="px-3 py-2">
                  <div className="mb-2 border-b border-gary-300 px-3 py-2">
                    <p className="font-inter text-sm">
                      Health Issue: {prescription.patient.patient_problem}
                    </p>
                    <p className="font-inter text-sm">
                      Created At: {prescription.createdAt}
                    </p>
                    <p className="font-inter text-sm">
                      Appointment ID: {prescription.appointment_id}
                    </p>
                    <p className="font-inter text-sm">
                      Booking Status: {prescription.booking.booking_status}
                    </p>
                    <p className="font-inter text-sm">
                      Visiting Status: {prescription.booking.visiting_status}
                    </p>
                    <p className="font-inter text-sm">
                      Created At:{" "}
                      {new Date(prescription.booking.createdAt).toLocaleString(
                        "en-GB"
                      )}
                    </p>
                  </div>
                  <div className="flex  gap-4 items-center">
                    <img
                      src={`${endpoint}/users/profile/${prescription.patient?.p_profile_pic}`}
                      alt="patient profile"
                      className="w-20 h-20 rounded-full border border-gray-300"
                    />
                    <div>
                      <p className="font-inter text-sm">
                        Patient: {prescription.patient.p_firstname}{" "}
                        {prescription.patient.p_lastname}
                      </p>
                      <p className="font-inter text-sm">
                        Email: {prescription.patient.p_email}
                      </p>
                      <p className="font-inter text-sm">
                        Contact: {prescription.patient.p_contact}
                      </p>
                      <p className="font-inter text-sm">
                        Patient Mobile: {prescription.booking.patientMobileNo}
                      </p>
                      <p className="font-inter text-sm">
                        Location: {prescription.patient.p_location.city},{" "}
                        {prescription.patient.p_location.state}
                      </p>
                      <p className="font-inter text-sm">
                        Address: {prescription.patient.p_add}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => handleOpenPrescription(prescription)}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-violet-600 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    View Medication
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Prescription update modal */}
        {prescriptionModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Add Medications
                      </h3>
                      {medications.map((medication, index) => (
                        <div
                          key={index}
                          className="mt-4 border-b border-gray-300 px-2 py-2"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <label className="text-black font-inter">
                                Medicine name
                              </label>
                              <input
                                type="text"
                                name="name"
                                placeholder="Medication Name"
                                value={medication.name}
                                onChange={(e) => handleInputChange(index, e)}
                                className="form-input"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-black font-inter">
                                Medicine dosage
                              </label>
                              <input
                                type="text"
                                name="dosage"
                                placeholder="Dosage"
                                value={medication.dosage}
                                onChange={(e) => handleInputChange(index, e)}
                                className="form-input"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-black font-inter">
                                Medicine frequency
                              </label>
                              <input
                                type="text"
                                name="frequency"
                                placeholder="Frequency"
                                value={medication.frequency}
                                onChange={(e) => handleInputChange(index, e)}
                                className="form-input"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-black font-inter">
                                Medicine Instructions
                              </label>
                              <input
                                type="text"
                                name="instructions"
                                placeholder="Instructions"
                                value={medication.instructions}
                                onChange={(e) => handleInputChange(index, e)}
                                className="form-input"
                              />
                            </div>
                          </div>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeMedication(index)}
                              className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}

                      <div className="flex gap-2 items-center mt-3 mb-3">
                        <label className="text-black font-inter">
                          Fee Amount
                        </label>
                        <input
                          type="number"
                          name="amount"
                          placeholder="fee amount"
                          value={amount}
                          disabled
                          onChange={(e) => setAmount(e.target.value)}
                          className="form-input mt-2 mb-2"
                        />
                      </div>

                      <div className="flex gap-2 items-center mt-3 mb-3">
                        <label className="text-black font-inter">
                          Expires At
                        </label>
                        <input
                          type="date"
                          name="expireat"
                          value={expireat}
                          onChange={(e) => setExpireAt(e.target.value)}
                          className="form-input mt-2 mb-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={addMedication}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Medication
                  </button>
                  <button
                    onClick={() => handleUpdatePrescription()}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleClosePrescription}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dprescription;
