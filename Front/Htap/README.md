
  <div align="center">
  <h1 align="center">Htap Frontend</h1>
  <h3>Codebase for the Htap Frontend platform</h3>
  <h3>◦ Developed with the software and tools below.</h3>
  <p align="center"><img src="https://img.shields.io/badge/-React-004E89?logo=React&style=flat-square" alt='React\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Vite-004E89?logo=Vite&style=flat-square" alt='Vite\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Tailwind%20CSS-004E89?logo=Tailwind%20CSS&style=flat-square" alt='Tailwind CSS\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-PostCSS-004E89?logo=PostCSS&style=flat-square" alt='PostCSS\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-ESLint-004E89?logo=ESLint&style=flat-square" alt='ESLint\' />
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

 This is a React project with a frontend and backend. The frontend is built using React, and the backend is built using Node.js. The project uses a variety of technologies, including Tailwind CSS for styling, Vite for building, and Jest for testing. The project also includes a `.env` file for environment variables and a `package.json` file for managing dependencies. The `src` directory contains the source code for the project, including components, pages, and other files. The `tailwind.config.js` file is used to configure Tailwind CSS, and the `vite.config.js` file is used to configure Vite.

---

## 🌟 Features

 Here is a list of features for the project:<br>
* Frontend built using React
* Backend built using Node.js
* Uses Tailwind CSS for styling
* Uses Vite for building
* Uses Jest for testing
* Includes a `.env` file for environment variables
* Includes a `package.json` file for managing dependencies
* Source code in the `src` directory
* Configures Tailwind CSS in the `tailwind.config.js` file
* Configures Vite in the `vite.config.js` file

---

## 📁 Repository Structure

