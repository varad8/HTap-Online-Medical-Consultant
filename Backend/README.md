  <div align="center">
  <h1 align="center">Htap Server (Backend)</h1>
  <h3>Codebase for the Htap Server (Backend) platform</h3>
  <h3>◦ Developed with the software and tools below.</h3>
  <p align="center"><img src="https://img.shields.io/badge/-Node.js-004E89?logo=Node.js&style=flat-square" alt='Node.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Express.js-004E89?logo=Express.js&style=flat-square" alt='Express.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-MongoDB-004E89?logo=MongoDB&style=flat-square" alt='MongoDB\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Mongoose-004E89?logo=Mongoose&style=flat-square" alt='Mongoose\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-React-004E89?logo=React&style=flat-square" alt='React\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Socket.io-004E89?logo=Socket.io&style=flat-square" alt='Socket.io"' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" />
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

This is a Node.js project with a React frontend, using Express.js for the backend and MongoDB as the database. The project involves a chatbot feature, where users can interact with the chatbot to book appointments, get notifications, and access their prescriptions. The project also includes a doctor search feature, where users can search for doctors based on their location and specialty. The project also includes a payment gateway integration for online payments.

---

## 🌟 Features

Here is a list of features for the project:<br>

- Chatbot feature for booking appointments, getting notifications, and accessing prescriptions
- Doctor search feature based on location and specialty
- Payment gateway integration for online payments
- User authentication and authorization
- Admin dashboard for managing users, doctors, and appointments
- Real-time chat functionality
- Prescription management system
- Notification system for patients and doctors
- Search bar for finding doctors and prescriptions
- Reset password feature for users
- Profile management for patients and doctors
- Admin panel for managing users, doctors, and appointments
- Integration with MongoDB for data storage
- RESTful API for backend communication
- React frontend for user interface
- Express.js for backend framework
- Node.js for server-side scripting
- Tailwind CSS for styling
- EJS for templating
- Vite for frontend build tool

---

## 📁 Repository Structure

```sh
├── .env
├── app.js
├── controllers
│   ├── AdminController.js
│   ├── chatController.js
│   ├── DoctorController.js
│   ├── operations
│   │   ├── booking.js
│   │   ├── doctor.js
│   │   ├── prescription.js
│   │   └── ratenotification.js
│   ├── PaymentCotroller.js
│   └── UserController.js
├── database
│   └── Connection.js
├── dbpassword.txt
├── Front
│   └── Htap
│       ├── .env
│       ├── .eslintrc.cjs
│       ├── .gitignore
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── postcss.config.js
│       ├── README.md
│       ├── src
│       │   ├── App.css
│       │   ├── App.jsx
│       │   ├── components
│       │   │   ├── AboutUs.jsx
│       │   │   ├── Contact.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   ├── dashboardcomponents
│       │   │   │   ├── admin
│       │   │   │   │   ├── AdminBooking.jsx
│       │   │   │   │   ├── AdminCategory.jsx
│       │   │   │   │   ├── AdminDatabase.jsx
│       │   │   │   │   ├── AdminNotification.jsx
│       │   │   │   │   ├── AdminOverview.jsx
│       │   │   │   │   ├── AdminPayment.jsx
│       │   │   │   │   ├── AdminPrescription.jsx
│       │   │   │   │   └── AdminProfile.jsx
│       │   │   │   ├── ChatMessage.jsx
│       │   │   │   ├── doctor
│       │   │   │   │   ├── Dbooking.jsx
│       │   │   │   │   ├── DNotification.jsx
│       │   │   │   │   ├── DoverView.jsx
│       │   │   │   │   ├── Dpayment.jsx
│       │   │   │   │   ├── Dprescription.jsx
│       │   │   │   │   └── Dprofile.jsx
│       │   │   │   ├── MessageProfile.jsx
│       │   │   │   ├── OverView.jsx
│       │   │   │   └── user
│       │   │   │       ├── UserBooking.jsx
│       │   │   │       ├── UserNotification.jsx
│       │   │   │       ├── UserOverView.jsx
│       │   │   │       ├── UserPayment.jsx
│       │   │   │       ├── UserPrescription.jsx
│       │   │   │       └── UserProfile.jsx
│       │   │   ├── DepartMentFeatures.jsx
│       │   │   ├── DoctorCard.jsx
│       │   │   ├── DoctorFeatures.jsx
│       │   │   ├── Features.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── guards
│       │   │   │   └── AuthGuard.jsx
│       │   │   ├── HeroSection.jsx
│       │   │   ├── Home.jsx
│       │   │   ├── Layout.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── modals
│       │   │   │   └── DoctorSearchModal.jsx
│       │   │   ├── Navbar.jsx
│       │   │   ├── Register.jsx
│       │   │   ├── SidebarDashboard.jsx
│       │   │   └── TestiMonial.jsx
│       │   ├── index.css
│       │   └── main.jsx
│       ├── tailwind.config.js
│       ├── vite.config.js
│       └── vite.config.js.timestamp-1710659888700-235a8fd80f6b.mjs
├── middlewares
│   └── authentication.js
├── models
│   ├── Admin.js
│   ├── Booking.js
│   ├── ChatRoom.js
│   ├── Doctor.js
│   ├── Message.js
│   ├── Notification.js
│   ├── Patient.js
│   ├── Payment.js
│   ├── Prescription.js
│   ├── specialistModel.js
│   └── User.js
├── package-lock.json
├── package.json
├── routes
│   ├── adminRoutes.js
│   ├── chatRoutes.js
│   ├── doctorRoutes.js
│   └── userRoutes.js
├── uploads
│   ├── 1710680242625_patienticon.png
│   ├── 1710748576044_doctor.jpeg
│   ├── 1711040999315_chatbot.png
│   ├── 1711090070367_chatbot.png
│   ├── 1711518505454_images.jpeg
│   └── 1711518521092_images.jpeg
└── views
    └── resetPassword.ejs

```

