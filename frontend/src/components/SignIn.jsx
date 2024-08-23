import { Link } from "react-router-dom";
import {useState} from "react"
import Heading from "./Heading";
import InputBar from "./InputBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate()
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <Heading heading="Sign In" />
          <InputBar
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email"
            placeholder="johnExample@gmail.com"
          />
          <InputBar
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <button
            onClick={async () => {
              try{
                const response = await axios.post(
                  "http://localhost:3000/api/v1/signin",
                  {
                    email,
                    password,
                  }
                );
                console.log(response.data)
                localStorage.setItem("token", response.data.token);
                nav("/DashBoard")
              }catch(e){
                console.log(e.msg)
                alert("An Internal Error Occured")
              }
            }}
            className="w-full justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
          <div className="mt-4 text-center">
            <p>
              Not a member yet?{" "}
              <Link className="text-blue-400 underline" to="/">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
