import React, { useState, useEffect } from "react";

const PurchaseReturn = () => {
  const [returnNumber, setReturnNumber] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [party, setParty] = useState("");
  const [reason, setReason] = useState("");
  const [items, setItems] = useState([{ description: "", qty: 1, rate: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [allReturns, setAllReturns] = useState([]);

  useEffect(() => {
    const returns = JSON.parse(localStorage.getItem("purchaseReturns") || "[]");
    setAllReturns(returns);
    if (returns.length > 0) {
      setReturnNumber(returns[returns.length - 1].returnNumber + 1);
    }
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === "qty" || field === "rate" ? parseFloat(value) || 0 : value;
    setItems(updatedItems);
  };

  const addItem = () => setItems([...items, { description: "", qty: 1, rate: 0 }]);
  const removeItem = (index) =>
    setItems(items.length === 1 ? items : items.filter((_, i) => i !== index));

  const totalAmount = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const netAmount = totalAmount - discount - advance;

  const saveReturn = () => {
    if (!party.trim()) return alert("Party name is required");
    if (netAmount < 0) return alert("Net amount cannot be negative");

    const newReturn = {
      returnNumber,
      date,
      party,
      reason,
      items,
      discount,
      advance,
      totalAmount,
      netAmount,
    };

    const updated = [...allReturns, newReturn];
    localStorage.setItem("purchaseReturns", JSON.stringify(updated));
    setAllReturns(updated);
    setReturnNumber(returnNumber + 1);

    // reset form
    setParty("");
    setReason("");
    setItems([{ description: "", qty: 1, rate: 0 }]);
    setDiscount(0);
    setAdvance(0);

    alert(`Purchase Return #${returnNumber} saved!`);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2>Purchase Return</h2>

      <div style={{ marginBottom: 10 }}>
        <strong>Return No: {returnNumber}</strong>
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
          Party (Supplier):{" "}
          <input
            type="text"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            style={{ width: "100%", padding: 6 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Reason:{" "}
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ width: "100%", padding: 6 }}
          />
        </label>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: 8 }}>Description</th>
            <th style={{ padding: 8, width: 80 }}>Qty</th>
            <th style={{ padding: 8, width: 100 }}>Rate</th>
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
                  style={{ width: "100%", padding: 6 }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                  style={{ width: "100%", padding: 6 }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                  style={{ width: "100%", padding: 6 }}
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

      <button
        onClick={addItem}
        style={{
          marginBottom: 10,
          padding: "6px 12px",
          backgroundColor: "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        + Add Item
      </button>

      <div style={{ marginBottom: 10 }}>
        <label>
          Discount:{" "}
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            style={{ padding: 6 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Advance:{" "}
          <input
            type="number"
            value={advance}
            onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)}
            style={{ padding: 6 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 20, fontWeight: "bold", fontSize: 16 }}>
        Total Amount: NPR {totalAmount.toFixed(2)} <br />
        Net Amount: NPR {netAmount.toFixed(2)}
      </div>

      <button
        onClick={saveReturn}
        style={{
          padding: "12px 24px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Save Purchase Return
      </button>
    </div>
  );
};

export default PurchaseReturn;