---

## 💻 Code Summary

<details><summary>Root</summary>

| File   | Summary                                                                                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| app.js | The code sets up an Express.js server with routes for user, doctor, and admin management, as well as chat-related operations, and starts the server on a specified port. |

</details>

---

<details><summary>\controllers</summary>

| File                | Summary                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AdminController.js  | The code defines a Node.js API for an e-healthcare system, with routes for registering and logging in users, resetting passwords, and retrieving user profiles. It also includes routes for managing doctors, patients, and prescriptions, as well as chart visualizations and notifications.                                                                                                           |
| chatController.js   | The code defines a set of RESTful API endpoints for a messaging system, including creating and retrieving chat rooms, messages, and user profiles.                                                                                                                                                                                                                                                      |
| DoctorController.js | The code defines a router for a healthcare system, with routes for registering a new doctor, logging in as a doctor, and retrieving a doctor's profile. It also includes routes for managing bookings, prescriptions, and payments, as well as notification of ratings. The code requires the express, jsonwebtoken, and bcrypt libraries, and defines a multer storage configuration for file uploads. |
| PaymentCotroller.js | The code defines a set of functions for handling payments, including creating an order, fetching payments for an order, and aggregating payment data.                                                                                                                                                                                                                                                   |
| UserController.js   | This code defines a Node.js API for a healthcare system, with routes for user registration, login, profile management, booking and prescription management, payment processing, and notification management. The primary function of this code is to provide a RESTful API for a healthcare system, allowing users to interact with the system through HTTP requests.                                   |

</details>

---

<details><summary>\controllers\operations</summary>

| File                | Summary                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| booking.js          | The code defines a set of route handlers for a web application that manages patient bookings. The primary function of the code is to handle HTTP requests and perform CRUD (create, read, update, delete) operations on booking data in a MongoDB database. The code also includes functionality for generating unique appointment IDs, validating input data, and formatting output data for display on a chart. |
| doctor.js           | The code defines several route handlers for a web application, including one that retrieves all doctors from the database, another that retrieves doctors based on location and approved account status, and a third that retrieves a doctor's details by ObjectId. It also includes a route handler to update a doctor's account status and a route handler to retrieve a list of specialists.                   |
| prescription.js     | The code defines a set of functions for managing prescriptions, including creating new prescriptions, retrieving all prescriptions, updating existing prescriptions, and generating prescription IDs. It also includes functions for retrieving prescriptions by patient ID, doctor ID, or prescription ID, as well as aggregating prescription data by month and date.                                           |
| ratenotification.js | The code defines a set of functions for creating, updating, deleting, and retrieving notifications in a MongoDB database. The primary function of the code is to provide a RESTful API for managing notifications in the database.                                                                                                                                                                                |

