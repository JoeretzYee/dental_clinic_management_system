import React from "react";
import "./App.css"; // Import your CSS file
//React router dom
import { Routes, Route, Navigate } from "react-router-dom";
// Components
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import Treatments from "./components/Treatments";
import Appointments from "./components/Appointments";

function App() {
  return (
    <div className="app">
      <Sidebar />

      {/* <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes> */}
    </div>
  );
}

export default App;
