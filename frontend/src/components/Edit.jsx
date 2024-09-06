import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";

export default function Edit() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleBack() {
    nav("/Dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call to update user info)
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();

      const requestBody = {};
      if (fName.trim() !== "") requestBody.fName = fName;
      if (lName.trim() !== "") requestBody.lName = lName;
      if (password.trim() !== "") requestBody.password = password;

      // Proceed only if there is something to update
      if (Object.keys(requestBody).length === 0) {
        console.log("No fields to update");
        return;
      }

      console.log(requestBody);
      // 4. Make the POST request with Axios
      const response = await axios.put(
        "http://localhost:3000/api/v1/user/update",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Update Successful");
        nav("/dashboard");
      }
      console.log("User update successful:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Try after some time "+ e.response.data.msg)
      nav('/dashboard')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <Heading heading="Update User Information" />
        <h3 className="font-bold text-center">Provide only what to change</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="fName"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lName"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClick}
          >
            Update
          </button>
          <button
            type="button"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={handleBack}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
