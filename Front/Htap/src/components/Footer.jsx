import React from "react";

function Footer() {
  return (
    <>
      <footer className="w-full  bg-gray-100/50">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 xl:grid-cols-4 px-10 py-8">
          <div className="w-full">
            <div className="flex gap-2 flex-col">
              <h4 className="font-medium font-inter text-xl">
                HTap <span className="text-voilet">Medical</span>
              </h4>
              <p className="text-gray-600">
                Get an expert medical opinion from one of our world renowned
                specialist so you can have the answer and confidence to make
                informed decisions about your health
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-2 flex-col">
              <h5 className="font-medium font-inter">Services</h5>
              <ul className="list-none leading-6 text-sm font-inter text-gray-600">
                <li>Health Tips</li>
                <li>Blogs</li>
                <li>Medical</li>
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-2 flex-col">
              <h5 className="font-medium font-inter">Information</h5>
              <ul className="list-none leading-6 text-sm font-inter text-gray-600">
                <li>Sign Up</li>
                <li>Join Community</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-2 flex-col">
              <h5 className="font-medium font-inter">Platform</h5>
              <ul className="list-none leading-6 text-sm font-inter text-gray-600">
                <li>Terms of use</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <nav className="bg-gray-200 text-center py-3">
          Copyright &copy; 2024-25. All rights reserved.
        </nav>
      </footer>
    </>
  );
}

export default Footer;
