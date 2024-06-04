import React from "react";
import Modal from "react-modal";

const ProfileModal = ({ showModalProfile }) => {
  return (
    <Modal
      isOpen={showModalProfile}
      ariaHideApp={false}
      className="flex justify-center items-center h-screen bg-white bg-opacity-55"
    >
      <div className="bg-white p-8 rounded shadow-lg text-center mx-4">
        <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
        <p className="mb-6">
          Please complete your profile to continue using the application.
        </p>
        <button
          onClick={() => (window.location.href = "/dashboard/profile")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Complete Profile
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
