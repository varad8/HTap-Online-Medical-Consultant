// import React, { useEffect, useState } from "react";
// import "../App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowLeft,
//   faArrowRight,
//   faStar,
// } from "@fortawesome/free-solid-svg-icons";
// import { Bounce, ToastContainer, toast } from "react-toastify";
// import axios from "axios";

// function TestiMonial() {
//   const [testimonialData, setTestiMonialData] = useState([]);
//   const session = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const endpoint = `${import.meta.env.VITE_KEY}`;
//   useEffect(() => {
//     fetchTestimonialData();
//   }, [session?.id, token, endpoint]);

//   const fetchTestimonialData = async () => {
//     try {
//       const response = await axios.get(
//         `${endpoint}/users/notification/get/all`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setTestiMonialData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       toast.error(error?.response?.data?.error, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto bg-white">
//       <ToastContainer />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
//         <div className="bg-white p-4 relative">
//           {/* Yellow div behind the image top 1 */}
//           <div className="features_bg_skyblue  px-3 py-2 top-10 absolute z-0 w-[60%] h-[60%] rounded-lg"></div>
//           {/* Yellow div behind the image bottom 2 */}

//           {/* Show Doctor here form that rating */}
//           <div className="bg-white px-3 py-2 top-[60%] lg:right-[30%] xl:right-[30%] right-10 absolute z-10  rounded-lg shadow-md border border-gray-200">
//             <div className="flex gap-2 items-center">
//               {/* Doctor Profile pic  */}
//               <img
//                 src="./src/assets/doctorimg.png"
//                 alt="doctorimg"
//                 className="object-cover object-center w-10 h-10 bg"
//               />

//               <div className="flex gap-2 flex-col">
//                 <div>
//                   <h5 className="font-inter text-[15px]">Dr. Smita Thakur</h5>
//                   <p className="text-sm font-inter text-gray-300">Neurology</p>
//                   <div>
//                     <FontAwesomeIcon
//                       icon={faStar}
//                       className="text-yellow-500"
//                     />
//                     <FontAwesomeIcon
//                       icon={faStar}
//                       className="text-yellow-500"
//                     />
//                     <FontAwesomeIcon
//                       icon={faStar}
//                       className="text-yellow-500"
//                     />
//                     <FontAwesomeIcon
//                       icon={faStar}
//                       className="text-yellow-500"
//                     />
//                     <FontAwesomeIcon
//                       icon={faStar}
//                       className="text-yellow-500"
//                     />
//                     &nbsp;5
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="features_bg_skyblue px-3 py-2 bottom-[16px] absolute z-0 w-[60%] h-[30%] rounded-lg"></div>
//           <img
//             src="./src/assets/testimonialimg.png"
//             alt="Doctor Icon"
//             className="relative z-0 flip "
//           />
//         </div>
//         <div className="bg-white p-4 relative lg:pt-52 xl:52">
//           <h4 className="text-3xl font-inter font-semibold mb-5">
//             What They Says About{" "}
//             <span className="text-skyblue">HTap Medical</span>
//           </h4>
//           <p className="text-gray-400 mb-5 text-sm font-inter">
//             Most of our user give us feedback regarding our services.You can see
//             their comments on below.
//           </p>
//           {/* Rating Showing here */}
//           <div className="bg-gray-100/60 rounded-xl w-full p-2">
//             <div className="flex gap-1 items-center">
//               <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//               <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//               <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//               <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//               <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//               <p className="text-black font-inter">5</p>
//             </div>

//             {/* Feedback Message and Name of Patient */}
//             <div className="flex flex-col gap-3 mt-3">
//               <p className="text-gray-400 text-sm font-inter">
//                 " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                 do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
//               </p>

//               <h5 className="font-inter text-[15px] font-medium">
//                 Varad Nikharage
//               </h5>
//             </div>
//           </div>

//           {/* Navigation Button */}
//           <div className="mt-10 flex justify-end gap-5">
//             <button className="bg-white text-skyblue hover:bg-skyblue hover:text-white  rounded-full border border-skyblue w-10 h-10">
//               <FontAwesomeIcon icon={faArrowLeft} />
//             </button>
//             <button className="bg-white text-skyblue hover:bg-skyblue hover:text-white  rounded-full border border-skyblue w-10 h-10">
//               <FontAwesomeIcon icon={faArrowRight} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TestiMonial;

