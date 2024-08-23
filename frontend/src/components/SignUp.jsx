import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import InputBar from "./InputBar";
import { fetchData } from "./DashBoard";
import axios from "axios";

export default function SignUp() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // If a token exists, fetch user data
        const user = await fetchData(token);
        if (user === "unauthorized") {
          nav("/"); 
        } else if (user) {
          nav("/dashboard"); // Navigate to the dashboard if user data is fetched
        }
      }
    };

    checkUser();
  }, [nav]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup", {
        fName,
        lName,
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      nav("/DashBoard");
    } catch (error) {
      alert("An error occurred while signing up. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Heading heading="Signup" />
        <InputBar
          onChange={(e) => setFName(e.target.value)}
          label="First Name"
          placeholder="John"
        />
        <InputBar
          onChange={(e) => setLName(e.target.value)}
          label="Last Name"
          placeholder="Doe"
        />
        <InputBar
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="johnExample@gmail.com"
        />
        <InputBar
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="strongPassword"
          type="password"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
        <div className="mt-4 text-center">
          <p>
            Already a member?{" "}
            <Link className="text-blue-400 underline" to="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
