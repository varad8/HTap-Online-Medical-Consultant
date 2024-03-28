const fs = require("fs");
const ejs = require("ejs");
const nodemailer = require("nodemailer");

const moment = require("moment");
const Razorpay = require("razorpay");
const Payment = require("../models/Payment");
const Prescription = require("../models/Prescription");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

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
  console.log("Im Call");

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
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
          },
          count: { $sum: 1 }, // Count the number of payments
          totalAmount: { $sum: "$pay_amount" }, // Calculate the total amount of payments
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
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
    const { d_id } = req.params;

    const result = await Payment.aggregate([
      {
        $match: { d_id },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
          totalAmount: { $sum: "$pay_amount" },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
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
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            d_id: "$d_id", // Include the doctor ID
          },
          count: { $sum: 1 },
          totalAmount: { $sum: "$pay_amount" },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id", // Include the doctor ID
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

module.exports = {
  createOrder,
  fetchPaymentsForOrder,
  fetchChartPayments,
  fetchChartPaymentsByDID,
  fetchAllPaymentsBYPID,
  fetchAllPaymentsBYDID,
  fetchAllChartPayment,
  fetchAllPayments,
};
