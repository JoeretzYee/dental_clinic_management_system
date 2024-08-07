import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Appointments from "./Appointments";
import Treatments from "./Treatments";

function Main() {
  return (
    <div className="main p-3">
      <div className="text-center">
        <h1>Dr. Russel Dental Clinic Management System</h1>
        <hr />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/treatments" element={<Treatments />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