```sh
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
│   │   │   │   └── AdminProfile.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── doctor
│   │   │   │   ├── Dbooking.jsx
│   │   │   │   ├── DNotification.jsx
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
│   │   │       └── UserProfile.jsx
│   │   ├── DepartMentFeatures.jsx
│   │   ├── DoctorCard.jsx
│   │   ├── DoctorFeatures.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── guards
│   │   │   └── AuthGuard.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Home.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── modals
│   │   │   └── DoctorSearchModal.jsx
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

<details><summary>Root</summary>

| File | Summary |
| ---- | ------- |
| postcss.config.js |  The code defines a JavaScript object with a `plugins` property that contains two plugins, `tailwindcss` and `autoprefixer`, which are used to generate CSS stylesheets. |
| tailwind.config.js |  The code defines a Tailwind CSS configuration file that sets the content, theme, and plugins for a project. |
| vite.config.js |  The code defines a Vite configuration file that imports React and dotenv, defines environment variables for the project, and sets up a plugin to use React. |

</details>

---

<details><summary>\src</summary>

| File | Summary |
| ---- | ------- |
| App.jsx |  The code defines a React application that uses the `react-router-dom` library to manage client-side routing and navigation. It includes several routes, each with its own set of components, and utilizes the `AuthGuard` component to restrict access to certain routes based on the user's role. |
| main.jsx |  The code creates a React application by rendering the App component in the root element of the HTML document. |

</details>

---

<details><summary>\src\components</summary>

| File | Summary |
| ---- | ------- |
| AboutUs.jsx |  The code is a React component that renders an About Us page with a hero section, a text block, and a doctor card component. |
| Contact.jsx |  The code is a React component that renders a contact form with a name, email, and message input fields, as well as a submit button. When the form is submitted, it sends an HTTP POST request to a server endpoint using Axios, and displays a success or error message using React Toastify. |
| Dashboard.jsx |  The code defines a React component called Dashboard that renders a sidebar and a main content area, using the `react-router-dom` library to manage routing. |
| DepartMentFeatures.jsx |  The code in the provided snippet is a React component that renders a section of a website with various features and services related to departments. The primary function of this component is to display a grid of cards with different types of departments, each card featuring an icon, a title, and a brief description. Additionally, the component includes several other elements such as a background image, a count of total doctors, and information about service availability and facility availability. |
| DoctorCard.jsx |  The code fetches a list of doctors from an API endpoint using axios, and displays them in a grid layout with their profile picture, name, occupation, and experience. |
| DoctorFeatures.jsx |  The code is a React component that displays a grid of two columns, each containing an image and some text. The first column has a yellow background with a white icon on top and a white div with text and icons on the bottom. The second column has a white background with a large header, a list of bullet points, and a button to make an appointment. |
| Features.jsx |  The code is a React component that renders a feature grid with four columns, each containing an icon, a title, and a description. The icons are from the Font Awesome library and represent different features of the app. The component also includes a button for making an appointment. |
| Footer.jsx |  The code defines a React component called Footer that renders a footer element with a grid layout, containing four columns and a navigation bar at the bottom. |
| HeroSection.jsx |  The code defines a React component called `HeroSection` that renders a search bar for finding doctors and their availability. It uses the `axios` library to fetch data from an API, and the `react-toastify` library to display notifications. The component also includes a modal window for displaying search results. |
| Home.jsx |  The code defines a React component named `Home` that renders a series of other components, including a hero section, features, doctor features, department features, and testimonials. |
| Layout.jsx |  The code defines a React component called Layout that renders a Navbar, its children, and a Footer. |
| Login.jsx |  The code is a React component that renders a login form for users to log in to an application. It uses the `useState` hook to manage the state of the email, password, and role fields, and the `useEffect` hook to fetch data from an API endpoint on mount. The component also includes a forgot password modal that allows users to reset their passwords. |
| Navbar.jsx |  The code defines a React component that renders a navigation bar with a logo, links to various pages, and a dropdown menu for mobile devices. It also includes a sidebar for mobile devices that displays the same links as the dropdown menu. |
| Register.jsx |  The code is a React component that renders a registration form for users to create an account on a medical-related platform. It uses the `react-toastify` library to display a quote from a random category when the component mounts, and it also uses the `axios` library to make a GET request to an API endpoint to retrieve a quote. The form includes input fields for username, email, password, and confirm password, as well as a radio button group to select the user's role (either doctor or user When the form is submitted, the component makes a POST request to the API endpoint with the user's information, and if successful, redirects the user to the login page. |
| SidebarDashboard.jsx |  The code defines a React component that renders a sidebar for the dashboard of a medical clinic. It uses the `react-toastify` library to display toast messages, and the `react-router-dom` library to handle routing. The component fetches the user's profile data from an API endpoint and displays it in the sidebar. It also includes links to various pages within the dashboard, such as Overview Bookings and Prescriptions |
| TestiMonial.jsx |  The code is a React component that displays a testimonial section with a doctor's profile picture, rating, and feedback message. It fetches data from an API endpoint using axios and uses the react-toastify library to display error messages. The component also includes navigation buttons to move between different testimonials. |

</details>

---

<details><summary>\src\components\dashboardcomponents\admin</summary>

| File | Summary |
| ---- | ------- |
| AdminBooking.jsx |  The code is a React component that displays a list of bookings and allows the user to generate prescriptions for each booking. It uses the `useState` hook to manage state, including the list of bookings, the search term, and the selected booking. It also uses the `useEffect` hook to fetch the list of bookings from an API endpoint and filter the data based on the search term and filter options. The component also includes a modal for generating prescriptions, which allows the user to add medications, set the expiration date, and save the prescription. |
| AdminCategory.jsx |  The code is a React component that renders a form for creating and managing categories for a specialist. It uses the `useState` hook to manage state, including the category name, description, and link. The component also fetches data from an API using `axios`, and displays it in a table. The user can add new categories, edit existing ones, and delete them. The component also includes a modal for editing categories. |
| AdminDatabase.jsx |  The code is a React component that displays a database of doctors and patients, allowing the user to filter and sort the data based on various criteria. The component uses the `useState` hook to manage state, including the current database option (either Doctor or Patient the filters for each option, and the filtered data. It also uses the `useEffect` hook to fetch the data from an API endpoint when the component mounts, and to update the filtered data whenever the filters change. The component includes a table displaying the filtered data, as well as buttons to approve or not approve doctor accounts. |
| AdminNotification.jsx |  The code is a React component that displays a list of notifications for an admin user, allowing them to filter the notifications by date, patient name, doctor name, and rating. The component fetches the notification data from an API endpoint using axios, and then filters the data based on the user's input. It also renders a star rating for each notification based on the ratings provided by the patients. |
| AdminOverview.jsx |  The code is a React component that displays charts for bookings, prescriptions, and payments. It uses the Chart.js library to render the charts. The component fetches data from an API endpoint using axios, and then prepares the chart data for display. The component also includes a ToastContainer for displaying error messages. |
| AdminPayment.jsx |  The code is a React component that displays a list of payments made by patients, with filters to search for specific payments based on various criteria such as patient name, doctor name, appointment ID, prescription ID, and payment status. The component fetches the payment data from an API endpoint and displays it in a grid layout, along with the patient's profile picture, name, email, contact number, and the doctor's profile picture, name, email, and contact number. The component also includes a ToastContainer for displaying error messages. |
| AdminPrescription.jsx |  The code is a React component that displays a list of prescriptions for an admin user, allowing them to view and download the prescriptions. It also allows the admin to pay for the prescription using Razorpay. |
| AdminProfile.jsx |  The code is a React component that displays an admin's profile information, including their name, email, mobile number, and address. It also allows the admin to edit their profile information and update it. The component uses the `axios` library to make API requests to fetch and update the admin's profile data. |

</details>

---

<details><summary>\src\components\dashboardcomponents</summary>

| File | Summary |
| ---- | ------- |
| ChatMessage.jsx |  The code is a React component that renders a chat interface for a user to send and receive messages in a specific room. It uses the `axios` library to fetch messages from an API endpoint, and it also includes functionality for sending messages using the same API endpoint. The component also includes a timestamp formatting function and a conditional rendering block to display messages based on the sender's ID. |
| MessageProfile.jsx |  The code defines a React component called `MessageProfile` that fetches chat rooms for the current user from an API endpoint and displays them in a list. When a chat room is clicked, it navigates to the corresponding chat room page. |
| OverView.jsx |  The code defines a React component called OverView that returns a div element with the text OverView |

</details>

---

<details><summary>\src\components\dashboardcomponents\doctor</summary>

| File | Summary |
| ---- | ------- |
| Dbooking.jsx |  The code is a React component that displays a list of bookings and allows the user to generate prescriptions for each booking. It uses the `useState` hook to manage state, including the booking data, search term, filter options, and selected booking. The component also includes a modal for generating prescriptions, which allows the user to add medications, set an expiration date, and submit the prescription. |
| DNotification.jsx |  The code is a React component that displays a list of notifications received by a doctor, allowing the user to filter the notifications by date, patient name, and rating. |
| DoverView.jsx |  The code is a React component that displays various charts, including line, bar, and doughnut charts, to visualize data related to bookings, prescriptions, and payments. It uses the Chart.js library to generate the charts and the react-toastify library to display error messages. The component fetches data from an API endpoint using axios and stores it in state variables. It then generates random RGB color values for the chart backgrounds and prepares the chart data for display. |
| Dpayment.jsx |  The code fetches payment data from an API endpoint and displays it in a table, allowing the user to filter the data by various criteria such as patient name, doctor name, appointment ID, prescription ID, and more. |
| Dprescription.jsx |  The code is a React component that displays a list of prescriptions and allows the user to view, add, and update prescriptions. It also includes a modal for updating prescriptions. |
| Dprofile.jsx |  The code is a React component that displays a doctor's profile information, including personal details, service hours, and specialist category. It also allows the user to edit their profile and update it. |

</details>

---

<details><summary>\src\components\dashboardcomponents\user</summary>

| File | Summary |
| ---- | ------- |
| UserBooking.jsx |  The code is a React component that displays a list of bookings for a user, allowing them to filter the list by various criteria such as doctor, schedule time, appointment ID, booking status, and visiting status. The component also includes a cancel button for each booking, which allows the user to cancel their appointment if it has not been visited yet and is scheduled after the current date. |
| UserNotification.jsx |  The code is a React component that displays a list of user notifications, allowing the user to filter and update the ratings. It uses the `axios` library to fetch data from an API endpoint, and the `react-toastify` library to display toast messages. The component also uses the `FontAwesome` library to display icons for editing, trash, and star ratings. |
| UserOverView.jsx |  The code is a React component that displays various charts for a user's bookings, prescriptions, and payments. It uses the Chart.js library to render the charts and the react-toastify library to display error messages. The component fetches data from an API endpoint using axios and stores it in state variables. It then generates random RGB color values for the chart backgrounds and prepares the chart data for rendering. |
| UserPayment.jsx |  The code fetches payment data from an API endpoint and displays it in a table, allowing the user to filter the data by various criteria such as patient name, doctor name, appointment ID, prescription ID, doctor ID, patient ID, payment status, booking status, and visiting status. |
| UserPrescription.jsx |  The code is a React component that displays a list of prescriptions for the current user, along with options to view, pay, and rate each prescription. It also includes a modal for viewing and downloading prescriptions, as well as a rating modal for users to leave feedback on their doctors. |
| UserProfile.jsx |  The code is a React component that displays a user's profile information, including their name, email, contact number, address, and location. It also allows the user to edit their profile information and update it. |

</details>

---

<details><summary>\src\components\guards</summary>

| File | Summary |
| ---- | ------- |
| AuthGuard.jsx |  The AuthGuard component in React is a higher-order component that checks if the user is authenticated and has the required role to access certain routes. It uses the useNavigate hook from react-router-dom to redirect the user to the login page if they are not authenticated or do not have the required role. |

</details>

---

<details><summary>\src\components\modals</summary>

| File | Summary |
| ---- | ------- |
| DoctorSearchModal.jsx |  The code is a React component that renders a modal for booking appointments with doctors. It fetches the user's profile and doctor data from an API, and allows the user to select a doctor and book an appointment. The component also includes a function to activate a chat room with the selected doctor. |

</details>

---

## 🚀 Getting Started

 To get started with this project, follow these steps:<br>
1. Install the dependencies by running `npm install` or `yarn install` in your terminal.
2. Set up the environment variables by creating a `.env` file in the root directory of the project and adding the necessary variables.
3. Start the development server by running `npm run dev` or `yarn dev` in your terminal. This will start the Vite development server and open the project in your default web browser.
4. Open the `src/index.jsx` file and start building your application.
5. Use the `npm run build` command to build the production version of the application.
6. Use the `npm run lint` command to check for any linting errors in the code.
7. Use the `npm run test` command to run the Jest tests for the application.
8. Use the `npm run preview` command to preview the production version of the application in your default web browser.

That's it! You should now be able to start building your React application using this project as a starting point.

---

Generated with ❤️ by [ReadMeAI](https://www.readmeai.co/).
