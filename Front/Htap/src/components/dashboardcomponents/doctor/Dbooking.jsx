import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dbooking() {
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const session = JSON.parse(localStorage.getItem("user"));
  const [bookingData, setBookingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    patient: "",
    scheduletime: "",
    appointmentId: "",
    bookingStatus: "",
    visitingStatus: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [prescriptionModal, setPrescriptionModal] = useState(false);
  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", instructions: "" },
  ]);
  const [amount, setAmount] = useState(null);
  const [expireat, setExpireAt] = useState(null);

  useEffect(() => {
    fetchBookingData();
  }, [session.id, token, endpoint]);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/doctor/booking/alldata/${session.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    const filtered = bookingData.filter((booking) => {
      const patientMatch = booking.patient.p_firstname
        .toLowerCase()
        .includes(filterOptions.patient.toLowerCase());
      const scheduleTimeMatch = booking.scheduletime
        .toLowerCase()
        .includes(filterOptions.scheduletime.toLowerCase());
      const appointmentIdMatch = booking.appointment_id
        .toLowerCase()
        .includes(filterOptions.appointmentId.toLowerCase());
      const bookingStatusMatch = booking.booking_status
        .toLowerCase()
        .includes(filterOptions.bookingStatus.toLowerCase());
      const visitingStatusMatch = booking.visiting_status
        .toLowerCase()
        .includes(filterOptions.visitingStatus.toLowerCase());

      return (
        patientMatch &&
        scheduleTimeMatch &&
        appointmentIdMatch &&
        bookingStatusMatch &&
        visitingStatusMatch
      );
    });
    setFilteredData(filtered);
  }, [filterOptions, bookingData]);

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

  const handleOpenPrescription = (booking) => {
    setSelectedBooking(booking);
    console.log(booking);
    setPrescriptionModal(true);
  };

  // Function to handle saving the prescription
  const handleSavePrescription = async () => {
    console.log(selectedBooking, amount, expireat, medications);
    try {
      const prescriptionData = {
        pid: selectedBooking.pid,
        d_id: selectedBooking.d_id,
        medications: medications,
        expiresAt: expireat,
        bookingId: selectedBooking._id,
        appointment_id: selectedBooking.appointment_id,
        patient: selectedBooking.patient._id,
        doctor: selectedBooking.doctor._id,
        amount: amount,
      };

      // Send a POST request to save the prescription
      const response = await axios.post(
        `${endpoint}/doctor/prescription/save`,
        prescriptionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookingData();
      handleClosePrescription();

      // Handle success response
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

  function isAfterOrSameSchedulingDate(schedulingDateString) {
    const [schedulingDay, schedulingMonth, schedulingYear] =
      schedulingDateString.split("/");
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const currentYear = currentDate.getFullYear();
    const schedulingDayNumber = parseInt(schedulingDay, 10);
    const schedulingMonthNumber = parseInt(schedulingMonth, 10);
    const schedulingYearNumber = parseInt(schedulingYear, 10);

    if (
      schedulingYearNumber > currentYear ||
      (schedulingYearNumber === currentYear &&
        schedulingMonthNumber > currentMonth) ||
      (schedulingYearNumber === currentYear &&
        schedulingMonthNumber === currentMonth &&
        schedulingDayNumber >= currentDay)
    ) {
      return true; // Scheduling date is after or the same as the current date
    } else {
      return false; // Scheduling date is in the past
    }
  }

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
        <h2 className="text-2xl font-bold mb-4 font-inter">All Bookings</h2>
        <div className="mb-4 grid lg:grid-cols-4 xl:grid-cols-4 grid-cols-2 gap-3">
          {/* Input fields for filtering */}
          <input
            type="text"
            placeholder="Search by problem..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by patient..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.patient}
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, patient: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Filter by schedule time..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.scheduletime}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                scheduletime: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by appointment ID..."
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
            placeholder="Filter by booking status..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.bookingStatus}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                bookingStatus: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Filter by visiting status..."
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={filterOptions.visitingStatus}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                visitingStatus: e.target.value,
              })
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-300 rounded-md shadow-md"
            >
              <h3 className="text-lg font-semibold  font-inter text-voilet border-b border-gray-300 px-3 py-2">
                APT. ID {booking.appointment_id}
              </h3>
              <div className="px-3 py-2">
                <div className="mb-2 border-b border-gary-300 px-3 py-2">
                  <p className="font-inter text-sm">
                    Health Issue: {booking.patient_problem}
                  </p>
                  <p className="font-inter text-sm">
                    Schedule Time:
                    {booking.scheduletime}
                  </p>
                  <p className="font-inter text-sm">
                    Appointment ID: {booking.appointment_id}
                  </p>
                  <p className="font-inter text-sm">
                    Booking Status: {booking.booking_status}
                  </p>
                  <p className="font-inter text-sm">
                    Visiting Status: {booking.visiting_status}
                  </p>
                  <p className="font-inter text-sm">
                    CreatedAt:{" "}
                    {new Date(booking.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
                <div className="flex  gap-4 items-center">
                  <img
                    src={`${endpoint}/users/profile/${booking.patient?.p_profile_pic}`}
                    alt="doctor profile"
                    className="w-20 h-20 rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="font-inter text-sm">
                      Patient: {booking.patient.p_firstname}{" "}
                      {booking.patient.p_lastname}
                    </p>

                    <p className="font-inter text-sm">
                      Email: {booking.patient.p_email}
                    </p>
                    <p className="font-inter text-sm">
                      Contact: {booking.patient.p_contact}
                    </p>
                    <p className="font-inter text-sm">
                      Patient Mobile : {booking.patientMobileNo}
                    </p>
                    <p className="font-inter text-sm">
                      Location: {booking.patient.p_location.city},
                      {booking.patient.p_location.state}
                    </p>
                    <p className="font-inter text-sm">
                      Address: {booking.patient.p_address}
                    </p>
                  </div>
                </div>

                {booking.booking_status !== "Cancelled" &&
                  booking.visiting_status !== "Visited" &&
                  isAfterOrSameSchedulingDate(booking.scheduletime) && (
                    <button
                      onClick={() => handleOpenPrescription(booking)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    >
                      Generate Prescription
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>

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
                  onClick={() => handleSavePrescription()}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit
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
    </>
  );
}
export default Dbooking;
