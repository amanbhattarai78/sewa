import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const navigate = useNavigate();

  const features = [
    { icon: "💰", label: "Sales", path: "/accounts/sales" },
    { icon: "🧾", label: "Invoice", path: "/accounts/invoice" },
    { icon: "📄", label: "Receipt", path: "/accounts/receipt" },
    { icon: "💳", label: "Payment", path: "/accounts/payment" },
    { icon: "↩️", label: "Purchase Return", path: "/accounts/purchase-return" },
    { icon: "↪️", label: "Sales Return", path: "/accounts/sales-return" },
    { icon: "📚", label: "Ledger", path: "/accounts/ledger" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Account Management</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 20,
        }}
      >
        {features.map(({ icon, label, path }) => (
          <div
            key={label}
            style={{
              flex: "1 0 150px",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#f7fafc",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              userSelect: "none",
              transition: "background-color 0.2s",
            }}
            onClick={() => navigate(path)}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f7fafc")}
          >
            <div style={{ fontSize: 40 }}>{icon}</div>
            <div style={{ marginTop: 10, fontWeight: "bold" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
