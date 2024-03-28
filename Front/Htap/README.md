
  <div align="center">
  <h1 align="center">Htap Online Medical Consultant</h1>
  <h3>Codebase for the Htap Online Medical Consultant platform</h3>
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
| postcss.config.js |  The code defines a JavaScript object with a `plugins` property that contains two plugins: `tailwindcss` and `autoprefixer`. |
| tailwind.config.js |  The code defines a Tailwind CSS configuration file that sets the content, theme, and plugins for a project. |
| vite.config.js |  The code defines a Vite configuration file that imports the React plugin, dotenv, and defines environment variables for VITE_KEY, VITE_CITY, VITE_RAZORPAY, and VITE_QUOTE_API. |

</details>

---

<details><summary>\src</summary>

| File | Summary |
| ---- | ------- |
| App.jsx |  The code defines a React component named `App` that renders a router with multiple routes, including a homepage, about page, contact page, login page, register page, and dashboard page. The dashboard page is protected by an authentication guard that checks the user's role before rendering the appropriate components based on their role. |
| main.jsx |  The code creates a React application by rendering the App component to the root element with ReactDOM.createRoot(). |

</details>

---

<details><summary>\src\components</summary>

| File | Summary |
| ---- | ------- |
| AboutUs.jsx |  The code defines a React component called AboutUs that renders an about page with a header, a paragraph, and an image. The component also imports the DoctorCard component. |
| Contact.jsx |  The code is a React component that renders a contact form with a name, email, and message input fields, as well as a button to send the message. It also includes a Toastify notification system to display success or error messages after sending the message. |
| Dashboard.jsx |  The code defines a React component called Dashboard that renders a sidebar and a main content area, using the `react-router-dom` library to manage routing. |
| DepartMentFeatures.jsx |  The code in the provided snippet is a React component that renders a section of a website with various features and departments, including neurology, medicine, eye surgery, dentistry, and more. The component includes a grid layout with four columns, each containing a feature card with an icon, title, and description. Additionally, there are several background elements and absolute positioned elements used to create a visually appealing design. |
| DoctorCard.jsx |  The code fetches a list of doctors from an API endpoint and displays them in a grid layout, using React-Toastify for error handling. |
| DoctorFeatures.jsx |  The code is a React component that displays a section with two columns, each containing an image and some text. The first column has a yellow background behind the image and a white box with a rounded shape in the top right corner. The second column has a white background and contains a heading, a list of bullet points, and a button. |
| Features.jsx |  The code is a React component that displays a grid of features for a healthcare website, including search doctor, choose your location, schedule appointment, and get your solution. |
| Footer.jsx |  The code defines a React component called Footer that renders a footer element with a grid layout, containing four columns and a navigation menu. |
| HeroSection.jsx |  The code defines a React component called HeroSection that displays a form for searching for doctors and their availability. It fetches data from an API endpoint and uses it to populate a dropdown menu with available specialists, as well as a date and location input field. When the search button is clicked, it sends a request to the API to retrieve a list of doctors who are available at the selected location and time. The response is then displayed in a modal window. |
| Home.jsx |  The code defines a React component named `Home` that renders a series of other components, including a hero section, features, doctor features, department features, and testimonials. |
| Layout.jsx |  The code defines a React component called Layout that renders a Navbar, its children, and a Footer. |
| Login.jsx |  The code is a React component that renders a login form for users to log in to an application. It uses the `useState` hook to manage the state of the email, password, and role fields, and the `useEffect` hook to fetch data from an API endpoint when the component mounts. The component also includes a forgot password modal that allows users to reset their passwords. |
| Navbar.jsx |  The code defines a React component that renders a navigation bar with a logo, links to different pages, and a dropdown menu for mobile devices. It also includes a sidebar for mobile devices that displays the same links as the dropdown menu. |
| Register.jsx |  The code is a React component that renders a registration form for a medical application. It uses the `useState` hook to manage state variables for the form fields, and the `useEffect` hook to fetch data from an API endpoint. The form submits a POST request to a backend API endpoint to register a new user, and displays a success or error message based on the response from the API. |
| SidebarDashboard.jsx |  The code defines a React component that renders a sidebar for a dashboard, with various navigation links and a profile section. It uses the `react-toastify` library to display toast messages when there are errors or other notifications. The component also uses the `react-router-dom` library to handle routing and the `axios` library to make API requests. |
| TestiMonial.jsx |  The code is a React component that displays a testimonial section with a doctor's profile picture, name, occupation, and rating. The component fetches data from an API endpoint using axios, and then renders the testimonials in a carousel format with navigation buttons to move between them. The component also includes a star rating system to display the doctor's ratings. |

