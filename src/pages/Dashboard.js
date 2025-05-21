import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
];

const Dashboard = () => {
  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* Sales Statistics */}
      <div style={{ marginTop: "20px", background: "#f4f4f4", padding: "20px", borderRadius: "10px" }}>
        <h2>Sales Stats</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stock & Payment Overview */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Remaining Stock */}
        <div style={{ flex: 1, background: "#e3f2fd", padding: "20px", borderRadius: "10px" }}>
          <h3>Remaining Stock</h3>
          <p>Eggs: 12,000</p>
          <p>Chickens: 2,300</p>
        </div>

        {/* Pending Payments */}
        <div style={{ flex: 1, background: "#ffebee", padding: "20px", borderRadius: "10px" }}>
          <h3>Pending Payments</h3>
          <ul>
            <li>Hari Hati - NPR 10,000</li>
            <li>Sita Ram - NPR 7,500</li>
            <li>Maya Poultry - NPR 13,200</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
