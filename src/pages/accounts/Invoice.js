import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Invoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [date, setDate] = useState("");
  const [sellerPan, setSellerPan] = useState("2000");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPan, setBuyerPan] = useState("");
  const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }]);
  const [discountRate, setDiscountRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const invoiceRef = useRef(null);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0);
  };

  useEffect(() => {
    const subtotal = calculateSubTotal();
    const discAmount = (subtotal * discountRate) / 100;
    setDiscountAmount(discAmount.toFixed(2));
  }, [discountRate, items]);

  const calculateTotalAfterDiscount = () => {
    const subtotal = calculateSubTotal();
    return (subtotal - discountAmount).toFixed(2);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    if (field === "quantity" || field === "price") {
      value = Number(value);
      if (isNaN(value) || value < 0) value = 0;
    }
    newItems[index][field] = value;
    setItems(newItems);
  };

  const saveInvoice = () => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
    const newInvoice = {
      invoiceNumber,
      date,
      sellerPan,
      buyerName,
      buyerPan,
      items,
      discountRate,
      discountAmount,
      total: calculateTotalAfterDiscount(),
    };
    savedInvoices.push(newInvoice);
    localStorage.setItem("invoices", JSON.stringify(savedInvoices));
    alert("Invoice saved successfully!");
    setInvoiceNumber(invoiceNumber + 1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 105, 15, null, null, "center");
    doc.setFontSize(14);
    doc.text("Sewa Poultry Suppliers", 105, 25, null, null, "center");
    doc.setFontSize(10);
    doc.text(`Seller PAN: ${sellerPan}`, 105, 32, null, null, "center");

    doc.text(`Buyer Name: ${buyerName}`, 14, 45);
    doc.text(`Buyer PAN: ${buyerPan}`, 14, 52);
    doc.text(`Date: ${date}`, 160, 45);
    doc.text(`Invoice No: ${invoiceNumber}`, 160, 52);

    const tableColumn = ["Description", "Quantity", "Price", "Total"];
    const tableRows = [];

    items.forEach((item) => {
      const row = [
        item.description,
        item.quantity.toString(),
        item.price.toFixed(2),
        (item.quantity * item.price).toFixed(2),
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    const finalY = doc.lastAutoTable.finalY || 60;
    doc.text(`Discount Rate: ${discountRate}%`, 14, finalY + 10);
    doc.text(`Discount Amount: NPR ${discountAmount}`, 14, finalY + 18);
    doc.setFontSize(12);
    doc.text(`Total After Discount: NPR ${calculateTotalAfterDiscount()}`, 14, finalY + 30);

    doc.save(`Invoice_${invoiceNumber}.pdf`);
  };

  const printInvoice = () => {
    const printContents = invoiceRef.current.innerHTML;
    const newWin = window.open("", "", "width=800,height=600");
    newWin.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            table, th, td { border: 1px solid black; }
            th, td { padding: 8px; text-align: left; }
            h1, h2, p { text-align: center; margin: 5px 0; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>`);
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <div ref={invoiceRef} style={{ padding: 30, border: "1px solid #ccc", borderRadius: 8 }}>
        <h1 style={{ textAlign: "center", marginBottom: 5 }}>Invoice</h1>
        <h2 style={{ textAlign: "center", margin: 0 }}>Sewa Poultry Suppliers</h2>
        <p style={{ textAlign: "center", marginBottom: 20 }}>Seller PAN: {sellerPan || "__________"}</p>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 30 }}>
          <div style={{ flex: 1, marginRight: 20 }}>
            <input placeholder="Buyer Name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} onKeyDown={handleEnterKey} style={{ width: "100%", marginBottom: 10 }} />
            <input placeholder="Buyer PAN" value={buyerPan} onChange={(e) => setBuyerPan(e.target.value)} onKeyDown={handleEnterKey} style={{ width: "100%" }} />
          </div>
          <div style={{ flex: 1 }}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} onKeyDown={handleEnterKey} style={{ width: "100%", marginBottom: 10 }} />
            <input type="number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(Number(e.target.value))} onKeyDown={handleEnterKey} style={{ width: "100%" }} />
          </div>
        </div>

        <table width="100%" border="1" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td><input value={item.description} onChange={(e) => updateItem(idx, "description", e.target.value)} onKeyDown={handleEnterKey} /></td>
                <td><input type="number" value={item.quantity} onChange={(e) => updateItem(idx, "quantity", e.target.value)} onKeyDown={handleEnterKey} /></td>
                <td><input type="number" value={item.price} onChange={(e) => updateItem(idx, "price", e.target.value)} onKeyDown={handleEnterKey} /></td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addItem} style={{ marginTop: 10 }}>+ Add Item</button>

        <div style={{ marginTop: 20 }}>
          <label>Discount %
            <input type="number" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} onKeyDown={handleEnterKey} style={{ marginLeft: 10 }} />
          </label>
          <p>Discount Amount: NPR {discountAmount}</p>
          <h3>Total: NPR {calculateTotalAfterDiscount()}</h3>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button onClick={saveInvoice} style={{ marginRight: 10 }}>Save</button>
        <button onClick={generatePDF} style={{ marginRight: 10 }}>Generate PDF</button>
        <button onClick={printInvoice}>Print</button>
      </div>
    </div>
  );
};

export default Invoice;
