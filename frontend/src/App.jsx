import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Send from "./components/Send";
import DashBoard from "./components/DashBoard";
import Edit from "./components/Edit";
import Forgot from "./components/Forgot";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/send" element={<Send />} /> {/* Corrected path */}
        <Route path="/edit" element={<Edit />} />
        <Route path="/forgotPass" element={<Forgot />} />
      </Routes>
    </Router>
  );
}

export default App;
