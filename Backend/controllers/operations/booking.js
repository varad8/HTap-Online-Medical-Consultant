const Booking = require("../../models/Booking");
const moment = require("moment");
const Payment = require("../../models/Payment");

// Function to generate unique appointment ID
async function generateAppointmentId() {
  // Find the last used appointment ID from the database
  const lastBooking = await Booking.findOne().sort({ appointment_id: -1 });
  let nextAppointmentId = 1;
  if (lastBooking) {
    // Extract the number part of the last appointment ID
    const lastAppointmentNumber = parseInt(
      lastBooking.appointment_id.split("-")[1]
    );
    if (!isNaN(lastAppointmentNumber)) {
      nextAppointmentId = lastAppointmentNumber + 1;
    }
  }
  // Generate the next appointment ID
  return `APT-${nextAppointmentId}`;
}

// Route handler for patient saving bookings
exports.saveBookings = async (req, res) => {
  try {
    // Extract required fields from request body
    const {
      pid,
      d_id,
      patient_problem,
      patient,
      doctor,
      schedule_time,
      mobileno,
    } = req.body;

    // Validate required fields
    if (
      !patient_problem ||
      !patient ||
      !doctor ||
      !schedule_time ||
      !mobileno ||
      !pid ||
      !d_id
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (mobileno.length > 10) {
      return res.status(400).json({ error: "Mobile no must be 10 digits" });
    }

    // Validate date format and range
    const scheduleTimeMoment = moment(schedule_time, "DD/MM/YYYY", true);
    if (!scheduleTimeMoment.isValid()) {
      return res.status(400).json({ error: "Invalid date format" });
    }
    const currentDate = moment();
    const twoDaysAhead = moment().add(2, "days");
    if (
      scheduleTimeMoment.isBefore(currentDate, "day") ||
      scheduleTimeMoment.isAfter(twoDaysAhead, "day")
    ) {
      return res
        .status(400)
        .json({ error: "Scheduled date must be within the next two days" });
    }

    // Convert to JavaScript Date object
    const scheduleTimeDate = scheduleTimeMoment.toDate();

    // Generate unique appointment ID
    const appointment_id = await generateAppointmentId();

    // Create a new booking instance
    const booking = new Booking({
      appointment_id,
      patient_problem,
      patient,
      doctor,
      scheduletime: scheduleTimeDate,
      patientMobileNo: mobileno,
      pid,
      d_id,
    });

    // Save the booking to the database
    await booking.save();

    // Respond with success message
    res
      .status(201)
      .json({ message: "Booking saved successfully", appointment_id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Route handler for patient saving bookings
// exports.saveBookings = async (req, res) => {
//   try {
//     // Extract required fields from request body
//     const { patient_problem, pid, d_id, schedule_time, mobileno } = req.body;

//     // Validate required fields
//     if (!patient_problem || !pid || !d_id || !schedule_time || !mobileno) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Validate date format and range
//     const scheduleTimeMoment = moment(schedule_time, "DD/MM/YYYY", true);
//     if (!scheduleTimeMoment.isValid()) {
//       return res.status(400).json({ error: "Invalid date format" });
//     }
//     const currentDate = moment();
//     const twoDaysAhead = moment().add(2, "days");
//     if (
//       scheduleTimeMoment.isBefore(currentDate, "day") ||
//       scheduleTimeMoment.isAfter(twoDaysAhead, "day")
//     ) {
//       return res
//         .status(400)
//         .json({ error: "Scheduled date must be within the next two days" });
//     }

//     // Convert to JavaScript Date object
//     const scheduleTimeDate = scheduleTimeMoment.toDate();

//     // Generate unique appointment ID
//     const appointment_id = await generateAppointmentId();

//     // Create a new booking instance
//     const booking = new Booking({
//       appointment_id,
//       patient_problem,
//       pid,
//       d_id,
//       scheduletime: scheduleTimeDate,
//       patientMobileNo: mobileno,
//     });

//     // Save the booking to the database
//     await booking.save();

//     // Respond with success message
//     res
//       .status(201)
//       .json({ message: "Booking saved successfully", appointment_id });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Route handler for getting booking appointment by using appointmentid
exports.getBookingByAppointmentId = async (req, res) => {
  try {
    const appointmentid = req.params.appointmentid;

    if (!appointmentid) {
      return res.status(404).json({ error: "Appointment id not found" });
    }

    const booking = await Booking.findOne({ appointment_id: appointmentid });
    if (!booking) {
      return res
        .status(404)
        .json({ error: "booking not found according that appointment id" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler for getting all booking appointment by using patient id
exports.getAllBookingByPatientId = async (req, res) => {
  try {
    const pid = req.params.pid;

    if (!pid) {
      return res.status(404).json({ error: "patient id not found" });
    }

    // Use the `patient` field name to match the Mongoose schema
    const bookings = await Booking.find({
      pid: pid,
    })
      .populate({
        path: "patient",
        model: "Patient",
      })
      .populate({
        path: "doctor",
        model: "Doctor",
      });

    if (!bookings) {
      return res
        .status(404)
        .json({ error: "booking not found according that patient id" });
    }

    // Convert scheduletime to dd/mm/yyyy format
    const formattedBookings = bookings.map((booking) => ({
      ...booking.toObject(),
      scheduletime: new Date(booking.scheduletime).toLocaleDateString("en-GB"),
    }));

    res.status(200).json(formattedBookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Route handler for getting all booking appointment by using doctor id
exports.getAllBookingByDoctorId = async (req, res) => {
  try {
    const did = req.params.did;

    if (!did) {
      return res.status(404).json({ error: "doctor id not found" });
    }

    const bookings = await Booking.find({ d_id: did })
      .populate({
        path: "patient",
        model: "Patient",
      })
      .populate({
        path: "doctor",
        model: "Doctor",
      });
    if (!bookings) {
      return res
        .status(404)
        .json({ error: "booking not found according that doctor id" });
    }

    const formattedBookings = bookings.map((booking) => ({
      ...booking.toObject(),
      scheduletime: new Date(booking.scheduletime).toLocaleDateString("en-GB"),
    }));

    res.status(200).json(formattedBookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler for getting all booking data
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ scheduletime: 1 })
      .populate({
        path: "patient",
        model: "Patient",
      })
      .populate({
        path: "doctor",
        model: "Doctor",
      });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "Bookings not found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Route handler for cancelling booking by
exports.updateBookingStatus = async (req, res) => {
  try {
    // Extract appointment_id, pid from request body
    const { appointment_id, pid } = req.body;
    const booking_status = "Cancelled";
    // Validate required fields
    if (!appointment_id || !pid || !booking_status) {
      return res.status(400).json({
        error: "appointment_id, pid, and booking_status are required",
      });
    }
    const booking = await Booking.findOne({ appointment_id, pid });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.booking_status === "Cancelled") {
      return res.status(400).json({
        error: "Booking status is already Cancelled and cannot be updated",
      });
    }
    booking.booking_status = booking_status;
    await booking.save();
    res
      .status(200)
      .json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Route handler for cancelling a booking by ID
exports.cancelBookingById = async (req, res) => {
  try {
    // Extract booking ID from request parameters
    const { id } = req.params;
    const booking_status = "Cancelled";

    // Validate required fields
    if (!id || !booking_status) {
      return res.status(400).json({
        error: "Booking ID and booking status are required",
      });
    }

    // Find the booking by ID
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if the booking status is already cancelled
    if (booking.booking_status === "Cancelled") {
      return res.status(400).json({
        error: "Booking status is already Cancelled and cannot be updated",
      });
    }

    // Update booking status to Cancelled
    booking.booking_status = booking_status;
    await booking.save();

    // Return success message
    res
      .status(200)
      .json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
};

/**-------------------------[Chat Visulization]------------------------- */
// Route handler for getting chart data of all bookings
exports.getChartOfAllBookings = async (req, res) => {
  try {
    // Aggregate bookings data to group by month, year, and d_id
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$scheduletime" },
            },
            d_id: "$d_id", // Preserve d_id for each booking
          },
          count: { $sum: 1 },
          doctor: { $first: { $arrayElemAt: ["$doctor", 0] } }, // Extract the first document of the array
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id",
          doctor_name: {
            $concat: ["$doctor.d_firstname", " ", "$doctor.d_lastname"],
          },
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler for getting chart data of all bookings according to pid
exports.getChartOfAllBookingsPID = async (req, res) => {
  try {
    const { pid } = req.params;

    // Aggregate bookings data to group by month, year, and pid
    const result = await Booking.aggregate([
      {
        $match: { pid: pid },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$scheduletime" },
            },
            pid: "$pid",
            d_id: "$d_id", // Preserve d_id for each booking
          },
          count: { $sum: 1 },
          doctor: { $first: { $arrayElemAt: ["$doctor", 0] } }, // Extract the first document of the array
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          pid: "$_id.pid",
          d_id: "$_id.d_id",
          doctor_name: {
            $concat: ["$doctor.d_firstname", " ", "$doctor.d_lastname"],
          },
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler for getting chart data of all bookings according to visiting status, month, year, and pid
exports.getChartDataByVisitingStatusAndPID = async (req, res) => {
  try {
    const { pid } = req.params;

    // Aggregate bookings data to group by month, year, d_id, doctorname, and visiting_status
    const result = await Booking.aggregate([
      {
        $match: { pid: pid },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$scheduletime" },
            },
            d_id: "$d_id",
            doctorname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
            d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] }, // Include d_firstname
            d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] }, // Include d_lastname
            visiting_status: "$visiting_status",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id",
          doctorname: "$_id.doctorname",
          d_firstname: "$_id.d_firstname", // Include d_firstname
          d_lastname: "$_id.d_lastname", // Include d_lastname
          visiting_status: "$_id.visiting_status",
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler for getting chart data of all bookings according to d_id
exports.getChartOfAllBookingsDID = async (req, res) => {
  try {
    const { did } = req.params;

    // Aggregate bookings data to group by month, year, and d_id
    const result = await Booking.aggregate([
      {
        $match: { d_id: did },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$scheduletime" },
            },
            d_id: "$d_id",
          },
          count: { $sum: 1 },
          doctor: { $first: { $arrayElemAt: ["$doctor", 0] } }, // Extract the first document of the array
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id",
          doctor_name: {
            $concat: ["$doctor.d_firstname", " ", "$doctor.d_lastname"],
          },
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler for getting chart data of all bookings according to visiting status, month, year, and d_id
exports.getChartDataByVisitingStatusAndDID = async (req, res) => {
  try {
    const { did } = req.params;

    // Aggregate bookings data to group by month, year, d_id, doctorname, and visiting_status
    const result = await Booking.aggregate([
      {
        $match: { d_id: did },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$scheduletime" },
            },
            d_id: "$d_id",
            doctorname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
            d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] }, // Include d_firstname
            d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] }, // Include d_lastname
            visiting_status: "$visiting_status",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id",
          doctorname: "$_id.doctorname",
          d_firstname: "$_id.d_firstname", // Include d_firstname
          d_lastname: "$_id.d_lastname", // Include d_lastname
          visiting_status: "$_id.visiting_status",
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler for getting chart data of all bookings according to visiting status and d_id
exports.getChartDataByVisitingStatus = async (req, res) => {
  try {
    // Aggregate bookings data to group by month, year, doctorname, and visiting_status
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$scheduletime" },
            },
            doctorname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
            d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] }, // Include d_firstname
            d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] }, // Include d_lastname
            visiting_status: "$visiting_status",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          doctorname: "$_id.doctorname",
          d_firstname: "$_id.d_firstname", // Include d_firstname
          d_lastname: "$_id.d_lastname", // Include d_lastname
          visiting_status: "$_id.visiting_status",
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**--------------------------[Reports Monthly/weekly/yearly PID]---------------------------- */

exports.WeeklyDataPID = async (req, res) => {
  try {
    const pid = req.params.pid;

    const weekWiseData = await Payment.aggregate([
      {
        $match: { pid: pid }, // Match payments for the specified pid
      },
      {
        $group: {
          _id: {
            week: { $isoWeek: "$createdAt" }, // Extract ISO week from createdAt
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { week: "$_id.week", year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $isoWeek: "$createdAt" }, "$$week"] },
                    { $eq: [{ $year: "$createdAt" }, "$$year"] },
                    { $eq: ["$pid", pid] }, // Match bookings with the same pid
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          weekLabel: {
            $dateToString: {
              format: "%Y-W%U", // Format for ISO week
              date: {
                $dateFromParts: {
                  isoWeekYear: "$_id.year",
                  isoWeek: "$_id.week",
                },
              },
            },
          },
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } },
    ]);

    // Send the week-wise data as a response
    res.status(200).json({ success: true, data: weekWiseData });
  } catch (error) {
    console.error("Error fetching week-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
exports.MonthlyDataPID = async (req, res) => {
  try {
    const pid = req.params.pid;

    const monthWiseData = await Payment.aggregate([
      {
        $match: { pid: pid }, // Match payments for the specified pid
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }, // Extract month from createdAt
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { month: "$_id.month", year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $month: "$createdAt" }, "$$month"] },
                    { $eq: [{ $year: "$createdAt" }, "$$year"] },
                    { $eq: ["$pid", pid] }, // Match bookings with the same pid
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          monthLabel: {
            $dateToString: {
              format: "%B %Y",
              date: {
                $dateFromParts: { year: "$_id.year", month: "$_id.month" },
              },
            },
          },
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Send the month-wise data as a response
    res.status(200).json({ success: true, data: monthWiseData });
  } catch (error) {
    console.error("Error fetching month-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.YearlyDataPID = async (req, res) => {
  try {
    const pid = req.params.pid;

    const yearWiseData = await Payment.aggregate([
      {
        $match: { pid: pid }, // Match payments for the specified pid
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [{ $year: "$createdAt" }, "$$year"],
                },
              },
            },
            {
              $match: { pid: pid }, // Match bookings with the same pid
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { year: 1 } },
    ]);

    // Send the year-wise data as a response
    res.status(200).json({ success: true, data: yearWiseData });
  } catch (error) {
    console.error("Error fetching year-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**--------------------------[Reports Monthly/weekly/yearly DID]---------------------------- */
exports.WeeklyDataDID = async (req, res) => {
  try {
    const did = req.params.did;

    const weeklyData = await Payment.aggregate([
      {
        $match: { d_id: did }, // Match payments for the specified d_id
      },
      {
        $group: {
          _id: {
            week: { $isoWeek: "$createdAt" }, // Extract ISO week from createdAt
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { week: "$_id.week", year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $isoWeek: "$createdAt" }, "$$week"] },
                    { $eq: [{ $year: "$createdAt" }, "$$year"] },
                    { $eq: ["$d_id", did] }, // Match bookings with the same d_id
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          weekLabel: {
            $dateToString: {
              format: "%Y-W%U", // Format for ISO week
              date: {
                $dateFromParts: {
                  isoWeekYear: "$_id.year",
                  isoWeek: "$_id.week",
                },
              },
            },
          },
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } },
    ]);

    // Send the weekly data as a response
    res.status(200).json({ success: true, data: weeklyData });
  } catch (error) {
    console.error("Error fetching weekly data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.MonthlyDataDID = async (req, res) => {
  try {
    const did = req.params.did;

    const monthWiseData = await Payment.aggregate([
      {
        $match: { d_id: did }, // Match payments for the specified d_id
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }, // Extract month from createdAt
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { month: "$_id.month", year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $month: "$createdAt" }, "$$month"] },
                    { $eq: [{ $year: "$createdAt" }, "$$year"] },
                    { $eq: ["$d_id", did] }, // Match bookings with the same d_id
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          monthLabel: {
            $dateToString: {
              format: "%B %Y",
              date: {
                $dateFromParts: { year: "$_id.year", month: "$_id.month" },
              },
            },
          },
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Send the month-wise data as a response
    res.status(200).json({ success: true, data: monthWiseData });
  } catch (error) {
    console.error("Error fetching month-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.YearlyDataDID = async (req, res) => {
  try {
    const did = req.params.did;

    const yearlyData = await Payment.aggregate([
      {
        $match: { d_id: did }, // Match payments for the specified d_id
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $year: "$createdAt" }, "$$year"] },
                    { $eq: ["$d_id", did] }, // Match bookings with the same d_id
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { year: 1 } },
    ]);

    // Send the yearly data as a response
    res.status(200).json({ success: true, data: yearlyData });
  } catch (error) {
    console.error("Error fetching yearly data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**--------------------------[Reports Monthly/weekly/yearly ]---------------------------- */
exports.WeeklyDataAll = async (req, res) => {
  try {
    const weekWiseData = await Payment.aggregate([
      {
        $group: {
          _id: {
            week: { $isoWeek: "$createdAt" }, // Extract ISO week from createdAt
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { week: "$_id.week", year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $isoWeek: "$createdAt" }, "$$week"] },
                    { $eq: [{ $year: "$createdAt" }, "$$year"] },
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          weekLabel: {
            $concat: [
              {
                $dateToString: {
                  format: "%d %B",
                  date: {
                    $dateFromString: {
                      dateString: "1970-01-04",
                      format: "%Y-%m-%d",
                    },
                  },
                },
              },
              " - ",
              {
                $dateToString: {
                  format: "%d %B %Y",
                  date: {
                    $dateFromParts: {
                      isoWeekYear: "$_id.year",
                      isoWeek: "$_id.week",
                    },
                  },
                },
              },
            ],
          },
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } },
    ]);

    // Send the week-wise data as a response
    res.status(200).json({ success: true, data: weekWiseData });
  } catch (error) {
    console.error("Error fetching week-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.MonthlyDataAll = async (req, res) => {
  try {
    const monthWiseData = await Payment.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }, // Extract month from createdAt
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { month: "$_id.month", year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $month: "$createdAt" }, "$$month"] },
                    { $eq: [{ $year: "$createdAt" }, "$$year"] },
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          monthLabel: {
            $dateToString: {
              format: "%B %Y",
              date: {
                $dateFromParts: { year: "$_id.year", month: "$_id.month" },
              },
            },
          },
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Send the month-wise data as a response
    res.status(200).json({ success: true, data: monthWiseData });
  } catch (error) {
    console.error("Error fetching month-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.YearlyDataAll = async (req, res) => {
  try {
    const yearWiseData = await Payment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, // Extract year from createdAt
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "bookings", // Collection name of bookings
          let: { year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [{ $year: "$createdAt" }, "$$year"],
                },
              },
            },
            {
              $lookup: {
                from: "patients", // Collection name of patients
                localField: "patient",
                foreignField: "_id",
                as: "patient",
              },
            },
            {
              $lookup: {
                from: "doctors", // Collection name of doctors
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
              },
            },
            { $unwind: "$patient" },
            { $unwind: "$doctor" },
          ],
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          totalPayments: 1,
          bookings: 1,
        },
      },
      { $sort: { year: 1 } },
    ]);

    // Send the year-wise data as a response
    res.status(200).json({ success: true, data: yearWiseData });
  } catch (error) {
    console.error("Error fetching year-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**--------------------------------{Reports data monthly weekly yearly doctor wise}----------------------------- */
exports.WeeklyDataAllDoctor = async (req, res) => {
  try {
    const weekWiseData = await Payment.aggregate([
      {
        $group: {
          _id: {
            week: { $isoWeek: "$createdAt" }, // Extract ISO week from createdAt
            year: { $year: "$createdAt" }, // Extract year from createdAt
            d_id: "$d_id", // Preserve d_id for each payment
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "doctors", // Collection name of doctors
          localField: "_id.d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $project: {
          _id: 0,
          weekLabel: {
            $concat: [
              {
                $dateToString: {
                  format: "%d %B",
                  date: {
                    $dateFromString: {
                      dateString: "1970-01-04",
                      format: "%Y-%m-%d",
                    },
                  },
                },
              },
              " - ",
              {
                $dateToString: {
                  format: "%d %B %Y",
                  date: {
                    $dateFromParts: {
                      isoWeekYear: "$_id.year",
                      isoWeek: "$_id.week",
                    },
                  },
                },
              },
            ],
          },
          d_id: "$_id.d_id",
          d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
          d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] },
          totalPayments: 1,
        },
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } },
    ]);

    // Send the week-wise data as a response
    res.status(200).json({ success: true, data: weekWiseData });
  } catch (error) {
    console.error("Error fetching week-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.MonthlyDataAllDoctor = async (req, res) => {
  try {
    const monthWiseData = await Payment.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }, // Extract month from createdAt
            year: { $year: "$createdAt" }, // Extract year from createdAt
            d_id: "$d_id", // Preserve d_id for each payment
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "doctors", // Collection name of doctors
          localField: "_id.d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $project: {
          _id: 0,
          monthLabel: {
            $dateToString: {
              format: "%B %Y",
              date: {
                $dateFromParts: { year: "$_id.year", month: "$_id.month" },
              },
            },
          },
          d_id: "$_id.d_id",
          d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
          d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] },
          totalPayments: 1,
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Send the month-wise data as a response
    res.status(200).json({ success: true, data: monthWiseData });
  } catch (error) {
    console.error("Error fetching month-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.YearlyDataAllDoctor = async (req, res) => {
  try {
    const yearWiseData = await Payment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, // Extract year from createdAt
            d_id: "$d_id", // Preserve d_id for each payment
          },
          totalPayments: { $sum: "$pay_amount" },
        },
      },
      {
        $lookup: {
          from: "doctors", // Collection name of doctors
          localField: "_id.d_id",
          foreignField: "d_id",
          as: "doctor",
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          d_id: "$_id.d_id",
          d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
          d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] },
          totalPayments: 1,
        },
      },
      { $sort: { year: 1 } },
    ]);

    // Send the year-wise data as a response
    res.status(200).json({ success: true, data: yearWiseData });
  } catch (error) {
    console.error("Error fetching year-wise data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
