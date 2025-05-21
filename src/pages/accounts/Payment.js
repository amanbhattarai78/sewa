import React, { useState, useEffect } from "react";

const Payment = () => {
  const [paymentNumber, setPaymentNumber] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [party, setParty] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [items, setItems] = useState([{ description: "", amount: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [allPayments, setAllPayments] = useState([]);

  useEffect(() => {
    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    setAllPayments(payments);
    if (payments.length > 0) {
      setPaymentNumber(payments[payments.length - 1].paymentNumber + 1);
    }
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === "amount" ? parseFloat(value) || 0 : value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", amount: 0 }]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated.length ? updated : [{ description: "", amount: 0 }]);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const netAmount = totalAmount - discount - advance;

  const savePayment = () => {
    if (!party.trim()) return alert("Party name is required");
    if (netAmount < 0) return alert("Net amount cannot be negative");

    const newPayment = {
      paymentNumber,
      date,
      party,
      paymentMethod,
      items,
      discount,
      advance,
      totalAmount,
      netAmount,
    };

    const updatedPayments = [...allPayments, newPayment];
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
    setAllPayments(updatedPayments);
    setPaymentNumber(paymentNumber + 1);

    // Reset form
    setParty("");
    setPaymentMethod("Cash");
    setItems([{ description: "", amount: 0 }]);
    setDiscount(0);
    setAdvance(0);

    alert(`Payment #${paymentNumber} saved!`);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2>Payment</h2>

      <div style={{ marginBottom: 10 }}>
        <strong>Payment No: {paymentNumber}</strong>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: 6 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Paid To:{" "}
          <input
            type="text"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            style={{ width: "100%", padding: 6 }}
            placeholder="Enter supplier/vendor"
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Payment Method:{" "}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ padding: 6 }}
          >
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cheque">Cheque</option>
            <option value="Mobile Payment">Mobile Payment</option>
          </select>
        </label>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: 8 }}>Description</th>
            <th style={{ padding: 8, textAlign: "right", width: 120 }}>Amount (NPR)</th>
            <th style={{ padding: 8, width: 50 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              <td>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                  placeholder="Description"
                  style={{ width: "100%", padding: 6 }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => handleItemChange(idx, "amount", e.target.value)}
                  style={{ width: "100%", padding: 6, textAlign: "right" }}
                />
              </td>
              <td>
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(idx)}
                    style={{
                      backgroundColor: "#e74c3c",
                      border: "none",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    &times;
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginBottom: 10 }}>
        <label>
          Discount (NPR):{" "}
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            style={{ padding: 6, width: 120 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Advance Payment (NPR):{" "}
          <input
            type="number"
            value={advance}
            onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)}
            style={{ padding: 6, width: 120 }}
          />
        </label>
      </div>

      <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}>
        Total: NPR {totalAmount.toFixed(2)} <br />
        Net Payable: NPR {netAmount.toFixed(2)}
      </div>

      <button
        onClick={savePayment}
        style={{
          padding: "12px 24px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Save Payment
      </button>
    </div>
  );
};

export default Payment;
