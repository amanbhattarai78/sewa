import React, { useState, useEffect } from "react";

const Receipt = () => {
  const [receiptNumber, setReceiptNumber] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // yyyy-mm-dd
  const [customer, setCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [items, setItems] = useState([{ description: "", amount: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [allReceipts, setAllReceipts] = useState([]);

  // Load receipt number and receipts on mount
  useEffect(() => {
    const receipts = JSON.parse(localStorage.getItem("receipts") || "[]");
    setAllReceipts(receipts);
    if (receipts.length > 0) {
      setReceiptNumber(receipts[receipts.length - 1].receiptNumber + 1);
    }
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    if (field === "amount") {
      updatedItems[index][field] = parseFloat(value) || 0;
    } else {
      updatedItems[index][field] = value;
    }
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", amount: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems.length ? updatedItems : [{ description: "", amount: 0 }]);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const netAmount = totalAmount - discount - advancePayment;

  const saveReceipt = () => {
    if (!customer.trim()) {
      alert("Customer name is required");
      return;
    }
    if (netAmount < 0) {
      alert("Net amount cannot be negative");
      return;
    }

    const newReceipt = {
      receiptNumber,
      date,
      customer,
      paymentMethod,
      items,
      discount,
      advancePayment,
      totalAmount,
      netAmount,
    };

    const updatedReceipts = [...allReceipts, newReceipt];
    localStorage.setItem("receipts", JSON.stringify(updatedReceipts));
    setAllReceipts(updatedReceipts);
    setReceiptNumber(receiptNumber + 1);

    // Reset form
    setCustomer("");
    setPaymentMethod("Cash");
    setItems([{ description: "", amount: 0 }]);
    setDiscount(0);
    setAdvancePayment(0);

    alert(`Receipt #${newReceipt.receiptNumber} saved!`);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Receipt</h2>

      <div style={{ marginBottom: 10 }}>
        <label>
          Receipt No: <strong>{receiptNumber}</strong>
        </label>
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
          Customer Name:{" "}
          <input
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            style={{ width: "100%", padding: 6 }}
            placeholder="Enter customer or party name"
          />
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
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

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 20,
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: 8 }}>Description</th>
            <th style={{ padding: 8, width: 120, textAlign: "right" }}>Amount (NPR)</th>
            <th style={{ padding: 8, width: 50 }}>Actions</th>
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
                  style={{ width: "100%", padding: 6 }}
                  placeholder="Item description"
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
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
                    title="Remove item"
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
            min="0"
            step="0.01"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            style={{ padding: 6, width: 120, textAlign: "right" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>
          Advance Payment (NPR):{" "}
          <input
            type="number"
            min="0"
            step="0.01"
            value={advancePayment}
            onChange={(e) => setAdvancePayment(parseFloat(e.target.value) || 0)}
            style={{ padding: 6, width: 120, textAlign: "right" }}
          />
        </label>
      </div>

      <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}>
        Total Amount: NPR {totalAmount.toFixed(2)} <br />
        Net Amount (After Discount & Advance): NPR {netAmount.toFixed(2)}
      </div>

      <button
        onClick={saveReceipt}
        style={{
          padding: "12px 24px",
          backgroundColor: "#27ae60",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Save Receipt
      </button>
    </div>
  );
};

export default Receipt;
