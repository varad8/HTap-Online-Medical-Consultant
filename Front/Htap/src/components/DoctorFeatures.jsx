import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function DoctorFeatures() {
  return (
    <>
      <div className="container mx-auto bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-16 mb-3">
          <div className="bg-white p-4 relative">
            {/* Yellow div behind the image top 1 */}
            <div className="features_bg px-3 py-2 top-0 absolute z-0 w-[60%] h-[60%] rounded-lg"></div>
            {/* Yellow div behind the image bottom 2 */}

            {/* White div behind the image top right 1 */}
            <div className="bg-white px-3 py-2 top-5 right-10 absolute z-10 w-[40%] h-[40%] rounded-lg shadow-md border border-gray-200">
              <h2 className="text-black font-inter mx-3 my-2 text-xl ">
                Meet Our Doctors
              </h2>
              <div className="flex items-center w-full mx-3">
                <div className="flex -space-x-2 overflow-x-auto">
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-10 h-10 text-white rounded-full"
                  >
                    <img
                      src="https://i.pravatar.cc/40?img=31"
                      alt="user name"
                      title="user name"
                      width="40"
                      height="40"
                      className="max-w-full border-2 border-white rounded-full"
                    />
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-10 h-10 text-white border-2 border-white rounded-full bg-emerald-500"
                  >
                    JL
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-10 h-10 text-white rounded-full"
                  >
                    <img
                      src="https://i.pravatar.cc/40?img=33"
                      alt="user name"
                      title="user name"
                      width="40"
                      height="40"
                      className="max-w-full border-2 border-white rounded-full"
                    />
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-10 h-10 text-lg text-white rounded-full bg-emerald-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-labelledby="title-01 desc-01"
                      role="graphics-symbol"
                    >
                      <title id="title-01">User Icon</title>
                      <desc id="desc-01">
                        User icon associated with a particular user account
                      </desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-10 h-10 text-white rounded-full"
                  >
                    <img
                      src="https://i.pravatar.cc/40?img=34"
                      alt="user name"
                      title="user name"
                      width="40"
                      height="40"
                      className="max-w-full border-2 border-white rounded-full"
                    />
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-10 h-10 text-sm border-2 border-white rounded-full bg-slate-200 text-slate-500"
                  >
                    +10
                  </a>
                </div>
              </div>

              <div className="bg-yellow_dark h-2 w-1/2 mx-3 my-2 rounded-lg"></div>
            </div>
            <div className="features_bg px-3 py-2 bottom-[16px] absolute z-0 w-[60%] h-[30%] rounded-lg"></div>

            <img
              src="./src/assets/doctorimg.png"
              alt="Doctor Icon"
              className="relative z-10 flip "
            />

            {/* Div to show in front of the image */}
            <div className="bg-white shadow-md border p-3 border-gray-200 bottom-0 right-10 absolute z-10 w-[40%] rounded-lg">
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="bg-yellow_dark px-3 py-2 text-white rounded-lg shadow"
                />
                <p className="font-inter text-black">Regular Checkup</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 relative">
            <h4 className="text-2xl font-inter font-semibold mb-5">
              We Are Always Ensure Best Medical Treatment For Your Health
            </h4>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-yellow_dark text-[25px]"
                />
                <p className="text-lg text-gray-600">Top Specialist Doctor</p>
              </div>

              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-yellow_dark text-[25px]"
                />
                <p className="text-lg text-gray-600">
                  State Of The Art Doctor Services
                </p>
              </div>

              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-yellow_dark text-[25px]"
                />
                <p className="text-lg text-gray-600">
                  Enrollment Is Quick And Easy
                </p>
              </div>

              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-yellow_dark text-[25px]"
                />
                <p className="text-lg text-gray-600">
                  Pay after consultation (free of booking)
                </p>
              </div>

              <span className="mt-3">
                <button
                  type="button"
                  className="bg-yellow_dark text-white px-2 py-3 rounded-lg"
                >
                  Make an Appointment
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorFeatures;