</details>

---

<details><summary>\database</summary>

| File          | Summary                                                                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connection.js | The code establishes a connection to a MongoDB database using the mongoose library, with the primary function of connecting to the database and logging a success message if successful. |

</details>

---

<details><summary>\Front\Htap</summary>

| File               | Summary                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| postcss.config.js  | The code defines a JavaScript object with a `plugins` property that contains two plugins: `tailwindcss` and `autoprefixer`.                                                     |
| tailwind.config.js | The code defines a Tailwind CSS configuration file that sets the content, theme, and plugins for a project.                                                                     |
| vite.config.js     | The code defines a Vite configuration file that imports the React plugin, dotenv, and defines environment variables for VITE_KEY, VITE_CITY, VITE_RAZORPAY, and VITE_QUOTE_API. |

</details>

---

<details><summary>\Front\Htap\src</summary>

| File     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App.jsx  | The code defines a React application that uses the `react-router-dom` library to manage client-side routing and navigation. It includes several routes for different pages, such as the homepage, about page, contact page, login page, register page, dashboard page, and more. The code also includes a custom `AuthGuard` component that checks the user's role and renders the appropriate component based on their role. |
| main.jsx | The code creates a React application by rendering the App component to the root element with ID root using ReactDOM.                                                                                                                                                                                                                                                                                                          |

</details>

---

<details><summary>\Front\Htap\src\components</summary>

