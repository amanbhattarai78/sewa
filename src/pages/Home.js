import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? 200 : 50,
          backgroundColor: "#333",
          color: "white",
          height: "100vh",
          padding: 10,
          transition: "width 0.3s",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            marginBottom: 20,
            backgroundColor: "#555",
            border: "none",
            color: "white",
            padding: 5,
            cursor: "pointer",
            width: "100%",
          }}
        >
          {sidebarOpen ? "Hide" : "Show"}
        </button>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          <Link
            to="/dashboard"
            style={{
              color: "white",
              textDecoration: "none",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span role="img" aria-label="dashboard" style={{ fontSize: 24 }}>
              📊
            </span>
            {sidebarOpen && <span style={{ marginLeft: 10 }}>Dashboard</span>}
          </Link>

          <Link
            to="/accounts"
            style={{
              color: "white",
              textDecoration: "none",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span role="img" aria-label="account" style={{ fontSize: 24 }}>
              👤
            </span>
            {sidebarOpen && <span style={{ marginLeft: 10 }}>Account</span>}
          </Link>

          <Link
            to="/growth"
            style={{
              color: "white",
              textDecoration: "none",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span role="img" aria-label="growth" style={{ fontSize: 24 }}>
              🌱
            </span>
            {sidebarOpen && <span style={{ marginLeft: 10 }}>Growth</span>}
          </Link>
        </nav>
      </div>

      {/* Main content placeholder */}
      <div style={{ flexGrow: 1, padding: 20 }}>
        {/* This will render your routed pages */}
      </div>
    </div>
  );
}

