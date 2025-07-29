import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import MemberDashboard from "./components/MemberDashboard";
import TrainerDashboard from "./components/TrainerDashboard";
import ClassSchedule from "./components/ClassSchedule";
import WorkoutPlan from "./components/WorkoutPlan";

function App() {
  const navStyle = {
    display: "flex",
    gap: "20px",
    padding: "10px",
    backgroundColor: "#f2f2f2",
    marginBottom: "20px",
    justifyContent: "center",
  };

  const containerStyle = {
    width: "90%",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  };

  return (
    <Router>
      <div style={containerStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>FitLog Gym</h1>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Your Fitness Journey Starts Here</h3>

        <nav style={navStyle} className="bg-gray-200 p-4 rounded-lg shadow-md">
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/member">Member</Link>
          <Link to="/trainer">Trainer</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/plans">Plans</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/schedule" element={<ClassSchedule />} />
          <Route path="/plans" element={<WorkoutPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
