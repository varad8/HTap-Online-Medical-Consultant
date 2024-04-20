const fs = require("fs");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASSWORD, YOUR_EMAIL } = process.env;
const moment = require("moment");
const Razorpay = require("razorpay");
const Payment = require("../models/Payment");
const Prescription = require("../models/Prescription");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
const pdf = require("html-pdf");

// Configure nodemailer with your email transport settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

const createOrder = async (req, res) => {
  const { amount, pres_id } = req.body;

  if (!amount || !pres_id) {
    return res.status(400).json({ error: "Amount and presid not getting" });
  }

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: pres_id,
    payment_capture: 1,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchPaymentsForOrder = async (req, res) => {
  try {
    const { prescription, paydata } = req.body;

    console.log(prescription);

    if (!prescription || !paydata) {
      return res
        .status(400)
        .json({ error: "Prescription and data are required" });
    }

    // Fetch payments for the order
    razorpayInstance.orders.fetchPayments(paydata.id, async (err, payment) => {
      if (err) {
        console.error("Error fetching payments:", err);
        return res.status(500).json({ error: "Failed to fetch payments" });
      }

      // // Create payment document
      const newPayment = new Payment({
        d_id: prescription.d_id,
        pid: prescription.pid,
        booking: prescription.booking._id,
        prescription: prescription._id,
        patient: prescription.patient._id,
        doctor: prescription.doctor._id,
        pay_amount: prescription.amount,
        pay_id: payment.items[0].order_id,
        pay_type: payment.items[0].method,
        pres_id: prescription.pres_id,
        pay_status: "Paid",
        payDate: payment.items[0].created_at,
        appointment_id: prescription.appointment_id,
      });

      // Save payment to database
      try {
        await newPayment.save();

        // Update prescription status to "Paid"
        await Prescription.findByIdAndUpdate(prescription._id, {
          $set: {
            pay_status: "Paid",
          },
        });

        res.status(200).json({ message: "Payment details saved successfully" });
      } catch (saveError) {
        console.error("Error saving payment:", saveError);
        res.status(500).json({ error: "Failed to save payment details" });
      }
    });
  } catch (error) {
    console.error("Error fetching payments for order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchChartPayments = async (req, res) => {
  try {
    const { pid } = req.params;

    const result = await Payment.aggregate([
      {
        $match: { pid },
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
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            d_id: "$d_id",
          },
          count: { $sum: 1 }, // Count the number of payments
          totalAmount: { $sum: "$pay_amount" }, // Calculate the total amount of payments
          doctor: { $first: "$doctor" }, // Preserve doctor details for each payment
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id",
          d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
          d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] },
          count: 1,
          totalAmount: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchChartPaymentsByDID = async (req, res) => {
  try {
    const { did } = req.params;

    const result = await Payment.aggregate([
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
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            d_id: "$d_id",
          },
          count: { $sum: 1 }, // Count the number of payments
          totalAmount: { $sum: "$pay_amount" }, // Calculate the total amount of payments
          doctor: { $first: "$doctor" }, // Preserve doctor details for each payment
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id",
          d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
          d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] },
          count: 1,
          totalAmount: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchAllPaymentsBYPID = async (req, res) => {
  try {
    const { pid } = req.params;

    const payments = await Payment.find({ pid })
      .populate({
        path: "booking",
        model: "Booking",
      })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "prescription", model: "Prescription" })
      .populate({ path: "doctor", model: "Doctor" });

    // Format createdAt field to dd/mm/yy hh:mm format
    const formattedPayments = payments.map((payment) => ({
      ...payment.toObject(),
      createdAt: moment(payment.createdAt).format("DD/MM/YY HH:mm"),
    }));

    // Send the payments as JSON response
    res.status(200).json(formattedPayments);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchAllPaymentsBYDID = async (req, res) => {
  try {
    const { d_id } = req.params;

    const payments = await Payment.find({ d_id })
      .populate({
        path: "booking",
        model: "Booking",
      })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "prescription", model: "Prescription" })
      .populate({ path: "doctor", model: "Doctor" });

    // Format createdAt field to dd/mm/yy hh:mm format
    const formattedPayments = payments.map((payment) => ({
      ...payment.toObject(),
      createdAt: moment(payment.createdAt).format("DD/MM/YY HH:mm"),
    }));

    // Send the payments as JSON response
    res.status(200).json(formattedPayments);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchAllChartPayment = async (req, res) => {
  try {
    const result = await Payment.aggregate([
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
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            d_id: "$d_id",
          },
          count: { $sum: 1 }, // Count the number of payments
          totalAmount: { $sum: "$pay_amount" }, // Calculate the total amount of payments
          doctor: { $first: "$doctor" }, // Preserve doctor details for each payment
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id",
          d_firstname: { $arrayElemAt: ["$doctor.d_firstname", 0] },
          d_lastname: { $arrayElemAt: ["$doctor.d_lastname", 0] },
          count: 1,
          totalAmount: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({
        path: "booking",
        model: "Booking",
      })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "prescription", model: "Prescription" })
      .populate({ path: "doctor", model: "Doctor" });

    // Format createdAt field to dd/mm/yy hh:mm format
    const formattedPayments = payments.map((payment) => ({
      ...payment.toObject(),
      createdAt: moment(payment.createdAt).format("DD/MM/YY HH:mm"),
    }));

    // Send the payments as JSON response
    res.status(200).json(formattedPayments);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendInvoice = async (req, res) => {
  try {
    const { pay_id } = req.params;

    // Populate the `patient`, `doctor`, and `booking` fields
    const invoiceData = await Payment.findOne({ pay_id: pay_id })
      .populate("patient")
      .populate("doctor")
      .populate("booking");

    if (!invoiceData) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Retrieve patient's email
    const patientEmail = invoiceData.patient.p_email;

    // Prepare HTML content for the email
    const htmlContent = `
      <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Invoice Details</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Payment ID</td>
            <td>${invoiceData.pay_id}</td>
          </tr>
          <tr>
            <td>Appointment ID</td>
            <td>${invoiceData.appointment_id}</td>
          </tr>
          <tr>
            <td>Pay Date</td>
            <td>${invoiceData.payDate}</td>
          </tr>
          <tr>
            <td>Payment Status</td>
            <td>${invoiceData.pay_status}</td>
          </tr>
          <tr>
            <td>Payment Amount</td>
            <td>${invoiceData.pay_amount}</td>
          </tr>
          <tr>
            <td>Payment Type</td>
            <td>${invoiceData.pay_type}</td>
          </tr>

        </table>

        <h2>Booking Details</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Appointment ID</td>
            <td>${invoiceData.booking.appointment_id}</td>
          </tr>
          <tr>
            <td>Patient Name</td>
            <td>${invoiceData.patient.p_firstname} ${invoiceData.patient.p_lastname}</td>
          </tr>
          <tr>
            <td>Doctor Name</td>
            <td>${invoiceData.doctor.d_firstname} ${invoiceData.doctor.d_lastname}</td>
          </tr>
          <tr>
            <td>Patient Problem</td>
            <td>${invoiceData.booking.patient_problem}</td>
          </tr>
          <tr>
            <td>Visiting Status</td>
            <td>${invoiceData.booking.visiting_status}</td>
          </tr>
          <tr>
            <td>Booking Status</td>
            <td>${invoiceData.booking.booking_status}</td>
          </tr>
       
        </table>

        <h2>Patient Details</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>First Name</td>
            <td>${invoiceData.patient.p_firstname}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>${invoiceData.patient.p_lastname}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>${invoiceData.patient.p_email}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>${invoiceData.patient.p_add}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>${invoiceData.patient.p_location.city}, ${invoiceData.patient.p_location.state}</td>
          </tr>
      
        </table>

        <h2>Doctor Details</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>First Name</td>
            <td>${invoiceData.doctor.d_firstname}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>${invoiceData.doctor.d_lastname}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>${invoiceData.doctor.d_email}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>${invoiceData.doctor.d_address}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>${invoiceData.doctor.d_location.city}, ${invoiceData.doctor.d_location.state}</td>
          </tr>
       
        </table>
      </body>
      </html>
    `;

    // Generate PDF from HTML content
    pdf.create(htmlContent).toBuffer(async (err, buffer) => {
      if (err) {
        console.error("Error generating PDF:", err);
        return res.status(500).json({ error: "Failed to generate PDF" });
      }

      // Prepare email options
      const mailOptions = {
        from: YOUR_EMAIL,
        to: patientEmail,
        subject: "Invoice",
        html: htmlContent,
        attachments: [
          {
            filename: "invoice.pdf",
            content: buffer,
          },
        ],
      };

      // Send email with PDF attachment
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send email" });
        }
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Invoice sent successfully" });
      });
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error sending invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  fetchPaymentsForOrder,
  fetchChartPayments,
  fetchChartPaymentsByDID,
  fetchAllPaymentsBYPID,
  fetchAllPaymentsBYDID,
  fetchAllChartPayment,
  fetchAllPayments,
  sendInvoice,
};
