import React from "react";
import { useState } from "react";

const MemProfile = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [userInfo, setUserInfo] = useState({
    // state to store user information
    firstName: "Aditya",
    gender: "Male",
    age: 20,
    email: "aditya@gmail.com",
    mobile: "+919876543210",
    address: "Magaon, Mumbai, India",
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEditMode = (section) => {
    if (editSection === section) {
      setEditSection(null); // If already editing, then close
    } else {
      setEditSection(section);
    }
  };

  return (
    <div className="bg-[#e6e6fa] rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold pt-4">Profile</h1>
      <div className="flex justify-evenly  w-auto">
        <div className="sm:mx-8 sm:my-6">
          <div className="flex flex-col gap-5 items-start mb-8">
            <span className="font-medium text-lg">
              Personal Information{" "}
              <span
                className="text-sm text-primary-blue font-medium ml-8 cursor-pointer underline"
                onClick={() => toggleEditMode("personal")}
              >
                Edit
              </span>
            </span>

            <div
              className="flex flex-col sm:flex-row items-center gap-3"
              id="personalInputs"
            >
              <div className="flex flex-col rounded-lg gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                <label className="text-xs text-gray-500">Username</label>
                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  className={`text-sm outline-none border-none ${
                    editSection === "personal"
                      ? ""
                      : "cursor-not-allowed text-gray-500"
                  }`}
                  disabled={editSection !== "personal"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-start mb-8">
            <h2 className="font-medium text-lg">Your Gender</h2>
            <div className="flex items-center gap-8" id="radioInput">
              <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                <input
                  type="radio"
                  name="gender"
                  checked={true}
                  id="male"
                  className="h-4 w-4 cursor-not-allowed"
                  disabled
                />
                <label htmlFor="male" className="cursor-not-allowed">
                  Male
                </label>
              </div>
              <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                <input
                  type="radio"
                  name="gender"
                  checked={false}
                  id="female"
                  className="h-4 w-4 cursor-not-allowed"
                  disabled
                />
                <label htmlFor="female" className="cursor-not-allowed">
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-start mb-8">
            <span className="font-medium text-lg">
              Age
              <span
                className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer underline"
                onClick={() => toggleEditMode("age")}
              >
                Edit
              </span>
            </span>

            <div className="flex items-center gap-3">
              <div className="flex flex-col rounded-lg gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                <label className="text-xs text-gray-500">Age</label>
                <input
                  type="number"
                  name="age"
                  value={userInfo.age}
                  className={`text-sm outline-none border-none ${
                    editSection === "age"
                      ? ""
                      : "cursor-not-allowed text-gray-500"
                  }`}
                  disabled={editSection !== "age"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="m-4 sm:mx-8 sm:my-6">
          <div className="flex flex-col gap-5 items-start mb-8">
            <span className="font-medium text-lg">
              Email Address
              <span
                className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer underline"
                onClick={() => toggleEditMode("email")}
              >
                Edit
              </span>
            </span>

            <div className="flex items-center gap-3">
              <div className="flex flex-col rounded-lg gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                <label className="text-xs text-gray-500">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  className={`text-sm outline-none border-none ${
                    editSection === "email"
                      ? ""
                      : "cursor-not-allowed text-gray-500"
                  }`}
                  disabled={editSection !== "email"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-start mb-8">
            <span className="font-medium text-lg">
              Mobile Number
              <span
                className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer underline"
                onClick={() => toggleEditMode("mobile")}
              >
                Edit
              </span>
            </span>

            <div className="flex items-center gap-3">
              <div className="flex flex-col rounded-lg gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                <label className="text-xs text-gray-500">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={userInfo.mobile}
                  className={`text-sm outline-none border-none ${
                    editSection === "mobile"
                      ? ""
                      : "cursor-not-allowed text-gray-500"
                  }`}
                  disabled={editSection !== "mobile"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-start mb-8">
            <span className="font-medium text-lg">
              Address
              <span
                className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer underline"
                onClick={() => toggleEditMode("address")}
              >
                Edit
              </span>
            </span>

            <div className="flex items-center gap-3">
              <div className="flex flex-col rounded-lg gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                <label className="text-xs text-gray-500">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  className={`text-sm outline-none border-none ${
                    editSection === "address"
                      ? ""
                      : "cursor-not-allowed text-gray-500"
                  }`}
                  disabled={editSection !== "address"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemProfile;
