
  <div align="center">
  <h1 align="center">Htap Backend</h1>
  <h3>Codebase for the Htap Backend platform</h3>
  <h3>◦ Developed with the software and tools below.</h3>
  <p align="center"><img src="https://img.shields.io/badge/-Node.js-004E89?logo=Node.js&style=flat" alt='Node.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Express.js-004E89?logo=Express.js&style=flat" alt='Express.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-MongoDB-004E89?logo=MongoDB&style=flat" alt='MongoDB\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Mongoose-004E89?logo=Mongoose&style=flat" alt='Mongoose\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-React-004E89?logo=React&style=flat" alt='React\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Socket.io-004E89?logo=Socket.io&style=flat" alt='Socket.io"' />
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

 This is a Node.js project with a MongoDB database, consisting of a web application for a healthcare platform. The project includes a variety of files and directories, each with its own purpose:* `.env`: Environment variables for the project.* `app.js`: The main entry point of the application.* `city.json`: A JSON file containing data about cities.* `controllers`: Directory containing controllers for the application.* `database`: Directory containing database-related files.* `dbpassword.txt`: A text file containing the password for the MongoDB database.* `export collection`: Directory containing exported collections from the MongoDB database.* `middlewares`: Directory containing middleware functions for the application.* `models`: Directory containing models for the application.* `package-lock.json`: A file containing information about the dependencies of the project.* `package.json`: A file containing information about the project and its dependencies.* `README.md`: A file containing information about the project and how to use it.* `routes`: Directory containing route definitions for the application.* `uploads`: Directory containing uploaded files for the application.* `views`: Directory containing view templates for the application.The project appears to be structured in a modular fashion, with separate directories for different aspects of the application. The `controllers`, `middle

---

## 🌟 Features

 The project includes the following features:<br>
* User authentication and authorization
* Doctor and patient profiles
* Booking and appointment management
* Prescription and medication management
* Chatbot integration
* Payment processing
* Data export and import
* Admin dashboard for managing users and data
* Reset password functionality
* Image upload and storage
* City data in JSON format
* MongoDB database integration
* Node.js web application framework
* Express.js middleware
* EJS view engine
* Environment variables for configuration

---

## 📁 Repository Structure

```sh
├── .env
├── app.js
├── city.json
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
├── export collection
│   ├── admins.json
│   ├── specialists.json
│   └── users.json
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
├── README.md
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
│   ├── 1711518521092_images.jpeg
│   ├── 1711992619447_chatbot.png
│   └── 1711992799076_user.png
└── views
    └── resetPassword.ejs

