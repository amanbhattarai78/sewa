import React, { useState } from "react";

export default function Sales() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.contact && newCustomer.address) {
      setCustomers([...customers, newCustomer]);
      setNewCustomer({ name: "", contact: "", address: "" });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Customer Management</h2>

      <div style={{ marginTop: 20 }}>
        <input
          name="name"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <input
          name="contact"
          placeholder="Contact Number"
          value={newCustomer.contact}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <input
          name="address"
          placeholder="Address"
          value={newCustomer.address}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>

      <h3 style={{ marginTop: 30 }}>Customer List</h3>
      <ul>
        {customers.map((cust, index) => (
          <li key={index}>
            {cust.name} - {cust.contact} - {cust.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

