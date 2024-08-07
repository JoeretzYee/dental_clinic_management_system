import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function Payment() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [amountPaid, setAmountPaid] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [treatmentSearch, setTreatmentSearch] = useState("");

  useEffect(() => {
    const db = getFirestore();

    const fetchPatients = async () => {
      const patientsSnapshot = await getDocs(collection(db, "patients"));
      const patientsData = patientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(patientsData);
    };

    const fetchTreatments = async () => {
      const treatmentsSnapshot = await getDocs(collection(db, "treatments"));
      const treatmentsData = treatmentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTreatments(treatmentsData);
    };

    fetchPatients();
    fetchTreatments();
  }, []);

  const handleTreatmentChange = (e) => {
    const treatment = treatments.find((t) => t.id === e.target.value);
    setSelectedTreatment(treatment);
    calculateTotalCost(treatment, quantity, discount);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10);
    setQuantity(qty);
    calculateTotalCost(selectedTreatment, qty, discount);
  };

  const handleDiscountChange = (e) => {
    const disc = parseFloat(e.target.value);
    setDiscount(disc);
    calculateTotalCost(selectedTreatment, quantity, disc);
  };

  const calculateTotalCost = (treatment, qty, disc) => {
    if (treatment) {
      const cost = treatment.cost * qty;
      const total = cost - (cost * disc) / 100;
      setTotalCost(total);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    try {
      await addDoc(collection(db, "payments"), {
        patientId: selectedPatient,
        treatmentId: selectedTreatment.id,
        quantity,
        amountPaid,
        discount,
        totalCost,
        timestamp: new Date(),
      });
      console.log("Payment successfully added!");
    } catch (error) {
      console.error("Error adding payment: ", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const filteredTreatments = treatments.filter((treatment) =>
    treatment.name.toLowerCase().includes(treatmentSearch.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-center">Payment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientSearch" className="form-label">
            Search Patient
          </label>
          <input
            type="text"
            className="form-control"
            id="patientSearch"
            placeholder="Search Patient"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
          />
          <label htmlFor="patientName" className="form-label mt-2">
            Patient Name
          </label>
          <select
            className="form-select"
            id="patientName"
            onChange={(e) => setSelectedPatient(e.target.value)}
            required
          >
            <option value="">Select Patient</option>
            {filteredPatients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="treatmentSearch" className="form-label">
            Search Treatment
          </label>
          <input
            type="text"
            className="form-control"
            id="treatmentSearch"
            placeholder="Search Treatment"
            value={treatmentSearch}
            onChange={(e) => setTreatmentSearch(e.target.value)}
          />
          <label htmlFor="treatment" className="form-label mt-2">
            Treatment
          </label>
          <select
            className="form-select"
            id="treatment"
            onChange={handleTreatmentChange}
            required
          >
            <option value="">Select Treatment</option>
            {filteredTreatments.map((treatment) => (
              <option key={treatment.id} value={treatment.id}>
                {treatment.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="discount" className="form-label">
            Discount (%)
          </label>
          <input
            type="number"
            className="form-control"
            id="discount"
            value={discount}
            onChange={handleDiscountChange}
            min="0"
            max="100"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalCost" className="form-label">
            Total Cost
          </label>
          <input
            type="number"
            className="form-control"
            id="totalCost"
            value={totalCost.toFixed(2)}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amountPaid" className="form-label">
            Amount Paid
          </label>
          <input
            type="number"
            className="form-control"
            id="amountPaid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            min="0"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Payment;
