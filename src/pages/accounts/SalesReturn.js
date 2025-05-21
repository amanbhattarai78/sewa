import React, { useState, useEffect } from "react";

const SalesReturn = () => {
  const [returnNumber, setReturnNumber] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [party, setParty] = useState("");
  const [reason, setReason] = useState("");
  const [items, setItems] = useState([{ description: "", qty: 1, rate: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [salesReturns, setSalesReturns] = useState([]);

  useEffect(() => {
    const returns = JSON.parse(localStorage.getItem("salesReturns") || "[]");
    setSalesReturns(returns);
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
    if (!party.trim()) return alert("Customer name is required");
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

    const updated = [...salesReturns, newReturn];
    localStorage.setItem("salesReturns", JSON.stringify(updated));
    setSalesReturns(updated);
    setReturnNumber(returnNumber + 1);

    // Ledger entry
    const ledgerEntries = JSON.parse(localStorage.getItem("ledger") || "[]");
    ledgerEntries.push({
      date,
      type: "Sales Return",
      party,
      debit: netAmount,
      credit: 0,
      details: `Sales return #${returnNumber} - ${reason}`,
    });
    localStorage.setItem("ledger", JSON.stringify(ledgerEntries));

    // reset form
    setParty("");
    setReason("");
    setItems([{ description: "", qty: 1, rate: 0 }]);
    setDiscount(0);
    setAdvance(0);

    alert(`Sales Return #${returnNumber} saved and posted to Ledger.`);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2>Sales Return</h2>

      <div><strong>Return No: {returnNumber}</strong></div>
      <div style={{ margin: "10px 0" }}>
        Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        Customer Name: <input type="text" value={party} onChange={(e) => setParty(e.target.value)} style={{ width: "100%", padding: 6 }} />
      </div>

      <div>
        Reason: <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: "100%", padding: 6 }} />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td><input type="text" value={item.description} onChange={(e) => handleItemChange(idx, "description", e.target.value)} /></td>
              <td><input type="number" value={item.qty} onChange={(e) => handleItemChange(idx, "qty", e.target.value)} /></td>
              <td><input type="number" value={item.rate} onChange={(e) => handleItemChange(idx, "rate", e.target.value)} /></td>
              <td>{items.length > 1 && <button onClick={() => removeItem(idx)}>x</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addItem} style={{ marginTop: 10 }}>+ Add Item</button>

      <div style={{ marginTop: 10 }}>
        Discount: <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} />
      </div>
      <div>
        Advance: <input type="number" value={advance} onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)} />
      </div>

      <div style={{ marginTop: 10, fontWeight: "bold" }}>
        Total: NPR {totalAmount.toFixed(2)}<br />
        Net: NPR {netAmount.toFixed(2)}
      </div>

      <button onClick={saveReturn} style={{ marginTop: 20, padding: "10px 20px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: 5 }}>Save Return</button>
    </div>
  );
};

export default SalesReturn;