import React, { useEffect, useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";

function TestiMonial() {
  const [testimonialData, setTestimonialData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const session = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;

  useEffect(() => {
    fetchTestimonialData();
  }, [session?.id, token, endpoint]);

  const fetchTestimonialData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/users/notification/get/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTestimonialData(response.data);
    } catch (error) {
      console.log("Erro form TestiMonial Page ", error?.response?.data?.error);
      // toast.error(error?.response?.data?.error, {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: Bounce,
      // });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />
        );
      } else {
        stars.push(
          <FontAwesomeIcon icon={faStar} key={i} className="text-gray-500" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto bg-white">
      <ToastContainer />
      {testimonialData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
          <div className="bg-white p-4 relative">
            {/* Yellow div behind the image top 1 */}
            <div className="features_bg_skyblue  px-3 py-2 top-10 absolute z-0 w-[60%] h-[60%] rounded-lg"></div>
            {/* Yellow div behind the image bottom 2 */}

            {/* Show Doctor here form that rating */}
            <div className="bg-white px-3 py-2 top-[60%] lg:right-[30%] xl:right-[30%] right-10 absolute z-10  rounded-lg shadow-md border border-gray-200">
              <div className="flex gap-2 items-center">
                {/* Doctor Profile pic  */}
                <img
                  src={`${endpoint}/users/profile/${testimonialData[currentIndex].doctor.d_profile_pic}`}
                  alt="doctorimg"
                  className="object-cover object-center w-10 h-10 bg"
                />

                <div className="flex gap-2 flex-col">
                  <div>
                    <h5 className="font-inter text-[15px]">
                      {testimonialData[currentIndex].doctor.d_firstname}{" "}
                      {testimonialData[currentIndex].doctor.d_lastname}
                    </h5>
                    <p className="text-sm font-inter text-gray-300">
                      {testimonialData[currentIndex].doctor.occupation}
                    </p>
                    <div className="flex gap-1 items-center">
                      {renderStarRating(testimonialData[currentIndex].ratings)}
                      <p className="text-black font-inter ml-2">
                        {testimonialData[currentIndex].ratings} /5
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="features_bg_skyblue px-3 py-2 bottom-[16px] absolute z-0 w-[60%] h-[30%] rounded-lg"></div>
            <img
              src="./src/assets/testimonialimg.png"
              alt="Doctor Icon"
              className="relative z-0 flip "
            />
          </div>
          <div className="bg-white p-4 relative lg:pt-52 xl:52">
            <h4 className="text-3xl font-inter font-semibold mb-5">
              What They Says About{" "}
              <span className="text-skyblue">HTap Medical</span>
            </h4>
            <p className="text-gray-400 mb-5 text-sm font-inter">
              Most of our user give us feedback regarding our services.You can
              see their comments on below.
            </p>
            {/* Rating Showing here */}
            <div className="bg-gray-100/60 rounded-xl w-full p-2">
              <div className="flex gap-1 items-center">
                {renderStarRating(testimonialData[currentIndex].ratings)}
                <p className="text-black font-inter ml-2">
                  {testimonialData[currentIndex].ratings} /5
                </p>
              </div>

              {/* Feedback Message and Name of Patient */}
              <div className="flex flex-col gap-3 mt-3">
                <p className="text-gray-400 text-sm font-inter">
                  "{testimonialData[currentIndex].feedback_message}"
                </p>

                <h5 className="font-inter text-[15px] font-medium">
                  {testimonialData[currentIndex].patient.p_firstname}{" "}
                  {testimonialData[currentIndex].patient.p_lastname}
                </h5>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="mt-10 flex justify-end gap-5">
              <button
                onClick={handlePrev}
                className="bg-white text-skyblue hover:bg-skyblue hover:text-white  rounded-full border border-skyblue w-10 h-10"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={handleNext}
                className="bg-white text-skyblue hover:bg-skyblue hover:text-white  rounded-full border border-skyblue w-10 h-10"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestiMonial;
