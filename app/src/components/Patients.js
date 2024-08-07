import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "../firebase.js";
import Swal from "sweetalert2";
import "./Patients.css";

function Patients() {
  const [patientData, setPatientData] = useState({
    name: "",
    address: "",
    number: "",
    gender: "",
    dob: "",
    allergies: "n/a",
  });
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //fetch patients
  useEffect(() => {
    // Fetch patients from Firestore on component mount
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patients"));
        const patientsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort patients by first name
        patientsList.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        setPatients(patientsList);
        setFilteredPatients(patientsList);
      } catch (error) {
        console.error("Error fetching patients: ", error);
      }
    };

    fetchPatients();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setPatientData({
      name: "",
      address: "",
      number: "",
      gender: "",
      dob: "",
      allergies: "n/a",
    });
    setCurrentPatientId(null);
  };
  const handleShow = () => setShowModal(true);
  // Handle add/edit patient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentPatientId) {
        await updateDoc(doc(db, "patients", currentPatientId), patientData);
        Swal.fire(
          "Success!",
          "The patient was updated successfully.",
          "success"
        );
      } else {
        const docRef = await addDoc(collection(db, "patients"), patientData);
        console.log("Document written with ID: ", docRef.id);
        Swal.fire("Success!", "The patient was added successfully.", "success");
      }
      handleClose();
      const querySnapshot = await getDocs(collection(db, "patients"));
      const patientsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(patientsList);
      setFilteredPatients(patientsList);
    } catch (e) {
      console.error("Error adding/editing document: ", e);
    }
  };
  const handleEdit = (patient) => {
    setIsEditing(true);
    setCurrentPatientId(patient.id);
    setPatientData(patient);
    setShowModal(true);
  };

  //handle delete patient
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "patients", id));
        console.log("Document successfully deleted");
        // Fetch updated patients list
        const querySnapshot = await getDocs(collection(db, "patients"));
        const patientsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientsList);
        setFilteredPatients(patientsList);
        Swal.fire("Deleted!", "The patient has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting document: ", error);
        Swal.fire(
          "Error!",
          "There was an error deleting the patient.",
          "error"
        );
      }
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredList = patients.filter((patient) =>
      patient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPatients(filteredList);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-12 d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "auto", flexGrow: 1 }}
          />
          <button className="btn btn-dark w-auto" onClick={handleShow}>
            Add Patient
          </button>
        </div>
      </div>
      <div className="table-container">
        <table class="table table-responsive caption-top ">
          <caption>PATIENTS</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Number</th>
              <th scope="col">Gender</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Allergies</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.address}</td>
                <td>{patient.number}</td>
                <td>{patient.gender}</td>
                <td>{patient.dob}</td>
                <td>{patient.allergies}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(patient.id)}
                  >
                    <i className="bi bi-trash bi-danger"></i>
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleEdit(patient)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(patient)}
                  >
                    <i className="bi bi-eye-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditing ? "Edit Patient" : "Add New Patient"}
              </h5>
              <button
                type="button"
                className="close"
                onClick={handleClose}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={patientData.name}
                    // onChange={(e) =>
                    //   setPatientData({ ...patientData, name: e.target.value })
                    // }
                    onChange={(e) => {
                      const name = e.target.value.toLowerCase();
                      setPatientData({ ...patientData, name });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter address"
                    value={patientData.address}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter number"
                    value={patientData.number}
                    onChange={(e) =>
                      setPatientData({ ...patientData, number: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    value={patientData.gender}
                    onChange={(e) =>
                      setPatientData({ ...patientData, gender: e.target.value })
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Lgbtq">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={patientData.dob}
                    onChange={(e) =>
                      setPatientData({ ...patientData, dob: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Allergies</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter allergies"
                    value={patientData.allergies}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        allergies: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {isEditing ? "Update Patient" : "Save Patient"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patients;
