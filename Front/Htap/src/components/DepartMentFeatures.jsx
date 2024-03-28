import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faClock,
  faEye,
  faKitMedical,
  faTeethOpen,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

function DepartMentFeatures() {
  return (
    <>
      <div className="container mx-auto bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-16 mb-3">
          <div className="bg-white p-4 relative">
            <h4 className="text-2xl font-inter font-semibold mb-5">
              Different Types Of Department To Service For Your Health
            </h4>

            <p className="text-sm font-inter text-gray-500 mb-3">
              In terms of patient demand we have different sort of department to
              serve best treatment in the city
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white shadow border flex flex-col items-start gap-2 p-3 rounded-md">
                <FontAwesomeIcon
                  icon={faBrain}
                  className="bg-indigo-100  text-indigo-600 p-3 rounded-xl text-lg"
                />

                <h4 className="text-[18px] font-inter font-semibold">
                  Neurology
                </h4>

                <p className="text-sm font-inter text-gray-400">
                  Neurologist is managing to treat neurological conditions such
                  as brain muscles,blood.
                </p>
              </div>

              <div className="features_bg_violet  shadow border flex flex-col items-start gap-2  p-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 88.15 122.88"
                  fill="currentColor"
                  className="bg-indigo-100 w-10 h-10 text-indigo-600 p-3 rounded-xl text-lg"
                >
                  <path d="M63.92,64.71a13.57,13.57,0,0,1,19-2.46h0a13.56,13.56,0,0,1,2.46,19C76,93.41,66.62,105.46,57.23,117.64h0a13.47,13.47,0,0,1-18.88,2.45h0a13.5,13.5,0,0,1-2.45-18.88h0c9.39-12.2,18.62-24.3,28-36.5ZM4.44,85.1H40.16l3.76-4.89c4.47-5.84,8.93-11.65,14.92-19.43v0a19.73,19.73,0,0,1,5.4-4.82V42.57c.1-8.13-4.08-17.13-8.48-23l-1.4-1.88h2.39a5,5,0,0,0,5-5V5a5.05,5.05,0,0,0-5-5H8.06A5.05,5.05,0,0,0,3,5v7.64a5,5,0,0,0,5,5H9.84c-.51.7-1,1.38-1.53,2.06C3.24,26.56-.51,35.34.06,44.28v55a7.91,7.91,0,0,0,2.11,5.49c1.36,1.32,3.34,2,6.06,1.92H26.86a19.45,19.45,0,0,1,.5-2.48,18.28,18.28,0,0,1,.6-1.86l-18.61,0a4.94,4.94,0,0,1-3.58-1.19,4.7,4.7,0,0,1-1.24-2.79c0-.22-.09-13.26-.09-13.26ZM29.29,50.32H35a1.94,1.94,0,0,1,1.94,1.94v6.52h6.52a1.94,1.94,0,0,1,1.94,1.93v5.7a1.94,1.94,0,0,1-1.94,1.94H36.92v6.52A1.94,1.94,0,0,1,35,76.8H29.29a1.94,1.94,0,0,1-1.94-1.93V68.35H20.83a1.94,1.94,0,0,1-1.93-1.94v-5.7a1.94,1.94,0,0,1,1.93-1.93h6.52V52.26a1.94,1.94,0,0,1,1.94-1.94ZM59.51,42H4.79c0-2.07-.13.09.09-1.84A43.67,43.67,0,0,1,12.55,21.3c.81-1.08,1.64-2.21,2.5-3.42H49.16c.76,1.06,1.58,2.15,2.39,3.24,3.69,4.9,7.2,13,7.85,19.11.07.6.11,1.79.11,1.79Zm7.29,58.22L50.55,87.72,38.79,103h0a10.28,10.28,0,0,0,1.87,14.38h0A10.29,10.29,0,0,0,55,115.5h0L66.8,100.24Z" />
                </svg>

                <h4 className="text-[18px] font-inter font-semibold text-white">
                  Medicine
                </h4>

                <p className="text-sm font-inter text-gray-100">
                  There is an internal department and no-surgical condition
                  preventation for your health.
                </p>
              </div>

              <div className="bg-white shadow border flex flex-col items-start gap-2 p-3 rounded-md">
                <FontAwesomeIcon
                  icon={faEye}
                  className="bg-sky-100  text-sky-600 p-3 rounded-xl text-lg"
                />

                <h4 className="text-[18px] font-inter font-semibold">
                  Eye Surgery
                </h4>

                <p className="text-sm font-inter text-gray-400">
                  We have dozens of doctors and skilled staff working together
                  to ensure your treatment
                </p>
              </div>

              <div className="bg-white shadow border flex flex-col items-start gap-2 p-3 rounded-md">
                <FontAwesomeIcon
                  icon={faTeethOpen}
                  className="bg-yellow-100  text-yellow-600 p-3 rounded-xl text-lg"
                />

                <h4 className="text-[18px] font-inter font-semibold">
                  Dentistry
                </h4>

                <p className="text-sm font-inter text-gray-400">
                  Provide comprehensive dental care for patients with special
                  what you needs
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 relative">
            {/* Voilet div behind the image top 1 */}
            <div className="features_bg_violet px-3 py-2 top-10 right-0 absolute z-0 w-[60%] h-[60%] rounded-lg"></div>
            {/* Yellow div behind the image bottom 2 */}

            {/* For Doctor Count Showing count*/}
            <div className="bg-white px-3 py-2 top-60 lg:left-52 xl:left-52 left-3 absolute z-10 rounded-lg shadow-md border border-gray-200">
              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faUserDoctor}
                  className="text-violet-600 bg-violet-100 p-3 rounded-xl"
                />
                <div className="flex  flex-col">
                  <h3>144K</h3>
                  <p className="text-[12px] text-gray-400 font-inter">
                    Total Doctors
                  </p>
                </div>
              </div>
            </div>

            <div className="features_bg_violet px-3 py-2 right-0 bottom-[16px] absolute z-0 w-[60%] h-[30%] rounded-lg"></div>

            <img
              src="./src/assets/doctor_consult.png"
              alt="Doctor Icon"
              className="relative z-0 float-right"
            />

            {/* Service showing */}
            <div className="bg-white px-3 py-2 lg:left-52 xl:left-52 bottom-20 left-8 absolute z-10 rounded-lg shadow-md border border-gray-200">
              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-violet-600 bg-violet-100 p-3 rounded-xl"
                />

                <div className="flex  flex-col">
                  <h3>24/7</h3>
                  <p className="text-[12px] text-gray-400 font-inter">
                    Service available
                  </p>
                </div>
              </div>
            </div>

            {/* Facility */}
            <div className="bg-white px-3 py-2 bottom-20 right-2 absolute z-10 rounded-lg shadow-md border border-gray-200">
              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faKitMedical}
                  className="text-violet-600 bg-violet-100 p-3 rounded-xl"
                />

                <div className="flex  flex-col">
                  <h3>200+</h3>
                  <p className="text-[12px] text-gray-400 font-inter">
                    Facility available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepartMentFeatures;
