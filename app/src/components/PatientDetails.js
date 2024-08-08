import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  db,
} from "../firebase"; // Adjust import according to your firebase setup
import "./PatientDetails.css";

function PatientDetails() {
  const { id } = useParams(); // Get patient ID from URL
  const [patient, setPatient] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Define fetchPaymentHistory function outside of useEffect
  const fetchPaymentHistory = async () => {
    try {
      if (patient && patient.name) {
        console.log("Fetching payment history for:", patient.name); // Debug log
        const q = query(
          collection(db, "payments"),
          where("patient", "==", patient.name)
        );
        const querySnapshot = await getDocs(q);
        const paymentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Payment history fetched:", paymentsList); // Debug log
        setPaymentHistory(paymentsList);
      } else {
        console.log("Patient name not available for querying.");
      }
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const docRef = doc(db, "patients", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPatient(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    // Call fetchPaymentHistory when patient data is available
    if (patient && patient.name) {
      fetchPaymentHistory();
    }
  }, [patient]);

  return (
    <div className="container">
      <h2 className="text-center mb-2">Patient Details</h2>
      <div className="row g-2">
        <div className="col-md-6">
          {patient ? (
            <div>
              <ul className="list-group list-group-flush lead patientDetailsTextLeft">
                <li className="list-group-item">
                  <span className="fw-bold">Name:</span> {patient.name}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Address:</span> {patient.address}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Number:</span> {patient.number}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Gender:</span> {patient.gender}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Date of Birth:</span> {patient.dob}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Allergies:</span>{" "}
                  {patient.allergies}
                </li>
              </ul>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <hr />
      <div className="row">
        <h1 className="text-center">Payment History</h1>
        <div className="col-md-12">
          {paymentHistory.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount Paid</th>
                  <th>Discount</th>
                  <th>Total Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      {new Date(
                        payment.timestamp.toDate()
                      ).toLocaleDateString()}
                    </td>
                    <td>{Number(payment.amountPaid).toFixed(2)}</td>
                    <td>{payment.discount}%</td>
                    <td>{payment.totalCost.toFixed(2)}</td>
                    <td>
                      {payment.isFullyPaid ? (
                        <button className="btn btn-sm btn-success">
                          Fully Paid
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-warning">
                          Pending
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No payment history available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
