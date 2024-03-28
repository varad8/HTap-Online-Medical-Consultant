import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryLink, setCategoryLink] = useState("");

  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategoryDescription, setSelectedCategoryDescription] =
    useState("");
  const [selectedCategoryLink, setSelectedCategoryLink] = useState("");
  const [specailistdata, setSpecialistData] = useState([]);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;

  useEffect(() => {
    fetchSpecialistCategory();
  }, []);

  const fetchSpecialistCategory = async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/specialist/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSpecialistData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveCategory = async () => {
    try {
      const response = await axios.post(
        `${endpoint}/admin/specialist/add`,
        {
          name: categoryName,
          description: categoryDescription,
          link: categoryLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategoryDescription("");
      setCategoryLink("");
      setCategoryName("");

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      fetchSpecialistCategory();
      handleCloseModal();
      selectedCategory(null);
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${endpoint}/admin/specialist/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      fetchSpecialistCategory();
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleEdit = (category) => {
    setOpenEditModal(true);
    setSelectedCategory(category);
    setSelectedCategoryName(category.name);
    setSelectedCategoryLink(category.link);
    setSelectedCategoryDescription(category.description);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${endpoint}/admin/specialist/update/${selectedCategory._id}`,
        {
          name: categoryName,
          description: categoryDescription,
          link: categoryLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      fetchSpecialistCategory();
      handleCloseModal();
      selectedCategory(null);
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 font-inter">Categories</h2>
        <div className="mb-4 grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-2 gap-6 items-center">
          <div className="flex gap-2 flex-col">
            <label className="font-inter text-black text-[16px]">
              Category Name
            </label>
            <div>
              <input
                type="text"
                name="name"
                className="border border-violet-500 px-2 py-2  w-full rounded-lg  outline-violet-500"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-col">
            <label className="font-inter text-black text-[16px]">
              Category Image Link (public)
            </label>
            <div>
              <input
                type="text"
                name="name"
                className="border border-violet-500 px-2 py-2  w-full rounded-lg  outline-violet-500"
                value={categoryLink}
                onChange={(e) => {
                  setCategoryLink(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-col">
            <label className="font-inter text-black text-[16px]">
              Category Description
            </label>
            <div>
              <textarea
                type="text"
                name="name"
                className="border border-violet-500 px-2 py-2  w-full rounded-lg  outline-violet-500"
                value={categoryDescription}
                onChange={(e) => {
                  setCategoryDescription(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-col">
            <button
              type="button"
              onClick={saveCategory}
              className="border bg-violet-500 text-white border-gray-200 px-4 py-2 rounded-lg w-1/2 hover:bg-violet-700"
            >
              Save
            </button>
          </div>
        </div>

        <hr />
        <div className="mb-4 overflow-auto" style={{ maxHeight: "500px" }}>
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {specailistdata.map((category, index) => (
                <tr key={category._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleEdit(category)}
                        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isOpenEditModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Edit Category
                      </h3>

                      <div className="flex items-center justify-center mt-3 mb-3">
                        <img
                          src={selectedCategoryLink}
                          className="w-14 h-14 rounded-full"
                        />
                      </div>

                      <div className="mt-2">
                        <div className="mb-4">
                          <label className="font-inter text-black text-[16px]">
                            Category Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="border border-violet-500 px-2 py-2  w-full rounded-lg  outline-violet-500"
                            value={selectedCategoryName}
                            onChange={(e) => {
                              setSelectedCategoryName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="font-inter text-black text-[16px]">
                            Category Description
                          </label>
                          <textarea
                            type="text"
                            name="name"
                            className="border border-violet-500 px-2 py-2  w-full rounded-lg  outline-violet-500"
                            value={selectedCategoryDescription}
                            onChange={(e) => {
                              setSelectedCategoryDescription(e.target.value);
                            }}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="font-inter text-black text-[16px]">
                            Category Link
                          </label>
                          <textarea
                            type="text"
                            name="link"
                            className="border border-violet-500 px-2 py-2  w-full rounded-lg  outline-violet-500"
                            value={selectedCategoryLink}
                            onChange={(e) => {
                              setSelectedCategoryLink(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleUpdate}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCloseModal()}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </>
  );
}

export default AdminCategory;
