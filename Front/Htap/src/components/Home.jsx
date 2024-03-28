import React from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import DoctorFeatures from "./DoctorFeatures";
import DepartMentFeatures from "./DepartMentFeatures";
import TestiMonial from "./TestiMonial";

function Home() {
  return (
    <div>
      <HeroSection />
      <Features />
      <DoctorFeatures />
      <DepartMentFeatures />
      <TestiMonial />
    </div>
  );
}

export default Home;
