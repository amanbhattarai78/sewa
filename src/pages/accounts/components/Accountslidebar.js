// src/components/accounts/AccountSidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccountSidebar() {
  const navigate = useNavigate();
  const items = [
    { label: "Sales", path: "/accounts/sales" },
    { label: "Invoice", path: "/accounts/invoice" },
    { label: "Receipt", path: "/accounts/receipt" },
    { label: "Payment", path: "/accounts/payment" },
    { label: "Purchase Return", path: "/accounts/purchase-return" },
    { label: "Sales Return", path: "/accounts/sales-return" },
    { label: "Ledger", path: "/accounts/ledger" },
  ];

  return (
    <div style={{ width: 200, borderRight: "1px solid #ddd", padding: 10 }}>
      <h3>Accounts</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{ margin: "10px 0", cursor: "pointer", color: "#2c3e50" }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
