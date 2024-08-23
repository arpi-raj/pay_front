import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Balance() {
  const [balance, setBalance] = useState("Loading...");
  const nav = useNavigate();

  async function fetchBalance() {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            authorization: `Bearer ${token}`, // Ensure the token is prefixed with 'Bearer'
          },
        }
      );

      setBalance(response.data.balance);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid User/Session Out, Sign-In again");
        nav("/signin");
      } else {
        console.error("Error fetching balance:", error);
        alert("Failed to fetch balance. Please try again.");
      }
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return <div className="text-lg font-semibold pl-2">Your Balance is {balance}</div>;
}