| File                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AboutUs.jsx            | The code defines a React component called AboutUs that renders an about page with a header, a paragraph, and an image. The component also imports the DoctorCard component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Contact.jsx            | The code is a React component that renders a contact form with a name, email, and message input fields, as well as a submit button. When the form is submitted, it sends an HTTP POST request to a server endpoint with the form data, using the Axios library for making the request. The response from the server is then displayed in a toast notification using the react-toastify library.                                                                                                                                                                                                                                                                                                                                               |
| Dashboard.jsx          | The code defines a React component called Dashboard that renders a sidebar and a main content area, using the `react-router-dom` library to manage routing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| DepartMentFeatures.jsx | The code defines a React component called DepartMentFeatures that displays a list of features for different medical departments, including Neurology, Medicine, Eye Surgery, Dentistry, and more. The component includes a grid layout with four columns, each containing a department's icon, name, and description. Additionally, the component includes several SVG icons and a background image.                                                                                                                                                                                                                                                                                                                                          |
| DoctorCard.jsx         | The code fetches a list of doctors from an API endpoint using the `axios` library, and displays them in a grid layout.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| DoctorFeatures.jsx     | The code is a React component that displays a grid of two columns, each containing an image and some text. The first column has a yellow background with a white circle icon in the top right corner, while the second column has a white background with a green checkmark icon in the top left corner. The text in the second column includes information about the benefits of using the website's doctor services, such as top specialist doctors, state-of-the-art services, quick enrollment, and free consultations.                                                                                                                                                                                                                   |
| Features.jsx           | The code is a React component that displays a grid of features for a healthcare website, including search doctor, choose your location, schedule appointment, and get your solution.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Footer.jsx             | The code defines a React component called Footer that renders a footer element with a grid layout, containing four columns and a navigation menu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| HeroSection.jsx        | The code defines a React component called HeroSection that renders a hero section with a form for searching doctors and their availability. The form includes fields for selecting a location, specialist, appointment date, and number of people in the party. When the search button is clicked, it calls the searchDoctor function, which makes an API request to retrieve doctor data based on the selected location, specialist, and date. If the response contains no data, it displays a toast message. Otherwise, it sets the showModal state to true, which renders a modal component displaying the retrieved doctor data.                                                                                                          |
| Home.jsx               | The code defines a React component named `Home` that renders a series of other components, including a hero section, features, doctor features, department features, and testimonials.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Layout.jsx             | The code defines a React component called Layout that renders a Navbar, its children, and a Footer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Login.jsx              | The code is a React component that renders a login form for a medical application. It uses the `react-toastify` library to display toast messages, and the `axios` library to make API requests. The component has a state variable called `responseData` that stores the response data from an API call, and it also has several other state variables for storing user input values. The component also has several event handlers for handling form submissions and displaying toast messages.                                                                                                                                                                                                                                             |
| Navbar.jsx             | The code defines a React component that renders a navigation bar with a logo, links to different pages, and a dropdown menu for mobile devices. It also includes a sidebar for mobile devices that displays the same links as the dropdown menu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Register.jsx           | The Register component is a React functional component that renders a registration form for users to create an account on a medical-related platform. It uses the useState hook to manage state variables for email, username, password, and confirmpassword, as well as role (which can be either doctor or user The component also imports several other libraries, including React-Toastify for displaying toast messages, axios for making API requests, and react-router-dom for navigating between pages. The component's primary function is to handle the registration process by sending a POST request to the server with the user's input data, and then redirecting the user to the login page if the registration is successful. |
| SidebarDashboard.jsx   | The code defines a React component that renders a sidebar for a dashboard, with various links to different pages. It uses the `react-toastify` library to display toast notifications when errors occur during API requests. The component also uses the `react-router-dom` library to handle routing and the `axios` library to make API requests.                                                                                                                                                                                                                                                                                                                                                                                           |
| TestiMonial.jsx        | The code is a React component that displays a testimonial section with a doctor's profile picture, name, occupation, and rating. It also includes a navigation button to move between different testimonials.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

</details>

---

<details><summary>\Front\Htap\src\components\dashboardcomponents\admin</summary>

| File                  | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AdminBooking.jsx      | The code is a React component that displays a list of bookings and allows the user to generate prescriptions for each booking. It uses the `useState` hook to manage state, including the list of bookings, the search term, and the selected booking. It also uses the `useEffect` hook to fetch the list of bookings from an API endpoint and filter the data based on the search term and filter options. The component also includes a modal for generating prescriptions, which allows the user to add medications, set the expiration date, and save the prescription.    |
| AdminCategory.jsx     | The code is a React component that displays a form for creating and managing categories for specialists, with the ability to add, edit, and delete categories. It also includes a modal for editing a category.                                                                                                                                                                                                                                                                                                                                                                 |
| AdminDatabase.jsx     | The code is a React component that displays a database of doctors and patients, allowing the user to filter and search for specific records. It uses the `useState` hook to manage state variables, including the current database option (either Doctor or Patient the filters for each option, and the data for both options. The component also includes a `fetch` function to retrieve data from an API endpoint, as well as a `toggleApprovedStatus` function to update the status of a doctor's account.                                                                  |
| AdminNotification.jsx | The code is a React component that displays a list of notifications for an administrator, allowing them to filter the notifications by date, patient name, doctor name, and rating. The component fetches the notification data from an API endpoint and renders it in a grid layout, with each notification displayed as a card containing the notification title, feedback message, patient information, ratings, and creation date. The component also includes a filter control that allows the administrator to search for specific notifications based on these criteria. |
| AdminOverview.jsx     | The code is a React component that displays various charts and graphs to provide an overview of the admin dashboard. It fetches data from an API endpoint using axios, and then generates random RGB color values for each chart using the generateRandomColor function. The charts are displayed using the react-chartjs-2 library, and the data is prepared using the chartData, chartPresData, and chartPayData objects. The component also includes a ToastContainer to display error messages if any occur during the fetching process.                                    |
| AdminPayment.jsx      | The code is a React component that displays a list of payments made by patients, with filters to search for specific payments based on various criteria such as patient name, doctor name, appointment ID, prescription ID, payment status, booking status, and visiting status. The component fetches the payment data from an API endpoint using axios and displays it in a table format, along with the patient's profile picture, doctor's profile picture, and other relevant information.                                                                                 |
| AdminPrescription.jsx | The code is a React component that displays a list of prescriptions for an admin user, allowing them to view and download the prescriptions. It also allows the admin to pay for the prescription using Razorpay.                                                                                                                                                                                                                                                                                                                                                               |
| AdminProfile.jsx      | The code is a React component that displays an admin's profile information, including their name, email, mobile number, and address. It also allows the admin to edit their profile information by clicking on the Edit button, which enables input fields for the admin to update their personal information. Once the admin clicks on the Update button, the updated information is sent to the server using the `axios` library and the page is reloaded with the updated profile information.                                                                               |

</details>

---

<details><summary>\Front\Htap\src\components\dashboardcomponents</summary>

| File               | Summary                                                                                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ChatMessage.jsx    | The code is a React component that displays a chat interface for a messaging app. It fetches messages from an API endpoint, displays them in a grid layout, and allows the user to send new messages by clicking a Send button. The component also includes a Back button to navigate back to the previous page. |
| MessageProfile.jsx | The code defines a React component called `MessageProfile` that fetches chat rooms for the current user from an API endpoint and displays them in a list. When a chat room is clicked, it navigates to the corresponding chat room page.                                                                         |
| OverView.jsx       | The code defines a React component called OverView that returns a div element with the text OverView                                                                                                                                                                                                             |

</details>

---

<details><summary>\Front\Htap\src\components\dashboardcomponents\doctor</summary>

| File              | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dbooking.jsx      | The code is a React component that displays a list of bookings and allows the user to generate prescriptions for each booking. It uses the `axios` library to fetch data from an API endpoint, and it also uses the `react-toastify` library to display toast messages. The component has several state variables, including `bookingData`, `filteredData`, `selectedBooking`, `prescriptionModal`, `medications`, `amount`, and `expireAt`. It also has several event handlers, such as `handleInputChange`, `handleOpenPrescription`, and `handleSavePrescription`. |
| DNotification.jsx | The code is a React component that displays a list of notifications, allowing the user to filter them by date, patient name, and rating. It also includes a modal for updating the rating of a notification.                                                                                                                                                                                                                                                                                                                                                          |
| DoverView.jsx     | The code is a React component that displays various charts, including line, bar, and doughnut charts, to visualize data related to bookings, prescriptions, and payments. It uses the Chart.js library to generate the charts and the react-toastify library to display error messages. The component fetches data from an API endpoint using axios and stores it in state variables. It then generates random RGB color values for the chart backgrounds and prepares the chart data for display.                                                                    |
| Dpayment.jsx      | The code fetches payment data from an API endpoint and displays it in a table, allowing the user to filter the data by various criteria such as patient name, doctor name, appointment ID, prescription ID, doctor ID, patient ID, payment status, booking status, and visiting status.                                                                                                                                                                                                                                                                               |
| Dprescription.jsx | The code is a React component that displays a list of prescriptions and allows the user to view, add, and update prescriptions. It also includes a modal for updating prescriptions.                                                                                                                                                                                                                                                                                                                                                                                  |
| Dprofile.jsx      | The code is a React component that displays a doctor's profile, including their personal information, service hours, and specialist category. It also allows the user to edit their profile and update it.                                                                                                                                                                                                                                                                                                                                                            |

</details>

---

<details><summary>\Front\Htap\src\components\dashboardcomponents\user</summary>

| File                 | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UserBooking.jsx      | The code in the provided snippet is a React component that displays a list of bookings for a user, allowing them to filter and cancel their bookings.                                                                                                                                                                                                                                                                                                                                                                             |
| UserNotification.jsx | The code is a React component that displays a list of user notifications, allowing the user to filter and update the ratings. It uses the `useState` hook to manage state variables such as the notification data, filters, and rating modal visibility. The component also makes use of the `axios` library to fetch data from an API endpoint and the `react-toastify` library to display toast messages.                                                                                                                       |
| UserOverView.jsx     | The code is a React component that displays various charts for a user's bookings, prescriptions, and payments. It uses the `react-toastify` library to display error messages when fetching data fails, and it generates random RGB color values for each chart using the `generateRandomColor()` function. The component also prepares chart data using the `chartData`, `chartPresData`, and `chartPayData` objects, which are then passed as props to the `Line`, `Bar`, `Doughnut`, and `PolarArea` components, respectively. |
| UserPayment.jsx      | The code fetches payment data from an API endpoint and displays it in a table, allowing the user to filter the data by various criteria such as patient name, doctor name, appointment ID, prescription ID, doctor ID, patient ID, payment status, booking status, and visiting status.                                                                                                                                                                                                                                           |
| UserPrescription.jsx | The code is a React component that displays a list of prescriptions for a user, along with the ability to filter the list by various criteria and view details about each prescription. It also includes functionality for paying for a prescription and rating the doctor who provided it.                                                                                                                                                                                                                                       |
| UserProfile.jsx      | The code is a React component that displays a user's profile information, including their name, email, contact number, address, and location. It also allows the user to edit their profile information and update it.                                                                                                                                                                                                                                                                                                            |

</details>

---

<details><summary>\Front\Htap\src\components\guards</summary>

| File          | Summary                                                                                                                                                                                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AuthGuard.jsx | The AuthGuard component in React is a higher-order component that checks if the user is logged in and has the necessary permissions to access certain routes. It uses the useNavigate hook from react-router-dom to redirect the user to the login page if they are not authorized. |

</details>

---

<details><summary>\Front\Htap\src\components\modals</summary>

| File                  | Summary                                                                                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DoctorSearchModal.jsx | The code is a React component that displays a modal with information about a doctor, including their name, contact details, and service hours. It also includes a form to book an appointment with the doctor. |

</details>

---

<details><summary>\middlewares</summary>

| File              | Summary                                                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| authentication.js | The code defines a function called authenticateToken that verifies a JSON Web Token (JWT) and extracts the user information from it, returning an error response if the token is invalid or expired. |

</details>

---

<details><summary>\models</summary>

| File               | Summary                                                                                                                                                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin.js           | The code defines a Mongoose schema for an Admin model, which includes fields for an admin's ID, username, first and last name, address, email, contact information, and profile picture.                                                                                                                      |
| Booking.js         | The code defines a Booking model in MongoDB using Mongoose, with fields for patient, doctor, appointment ID, patient problem, visiting status, booking status, visiting timestamp, PID, D_ID, schedule time, and patient mobile number.                                                                       |
| ChatRoom.js        | The code defines a Mongoose schema for a ChatRoom model, with fields for userId, docId, chatRoomId, lastMessage, lastMessageTime, createdAt, patient, doctor, uid, and did.                                                                                                                                   |
| Doctor.js          | The code defines a Mongoose schema for a Doctor model, with fields for a doctor's ID, username, address, first and last name, contact information, email, profile picture, experience, location, occupation, account status, service hours, and timestamps.                                                   |
| Message.js         | The code defines a Mongoose schema for a Message model, with fields for user ID, document ID, chat room ID, last message, and last message time, as well as references to Patient and Doctor models. It also defines an index on the last message field to allow for multiple messages with the same content. |
| Notification.js    | The code defines a Mongoose schema for a Notification model, which includes fields for a notification title, feedback message, ratings, patient ID, doctor ID, and references to the patient and doctor models.                                                                                               |
| Patient.js         | The code defines a Mongoose schema for a Patient model, with fields for patient ID, username, address, first and last name, contact information, email, profile picture, and location.                                                                                                                        |
| Payment.js         | The code defines a Payment model in MongoDB, with fields for payment ID, patient ID, doctor ID, appointment ID, booking ID, patient, doctor, prescription, payment date, payment status, payment amount, and payment type.                                                                                    |
| Prescription.js    | The code defines a Mongoose schema for a Prescription model, with fields for a unique prescription ID, patient ID, doctor ID, appointment ID, medications, and other relevant information.                                                                                                                    |
| specialistModel.js | The code defines a Mongoose schema for a Specialist model with name, description, and link properties.                                                                                                                                                                                                        |
| User.js            | The code defines a User model in MongoDB using Mongoose, with fields for username, email, password, and role, and sets the default role to user                                                                                                                                                               |

</details>

---

<details><summary>\routes</summary>

| File            | Summary                                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| adminRoutes.js  | The code defines an Express.js router that uses the AdminController to handle requests for the admin route.                                                                                            |
| chatRoutes.js   | The code defines a router for an Express.js application, with routes for retrieving messages, creating new messages, getting all chat rooms, creating new chat rooms, and retrieving profile pictures. |
| doctorRoutes.js | The code defines an Express.js router that routes requests to the DoctorController.                                                                                                                    |
| userRoutes.js   | The code defines an Express.js router that uses the UserController to handle requests for the users route.                                                                                             |

</details>

---

## 🚀 Getting Started

To get started with this project, follow these steps:<br>

1. Install the necessary dependencies by running `npm install` in your terminal.
2. Create a `.env` file in the root directory of the project and add the necessary environment variables for your MongoDB connection string and other configuration options.
3. Start the server by running `npm start` in your terminal.
4. Open your web browser and navigate to `http://localhost:5000` to access the application.

Note: This guide assumes that you have Node.js and npm installed on your system. If you don't have them installed, you can download them from the official websites.

---
