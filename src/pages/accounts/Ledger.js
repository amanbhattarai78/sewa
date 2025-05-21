import React, { useEffect, useState } from "react";

export default function Ledger() {
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem("ledgerEntries") || "[]");
    setLedgerEntries(entries);
  };

  const handleDelete = (indexToDelete) => {
    const filtered = ledgerEntries.filter((_, index) => index !== indexToDelete);
    localStorage.setItem("ledgerEntries", JSON.stringify(filtered));
    setLedgerEntries(filtered);
  };

  // Filter entries based on searchTerm (case insensitive)
  const filteredEntries = ledgerEntries.filter(({ type, reference, date }) => {
    const term = searchTerm.toLowerCase();
    return (
      type.toLowerCase().includes(term) ||
      reference.toLowerCase().includes(term) ||
      date.toLowerCase().includes(term)
    );
  });

  // Calculate running balance for filtered entries
  let runningBalance = 0;

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Ledger</h2>

      <input
        type="text"
        placeholder="Search by Type, Reference or Date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px",
          marginBottom: 20,
          borderRadius: 4,
          border: "1px solid #ccc",
          fontSize: 16,
        }}
      />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Type</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reference</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Debit (NPR)</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Credit (NPR)</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Balance (NPR)</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>
                No entries found.
              </td>
            </tr>
          )}
          {filteredEntries.map((entry, idx) => {
            runningBalance += (entry.debit || 0) - (entry.credit || 0);
            return (
              <tr key={idx}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.date}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.type}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.reference}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
                  {entry.debit ? entry.debit.toFixed(2) : ""}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
                  {entry.credit ? entry.credit.toFixed(2) : ""}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
                  {runningBalance.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                  <button
                    onClick={() => handleDelete(idx)}
                    style={{
                      backgroundColor: "#e74c3c",
                      border: "none",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
