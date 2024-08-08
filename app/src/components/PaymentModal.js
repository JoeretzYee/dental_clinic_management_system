import React, { useState } from "react";
import "./PaymentModal.css";

function PaymentModal({ show, onClose, onSave, payment }) {
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().substr(0, 10)
  ); // default to today's date

  const handleSave = () => {
    onSave(paidAmount, paymentDate);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="paymentModalOverlay">
      <div className="paymentModalContent">
        <h2>Make a Payment</h2>
        <div className="paymentModalFormGroup">
          <label>Amount Paid</label>
          <input
            type="number"
            className="form-control"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
          />
        </div>
        <div className="paymentModalFormGroup">
          <label>Payment Date</label>
          <input
            type="date"
            className="form-control"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </div>
        <button
          className="btn paymentModalBtn btn-primary"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="btn paymentModalBtn btn-secondary"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
