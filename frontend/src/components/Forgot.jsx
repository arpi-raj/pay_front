import InputBar from "./InputBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [msg, setMsg] = useState("");
  const [otp, setOtp] = useState("");

  const nav = useNavigate();

  const handleVerify = async () => {
    // Logic for sending the verification code to the provided email
    console.log("Email:", email);
    setOtpSent(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/sendOtp",
        {
          email: email,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setMsg(response.data.msg);
        alert(response.data.msg);
      }
    } catch (e) {
      setMsg(e.data.msg);
      alert(e.data.msg);
    }
  };

  const handleOtpSubmit = async () => {
    console.log("OTP:", otp);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/verify", {
        email: email,
        pass: pass,
        otp: otp,
      });
      if (response.status === 200) {
        console.log(response.data);
        setMsg(response.data.msg);
        alert(response.data.msg);
        nav("/signin");
      }
    } catch (e) {
      setMsg(e.response.data.msg);
      alert(e.response.data.msg + " Try Again, after some time");
    }
  };

  const handleBack = () => {
    setOtpSent(false);
    setOtp("");
  };

  const navigateToDashboard = () => {
    nav("/Dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h2>
        {!otpSent ? (
          <>
            <InputBar
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="johnExample@gmail.com"
            />
            <button
              onClick={handleVerify}
              className="w-full bg-blue-500 text-white font-bold py-2 rounded mt-6 hover:bg-blue-600 transition duration-200"
            >
              Send Verification Code
            </button>
            <button
              onClick={navigateToDashboard}
              className="w-full bg-gray-500 text-white font-bold py-2 rounded mt-4 hover:bg-gray-600 transition duration-200"
            >
              Back
            </button>
          </>
        ) : (
          <>
            <InputBar
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="johnExample@gmail.com"
            />
            <InputBar
              onChange={(e) => setOtp(e.target.value)}
              label="OTP"
              placeholder="Enter OTP"
              className="mt-4"
            />

            <InputBar
              onChange={(e) => setPass(e.target.value)}
              label="New Password"
              placeholder="strongPassword"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-green-500 text-white font-bold py-2 rounded mt-4 hover:bg-green-600 transition duration-200"
            >
              Verify OTP
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-gray-500 text-white font-bold py-2 rounded mt-4 hover:bg-gray-600 transition duration-200"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