```

---

## 💻 Code Summary

<details><summary>Root</summary>

| File | Summary |
| ---- | ------- |
| app.js |  The code defines an Express.js server that serves a web application, with routes for user, doctor, and admin management, as well as chat-related operations. It also includes middleware for handling JSON data and setting the view engine to EJS. |

</details>

---

<details><summary>\controllers</summary>

| File | Summary |
| ---- | ------- |
| AdminController.js |  The code defines a Node.js API for an e-healthcare system, with routes for various administrative tasks such as registering new users, logging in, and resetting passwords. It also includes routes for managing patient data, doctor profiles, and appointment bookings. The code uses Express.js, MongoDB, and JWT for authentication and authorization, as well as Multer for file uploads and Nodemailer for sending emails. |
| chatController.js |  The code defines a set of RESTful API endpoints for a messaging system, including creating and retrieving chat rooms, messages, and user profiles. The primary function of the code is to provide a way for users to communicate with each other through a messaging system, while also providing a way for administrators to manage the system and its users. |
| DoctorController.js |  The code defines a router for a healthcare system, with routes for registering a new doctor, logging in, and retrieving a doctor's profile. It also includes routes for managing bookings, prescriptions, and payments, as well as a route for fetching notifications related to ratings. |
| PaymentCotroller.js |  The code defines a set of functions for handling payments in a medical clinic, including creating an order, fetching payments for an order, and aggregating payment data. The primary function of the code is to provide a set of APIs for managing payments in the clinic, allowing the clinic to track and analyze payment data. |
| UserController.js |  The code defines a Node.js API for a healthcare system, with routes for user registration, login, profile management, booking appointments, prescriptions, and payments. It also includes functionality for sending emails and notifications. The primary function of the code is to provide a RESTful API for a healthcare system, allowing users to interact with the system through HTTP requests. |

</details>

---

<details><summary>\controllers\operations</summary>

| File | Summary |
| ---- | ------- |
| booking.js |  The code defines a set of route handlers for a web application that manages patient bookings. The primary function of the code is to handle HTTP requests and perform CRUD (create, read, update, delete) operations on booking data in a MongoDB database. The code also includes functionality for generating unique appointment IDs, validating input data, and formatting output data for display on a chart. |
| doctor.js |  The code defines several route handlers for a web application, including one that retrieves all doctors from the database, another that retrieves doctors based on location and approved account status, and another that retrieves a doctor's details by ObjectId. It also includes a route handler to update a doctor's account status and a route handler to retrieve a list of specialists. |
| prescription.js |  The code defines a set of functions for creating, retrieving, updating, and querying prescriptions in a MongoDB database. The primary function of the code is to provide a RESTful API for managing prescriptions, including creating new prescriptions, retrieving existing prescriptions, updating prescription details, and querying prescriptions based on various criteria. |
| ratenotification.js |  The code defines a set of functions for creating, updating, deleting, and retrieving notifications in a MongoDB database. The primary function of the code is to provide a RESTful API for managing notifications in the database. |

</details>

---

<details><summary>\database</summary>

| File | Summary |
| ---- | ------- |
| Connection.js |  The code establishes a connection to a MongoDB database using the mongoose library, with the primary function of connecting to the database and logging a success message if successful. |

</details>

---

<details><summary>\middlewares</summary>

| File | Summary |
| ---- | ------- |
| authentication.js |  The code defines a function called authenticateToken that verifies a JSON Web Token (JWT) and extracts the user information from it, returning an error response if the token is invalid or expired. |

</details>

---

<details><summary>\models</summary>

| File | Summary |
| ---- | ------- |
| Admin.js |  The code defines a MongoDB model for an Admin profile, with fields for an ID, username, first name, last name, address, email, contact number, and profile picture. |
| Booking.js |  The code defines a Booking model in MongoDB, which includes fields for patient, doctor, appointment ID, patient problem, visiting status, booking status, visiting timestamp, PID, D_ID, schedule time, and patient mobile number. |
| ChatRoom.js |  The code defines a Mongoose schema for a ChatRoom model, with fields for userId, docId, chatRoomId, lastMessage, lastMessageTime, createdAt, patient, doctor, uid, and did. |
| Doctor.js |  The code defines a schema for a doctor profile in a MongoDB database, including fields for personal information, medical experience, and service hours. |
| Message.js |  The code defines a Mongoose schema for a Message model, with fields for user ID, document ID, chat room ID, last message, last message time, patient, doctor, and messages. It also removes the unique index on the lastMessage field. |
| Notification.js |  The code defines a Mongoose schema for a Notification model, with fields for notification title, feedback message, ratings, patient ID, doctor ID, and references to Patient and Doctor models. |
| Patient.js |  The code defines a Mongoose schema for a patient profile, including fields for personal information and location, and exports it as a model for use in the application. |
| Payment.js |  The code defines a Payment model in MongoDB, with fields for payment ID, patient ID, doctor ID, appointment ID, booking ID, patient, doctor, prescription, payment date, payment status, payment amount, and payment type. |
| Prescription.js |  The code defines a Mongoose schema for a Prescription model, which includes fields for a unique prescription ID, patient ID, doctor ID, appointment ID, medications, and payment status. |
| specialistModel.js |  The code defines a Mongoose schema for a Specialist model, which includes name, description, and link fields. |
| User.js |  The code defines a User model in MongoDB using Mongoose, with fields for username, email, password, and role, and sets the default role to user |

</details>

---

<details><summary>\routes</summary>

| File | Summary |
| ---- | ------- |
| adminRoutes.js |  The code defines an Express.js router that uses the AdminController to handle requests for the admin route. |
| chatRoutes.js |  The code defines a router for an Express.js application that handles requests for chat rooms, messages, and profile pictures. |
| doctorRoutes.js |  The code defines an Express.js router that routes requests to the DoctorController. |
| userRoutes.js |  The code defines an Express.js router that uses the UserController to handle requests for the users endpoint. |

</details>

---

## 🚀 Getting Started

 To get started with this project, follow these steps:<br>
1. Install the necessary dependencies by running `npm install` in your terminal.
2. Create a `.env` file in the root directory of of the project and add the necessary environment variables for your MongoDB database.
3. Start the application by running `npm start` in your terminal.
4. Open your web browser and navigate to `http://localhost:3000` to access the application.

Note: This is a basic getting started guide, and you may need to modify the code to suit your specific needs. Additionally, you will need to have Node.js and MongoDB installed on your system to run this project.

---

Generated with ❤️ by [ReadMeAI](https://www.readmeai.co/).