</details>

---

<details><summary>\src\components\dashboardcomponents\admin</summary>

| File | Summary |
| ---- | ------- |
| AdminBooking.jsx |  The code is a React component that displays a list of bookings and allows the user to generate prescriptions for each booking. It uses the `useState` hook to manage state, including the list of bookings, the search term, and the selected booking. It also uses the `useEffect` hook to fetch the list of bookings from an API endpoint and filter the data based on the search term and filter options. The component also includes a modal for generating prescriptions, which allows the user to add medications, set the fee amount and expiration date, and submit the prescription. |
| AdminCategory.jsx |  The code is a React component that displays a form for creating and managing categories for specialists on a website, with the ability to add, edit, and delete categories. It also includes a modal for editing a category. |
| AdminDatabase.jsx |  The code is a React component that displays a database of doctors and patients, allowing the user to filter and sort the data based on various criteria. It uses the `useState` hook to manage state variables for the filtered data, filters, and selected database option. The component also uses the `useEffect` hook to fetch data from an API endpoint when the component mounts or when certain state variables change. The component includes a form for filtering the data based on first name, last name, email, location, created at, occupation, and account status. It also includes a button to toggle the approved status of a doctor's account. |
| AdminNotification.jsx |  The code is a React component that displays a list of notifications for an admin user, allowing them to filter the notifications by date, patient name, doctor name, and rating. The component fetches the notification data from an API endpoint and renders it in a grid layout, with each notification displayed as a card. The component also includes a filter control that allows the admin user to filter the notifications based on the specified criteria. |
| AdminOverview.jsx |  The code is a React component that displays various charts and graphs to provide an overview of the admin dashboard. It fetches data from an API endpoint using axios, and then generates random RGB color values for each chart using the generateRandomColor function. The data is then prepared for display in the charts using the chartData, chartPresData, and chartPayData objects. The component also includes a ToastContainer for displaying error messages. |
| AdminPayment.jsx |  The code is a React component that displays a list of payments made by patients, with filters to search for specific payments based on various criteria such as patient name, doctor name, appointment ID, prescription ID, and payment status. The component fetches the payment data from an API endpoint and displays it in a table format, along with the patient's profile picture, name, email, contact number, and the doctor's profile picture, name, email, and contact number. |
| AdminPrescription.jsx |  The code is a React component that displays a list of prescriptions for an admin user, allowing them to view and download the prescriptions. It also allows the admin to pay for the prescription using Razorpay. |
| AdminProfile.jsx |  The code is a React component that displays an admin's profile information and allows them to edit it. It fetches the admin's profile data from an API endpoint, and updates it when the user clicks the Update button. The component also includes a file input field for uploading a profile image. |

</details>

---

<details><summary>\src\components\dashboardcomponents</summary>

| File | Summary |
| ---- | ------- |
| ChatMessage.jsx |  The code is a React component that renders a chat interface for a messaging app. It fetches messages from an API endpoint, displays them in a list, and allows the user to send new messages. The component also includes functionality for formatting timestamps and handling authentication with a token. |
| MessageProfile.jsx |  The code defines a React component called `MessageProfile` that fetches chat rooms for the current user from an API endpoint and displays them in a list. When a chat room is clicked, it navigates to the chat room page. |
| OverView.jsx |  The code defines a React component called OverView that returns a div element with the text OverView |

</details>

---

<details><summary>\src\components\dashboardcomponents\doctor</summary>

