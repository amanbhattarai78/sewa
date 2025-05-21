import React from "react";

// Dummy customer consumption data
const customerData = [
  {
    name: "Hotel Pokhara View",
    lastSupplyDate: "2025-05-01",
    monthlyConsumption: 900,
    avgDailyUsage: 30,
  },
  {
    name: "Green Mart",
    lastSupplyDate: "2025-05-10",
    monthlyConsumption: 1200,
    avgDailyUsage: 40,
  },
  {
    name: "Gourmet Restaurant",
    lastSupplyDate: "2025-05-05",
    monthlyConsumption: 1500,
    avgDailyUsage: 50,
  },
];

const calculateRestock = (lastSupplyDate, avgDailyUsage) => {
  const supplyDate = new Date(lastSupplyDate);
  const today = new Date();
  const daysSinceSupply = Math.floor((today - supplyDate) / (1000 * 60 * 60 * 24));
  const estimatedDaysLeft = Math.max(0, Math.floor(30 - daysSinceSupply));
  const restockNeeded = estimatedDaysLeft <= 5;

  return {
    daysSinceSupply,
    estimatedDaysLeft,
    restockDate: new Date(supplyDate.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    restockNeeded,
  };
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const GrowthPage = () => {
  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
      <h1>Growth Overview</h1>

      {/* Customer Table */}
      <div style={{ marginTop: "40px" }}>
        <h2>Customer Consumption & Restock Status</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={cellStyle}>Customer</th>
              <th style={cellStyle}>Monthly Consumption</th>
              <th style={cellStyle}>Avg Daily Usage</th>
              <th style={cellStyle}>Last Supplied</th>
              <th style={cellStyle}>Days Left</th>
              <th style={cellStyle}>Suggested Restock Date</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer, index) => {
              const { estimatedDaysLeft, restockDate, restockNeeded } = calculateRestock(
                customer.lastSupplyDate,
                customer.avgDailyUsage
              );
              return (
                <tr key={index} style={{ backgroundColor: restockNeeded ? "#ffefef" : "white" }}>
                  <td style={cellStyle}>{customer.name}</td>
                  <td style={cellStyle}>{customer.monthlyConsumption}</td>
                  <td style={cellStyle}>{customer.avgDailyUsage}</td>
                  <td style={cellStyle}>{customer.lastSupplyDate}</td>
                  <td style={cellStyle}>{estimatedDaysLeft}</td>
                  <td style={cellStyle}>{restockDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrowthPage;
