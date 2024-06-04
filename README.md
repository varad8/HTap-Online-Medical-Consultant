
  <div align="center">
  <h1 align="center">HTap (Frontend + Backend)</h1>
  <h3>Codebase for the HTap (Frontend + Backend) platform</h3>
  <h3>◦ Developed with the software and tools below.</h3>
  <p align="center">
  </p>
  </div>
  
  ---
  ## 📚 Table of Contents
  - [📚 Table of Contents](#-table-of-contents)
  - [🔍 Overview](#-overview)
  - [🌟 Features](#-features)
  - [📁 Repository Structure](#-repository-structure)
  - [💻 Code Summary](#-code-summary)
  - [🚀 Getting Started](#-getting-started)
  
  ---
  
  
  ## 🔍 Overview

 This project is a full-stack web application that consists of a backend and a frontend. The backend is built using Node.js, Express, and MongoDB, while the frontend is built using React and Tailwind CSS. The project includes a variety of features such as user authentication, doctor and patient profiles, booking appointments, sending notifications, and managing prescriptions. The backend also includes a RESTful API for the frontend to interact with the database.

---

## 🌟 Features

 User authentication, doctor and patient profiles, booking appointments, sending notifications, and managing prescriptions.

---

## 📁 Repository Structure

```sh
├── Backend
│   ├── .env
│   ├── app.js
│   ├── city.json
│   ├── controllers
│   │   ├── AdminController.js
│   │   ├── chatController.js
│   │   ├── DoctorController.js
│   │   ├── operations
│   │   │   ├── booking.js
│   │   │   ├── doctor.js
│   │   │   ├── prescription.js
│   │   │   └── ratenotification.js
│   │   ├── PaymentCotroller.js
│   │   └── UserController.js
│   ├── database
│   │   └── Connection.js
│   ├── dbpassword.txt
│   ├── export collection
│   │   ├── admins.json
│   │   ├── specialists.json
│   │   └── users.json
│   ├── middlewares
│   │   └── authentication.js
│   ├── models
│   │   ├── Admin.js
│   │   ├── Booking.js
│   │   ├── ChatRoom.js
│   │   ├── Doctor.js
│   │   ├── Message.js
│   │   ├── Notification.js
│   │   ├── Patient.js
│   │   ├── Payment.js
│   │   ├── Prescription.js
│   │   ├── specialistModel.js
│   │   └── User.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── routes
│   │   ├── adminRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── userRoutes.js
│   ├── uploads
│   │   ├── 1710680242625_patienticon.png
│   │   ├── 1710748576044_doctor.jpeg
│   │   ├── 1711040999315_chatbot.png
│   │   ├── 1711090070367_chatbot.png
│   │   ├── 1711518505454_images.jpeg
│   │   ├── 1711518521092_images.jpeg
│   │   ├── 1711992619447_chatbot.png
│   │   ├── 1711992799076_user.png
│   │   ├── 1717489937158_fire-flame-play-logo-icon-vector-29140997.jpg
│   │   └── 1717490607886_fire-flame-play-logo-icon-vector-29140997.jpg
│   └── views
│       └── resetPassword.ejs
└── Front
    └── Htap
        ├── .env
        ├── .eslintrc.cjs
        ├── .gitignore
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── README.md
        ├── src
        │   ├── App.css
        │   ├── App.jsx
        │   ├── components
        │   │   ├── AboutUs.jsx
        │   │   ├── Contact.jsx
        │   │   ├── Dashboard.jsx
        │   │   ├── dashboardcomponents
        │   │   │   ├── admin
        │   │   │   │   ├── AdminBooking.jsx
        │   │   │   │   ├── AdminCategory.jsx
        │   │   │   │   ├── AdminDatabase.jsx
        │   │   │   │   ├── AdminNotification.jsx
        │   │   │   │   ├── AdminOverview.jsx
        │   │   │   │   ├── AdminPayment.jsx
        │   │   │   │   ├── AdminPrescription.jsx
        │   │   │   │   ├── AdminProfile.jsx
        │   │   │   │   └── AdminReport.jsx
        │   │   │   ├── ChatMessage.jsx
        │   │   │   ├── doctor
        │   │   │   │   ├── Dbooking.jsx
        │   │   │   │   ├── DNotification.jsx
        │   │   │   │   ├── DoctorReport.jsx
        │   │   │   │   ├── DoverView.jsx
        │   │   │   │   ├── Dpayment.jsx
        │   │   │   │   ├── Dprescription.jsx
        │   │   │   │   └── Dprofile.jsx
        │   │   │   ├── MessageProfile.jsx
        │   │   │   ├── OverView.jsx
        │   │   │   └── user
        │   │   │       ├── UserBooking.jsx
        │   │   │       ├── UserNotification.jsx
        │   │   │       ├── UserOverView.jsx
        │   │   │       ├── UserPayment.jsx
        │   │   │       ├── UserPrescription.jsx
        │   │   │       ├── UserProfile.jsx
        │   │   │       └── UserReport.jsx
        │   │   ├── DepartMentFeatures.jsx
        │   │   ├── DoctorCard.jsx
        │   │   ├── DoctorFeatures.jsx
        │   │   ├── Features.jsx
        │   │   ├── Footer.jsx
        │   │   ├── guards
        │   │   │   ├── AuthGuard.jsx
        │   │   │   └── AuthGuardProfile.jsx
        │   │   ├── HeroSection.jsx
        │   │   ├── Home.jsx
        │   │   ├── Layout.jsx
        │   │   ├── Login.jsx
        │   │   ├── modals
        │   │   │   ├── DoctorSearchModal.jsx
        │   │   │   └── ProfileModal.jsx
        │   │   ├── Navbar.jsx
        │   │   ├── Register.jsx
        │   │   ├── SidebarDashboard.jsx
        │   │   └── TestiMonial.jsx
        │   ├── index.css
        │   └── main.jsx
        ├── tailwind.config.js
        ├── vite.config.js
        └── vite.config.js.timestamp-1710659888700-235a8fd80f6b.mjs

```

---

## 💻 Code Summary

<details><summary>\Backend</summary>

| File | Summary |
| ---- | ------- |
| app.js |  The code defines an Express.js server that serves a web application, with routes for user, doctor, and admin management, as well as chat-related operations. It also includes middleware for handling JSON data and setting the view engine to EJS. |

</details>

---

<details><summary>\Backend\controllers</summary>

| File | Summary |
| ---- | ------- |
| AdminController.js |  The code defines a Node.js API for an e-healthcare system, with routes for various administrative tasks such as registering new users, logging in, and managing user profiles. It also includes routes for booking appointments, prescribing medication, and viewing patient data. Additionally, it includes routes for generating reports and notifications. |
| chatController.js |  The code defines several functions for a messaging system, including creating new chat rooms, messages, and retrieving profile pictures for patients and doctors. |
| DoctorController.js |  The code defines a Node.js API using Express.js, with routes for registering a new doctor, logging in, and retrieving a doctor's profile. It also includes routes for managing bookings, prescriptions, and payments, as well as generating reports. The code uses JSON Web Tokens (JWT) for authentication and middleware to validate the token. |
| PaymentCotroller.js |  The code defines a set of functions for managing payments, including creating an order, fetching payments for an order, generating charts for payment data, and sending invoices to patients. |
| UserController.js |  The code defines a Node.js API for a healthcare system, with routes for user authentication, patient and doctor profiles, booking appointments, prescriptions, payments, notifications, and reports. It also includes a send message feature and an invoice sending feature. |

</details>

---

<details><summary>\Backend\controllers\operations</summary>

| File | Summary |
| ---- | ------- |
| booking.js |  {r            $match: {r              $expr: {r                $eq: [{ $year: createdAt }, $yearr              },r            },r          },r          {r            $lookup: {r              from: patients // Collection name of patientsr              localField: patient              foreignField: id              as: patient            },r          },r          {r            $lookup: {r              from: doctors // Collection name of doctorsr              localField: doctor              foreignField: id              as: doctor            },r          },r          { $unwind: patient },r          { $unwind: doctor },r        ],r        as: bookings      },r      {r        $project: {r          _id: 0,r          year: _id.year          totalPayments: 1,r          bookings: 1,r        },r      },r      { $sort: { year: 1 } },r    ]);rr    // Send the yearly data as a responser    res.status(200).json({ success: true, data |
| doctor.js |  The code defines several route handlers for a web application, including one that retrieves all doctors from the database, another that retrieves doctors based on location and approved account status, and another that retrieves a doctor's details by ObjectId. It also includes a handler to update a doctor's account status and a handler to retrieve a list of specialists. |
| prescription.js |  The code defines a set of functions for managing prescriptions, including creating new prescriptions, retrieving all prescriptions, updating existing prescriptions, and generating prescription IDs. It also includes functions for retrieving prescriptions by patient ID, doctor ID, or prescription ID, as well as generating charts for prescription data by month and by doctor. |
| ratenotification.js |  The code defines a set of CRUD (Create, Read, Update, Delete) operations for a Notification model in a MongoDB database. It includes functions for saving a new notification, updating an existing notification by ID, deleting a notification by ID, getting a notification by ID, and getting all notifications. |

</details>

---

<details><summary>\Backend\database</summary>

| File | Summary |
| ---- | ------- |
| Connection.js |  The code establishes a connection to a MongoDB database using the mongoose library, with the primary function of connecting to the database and logging a success message if successful. |

</details>

---

<details><summary>\Backend\middlewares</summary>

| File | Summary |
| ---- | ------- |
| authentication.js |  The code defines a function called authenticateToken that verifies a JSON Web Token (JWT) and extracts the user information from it, returning an error response if the token is invalid or expired. |

</details>

---

<details><summary>\Backend\models</summary>

| File | Summary |
| ---- | ------- |
| Admin.js |  The code defines a Mongoose schema for an Admin model, which includes fields for an admin's ID, username, first and last name, address, email, contact information, and profile picture. |
| Booking.js |  The code defines a Booking model in MongoDB using Mongoose, with fields for patient, doctor, appointment ID, patient problem, visiting status, booking status, visiting timestamp, PID, D_ID, schedule time, and patient mobile number. |
| ChatRoom.js |  The code defines a Mongoose schema for a ChatRoom model, with fields for userId, docId, chatRoomId, lastMessage, lastMessageTime, createdAt, patient, doctor, uid, and did. |
| Doctor.js |  The code defines a Mongoose schema for a Doctor model, with fields for a doctor's ID, username, address, first and last name, contact information, email, profile picture, experience, location, occupation, account status, service hours, and timestamps. |
| Message.js |  The code defines a Mongoose schema for a Message model, with fields for user ID, document ID, chat room ID, last message, last message time, patient, doctor, and messages. It also removes the unique index on the lastMessage field. |
| Notification.js |  The code defines a MongoDB schema for a Notification model, which includes fields for a notification title, feedback message, ratings, patient ID, doctor ID, and references to the Patient and Doctor models. |
| Patient.js |  The code defines a Patient model in MongoDB using Mongoose, with fields for patient ID, username, address, first and last name, contact information, email, profile picture, and location. |
| Payment.js |  The code defines a MongoDB schema for a Payment model, with fields for payment ID, patient ID, doctor ID, appointment ID, booking ID, patient, doctor, prescription, payment date, payment status, payment amount, and payment type. |
| Prescription.js |  The code defines a Mongoose schema for a Prescription model, which includes fields for a unique prescription ID, patient ID, doctor ID, appointment ID, medications, and payment status. |
| specialistModel.js |  The code defines a Mongoose schema for a Specialist model, which includes fields for name, description, and link. |
| User.js |  The code defines a User model in MongoDB using Mongoose, with fields for username, email, password, and role, and sets the default role to user |

</details>

---

<details><summary>\Backend\routes</summary>

| File | Summary |
| ---- | ------- |
| adminRoutes.js |  The code defines an Express.js router that uses the AdminController to handle requests for the admin route. |
| chatRoutes.js |  The code defines an Express.js router that handles requests for chat-related endpoints, including retrieving all messages, creating a new message, getting all chat rooms, creating a new chat room, and retrieving profile pictures by patient or doctor ID. |
| doctorRoutes.js |  The code defines an Express.js router that routes requests to the DoctorController. |
| userRoutes.js |  The code defines an Express.js router that uses the UserController to handle requests for the users route. |

</details>

---

<details><summary>\Front\Htap</summary>

| File | Summary |
| ---- | ------- |
| postcss.config.js |  The code defines a JavaScript object with a `plugins` property that contains two plugins: `tailwindcss` and `autoprefixer`. |
| tailwind.config.js |  The code defines a Tailwind CSS configuration file that sets the content, theme, and plugins for a project. |
| vite.config.js |  The code defines a Vite configuration file that imports the React plugin and sets environment variables for use in the application. |

</details>

---

<details><summary>\Front\Htap\src</summary>

| File | Summary |
| ---- | ------- |
| App.jsx |  The code defines a React application that uses the `react-router-dom` library to manage client-side routing. It includes several routes for different pages, including a home page, an about page, a contact page, a login page, a register page, and a dashboard page with various sub-routes for user profiles, bookings, prescriptions, messages, payments, notifications, reports, and more. The code also includes a custom `AuthGuard` component that checks the user's role and permissions before rendering certain components. |
| main.jsx |  The code imports React, ReactDOM, and App from various files, creates a root element in the DOM, and renders the App component in strict mode. |

</details>

---

<details><summary>\Front\Htap\src\components</summary>

| File | Summary |
| ---- | ------- |
| AboutUs.jsx |  The code defines a React component called AboutUs that renders an about page with a header, a paragraph, and an image. The component also imports the DoctorCard component. |
| Contact.jsx |  The code is a React component that renders a contact form with a name, email, and message input fields, as well as a submit button. When the form is submitted, it sends an HTTP POST request to the server using Axios, passing in the user's input data as JSON payload. The response from the server is then handled by displaying a success or error message using React Toastify. |
| Dashboard.jsx |  The code defines a React component called Dashboard that renders a sidebar and a main content area, using the `react-router-dom` library to manage routing. |
| DepartMentFeatures.jsx |  The code in the provided snippet is a React component that renders a section of a website with various features and services for different departments, including neurology, medicine, eye surgery, dentistry, and more. The component includes a grid layout with four columns, each containing a feature card with an icon, title, and description. Additionally, there are several absolute positioned elements, such as a voilet div behind the image top 1, yellow div behind the image bottom 2, and service showing, which provide visual effects and design elements. |
| DoctorCard.jsx |  The code fetches a list of doctors from an API endpoint using the `axios` library, and displays them in a grid layout. |
| DoctorFeatures.jsx |  The code is a React component that displays a grid of two columns, each containing an image and some text. The first column has a yellow background with a white circle icon in the top right corner, while the second column has a yellow background with a white text We Are Always Ensure Best Medical Treatment For Your Health The component also includes a button to make an appointment. |
| Features.jsx |  The code is a React component that displays a grid of features for a healthcare booking platform, including search doctor, choose your location, schedule appointment, and get your solution. |
| Footer.jsx |  The code defines a React component called Footer that renders a footer element with a grid layout, containing four columns and a navigation menu. |
| HeroSection.jsx |  The code in the provided snippet is a React component that renders a form for searching for doctors based on location, specialist, and date. It uses the `axios` library to fetch data from an API endpoint, and it also uses the `react-toastify` library to display toast messages. The component has a state variable called `searchDoctorData` that stores the search results, and it also has a state variable called `showModal` that controls whether the doctor search modal is visible or not. The component also has several event handlers for handling form submissions and displaying toast messages. |
| Home.jsx |  The code defines a React component named `Home` that renders a series of other components, including a hero section, features, doctor features, department features, and testimonials. |
| Layout.jsx |  The code defines a React component called Layout that renders a Navbar, its children, and a Footer. |
| Login.jsx |  The code is a React component that renders a login form for users to log in to an application. It uses the `useState` hook to manage the state of the email, password, and role fields, and the `useEffect` hook to fetch data from an API endpoint when the component mounts. The component also includes a forgot password modal that allows users to reset their passwords. |
| Navbar.jsx |  The code defines a React component that renders a navigation bar with a logo, links to different pages, and a dashboard button for authenticated users. It also includes a sidebar for mobile devices that can be opened by clicking on a hamburger icon. |
| Register.jsx |  The code is a React component that renders a registration form for users to create an account on a medical-related platform. It uses the `react-toastify` library to display a quote from a random category when the component mounts, and it also uses the `axios` library to make a GET request to an API endpoint to retrieve a list of quotes. The form includes input fields for the user's username, email, password, and confirmation password, as well as a radio button to select whether the user wants to register as a doctor or a patient. When the form is submitted, the component makes a POST request to the API endpoint with the user's input data, and it displays a toast message indicating whether the registration was successful or not. |
| SidebarDashboard.jsx |  The code is a React component that renders a sidebar for a dashboard, displaying various links and icons to navigate between different pages. It uses the `react-toastify` library to display toast notifications, and the `axios` library to make API requests. The component fetches user profile data from an API endpoint and displays it in the sidebar. It also includes a sign out button that logs the user out of the application. |
| TestiMonial.jsx |  The primary function of the code is to display a testimonial section on a website, featuring a doctor's profile picture, their name, occupation, and a rating system. The section also includes a feedback message from a patient and a navigation button to move between different testimonials. The code fetches data from an API endpoint using axios and sets it in state, which is then used to render the testimonials. |

</details>

---

<details><summary>\Front\Htap\src\components\dashboardcomponents\admin</summary>

| File | Summary |
| ---- | ------- |
| AdminBooking.jsx |  The code fetches booking data from an API endpoint and displays it in a list, allowing users to filter the data by various criteria such as patient name, schedule time, appointment ID, booking status, and visiting status. |
| AdminCategory.jsx |  The code is a React component that renders a form for creating and managing categories for specialists, with the ability to add, edit, and delete categories. It also displays a list of existing categories and allows the user to edit or delete them. |
| AdminDatabase.jsx |  The code is a React component that displays a database of doctors and patients, allowing the user to filter and sort the data based on various criteria. The component uses the `useState` hook to manage the state of the filters and the data, and the `useEffect` hook to fetch the data from an API endpoint when the component mounts. The component also includes a `ToastContainer` component from the `react-toastify` library to display error messages if there are any issues with the API request. |
| AdminNotification.jsx |  The code is a React component that displays a list of notifications for an admin user, allowing them to filter the notifications by date, patient name, doctor name, and rating. The component fetches the notification data from an API endpoint using Axios, and then filters the data based on the user's input. It also renders a star rating for each notification based on the ratings provided by the patients. |
| AdminOverview.jsx |  The code is a React component that displays various charts and reports related to the administration of a healthcare system. It fetches data from an API endpoint, generates random colors for the charts, and prepares the data for display. The component also includes a dropdown menu to switch between different types of reports (weekly, monthly, and yearly) and displays the corresponding data in a table format. |
| AdminPayment.jsx |  The code is a React component that displays a list of payments made by patients, along with the relevant details such as doctor, appointment ID, prescription ID, payment status, and more. The component also includes a filter bar to allow users to search for specific payments based on various criteria. Additionally, it includes a button to send an invoice to the patient. |
| AdminPrescription.jsx |  The code is a React component that displays a list of prescriptions for an admin user, along with the ability to filter and download the prescriptions. It also includes a modal for viewing and paying for a prescription. |
| AdminProfile.jsx |  The code is a React component that displays an admin's profile information and allows them to edit it. It fetches the admin's profile data from an API endpoint, and updates the profile information when the Update button is clicked. The component also includes a file input field for uploading a profile image. |
| AdminReport.jsx |  The code is a React component that displays a report for a doctor, allowing the user to filter the data by schedule date, visiting status, and booking status. It fetches data from an API endpoint and displays it in a table format. |

</details>

---

<details><summary>\Front\Htap\src\components\dashboardcomponents</summary>

| File | Summary |
| ---- | ------- |
| ChatMessage.jsx |  The code is a React component that renders a chat interface for a messaging app. It fetches messages from an API endpoint, displays them in a grid layout, and allows the user to send new messages by clicking a Send button. The component also includes a Back button to navigate back to the previous page. |
| MessageProfile.jsx |  The code defines a React component called `MessageProfile` that fetches chat rooms for the current user from an API endpoint and displays them in a list. When a chat room is clicked, it navigates to the chat room page. |
| OverView.jsx |  The code defines a React component called OverView that returns a div element with the text OverView |

</details>

---

<details><summary>\Front\Htap\src\components\dashboardcomponents\doctor</summary>

| File | Summary |
| ---- | ------- |
| Dbooking.jsx |  The code is a React component that displays a list of bookings and allows the user to generate prescriptions for each booking. It uses the `useState` hook to manage state, including the booking data, search term, filter options, and selected booking. The component also uses the `useEffect` hook to fetch the booking data from an API endpoint when the component mounts, and to filter the booking data based on the search term and filter options. The component also includes a modal for generating prescriptions, which allows the user to add medications, set the fee amount and expiration date, and submit the prescription. |
| DNotification.jsx |  The code is a React component that displays a list of notifications, allowing the user to filter them by date, patient name, and rating. It fetches the data from an API endpoint and renders it in a grid layout. |
| DoctorReport.jsx |  The code is a React component that displays a table of patient bookings for a doctor, with the ability to filter the data by schedule date, visiting status, and booking status. |
| DoverView.jsx |  The code is a React component that displays various charts and reports related to a doctor's bookings, prescriptions, payments, and visiting status. It fetches data from an API endpoint using axios, generates random RGB color values for the charts, and prepares the data for display. The component also includes a dropdown menu to switch between weekly, monthly, and yearly reports. |
| Dpayment.jsx |  The code is a React component that displays a list of payments, allowing the user to filter the list by various criteria such as patient name, doctor name, appointment ID, prescription ID, and payment status. The component also includes a button to send an invoice to the patient. |
| Dprescription.jsx |  The code is a React component that displays a list of prescriptions and allows the user to view, add, and update prescriptions. It also includes a modal for updating prescriptions. |
| Dprofile.jsx |  The code is a React component that displays a doctor's profile, including their personal information, service hours, and specialist category. It also allows the user to edit their profile and update it. |

</details>

---

<details><summary>\Front\Htap\src\components\dashboardcomponents\user</summary>

| File | Summary |
| ---- | ------- |
| UserBooking.jsx |  The code is a React component that displays a list of bookings for a user, allowing them to filter the list by various criteria such as doctor, schedule time, appointment ID, booking status, and visiting status. The component also includes a cancel button for each booking, which can be clicked to cancel the booking if certain conditions are met (e.g., the booking is not already cancelled, the visiting status is not Visited and the scheduling date is after the current date). |
| UserNotification.jsx |  The code is a React component that displays a list of user notifications, including the title, content, and rating of each notification. It also allows the user to filter the notifications by date, doctor name, and rating, and update or delete individual notifications. |
| UserOverView.jsx |  The code is a React component that displays various charts and reports related to a user's bookings, prescriptions, and payments. It fetches data from an API endpoint using axios, generates random RGB color values for the charts, and prepares the chart data based on the data received. The component also includes a dropdown menu to switch between different types of reports (weekly, monthly, and yearly). |
| UserPayment.jsx |  The code fetches payment data from an API endpoint and displays it in a table, allowing the user to filter the data by various criteria. It also includes a button that allows the user to generate an invoice for a specific payment. |
| UserPrescription.jsx |  The code is a React component that displays a list of prescriptions for a user, along with the ability to filter the list by various criteria and view details about each prescription. The component also includes a modal for viewing a prescription and a rating system for leaving feedback. |
| UserProfile.jsx |  The code is a React component that displays a user's profile information, including their name, email, contact number, address, and location. It also allows the user to edit their profile information and update it. |
| UserReport.jsx |  The code is a React component that displays a table of reports for a user, with the ability to filter the data by schedule date, visiting status, and booking status. |

</details>

---

<details><summary>\Front\Htap\src\components\guards</summary>

| File | Summary |
| ---- | ------- |
| AuthGuard.jsx |  The code defines a React component called `AuthGuard` that checks if the user is logged in and has the required role to access certain pages. If the user is not logged in or does not have the required role, it redirects them to the login page. |
| AuthGuardProfile.jsx |  The code defines a React component called `AuthGuardProfile` that checks if the user's profile is complete by fetching it from an API endpoint. If the profile is not found, it shows a modal to prompt the user to complete their profile. |

</details>

---

<details><summary>\Front\Htap\src\components\modals</summary>

| File | Summary |
| ---- | ------- |
| DoctorSearchModal.jsx |  The code is a React component that renders a modal for booking an appointment with a doctor. It fetches the user's profile and the selected doctor's information, and allows the user to enter their problem, mobile number, and date of appointment before submitting the booking request. The component also includes a chat feature that activates a new chat room when clicked. |
| ProfileModal.jsx |  The code defines a React component called ProfileModal that renders a modal window with a form to complete a user's profile. |

</details>

---

## 🚀 Getting Started

 Getting Started with the Project<br>=====================================

This guide will help you get started with the project, including setting up the backend and frontend, and running the application.

Setting Up the Backend
------------------------

1. Clone the repository to your local machine using `git clone <repository-url>`.
2. Install the dependencies by running `npm install` in the root directory of the project.
3. Create a `.env` file in the root directory of the project and add the necessary environment variables for the backend.
4. Start the backend server by running `npm run start:dev` in the root directory of the project.

Setting Up the Frontend
-------------------------

1. Navigate to the `Front` directory of the project.
2. Install the dependencies by running `npm install` in the root directory of the project.
3. Create a `.env` file in the root directory of the project and add the necessary environment variables for the frontend.
4. Start the frontend server by running `npm run start` in the root directory of the project.

Running the Application
------------------------

1. Open a web browser and navigate to `http://localhost:3000` to access the frontend of the application.
2. You can now use the application by interacting with the frontend.

Troubleshooting

---

Generated with ❤️ by [ReadMeAI](https://www.readmeai.co/).
