import React from "react";

export default function Button({ label, onClick, type = "button", style = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#2e86de",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        ...style,
      }}
    >
      {label}
    </button>
  );
}