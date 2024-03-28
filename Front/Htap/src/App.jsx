import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AuthGuard from "./components/guards/AuthGuard";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import OverView from "./components/dashboardcomponents/OverView";
import UserProfile from "./components/dashboardcomponents/user/UserProfile";
import Dprofile from "./components/dashboardcomponents/doctor/Dprofile";
import UserBooking from "./components/dashboardcomponents/user/UserBooking";
import Dbooking from "./components/dashboardcomponents/doctor/Dbooking";
import Dprescription from "./components/dashboardcomponents/doctor/Dprescription";
import UserPrescription from "./components/dashboardcomponents/user/UserPrescription";
import UserOverView from "./components/dashboardcomponents/user/UserOverView";
import ChatMessage from "./components/dashboardcomponents/ChatMessage";
import MessageProfile from "./components/dashboardcomponents/MessageProfile";

import DoverView from "./components/dashboardcomponents/doctor/DoverView";
import UserPayment from "./components/dashboardcomponents/user/UserPayment";
import AdminProfile from "./components/dashboardcomponents/admin/AdminProfile";
import Dpayment from "./components/dashboardcomponents/doctor/Dpayment";
import Register from "./components/Register";
import AdminOverview from "./components/dashboardcomponents/admin/AdminOverview";
import AdminBooking from "./components/dashboardcomponents/admin/AdminBooking";
import AdminPrescription from "./components/dashboardcomponents/admin/AdminPrescription";
import AdminPayment from "./components/dashboardcomponents/admin/AdminPayment";
import AdminCategory from "./components/dashboardcomponents/admin/AdminCategory";
import AdminDatabase from "./components/dashboardcomponents/admin/AdminDatabase";
import UserNotification from "./components/dashboardcomponents/user/UserNotification";
import DNotification from "./components/dashboardcomponents/doctor/DNotification";
import AdminNotification from "./components/dashboardcomponents/admin/AdminNotification";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";

function App() {
  const ProfileRouter = () => {
    // Retrieve and parse user role from localStorage
    const userRole = JSON.parse(localStorage.getItem("user"));

    // Check the user's role and render the appropriate component
    switch (userRole.role) {
      case "user":
        return <UserProfile />;
      case "doctor":
        return <Dprofile />;
      case "admin":
        return <AdminProfile />;
      default:
        return null;
    }
  };

  const BookingRouter = () => {
    // Retrieve and parse user role from localStorage
    const userRole = JSON.parse(localStorage.getItem("user"));

    // Check the user's role and render the appropriate component
    switch (userRole.role) {
      case "user":
        return <UserBooking />;
      case "doctor":
        return <Dbooking />;
      case "admin":
        return <AdminBooking />;
      default:
        return null;
    }
  };

  const PrescriptionRouter = () => {
    // Retrieve and parse user role from localStorage
    const userRole = JSON.parse(localStorage.getItem("user"));

    // Check the user's role and render the appropriate component
    switch (userRole.role) {
      case "user":
        return <UserPrescription />;
      case "doctor":
        return <Dprescription />;
      case "admin":
        return <AdminPrescription />;
      default:
        return null;
    }
  };

  const PaymentRouter = () => {
    // Retrieve and parse user role from localStorage
    const userRole = JSON.parse(localStorage.getItem("user"));

    // Check the user's role and render the appropriate component
    switch (userRole.role) {
      case "user":
        return <UserPayment />;
      case "doctor":
        return <Dpayment />;
      case "admin":
        return <AdminPayment />;
      default:
        return null;
    }
  };

  const OverViewRouter = () => {
    // Retrieve and parse user role from localStorage
    const userRole = JSON.parse(localStorage.getItem("user"));

    // Check the user's role and render the appropriate component
    switch (userRole.role) {
      case "user":
        return <UserOverView />;
      case "doctor":
        return <DoverView />;
      case "admin":
        return <AdminOverview />;
      default:
        return null;
    }
  };

  const NotificationRouter = () => {
    // Retrieve and parse user role from localStorage
    const userRole = JSON.parse(localStorage.getItem("user"));

    // Check the user's role and render the appropriate component
    switch (userRole.role) {
      case "user":
        return <UserNotification />;
      case "doctor":
        return <DNotification />;
      case "admin":
        return <AdminNotification />;
      default:
        return null;
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard allowedRoles={["admin", "user", "doctor"]}>
                <Layout>
                  <Home />
                </Layout>
              </AuthGuard>
            }
          ></Route>

          <Route
            path="/about"
            element={
              <AuthGuard allowedRoles={["admin", "user", "doctor"]}>
                <Layout>
                  <AboutUs />
                </Layout>
              </AuthGuard>
            }
          ></Route>

          <Route
            path="/contact"
            element={
              <AuthGuard allowedRoles={["admin", "user", "doctor"]}>
                <Layout>
                  <Contact />
                </Layout>
              </AuthGuard>
            }
          ></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/dashboard"
            element={
              <AuthGuard allowedRoles={["admin", "user", "doctor"]}>
                <Dashboard />
              </AuthGuard>
            }
          >
            <Route
              index
              element={
                <AuthGuard allowedRoles={["user", "doctor", "admin"]}>
                  <OverViewRouter />
                </AuthGuard>
              }
            />
            <Route
              path="overview"
              element={
                <AuthGuard allowedRoles={["user", "doctor", "admin"]}>
                  <OverViewRouter />
                </AuthGuard>
              }
            />
            <Route
              path="profile"
              element={
                <AuthGuard allowedRoles={["user", "admin", "doctor"]}>
                  <ProfileRouter />
                </AuthGuard>
              }
            />
            <Route
              path="bookings"
              element={
                <AuthGuard allowedRoles={["user", "admin", "doctor"]}>
                  <BookingRouter />
                </AuthGuard>
              }
            />
            <Route
              path="prescriptions"
              element={
                <AuthGuard allowedRoles={["user", "admin", "doctor"]}>
                  <PrescriptionRouter />
                </AuthGuard>
              }
            />
            <Route
              path="messages/:roomid"
              element={
                <AuthGuard allowedRoles={["user", "doctor"]}>
                  <ChatMessage />
                </AuthGuard>
              }
            />
            <Route
              path="messages"
              element={
                <AuthGuard allowedRoles={["user", "doctor"]}>
                  <MessageProfile />
                </AuthGuard>
              }
            />
            <Route
              path="payments"
              element={
                <AuthGuard allowedRoles={["user", "doctor", "admin"]}>
                  <PaymentRouter />
                </AuthGuard>
              }
            />
            <Route
              path="category"
              element={
                <AuthGuard allowedRoles={["admin"]}>
                  <AdminCategory />
                </AuthGuard>
              }
            />
            <Route
              path="database"
              element={
                <AuthGuard allowedRoles={["admin"]}>
                  <AdminDatabase />
                </AuthGuard>
              }
            />
            <Route
              path="notification"
              element={
                <AuthGuard allowedRoles={["user", "admin", "doctor"]}>
                  <NotificationRouter />
                </AuthGuard>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
