import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

function Send() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const fName = searchParams.get("fName");
  const lName = searchParams.get("lName");

  const name = `${fName} ${lName}`;
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (name && amount && amount > 0) {
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/account/transfer",
          { to: id, amount },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Transaction Successful");
          nav("/dashboard");
        } else {
          alert("Transaction Failed. Please try again.");
        }
      } catch (error) {
        console.error("Transaction error:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a valid amount to send.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Send Money</h2>
        <h2 className="text-xl font-bold mb-4">{name}</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        <button
          onClick={() => {
            nav("/dashboard");
          }}
          className="w-full my-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Send;
