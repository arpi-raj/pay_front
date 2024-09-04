import InputBar from "./InputBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const nav = useNavigate();

  const handleVerify = () => {
    // Logic for sending the verification code to the provided email
    console.log("Email:", email);
    setOtpSent(true);
  };

  const handleOtpSubmit = () => {
    // Logic for verifying the OTP
    console.log("OTP:", otp);
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
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
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
              onChange={(e) => setOtp(e.target.value)}
              label="OTP"
              placeholder="Enter OTP"
              className="mt-4"
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
