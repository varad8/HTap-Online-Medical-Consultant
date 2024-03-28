import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faMapLocationDot,
  faCalendarAlt,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

function Features() {
  return (
    <>
      <div className="container mx-auto bg-features w-full  rounded-lg py-6 px-3">
        {/* Content above the grid */}
        <div className="flex flex-wrap gap-4 px-6 py-2 items-center justify-between">
          <h3 className="text-3xl text-white font-inter">
            Easy step to book your appointment
          </h3>
          <p className="text-sm text-white font-inter">
            Easy Make Appointment With Our Best Doctor For Your health
            consultant In Same Day Or Next Day
          </p>
          <button className="px-3 py-2 bg-white rounded-md text-skyblue">
            Make an Appointment
          </button>
        </div>

        {/* Features Grid  */}
        <div className="flex justify-between gap-6 overflow-x-auto mt-3">
          <div className="w-1/2 shadow-lg border border-gray-100 rounded-md bg-white p-4">
            <div className="flex flex-col gap-6 justify-center items-center">
              <FontAwesomeIcon
                icon={faUserDoctor}
                className="bg-sky-100 text-skyblue rounded-lg p-3 text-[25px]"
              />
              <h4 className="font-inter text-black font-medium">
                Search Doctor
              </h4>
              <p className="text-gray-600 text-sm text-center break-words">
                Before book appointment first of all search doctor by category
              </p>
            </div>
          </div>
          <div className="w-1/2 shadow-lg border border-gray-100 rounded-md bg-white p-4">
            <div className="flex flex-col gap-6 justify-center items-center">
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className="bg-violet-100 text-voilet rounded-lg p-3 text-[25px]"
              />
              <h4 className="font-inter text-black font-medium">
                Choose Your Location
              </h4>
              <p className="text-gray-600 text-sm text-center break-words">
                Then enter your location and we will help you find appointment
                near you
              </p>
            </div>
          </div>
          <div className="w-1/2 shadow-lg border border-gray-100 rounded-md bg-white p-4">
            <div className="flex flex-col gap-6 justify-center items-center">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="bg-red-100 text-red-600 rounded-lg p-3 text-[25px]"
              />
              <h4 className="font-inter text-black font-medium">
                Schedule Appointment
              </h4>
              <p className="text-gray-600 text-sm text-center break-words">
                Then enter your location and we will help you find appointment
                near you
              </p>
            </div>
          </div>
          <div className="w-1/2 shadow-lg border border-gray-100 rounded-md bg-white p-4">
            <div className="flex flex-col gap-6 justify-center items-center">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="bg-yellow-100 text-yellow_dark rounded-lg p-3 text-[25px]"
              />
              <h4 className="font-inter text-black font-medium">
                Get Your Solution
              </h4>
              <p className="text-gray-600 text-sm text-center break-words">
                We will help you find and provide solutions for your health
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
