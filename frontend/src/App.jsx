import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Send from "./components/Send";
import DashBoard from "./components/DashBoard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/send" element={<Send />} /> {/* Corrected path */}
      </Routes>
    </Router>
  );
}

export default App;