| File | Summary |
| ---- | ------- |
| Dbooking.jsx |  The code is a React component that displays a list of bookings and allows the user to generate prescriptions for each booking. It uses the `useState` hook to manage state, including the booking data, search term, filter options, and selected booking. The component also includes a modal for generating prescriptions, which allows the user to add medications, set an expiration date, and submit the prescription. |
| DNotification.jsx |  The code is a React component that displays a list of notifications, allowing the user to filter them by date, patient name, and rating. It also includes a modal for updating the rating of a notification. |
| DoverView.jsx |  The code is a React component that displays various charts, including line, bar, and doughnut charts, to visualize data related to bookings, prescriptions, and payments. It uses the Chart.js library to generate the charts and the react-toastify library to display error messages. The component fetches data from an API endpoint using axios and stores it in state variables. It then generates random RGB color values for each chart using the generateRandomColor function. Finally, it returns a JSX element that displays the charts and error messages. |
| Dpayment.jsx |  The code fetches payment data from an API endpoint and displays it in a list, allowing the user to filter the results by various criteria such as patient name, doctor name, appointment ID, prescription ID, doctor ID, patient ID, payment status, booking status, and visiting status. |
| Dprescription.jsx |  The code is a React component that displays a list of prescriptions and allows the user to view, add, and update prescriptions. It also includes a modal for updating prescriptions. |
| Dprofile.jsx |  The code is a React component that renders a form for creating or updating a doctor's profile, including personal information, service hours, and specialist category. It uses the `axios` library to make API requests and the `react-toastify` library to display toast messages. The component fetches data from an API endpoint and updates the state with the response data. It also handles file uploads and displays a preview of the selected image. |

</details>

---

<details><summary>\src\components\dashboardcomponents\user</summary>

| File | Summary |
| ---- | ------- |
| UserBooking.jsx |  The code is a React component that displays a list of bookings for a user, allowing them to filter the list by various criteria such as doctor, schedule time, appointment ID, booking status, and visiting status. It also includes a cancel button for each booking if certain conditions are met. |
| UserNotification.jsx |  The code is a React component that displays a list of user notifications, allowing the user to filter and update the ratings. It fetches data from an API endpoint using axios, and renders a grid of notification cards with the title, message, doctor name, contact, address, and rating. The user can edit or delete each notification by clicking on the corresponding buttons. The component also includes a modal for updating the rating, which allows the user to enter a new title, message, and rating for the notification. |
| UserOverView.jsx |  The code is a React component that displays various charts and graphs to visualize data related to user bookings, prescriptions, and payments. It uses the Chart.js library to generate the charts and the react-toastify library to display error messages. The component fetches data from an API endpoint using axios and updates the charts with the fetched data. |
| UserPayment.jsx |  The code fetches payment data from an API endpoint and displays it in a list, allowing the user to filter the results by various criteria such as patient name, doctor name, appointment ID, prescription ID, doctor ID, patient ID, payment status, booking status, and visiting status. |
| UserPrescription.jsx |  The code is a React component that displays a list of prescriptions for a user, along with the ability to filter the list by various criteria and view details about each prescription. It also includes functionality for paying for a prescription, rating a doctor, and downloading a prescription as an image. |
| UserProfile.jsx |  The code is a React component that displays a user's profile information, including their name, email, contact number, address, and location. It also allows the user to edit their profile information and update it. |

</details>

---

<details><summary>\src\components\guards</summary>

| File | Summary |
| ---- | ------- |
| AuthGuard.jsx |  The AuthGuard component in React is a higher-order component that checks if the user is logged in and has the necessary permissions to access certain routes. |

</details>

---

<details><summary>\src\components\modals</summary>

| File | Summary |
| ---- | ------- |
| DoctorSearchModal.jsx |  The code is a React component that renders a modal for booking appointments with doctors. It fetches the user's profile and doctor data from an API, and allows the user to select a doctor and book an appointment. The component also includes a chat feature and a form to enter patient information before booking an appointment. |

</details>

---

## 🚀 Getting Started

 To get started with this project, follow these steps:<br>
1. Install the dependencies by running `npm install` or `yarn install` in your terminal.
2. Start the development server by running `npm run dev` or `yarn dev`. This will start the Vite development server and open a new browser window with the app running.
3. Open the `src/index.jsx` file and start building your app! You can use the components and pages provided in the `src` directory as a starting point.
4. To test your app, run `npm run test` or `yarn test`. This will run Jest and execute the tests in the `src/__tests__` directory.
5. To build the app for production, run `npm run build` or `yarn build`. This will create a production-ready build of the app in the `dist` directory.
6. To deploy the app to a hosting platform like Netlify or Heroku, you'll need to configure the deployment settings in the `vite.config.js` file.

That's it! With these steps, you should be able to get started with this React project. Good luck!

---

Generated with ❤️ by [ReadMeAI](https://www.readmeai.co/).
