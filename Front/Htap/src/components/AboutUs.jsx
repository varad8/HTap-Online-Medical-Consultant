import React from "react";
import DoctorCard from "./DoctorCard";

function AboutUs() {
  return (
    <>
      <div className="flex flex-wrap bg-white overflow-hidden">
        <div className="w-full md:w-1/2 px-6 py-3">
          <h2 className="font-inter text-violet-600 text-2xl">About Us</h2>
          <p className="text-lg leading-loose">
            Welcome to HTap, your premier destination for convenient online
            healthcare solutions. Our platform connects patients with a diverse
            range of skilled doctors, offering comprehensive services tailored
            to your needs. With user-friendly technology and a commitment to
            excellence, we're revolutionizing the way you access medical care.
            Trust HTap for seamless online consultations and hassle-free
            appointment booking, putting your health first every step of the
            way.
          </p>
        </div>

        <div className="w-full md:w-1/2  relative overflow-hidden">
          <div className="absolute bg-voilet z-0 md:w-[80%] w-[95%] rounded-l-full h-full right-0"></div>
          <img
            src="/src/assets/aboutimg.png"
            alt="Medical Consultant"
            className=" z-10 relative object-center object-cover md:left-[300px] left-32 bottom-0"
          />
        </div>
      </div>

      <DoctorCard />
    </>
  );
}

export default AboutUs;
