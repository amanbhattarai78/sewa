// src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Welcome to Sewa Poultry Farm Management</h1>
      <p>Your reliable poultry business management solution.</p>
      <button
        style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
}
